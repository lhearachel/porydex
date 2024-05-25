import argparse
import json
import pathlib

from porydex.parse.moves import parse_moves

def main():
    argp = argparse.ArgumentParser(prog='porydex',
                                description='generate data exports from pokeemerald-expansion for showdown dex')
    argp.add_argument('-m', '--moves', action='store',
                      help='path to file containing moves info',
                      type=pathlib.Path,
                      required=True)
    argp.add_argument('-o', '--out-dir', action='store',
                      help='path to directory where output files will be dumped',
                      type=pathlib.Path,
                      default=pathlib.Path('tst'))

    args = argp.parse_args()
    moves = parse_moves(args.moves)

    with open(args.out_dir / 'moves.json', 'w', encoding='utf-8') as outf:
        json.dump(moves, outf, indent=4)

if __name__ == '__main__':
    main()

