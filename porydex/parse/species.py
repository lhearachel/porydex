import pathlib
import typing

from pycparser.c_ast import Constant, NamedInitializer

from porydex.model import DAMAGE_TYPE, EGG_GROUP, BODY_COLOR
from porydex.parse import load_data, extract_id, extract_int, extract_u8_str

EVO_TABLE = {}

def parse_mon(struct_init: NamedInitializer,
              ability_names: typing.List[str],
              item_names: typing.List[str],
              form_tables: typing.Dict[str, typing.Dict[int, str]]) -> dict:
    init_list = struct_init.expr.exprs
    mon = {}
    mon['num'] = extract_int(struct_init.name[0])
    mon['baseStats'] = {}
    mon['types'] = []
    mon['evYields'] = {}
    mon['items'] = {}
    mon['eggGroups'] = []

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

    return mon

def parse_species(fname: pathlib.Path,
                  abilities: typing.List[str],
                  items: typing.List[str],
                  forms: typing.Dict[str, typing.Dict[int, str]]) -> dict:
    species_data = load_data(fname)

    # first pass: raw AST parse, build evolutions table
    all_species = {}
    for species_init in species_data:
        try:
            mon = parse_mon(species_init, abilities, items, forms)
            all_species[mon['num']] = mon
        except Exception as err:
            print('error parsing species info')
            print(species_init.show())
            raise err

    return all_species

