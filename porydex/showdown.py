import json
import pathlib

import porydex.config

from porydex.common import name_key

def index(moves: dict, species: dict, learnsets: dict, encounters: dict):
    vanilla_data_dir = pathlib.Path('vanilla')
    abilities = json.load(open(vanilla_data_dir / 'abilities.json', 'r', encoding='utf-8'))
    items = json.load(open(vanilla_data_dir / 'items.json', 'r', encoding='utf-8'))
    typechart = json.load(open(vanilla_data_dir / 'typechart.json', 'r', encoding='utf-8'))
    vanilla_moves = json.load(open(vanilla_data_dir / 'moves.json', 'r', encoding='utf-8'))

    custom_abilities = json.load(open(porydex.config.custom_ability_defs, 'r', encoding='utf-8'))
    if custom_abilities:
        num = max(map(lambda abil: abil.get('num', 0), abilities.values())) + 1
        for name, descs in custom_abilities.items():
            abilities[name_key(name)] = {
                'flags': {},
                'name': name,
                'rating': 1,
                'num': num,
                'desc': descs.get('desc', ''),
                'shortDesc': descs.get('short', descs.get('desc', '')),
            }

    for key, vanilla in vanilla_moves.items():
        if key.startswith('gmax') or (key.startswith('hiddenpower') and len(key) > 11) or vanilla.get('isNonstandard', '') == 'CAP':
            continue

        assert key in moves, f'Failed to find move {key} in loaded moves data!'
        moves[key]['desc'] = vanilla['desc']
        moves[key]['shortDesc'] = vanilla['shortDesc']

    index = []
    index.extend(list(map(lambda s: s + ' pokemon', species.keys())))
    index.extend(list(map(lambda s: s + ' move', moves.keys())))
    index.extend(list(map(lambda s: s + ' item', items.keys())))
    index.extend(list(map(lambda s: s + ' ability', abilities.keys())))
    index.extend(list(map(lambda s: s + ' type', typechart.keys())))
    index.extend(list(map(lambda s: s + ' category', ['physical', 'special', 'status'])))
    index.extend(list(map(lambda s: s + ' egggroup', ['monster', 'water1', 'bug', 'flying', 'field', 'fairy', 'grass', 'humanlike', 'water3', 'mineral', 'amorphous', 'water2', 'ditto', 'dragon', 'undiscovered'])))

    for key in encounters.keys():
        if key == 'rates':
            continue
        index.append(key + ' location')

    COMMON_ABBREVIATION_INDICES: dict[str, int] = {
        'Alakazam': 5,
        'Arctovish': 5,
        'Arctozolt': 5,
        'Articuno': 5,
        'Breloom': 3,
        'Bronzong': 4,
        'Celebi': 4,
        'Charizard': 5,
        'Donphan': 3,
        'Dracovish': 5,
        'Dracozolt': 5,
        'Dragapult': 5,
        'Dusclops': 3,
        'Electabuzz': 6,
        'Exeggutor': 2,
        'Garchomp': 3,
        'Hariyama': 4,
        'Magearna': 2,
        'Magnezone': 5,
        'Mamoswine': 4,
        'Moltres': 3,
        'Nidoking': 4,
        'Nidoqueen': 4,
        'Nidorina': 4,
        'Nidorino': 4,
        'Regice': 3,
        'Regidrago': 4,
        'Regieleki': 4,
        'Regigigas': 4,
        'Regirock': 4,
        'Registeel': 4,
        'Slowbro': 4,
        'Slowking': 4,
        'Starmie': 4,
        'Tyranitar': 6,
        'Zapdos': 3,

        'Acupressure': 3,
        'Aromatherapy': 5,
        'Boomburst': 4,
        'Crabhammer': 4,
        'Discharge': 3,
        'Earthquake': 5,
        'Extrasensory': 5,
        'Flamethrower': 5,
        'Headbutt': 4,
        'Moonblast': 4,
        'Moonlight': 4,
        'Overheat': 4,
        'Outrage': 3,
        'Octazooka': 4,
        'Payback': 3,
        'Psyshock': 3,
        'Psywave': 3,
        'Rototiller': 4,
        'Rollout': 4,
        'Safeguard': 4,
        'Sandstorm': 4,
        'Smokescreen': 5,
        'Stockpile': 5,
        'Steamroller': 5,
        'Superpower': 5,
        'Supersonic': 5,
        'Synchronoise': 7,
        'Tailwind': 4,
        'Telekinesis': 4,
        'Teleport': 4,
        'Thunderbolt': 7,
        'Twineedle': 3,
        'Uproar': 2,
        'Venoshock': 4,
        'Whirlpool': 5,
        'Whirlwind': 5,
    }

    def alias(id: str, name: str, T: str) -> list[str]:
        index = []

        i = name.rfind(' ')
        if i < 0:
            i = name.rfind('-')

        if name.endswith('-Mega-X') or name.endswith('-Mega-Y'):
            index.append(f'mega{name_key(name[:-7] + name[-1])} {T} {id} 0')
            index.append(f'm{name_key(name[:-7] + name[-1])} {T} {id} 0')
            index.append(f'mega{name_key(name[-1])} {T} {id} {len(name_key(name[:-7]))}')
            return index

        if name.endswith('-Mega'):
            index.append(f'mega{name_key(name[:-5])} {T} {id} 0')
            index.append(f'm{name_key(name[:-5])} {T} {id} 0')
            return index

        if name.endswith('-Alola'):
            index.append(f'alolan{name_key(name[0:-6])} {T} {id} 0')
            return index

        if name.endswith('-Galar'):
            index.append(f'galarian{name_key(name[0:-6])} {T} {id} 0')
            return index

        if name.endswith('-Hisui'):
            index.append(f'hisuian{name_key(name[0:-6])} {T} {id} 0')
            return index

        if name.endswith('-Paldea'):
            index.append(f'paldean{name_key(name[0:-7])} {T} {id} 0')
            return index

        old_i = i
        i = COMMON_ABBREVIATION_INDICES.get(name, i)
        if i < 0:
            return index

        abbrev = name_key(name[0] + name[i:]) if old_i < 0 else ''
        index.append(f'{name_key(name[i:])} {T} {id} {len(name_key(name[:i]))}')
        if name.startswith('Hidden Power '):
            abbrev = f'hp{name_key(name[13:])}'
            index.append(f'{abbrev} {T} {id} {0}')
        elif name == 'Hidden Power':
            index.append(f'hp {T} {id} {0}')
        elif ' ' in name:
            abbrev = name_key("".join(map(lambda s: s[1] if s[0] != 0 else s[1][0], enumerate(name.split(" ")))))
        elif '-' in name and name[0] != '-':
            abbrev = name_key("".join(map(lambda s: s[1] if s[0] != 0 else s[1][0], enumerate(name.split("-")))))

        if abbrev:
            index.append(f'{abbrev} {T} {id} 0')

        if name == 'High Jump Kick':
            index.append(f'hjkick {T} {id} 0')
        elif name == 'Wake-Up Slap':
            index.append(f'wuslap {T} {id} 0')
            index.append(f'wupslap {T} {id} 0')
        elif name == 'Zen Headbutt':
            index.append(f'zhbutt {T} {id} 0')
        elif name == 'High Horsepower':
            index.append(f'hhp {T} {id} 0')
        elif name == 'Articuno':
            index.append(f'cuno {T} {id} 0')

        j = name.rfind(' ', i - 1)
        if j < 0:
            j = name.rfind('-', i - 1)
        if name == 'Zen Headbutt':
            j = 8
        if j >= 0:
            index.append(f'{name_key(name[j:])} {T} {id} {len(name_key(name[:j]))}')

        return index

    [index.extend(alias(id, mon['name'], 'pokemon')) for id, mon in species.items()]
    [index.extend(alias(id, move['name'], 'move')) for id, move in moves.items()]
    [index.extend(alias(id, item['name'], 'item')) for id, item in items.items()]
    [index.extend(alias(id, ability['name'], 'ability')) for id, ability in abilities.items()]

    for id, location in encounters.items():
        if id == 'rates':
            continue
        index.extend(alias(id, location['name'], 'location'))

    index.sort()

