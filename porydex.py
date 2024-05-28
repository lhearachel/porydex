import argparse
import json
import pathlib
import os

import porydex.config

from porydex.common import PICKLE_PATH
from porydex.parse.abilities import parse_abilities
from porydex.parse.form_tables import parse_form_tables
from porydex.parse.items import parse_items
from porydex.parse.maps import parse_maps
from porydex.parse.moves import parse_moves
from porydex.parse.species import parse_species

def config(args):
    if args.expansion:
        assert args.expansion.resolve().exists(), f'specified expansion directory {args.expansion} does not exist'
        porydex.config.expansion = args.expansion.resolve()

    if args.compiler:
        porydex.config.compiler = args.compiler

    if args.output:
        porydex.config.output = args.output.resolve()

def extract(args):
    if args.reload:
        for f in PICKLE_PATH.glob('*'):
            os.remove(f)

    [path.mkdir(parents=True) if not path.exists() else () for path in (PICKLE_PATH, porydex.config.output)]

    expansion_data = porydex.config.expansion / 'src' / 'data'
    moves = parse_moves(expansion_data / 'moves_info.h')

    move_names = [move['name'] for move in sorted(moves.values(), key=lambda m: m['num'])]
    abilities = parse_abilities(expansion_data / 'abilities.h')
    items = parse_items(expansion_data / 'items.h')
    forms = parse_form_tables(expansion_data / 'pokemon' / 'form_species_tables.h')
    map_sections = parse_maps(expansion_data / 'region_map' / 'region_map_entries.h')
    species = parse_species(
        expansion_data / 'pokemon' / 'species_info.h',
        abilities,
        items,
        move_names,
        forms,
        map_sections,
    )

    with open(porydex.config.output / 'moves.json', 'w', encoding='utf-8') as outf:
        json.dump(moves, outf, indent=4)

    with open(porydex.config.output / 'species.json', 'w', encoding='utf-8') as outf:
        json.dump(species, outf, indent=4)

def main():
    argp = argparse.ArgumentParser(prog='porydex',
                                   description='generate data exports from pokeemerald-expansion for showdown dex')
    subp = argp.add_subparsers(required=True)

    config_p = subp.add_parser('config', help='setup configuration options for porydex')
    config_p.add_argument('-e', '--expansion', action='store',
                          help='path to the root of your pokeemerald-expansion repository; default: ../pokeemerald-expansion',
                          type=pathlib.Path)
    config_p.add_argument('-c', '--compiler', action='store',
                          help='command for or path to the compiler to be used for pre-processing; default: gcc',
                          type=pathlib.Path)
    config_p.add_argument('-o', '--output', action='store',
                          help='path to output directory for extracted data files; default: ./out',
                          type=pathlib.Path)
    config_p.set_defaults(func=config)

    extract_p = subp.add_parser('extract', help='run data extraction')
    extract_p.add_argument('--reload', action='store_true',
                           help='if specified, flush the cache of parsed data and reload from expansion')
    extract_p.set_defaults(func=extract)

    args = argp.parse_args()
    args.func(args)

if __name__ == '__main__':
    main()

