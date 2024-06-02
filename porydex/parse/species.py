from collections import defaultdict
import pathlib
import re

from pycparser.c_ast import Constant, ExprList, NamedInitializer

from porydex.model import ExpansionEvoMethod, DAMAGE_TYPE, EGG_GROUP, BODY_COLOR, EVO_METHOD
from porydex.parse import load_truncated, extract_id, extract_int, extract_u8_str

def parse_mon(struct_init: NamedInitializer,
              ability_names: list[str],
              item_names: list[str],
              form_tables: dict[str, dict[int, str]],
              level_up_learnsets: dict[str, dict[str, list[int]]],
              teachable_learnsets: dict[str, list[str]]) -> tuple[dict, list, dict, list]:
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
    teach_learnset = []

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
            case 'baseDefense':
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
                    mon['genderRatio'] = 'N'
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
                mon['name'] = extract_u8_str(field_expr)
            case 'height':
                # Stored in expansion as M * 10
                mon['height'] = extract_int(field_expr) / 10
            case 'weight':
                # Stored in expansion as KG * 10
                mon['weight'] = extract_int(field_expr) / 10
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
                if list(table.keys())[0] == mon['num']:
                    table_vals = list(table.values())
                    if table_vals[0] != 'Base':
                        mon['baseForme'] = table_vals[0]

                    mon['formeOrder'] = [mon['name'] + (f'-{table_vals[i]}' if i > 0 else '') for i in range(len(table.keys()))]

                    # ugly ogerpon tera forms hack
                    if mon['name'] == 'Ogerpon':
                        mon['formeOrder'].append(f'{mon["name"]}-{table_vals[0]}-Tera')
                        for i in range(len(table_vals[1:])):
                            mon['formeOrder'].append(f'{mon["formeOrder"][i + 1]}-Tera')

                    mon['otherFormes'] = mon['formeOrder'][1:]
                else:
                    # ugly ogerpon tera forms hack
                    if mon['name'] == 'Ogerpon' and mon['num'] not in table:
                        form_name = f'{table[mon["num"] - 4]}-Tera'
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
                teach_learnset = teachable_learnsets.get(extract_id(field_expr), [])

    return mon, evos, lvlup_learnset, teach_learnset

def zip_evos(all_data: dict,
             items: list[str],
             moves: list[str],
             map_sections: list[str]):
    for _, (mon, evos) in all_data.items():
        if not evos:
            continue

        mon['evos'] = []
        for evo in evos:
            parent_dex_id = evo[2]
            parent_mon = all_data[parent_dex_id][0]

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
                    | ExpansionEvoMethod.RECOIL_DAMAGE_FEMALE:
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
                    | ExpansionEvoMethod.MOVE_THREE_SEGMENT:
                    parent_mon['evoMove'] = moves[param]
                    pass

                # These evo methods interpret the parameter as another species
                case ExpansionEvoMethod.SPECIFIC_MON_IN_PARTY \
                    | ExpansionEvoMethod.TRADE_SPECIFIC_MON \
                    | ExpansionEvoMethod.USE_MOVE_TWENTY_TIMES:
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
            if descriptor.condition:
                parent_mon['evoType'] = descriptor.type
                parent_mon['evoCondition'] = descriptor.condition

def zip_learnsets(lvlup_learnset: dict[str, list[int]],
                  teach_learnset: list[str]) -> dict:
    full_learnset = defaultdict(list)
    for move, levels in lvlup_learnset.items():
        full_learnset[move] = [f'L{level}' for level in levels]
    for move in teach_learnset:
        full_learnset[move].append('M')

    return full_learnset

SPLIT_CHARS = re.compile(r"\W+")

def species_name_key(name: str) -> str:
    return ''.join(SPLIT_CHARS.split(name)).lower()

def parse_species_data(species_data: ExprList,
                       abilities: list[str],
                       items: list[str],
                       moves: list[str],
                       forms: dict[str, dict[int, str]],
                       map_sections: list[str],
                       level_up_learnsets: dict[str, dict[str, list[int]]],
                       teachable_learnsets: dict[str, dict[str, list[str]]]) -> dict:
    # first pass: raw AST parse, build evolutions table
    all_species_data = {}
    for species_init in species_data:
        try:
            mon, evos, lvlup_learnset, teach_learnset = parse_mon(species_init, abilities, items, forms, level_up_learnsets, teachable_learnsets)
            all_species_data[mon['num']] = (mon, evos)

            if lvlup_learnset or teach_learnset:
                mon['learnset'] = zip_learnsets(lvlup_learnset, teach_learnset)
        except Exception as err:
            print('error parsing species info')
            print(species_init.show())
            raise err

    # second pass: re-target evos from source mon to target mon
    zip_evos(all_species_data, items, moves, map_sections)

    # re-zip the whole dictionary keyed according to showdown's key format
    final_species = {}
    for mon, _ in all_species_data.values():
        if 'name' not in mon or not mon['name']: # egg has no name; don't try
            continue
        final_species[species_name_key(mon['name'])] = mon

    return final_species

def parse_species(fname: pathlib.Path,
                  abilities: list[str],
                  items: list[str],
                  moves: list[str],
                  forms: dict[str, dict[int, str]],
                  map_sections: list[str],
                  level_up_learnsets: dict[str, dict[str, list[int]]],
                  teachable_learnsets: dict[str, dict[str, list[str]]]) -> dict:
    return parse_species_data(
        load_truncated(fname),
        abilities,
        items,
        moves,
        forms,
        map_sections,
        level_up_learnsets,
        teachable_learnsets
    )

