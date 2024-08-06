from collections import defaultdict
from dataclasses import dataclass

import pathlib
import re

from pycparser.c_ast import Constant, ExprList, NamedInitializer
from yaspin import yaspin

from porydex.common import name_key
from porydex.model import ExpansionEvoMethod, DAMAGE_TYPE, EGG_GROUP, BODY_COLOR, EVO_METHOD
from porydex.parse import load_truncated, extract_id, extract_int, extract_u8_str

EXPANSION_GEN9_START = 1289
VANILLA_GEN9_START = 906
EXPANSION_GEN9_OFFSET = EXPANSION_GEN9_START - VANILLA_GEN9_START

@dataclass
class CosmeticFormes:
    base: str
    alts: list[str] | None
    exclude_pattern: str | None

COSMETIC_FORME_SPECIES: dict[str, CosmeticFormes] = {
    'Unown': CosmeticFormes('A', [], None),
    'Vivillon': CosmeticFormes('Meadow', [], None), # Technically, Fancy and Poke Ball are alt forms and not cosmetic, but eff that
    'Furfrou': CosmeticFormes('Natural', [], None),
    'Spewpa': CosmeticFormes('Icy-Snow', None, None),
    'Scatterbug': CosmeticFormes('Icy-Snow', None, None),
    'Burmy': CosmeticFormes('Plant', [], None),
    'Mothim': CosmeticFormes('Plant', None, None),
    'Shellos': CosmeticFormes('West', [], None),
    'Gastrodon': CosmeticFormes('West', [], None),
    'Deerling': CosmeticFormes('Spring', [], None),
    'Sawsbuck': CosmeticFormes('Spring', [], None),
    'Flabébé': CosmeticFormes('Red', [], None),
    'Floette': CosmeticFormes('Red', ['Eternal'], None),
    'Florges': CosmeticFormes('Red', [], None),
    'Tatsugiri': CosmeticFormes('Curly', [], None),
    'Minior': CosmeticFormes('Red', ['Meteor'], r'Meteor-*'),
    'Alcremie': CosmeticFormes('Vanilla-Cream', ['Gmax'], None),
}

@dataclass
class SpecialAbilities:
    form: str
    ability: str

SPECIAL_ABILITIES: dict[str, SpecialAbilities] = {
    'Greninja': SpecialAbilities('Bond', 'Battle Bond'),
    'Zygarde': SpecialAbilities('Power-Construct', 'Power Construct'),
}

