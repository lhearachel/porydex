import argparse
import json
import pathlib
import os

from porydex.common import PICKLE_PATH
from porydex.parse.abilities import parse_abilities
from porydex.parse.form_tables import parse_form_tables
from porydex.parse.items import parse_items
from porydex.parse.moves import parse_moves
from porydex.parse.species import parse_species

def main():
    argp = argparse.ArgumentParser(prog='porydex',
                                description='generate data exports from pokeemerald-expansion for showdown dex')
    argp.add_argument('-e', '--expansion', action='store',
                      help='path to the root of your pokeemerald-expansion repository',
                      type=pathlib.Path,
                      required=False)
    argp.add_argument('-o', '--out-dir', action='store',
                      help='path to directory where output files will be dumped',
                      type=pathlib.Path,
                      default=pathlib.Path('out'))
    argp.add_argument('--reload', action='store_true',
                      help='if specified, flush the cache of parsed data and reload from expansion')

    args = argp.parse_args()
    if args.reload:
        if not args.expansion:
            argp.error('--reload requires --expansion')

        for f in PICKLE_PATH.glob('*'):
            os.remove(f)

    if not PICKLE_PATH.exists():
        if not args.expansion:
            argp.error('no cached data; --expansion is required on first run!')
        PICKLE_PATH.mkdir(parents=True, exist_ok=True)

    if not args.out_dir.exists():
        args.out_dir.mkdir(parents=True, exist_ok=True)

    expansion = args.expansion
    expansion_data = expansion / 'src' / 'data'
    moves = parse_moves(expansion_data / 'moves_info.h', expansion)
    abilities = parse_abilities(expansion_data / 'abilities.h', expansion)
    items = parse_items(expansion_data / 'items.h', expansion)
    forms = parse_form_tables(expansion_data / 'pokemon' / 'form_species_tables.h', expansion)
    species = parse_species(
        expansion_data / 'pokemon' / 'species_info.h',
        expansion,
        abilities,
        items,
        forms
    )

    with open(args.out_dir / 'moves.json', 'w', encoding='utf-8') as outf:
        json.dump(moves, outf, indent=4)

    with open(args.out_dir / 'species.json', 'w', encoding='utf-8') as outf:
        json.dump(species, outf, indent=4)

if __name__ == '__main__':
    main()