# manually rearrange some entries
    index[index.index('grass type')] = 'grass egggroup'
    index[index.index('grass egggroup')] = 'grass type'
    index[index.index('fairy type')] = 'fairy egggroup'
    index[index.index('fairy egggroup')] = 'fairy type'
    index[index.index('flying type')] = 'flying egggroup'
    index[index.index('flying egggroup')] = 'flying type'
    index[index.index('dragon type')] = 'dragon egggroup'
    index[index.index('dragon egggroup')] = 'dragon type'
    index[index.index('bug type')] = 'bug egggroup'
    index[index.index('bug egggroup')] = 'bug type'
    index[index.index('psychic type')] = 'psychic egggroup'
    index[index.index('psychic egggroup')] = 'psychic type'
    index[index.index('ditto pokemon')] = 'ditto egggroup'
    index[index.index('ditto egggroup')] = 'ditto pokemon'

    def index_map(s: str) -> list:
        spl: list = list(s.split(' '))
        if len(spl) > 3:
            spl[3] = int(spl[3])
            spl[2] = index.index(f'{spl[2]} {spl[1]}')
        return spl

    def offset_map(entry: list):
        id = entry[0]
        name = ''
        match entry[1]:
            case 'pokemon':
                name = species.get(id, {}).get('name', ' ')
            case 'move':
                name = moves.get(id, {}).get('name', ' ')
            case 'item':
                name = items.get(id, {}).get('name', ' ')
            case 'ability':
                name = abilities.get(id, {}).get('name', ' ')
            case 'location':
                name = encounters.get(id, {}).get('name', ' ')

        result = ''
        j, non_alnum = 0, 0
        for _ in range(len(id)):
            while j < len(name) and not name[j].isalnum():
                j = j + 1
                non_alnum = non_alnum + 1

            result = result + str(non_alnum)
            j = j + 1

        if non_alnum:
            return result
        return ''

    battle_search_index = list(map(index_map, index))
    battle_offset_index = list(map(offset_map, battle_search_index))
    battle_count_index = {}
    for T in typechart.keys():
        battle_count_index[f'{T} move'] = sum(map(lambda m: int(m['type'].lower() == T), moves.values()))
        battle_count_index[f'{T} pokemon'] = sum(map(lambda s: int(T.upper() in s['types']), species.values()))

    with open(porydex.config.output / 'search-index.js', 'w', encoding='utf-8') as outf:
        print('// DO NOT EDIT - automatically built by porydex', file=outf, end='\n\n')
        print(f'exports.BattleSearchIndex = {json.dumps(battle_search_index, ensure_ascii=False)};', file=outf, end='\n\n')
        print(f'exports.BattleSearchIndexOffset = {json.dumps(battle_offset_index, ensure_ascii=False)};', file=outf, end='\n\n')
        print(f'exports.BattleSearchCountIndex = {json.dumps(battle_count_index, ensure_ascii=False)};', file=outf, end='\n\n')
        print( 'exports.BattleArticleTitles = {};', file=outf, end='\n\n')

    with open(porydex.config.output / 'moves.js', 'w+', encoding='utf-8') as outf:
        outf.write('exports.BattleMovedex = ')
        json.dump(moves, outf, indent=4, ensure_ascii=False)

    with open(porydex.config.output / 'species.js', 'w+', encoding='utf-8') as outf:
        outf.write('exports.BattlePokedex = ')
        json.dump(species, outf, indent=4, ensure_ascii=False)

    with open(porydex.config.output / 'learnsets.js', 'w+', encoding='utf-8') as outf:
        outf.write('exports.BattleLearnsets = ')
        json.dump(learnsets, outf, indent=4, ensure_ascii=False)

    with open(porydex.config.output / 'encounters.js', 'w+', encoding='utf-8') as outf:
        outf.write('exports.BattleLocationdex = ')
        json.dump(encounters, outf, indent=4, ensure_ascii=False)

    with open(porydex.config.output / 'items.js', 'w+', encoding='utf-8') as outf:
        outf.write('exports.BattleItems = ')
        json.dump(items, outf, indent=4, ensure_ascii=False)

    with open(porydex.config.output / 'abilities.js', 'w+', encoding='utf-8') as outf:
        outf.write('exports.BattleAbilities = ')
        json.dump(abilities, outf, indent=4, ensure_ascii=False)

    with open(porydex.config.output / 'typechart.js', 'w+', encoding='utf-8') as outf:
        outf.write('exports.BattleTypeChart = ')
        json.dump(typechart, outf, indent=4, ensure_ascii=False)