def parse_mon(struct_init: NamedInitializer,
              ability_names: list[str],
              item_names: list[str],
              form_tables: dict[str, dict[int, str]],
              level_up_learnsets: dict[str, dict[str, list[int]]],
              teachable_learnsets: dict[str, dict[str, list[str]]],
              national_dex: dict[str, int]) -> tuple[dict, list, dict, dict]:
    init_list = struct_init.expr.exprs
    mon = {}
    mon['num'] = extract_int(struct_init.name[0])
    mon['baseStats'] = {}
    mon['types'] = []
    mon['evYields'] = {}
    mon['items'] = {}
    mon['eggGroups'] = []

    evos = []
    lvlup_learnset = {}
    teach_learnset = {}

    for field_init in init_list:
        field_name = field_init.name[0].name
        field_expr = field_init.expr

        match field_name:
            case 'baseHP':
                mon['baseStats']['hp'] = extract_int(field_expr)
            case 'baseAttack':
                mon['baseStats']['atk'] = extract_int(field_expr)
            case 'baseDefense':
                mon['baseStats']['def'] = extract_int(field_expr)
            case 'baseSpeed':
                mon['baseStats']['spe'] = extract_int(field_expr)
            case 'baseSpAttack':
                mon['baseStats']['spa'] = extract_int(field_expr)
            case 'baseSpDefense':
                mon['baseStats']['spd'] = extract_int(field_expr)
            case 'types':
                types = [DAMAGE_TYPE[extract_int(t)] for t in field_expr.exprs]
                unique_types = []
                [unique_types.append(t) for t in types if t not in unique_types]
                mon['types'].extend(unique_types)
            case 'catchRate':
                mon['catchRate'] = extract_int(field_expr)
            case 'expYield':
                mon['expYield'] = extract_int(field_expr)
            case 'evYield_HP':
                mon['evYields']['hp'] = extract_int(field_expr)
            case 'evYield_Attack':
                mon['evYields']['atk'] = extract_int(field_expr)
            case 'evYield_Defense':
                mon['evYields']['def'] = extract_int(field_expr)
            case 'evYield_Speed':
                mon['evYields']['spe'] = extract_int(field_expr)
            case 'evYield_SpAttack':
                mon['evYields']['spa'] = extract_int(field_expr)
            case 'evYield_SpDefense':
                mon['evYields']['spd'] = extract_int(field_expr)
            case 'genderRatio':
                # If the field expression is a constant, then we can just pull it out and do a quick
                # evaluation against known constants to map to the appropriate gender
                gendered = True
                female = 0
                if isinstance(field_expr, Constant):
                    val = extract_int(field_expr)
                    match val:
                        case 0xFF:
                            gendered = False
                        case 0xFE | 0x00:
                            female = val / 0xFE
                        case _:
                            raise ValueError('unrecognized gender constant: ', val)
                else:
                    # Female % is nested as a raw constant inside a ternary; we can just pull it straight out
                    female = float(field_expr.iffalse.left.left.value) / 100

                if gendered:
                    male = 1 - female
                    mon['genderRatio'] = { 'M': male, 'F': female }
                else:
                    mon['gender'] = 'N'
            case 'eggGroups':
                group_1 = extract_int(field_expr.exprs[0])
                group_2 = extract_int(field_expr.exprs[1])
                mon['eggGroups'].append(EGG_GROUP[group_1])
                if group_2 != group_1:
                    mon['eggGroups'].append(EGG_GROUP[group_2])
            case 'abilities':
                # ability index 0 in expansion means do not output to showdown
                # all mons have at least 1 ability
                ability_0 = extract_int(field_expr.exprs[0])
                ability_1, ability_H = 0, 0
                if len(field_expr.exprs) > 1:
                    ability_1 = extract_int(field_expr.exprs[1])
                if len(field_expr.exprs) > 2:
                    ability_H = extract_int(field_expr.exprs[2])

                mon['abilities'] = { '0': ability_names[ability_0] }
                if ability_1 != 0 and ability_1 != ability_0:
                    mon['abilities']['1'] = ability_names[ability_1]
                if ability_H != 0 and ability_H != ability_0:
                    mon['abilities']['H'] = ability_names[ability_H]
            case 'bodyColor':
                mon['color'] = BODY_COLOR[extract_int(field_expr)]
            case 'speciesName':
                name = extract_u8_str(field_expr).replace('♂', '-M').replace('♀', '-F')
                if name == '??????????':
                    name = 'MissingNo.'
                mon['name'] = name
            case 'natDexNum':
                mon['nationalDex'] = national_dex[extract_id(field_expr)]
            case 'height':
                # Stored in expansion as M * 10
                mon['heightm'] = extract_int(field_expr) / 10
            case 'weight':
                # Stored in expansion as KG * 10
                mon['weightkg'] = extract_int(field_expr) / 10
            case 'itemRare':
                mon['items']['R'] = item_names[extract_int(field_expr)]
            case 'itemUncommon':
                mon['items']['U'] = item_names[extract_int(field_expr)]
            case 'formSpeciesIdTable':
                # The base form keeps a formeOrder field that specifies the order in
                # which forms are shown as well as an otherFormes field which lists
                # the full name of each other forme. Alternate formes only specify
                # their respective base form, their own form name, and their full
                # conjuncted name as species+form.
                table = form_tables[extract_id(field_expr)]

                # If there is only one entry in the table, don't bother
                if len(table.keys()) == 1:
                    continue

                if list(table.keys())[0] == mon['num']:
                    table_vals = list(table.values())
                    if table_vals[0] != 'Base':
                        mon['baseForme'] = table_vals[0]

                    # Ugly Urshifu hack
                    if mon['name'] == 'Urshifu':
                        mon['formeOrder'] = [mon['name'] + (f'-{table_vals[i].replace("-Style", "")}' if i > 0 else '') for i in range(len(table.keys()))]
                    # Ugly Xerneas hack
                    elif mon['name'] == 'Xerneas':
                        mon['formeOrder'] = ['Xerneas', 'Xerneas-Neutral']
                        mon['baseForme'] = 'Active'
                    # Ugly Vivillon hack
                    elif mon['name'] == 'Vivillon':
                        # expansion stores vivillon icy snow as the default form; showdown expects meadow to be the default
                        mon['formeOrder'] = [f'{mon["name"]}', f'{mon["name"]}-Icy-Snow']
                        mon['formeOrder'].extend([
                            f'{mon["name"]}-{table_vals[i]}'
                            for i in range(len(table.keys()))
                            if table_vals[i] not in ('Base', COSMETIC_FORME_SPECIES[mon['name']].base)
                        ])
                    # Ugly Minior hack
                    elif mon['name'] == 'Minior':
                        # expansion stores minior-meteor-red as the default form; showdown indexes core-red as the default
                        mon['formeOrder'] = [f'{mon["name"]}', f'{mon["name"]}-Meteor']
                        mon['formeOrder'].extend([
                            f'{mon["name"]}-{table_vals[i]}'
                            for i in range(len(table.keys()))
                            if table_vals[i] not in ('Base', COSMETIC_FORME_SPECIES[mon['name']].base) and 'Meteor' not in table_vals[i]
                        ])
                    # Ugly Zygarde hack
                    elif mon['name'] == 'Zygarde':
                        mon['formeOrder'] = ['Zygarde', 'Zygarde-10%', 'Zygarde-Complete']
                        mon['baseForme'] = '50%'
                    # Ugly Greninja hack
                    elif mon['name'] == 'Greninja':
                        mon['formeOrder'] = ['Greninja', 'Greninja-Ash']
                        mon['baseForme'] = 'Base'
                    else:
                        mon['formeOrder'] = [
                            mon['name'] + (f'-{table_vals[i]}' if i > 0 else '')
                            for i in range(len(table.keys()))
                        ]

                    # Cosmetic Formes
                    cosmetics = COSMETIC_FORME_SPECIES.get(mon['name'], None)
                    if cosmetics:
                        if cosmetics.alts is not None:
                            mon['cosmeticFormes'] = [
                                f'{mon["name"]}-{table_vals[i]}'
                                for i in range(len(table.keys()))
                                if table_vals[i] not in ('Base', '', cosmetics.base) \
                                    and table_vals[i] not in cosmetics.alts \
                                    and (cosmetics.exclude_pattern is None or not re.match(cosmetics.exclude_pattern, table_vals[i]))
                            ]
                            mon['baseForme'] = cosmetics.base

                            if cosmetics.alts:
                                mon['otherFormes'] = list(map(lambda alt: f'{mon["name"]}-{alt}', cosmetics.alts))
                    else:
                        mon['otherFormes'] = mon['formeOrder'][1:]
                else:
                    # ugly ogerpon tera forms hack
                    if mon['name'] == 'Ogerpon' and mon['num'] not in table:
                        form_name = f'{table[mon["num"] - 4]}-Tera'
                    # ugly xerneas neutral-active swap
                    elif mon['name'] == 'Xerneas':
                        form_name = 'Neutral'
                    # ugly urshifu forms hack
                    elif mon['name'] == 'Urshifu':
                        form_name = table[mon['num']].replace('-Style', '')
                    else:
                        form_name = table[mon['num']]
                    mon['baseSpecies'] = mon['name']
                    mon['forme'] = form_name
                    mon['name'] = f'{mon["name"]}-{form_name}'
            case 'evolutions':
                # general schema from expansion: [method_id, method_param, target_species]
                for evo_method in field_expr.init.exprs:
                    method_id = extract_int(evo_method.exprs[0])
                    if method_id == 0xFFFF:
                        break

                    if method_id == 0xFFFE:
                        continue

                    if method_id == ExpansionEvoMethod.SPECIFIC_MAP.value: # TODO:: Leafeon, Glaceon
                        continue

                    evos.append([ExpansionEvoMethod(method_id), extract_int(evo_method.exprs[1]), extract_int(evo_method.exprs[2])])
                evos.sort(key=lambda evo: evo[2])
            case 'levelUpLearnset':
                lvlup_learnset = level_up_learnsets.get(extract_id(field_expr), {})
            case 'teachableLearnset':
                teach_learnset = teachable_learnsets.get(extract_id(field_expr), {})

    return mon, evos, lvlup_learnset, teach_learnset

