from pycparser import parse_file
from pycparser.c_ast import ExprList

from porydex.common import PREPROCESS_LIBC, COMMON_CPP_ARGS
from porydex.cpp_args import MOVES_CPP_ARGS

def load_test_moves() -> ExprList:
    return parse_file('tst/moves_info.h',
                        use_cpp=True,
                        cpp_path='gcc',
                        cpp_args=[*PREPROCESS_LIBC, *MOVES_CPP_ARGS, *COMMON_CPP_ARGS]).ext[-1].init.exprs

