import argparse
import json
import pathlib

from porydex.parse.moves import parse_moves

def main():
    argp = argparse.ArgumentParser(prog='porydex',
                                description='generate data exports from pokeemerald-expansion for showdown dex')
    argp.add_argument('-e', '--expansion', action='store',
                      help='path to the root of your pokeemerald-expansion repository',
                      type=pathlib.Path,
                      required=True)
    argp.add_argument('-o', '--out-dir', action='store',
                      help='path to directory where output files will be dumped',
                      type=pathlib.Path,
                      default=pathlib.Path('tst'))

    args = argp.parse_args()
    if not args.out_dir.exists():
        args.out_dir.mkdir(parents=True, exist_ok=True)

    expansion = args.expansion
    expansion_data = expansion / 'src' / 'data'
    moves = parse_moves(expansion_data / 'moves_info.h', expansion)

    with open(args.out_dir / 'moves.json', 'w', encoding='utf-8') as outf:
        json.dump(moves, outf, indent=4)

if __name__ == '__main__':
    main()