def zip_evos(all_data: dict,
             items: list[str],
             moves: list[str],
             map_sections: list[str]):
    for _, (mon, evos) in all_data.items():
        if not evos:
            continue

        mon['evos'] = []
        for i, evo in enumerate(evos):
            parent_dex_id = evo[2]
            parent_mon = all_data.get(parent_dex_id, (None,))[0]
            if not parent_mon:
                continue

            # Clean up Milcery's evos to Alcremie
            if mon['name'] == 'Milcery' and parent_mon['name'].startswith('Alcremie') and i > 0:
                continue

            # if the mon is already listed as evolving into this parent, continue
            # we only want to register a single evolution method per child-parent pair
            if parent_mon['name'] in mon['evos']:
                continue

            mon['evos'].append(parent_mon['name'])
            parent_mon['prevo'] = mon['name']
            method, param = evo[0], evo[1]

            match method:
                # These evo methods have no additional parameter in showdown
                case ExpansionEvoMethod.FRIENDSHIP \
                    | ExpansionEvoMethod.FRIENDSHIP_DAY \
                    | ExpansionEvoMethod.FRIENDSHIP_NIGHT \
                    | ExpansionEvoMethod.TRADE \
                    | ExpansionEvoMethod.BEAUTY \
                    | ExpansionEvoMethod.CRITICAL_HITS \
                    | ExpansionEvoMethod.SCRIPT_TRIGGER_DMG \
                    | ExpansionEvoMethod.DARK_SCROLL \
                    | ExpansionEvoMethod.WATER_SCROLL \
                    | ExpansionEvoMethod.RECOIL_DAMAGE_MALE \
                    | ExpansionEvoMethod.RECOIL_DAMAGE_FEMALE \
                    | ExpansionEvoMethod.DEFEAT_WITH_ITEM \
                    | ExpansionEvoMethod.OVERWORLD_STEPS:
                    pass

                # These evo methods interpret the parameter as a minimum level
                case ExpansionEvoMethod.LEVEL \
                    | ExpansionEvoMethod.LEVEL_ATK_GT_DEF \
                    | ExpansionEvoMethod.LEVEL_ATK_EQ_DEF \
                    | ExpansionEvoMethod.LEVEL_ATK_LT_DEF \
                    | ExpansionEvoMethod.LEVEL_SILCOON \
                    | ExpansionEvoMethod.LEVEL_CASCOON \
                    | ExpansionEvoMethod.LEVEL_SHEDINJA \
                    | ExpansionEvoMethod.LEVEL_NINJASK \
                    | ExpansionEvoMethod.LEVEL_FEMALE \
                    | ExpansionEvoMethod.LEVEL_MALE \
                    | ExpansionEvoMethod.LEVEL_NIGHT \
                    | ExpansionEvoMethod.LEVEL_DAY \
                    | ExpansionEvoMethod.LEVEL_DUSK \
                    | ExpansionEvoMethod.LEVEL_RAIN \
                    | ExpansionEvoMethod.LEVEL_DARK_TYPE_MON_IN_PARTY \
                    | ExpansionEvoMethod.LEVEL_NATURE_AMPED \
                    | ExpansionEvoMethod.LEVEL_NATURE_LOW_KEY \
                    | ExpansionEvoMethod.LEVEL_FOG \
                    | ExpansionEvoMethod.LEVEL_FAMILY_OF_THREE \
                    | ExpansionEvoMethod.LEVEL_FAMILY_OF_FOUR:
                    parent_mon['evoLevel'] = param

                # These evo methods interpret the parameter as a specific item
                case ExpansionEvoMethod.TRADE_ITEM \
                    | ExpansionEvoMethod.ITEM \
                    | ExpansionEvoMethod.ITEM_HOLD_DAY \
                    | ExpansionEvoMethod.ITEM_HOLD_NIGHT \
                    | ExpansionEvoMethod.ITEM_MALE \
                    | ExpansionEvoMethod.ITEM_FEMALE \
                    | ExpansionEvoMethod.ITEM_NIGHT \
                    | ExpansionEvoMethod.ITEM_DAY \
                    | ExpansionEvoMethod.ITEM_HOLD \
                    | ExpansionEvoMethod.ITEM_COUNT_999:
                    parent_mon['evoItem'] = items[param]

                # These evo methods interpret the parameter as a specific move
                case ExpansionEvoMethod.MOVE \
                    | ExpansionEvoMethod.MOVE_TWO_SEGMENT \
                    | ExpansionEvoMethod.MOVE_THREE_SEGMENT \
                    | ExpansionEvoMethod.USE_MOVE_TWENTY_TIMES:
                    parent_mon['evoMove'] = moves[param]
                    pass

                # These evo methods interpret the parameter as another species
                case ExpansionEvoMethod.SPECIFIC_MON_IN_PARTY \
                    | ExpansionEvoMethod.TRADE_SPECIFIC_MON:
                    parent_mon['evoSpecies'] = all_data[param][0]['name']

                # This evo method interprets the parameter as a damage type
                case ExpansionEvoMethod.FRIENDSHIP_MOVE_TYPE:
                    parent_mon['evoMove'] = f'a {DAMAGE_TYPE[param]}-type move'

                # These evo methods interpret the parameter as a specific map zone
                case ExpansionEvoMethod.MAPSEC:
                    parent_mon['evoMap'] = map_sections[param]

                case _:
                    raise ValueError('Unimplemented evo method: ', evo[0])

            descriptor = EVO_METHOD[method.value]
            parent_mon['evoType'] = descriptor.type
            parent_mon['evoCondition'] = descriptor.condition

