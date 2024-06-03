import dataclasses
import json
import pathlib
import re

from pycparser.c_ast import ArrayDecl, Constant, Decl, InitList, NamedInitializer, Struct, TypeDecl

from porydex.common import name_key
from porydex.parse import extract_id, extract_int, load_data

def snake_to_pascal(s: str) -> str:
    return ''.join(x.capitalize() for x in s.lower().split('_'))

def snake_to_camel(s: str) -> str:
    pascal = snake_to_pascal(s)

    if not pascal:
        return ''
    return pascal[0].lower() + pascal[1:]

def split_words(s: str) -> str:
    return ' '.join(re.findall(r'[A-Z0-9]+[^A-Z0-9]*', s)).replace('_', ' -')

@dataclasses.dataclass
class Encounter:
    species: str
    min_lvl: int
    max_lvl: int

    def to_json(self) -> dict:
        return dataclasses.asdict(
            self,
            dict_factory=lambda fields: {
                snake_to_camel(key): value
                for key, value in fields
                if value is not None
            }
        )

@dataclasses.dataclass
class EncounterInfo:
    base_rate: int
    enc_def_id: str

@dataclasses.dataclass
class EncounterRate:
    base_rate: int
    encs: list[Encounter]

    def to_json(self) -> dict:
        return dataclasses.asdict(
            self,
            dict_factory=lambda fields: {
                snake_to_camel(key): value
                for key, value in fields
                if value is not None
            }
        )

@dataclasses.dataclass
class MapEncounters:
    name: str | None
    land: EncounterRate | None
    surf: EncounterRate | None
    rock: EncounterRate | None
    fish: EncounterRate | None

MAP_NAME_PATTERN = re.compile(r'g(\w+)_.*')

def parse_encounter_init(init: NamedInitializer,
                         info_sections: dict[str, EncounterInfo],
                         encounter_defs: dict[str, list[Encounter]]) -> tuple[str, EncounterRate] | None:
    if isinstance(init.expr, Constant):
        assert extract_int(init.expr) == 0, 'non-null constant for encounter info'
        return None

    id = extract_id(init.expr.expr)
    map_name_match = MAP_NAME_PATTERN.match(id)
    assert map_name_match, f'failed to match info ID: {id}'
    map_name = map_name_match.group(1)

    id_info = info_sections[id]
    id_encs = encounter_defs[id_info.enc_def_id]

    return map_name, EncounterRate(id_info.base_rate, id_encs)

def parse_encounter_header(header: InitList,
                           info_sections: dict[str, EncounterInfo],
                           encounter_defs: dict[str, list[Encounter]]) -> MapEncounters:
    field_inits = header.exprs
    encs = MapEncounters(None, None, None, None, None)
    for init in field_inits:
        result = None
        match init.name[0].name:
            case 'landMonsInfo':
                result = parse_encounter_init(init, info_sections, encounter_defs)
                if result:
                    encs.name, encs.land = result
            case 'waterMonsInfo':
                result = parse_encounter_init(init, info_sections, encounter_defs)
                if result:
                    encs.name, encs.surf = result
            case 'rockSmashMonsInfo':
                result = parse_encounter_init(init, info_sections, encounter_defs)
                if result:
                    encs.name, encs.rock = result
            case 'fishingMonsInfo':
                result = parse_encounter_init(init, info_sections, encounter_defs)
                if result:
                    encs.name, encs.fish = result

    return encs

def parse_encounter_def(entry: InitList, species_names: list[str]) -> Encounter:
    return Encounter(
        species=species_names[extract_int(entry.exprs[2])],
        min_lvl=extract_int(entry.exprs[0]),
        max_lvl=extract_int(entry.exprs[1]),
    )

def parse_encounters_data(exts, jd: dict, species_names: list[str]) -> dict[str, dict[str, EncounterRate] | dict[str, dict]]:
    headers = []
    info_sections = {}
    encounter_defs = {}
    for _, entry in enumerate(exts):
        if not isinstance(entry, Decl):
            continue

        if (isinstance(entry.type, TypeDecl)
                and isinstance(entry.type.type, Struct)
                and entry.type.type.name == 'WildPokemonInfo'):
            info_sections[entry.name] = EncounterInfo(
                base_rate=extract_int(entry.init.exprs[0]),
                enc_def_id=extract_id(entry.init.exprs[1]),
            )

        if (isinstance(entry.type, ArrayDecl)
                and isinstance(entry.type.type, TypeDecl)
                and isinstance(entry.type.type.type, Struct)):
            if entry.type.type.type.name == 'WildPokemon':
                encounter_defs[entry.name] = [
                    parse_encounter_def(enc_def, species_names)
                    for enc_def in entry.init.exprs
                ]
            if entry.type.type.type.name == 'WildPokemonHeader':
                headers = entry.init.exprs
                break

    all_encounters = {
        'rates': {
            'land': [],
            'surf': [],
            'rock': [],
            'fish': {
                'old': [],
                'good': [],
                'super': [],
            },
        }
    }
    global_group = jd['wild_encounter_groups'][0]
    for field in global_group['fields']:
        match field['type']:
            case 'land_mons':
                all_encounters['rates']['land'] = field['encounter_rates']
            case 'water_mons':
                all_encounters['rates']['surf'] = field['encounter_rates']
            case 'rock_smash_mons':
                all_encounters['rates']['rock'] = field['encounter_rates']
            case 'fishing_mons':
                rates = field['encounter_rates']
                for slot in field['groups']['old_rod']:
                    all_encounters['rates']['fish']['old'].append(rates[slot])
                for slot in field['groups']['good_rod']:
                    all_encounters['rates']['fish']['good'].append(rates[slot])
                for slot in field['groups']['super_rod']:
                    all_encounters['rates']['fish']['super'].append(rates[slot])

    for header in headers:
        data = parse_encounter_header(header, info_sections, encounter_defs)
        if not data.name:
            continue

        all_encounters[name_key(data.name)] = {
            'name': split_words(data.name),
            'land': data.land.to_json() if data.land else {},
            'surf': data.surf.to_json() if data.surf else {},
            'rock': data.rock.to_json() if data.rock else {},
            'fish': data.fish.to_json() if data.fish else {},
        }

    return all_encounters

def load_json(fname: pathlib.Path) -> dict:
    with open(fname, 'r', encoding='utf-8') as j:
        return json.load(j)

def parse_encounters(fname: pathlib.Path,
                     species_names: list[str]) -> dict[str, dict[str, EncounterRate] | dict[str, dict]]:
    return parse_encounters_data(load_data(fname), load_json(fname.with_suffix('.json')), species_names)

