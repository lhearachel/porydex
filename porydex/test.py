import pathlib

from pycparser import parse_file
from pycparser.c_ast import ExprList

from porydex.parse import load_data

def load_moves() -> ExprList:
    expansion = pathlib.Path('../pokeemerald-expansion')
    moves_info = expansion / 'src' / 'data' / 'moves_info.h'
    return load_data(moves_info, expansion, extra_includes=[
        r'-include', r'constants/battle.h',
        r'-include', r'constants/moves.h',
    ])