def zip_learnsets(lvlup_learnset: dict[str, list[int]],
                  teach_learnset: dict[str, list[str]]) -> dict:
    full_learnset = defaultdict(list)
    for move, levels in lvlup_learnset.items():
        full_learnset[move] = [f'L{level}' for level in levels]
    for method, moves in teach_learnset.items():
        for move in moves:
            full_learnset[move].append(method.upper())

    return full_learnset

def parse_species_data(species_data: ExprList,
                       abilities: list[str],
                       items: list[str],
                       moves: list[str],
                       forms: dict[str, dict[int, str]],
                       map_sections: list[str],
                       level_up_learnsets: dict[str, dict[str, list[int]]],
                       teachable_learnsets: dict[str, dict[str, list[str]]],
                       national_dex: dict[str, int],
                       included_mons: list[str]) -> tuple[dict, dict]:
    # first pass: raw AST parse, build evolutions table
    all_species_data = {}
    all_learnsets = {}
    key: str
    for species_init in species_data:
        try:
            mon, evos, lvlup_learnset, teach_learnset = parse_mon(species_init, abilities, items, forms, level_up_learnsets, teachable_learnsets, national_dex)
            all_species_data[mon['num']] = (mon, evos)

            if 'name' not in mon or not mon['name']:
                continue

            if mon['name'].rfind('-') != -1:
                base_name = mon['name'].split('-')[0]
                cosmetics = COSMETIC_FORME_SPECIES.get(base_name, None)
                if cosmetics and any(map(lambda s: s[0]['name'] == base_name, all_species_data.values())):
                    if cosmetics.alts is None or mon['name'] not in map(lambda alt: f'{base_name}-{alt}', cosmetics.alts):
                        mon['cosmetic'] = True # use this later during cleanup to map the name to its base form
                        continue

                special = SPECIAL_ABILITIES.get(base_name, None)
                if special:
                    form_name = mon['name'].replace(base_name, '')[1:]
                    if '-' in form_name:
                        sub_form = f'-{form_name.split("-")[0]}'
                        special_form = '-'.join(form_name.split('-')[1:])
                    else:
                        sub_form = ''
                        special_form = form_name

                    if special.form == special_form:
                        target = f'{base_name}{sub_form}'
                        parent_mon = next(
                            s for s in all_species_data.values()
                            if s[0]['name'] == target or ('baseForme' in s[0] and f'{s[0]["name"]}-{s[0]["baseForme"]}' == target)
                        )[0]
                        parent_mon['abilities']['S'] = special.ability
                        del all_species_data[mon['num']]
                        continue

            key = name_key(mon['name'])
            all_learnsets[key] = {}
            all_learnsets[key]['learnset'] = {}

            if lvlup_learnset or teach_learnset:
                all_learnsets[key]['learnset'] = zip_learnsets(lvlup_learnset, teach_learnset)
        except Exception as err:
            print('error parsing species info')
            print(species_init.show())
            raise err

    # second pass: re-target evos from source mon to target mon
    zip_evos(all_species_data, items, moves, map_sections)

    # re-zip the whole dictionary keyed according to showdown's key format
    # and flag mons which are not available
    final_species = {}
    for mon, _ in all_species_data.values():
        if 'name' not in mon or not mon['name']: # egg has no name; don't try
            continue

        if included_mons:
            mon['tier'] = 'obtainable' if mon['name'] in included_mons else 'unobtainable'

        final_species[name_key(mon['name'])] = mon

    return final_species, all_learnsets

def parse_species(fname: pathlib.Path,
                  abilities: list[str],
                  items: list[str],
                  moves: list[str],
                  forms: dict[str, dict[int, str]],
                  map_sections: list[str],
                  level_up_learnsets: dict[str, dict[str, list[int]]],
                  teachable_learnsets: dict[str, dict[str, list[str]]],
                  national_dex: dict[str, int],
                  included_mons: list[str]) -> tuple[dict, dict]:
    species_data: ExprList
    with yaspin(text=f'Loading species data: {fname}', color='cyan') as spinner:
        species_data = load_truncated(fname, extra_includes=[
            r'-include', r'constants/moves.h',
        ])
        spinner.ok("✅")

    return parse_species_data(
        species_data,
        abilities,
        items,
        moves,
        forms,
        map_sections,
        level_up_learnsets,
        teachable_learnsets,
        national_dex,
        included_mons,
    )

