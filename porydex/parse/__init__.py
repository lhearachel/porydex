import pathlib
import re
import typing

from pycparser import parse_file
from pycparser.c_ast import (
    BinaryOp,
    ExprList,
    FuncCall,
    ID,
    TernaryOp,
    UnaryOp,
)

from porydex.common import (
    BINARY_BOOL_OPS,
    CONFIG_INCLUDES,
    EXPANSION_INCLUDES,
    GLOBAL_PREPROC,
    PREPROCESS_LIBC,
)

def load_data(fname: pathlib.Path,
              expansion: pathlib.Path,
              extra_includes: typing.List[str]=[]) -> ExprList:
    include_dirs = [f'-I{expansion / dir}' for dir in EXPANSION_INCLUDES]
    return parse_file(
        fname,
        use_cpp=True,
        cpp_path='gcc', # TODO: support clang?
        cpp_args=[
            *PREPROCESS_LIBC,
            *include_dirs,
            *GLOBAL_PREPROC,
            *CONFIG_INCLUDES,
            *extra_includes
        ]
    ).ext[-1].init.exprs

def process_binary(expr: BinaryOp) -> bool:
    if isinstance(expr.left, BinaryOp):
        left = int(process_binary(expr.left))
    else:
        left = int(expr.left.value)

    if isinstance(expr.right, BinaryOp):
        right = int(process_binary(expr.right))
    else:
        right = int(expr.right.value)

    op = BINARY_BOOL_OPS[expr.op]
    return op(left, right)

def process_ternary(expr: TernaryOp) -> typing.Any:
    if isinstance(expr.cond.left, ID):
        raise ValueError('cannot process left-side ID value in ternary')
    if isinstance(expr.cond.right, ID):
        raise ValueError('cannot process right-side ID value in ternary')

    op = BINARY_BOOL_OPS[expr.cond.op]
    if op(expr.cond.left.value, expr.cond.right.value):
        return expr.iftrue
    else:
        return expr.iffalse

def extract_compound_str(args: ExprList) -> str:
    if isinstance(args.exprs[0], FuncCall):
        return extract_compound_str(args.exprs[0].args)
    return args.exprs[-1].value.replace('\\n', ' ')[1:-1]

def extract_u8_str(expr) -> str:
    return expr.args.exprs[-1].value.replace('\\n', ' ')[1:-1]

def extract_int(expr) -> int:
    if isinstance(expr, TernaryOp):
        return int(process_ternary(expr).value)

    if isinstance(expr, UnaryOp):
        # we only care about the negative symbol
        if expr.op != '-':
            raise ValueError(f'unrecognized unary operator: {expr.op}')
        return -1 * int(expr.expr.value)

    if isinstance(expr, BinaryOp):
        return int(process_binary(expr))

    return int(expr.value)

def extract_id(expr) -> str:
    if isinstance(expr, TernaryOp):
        return process_ternary(expr).name

    if isinstance(expr, BinaryOp):
        return str(expr.op).join([expr.left.name, expr.right.name])

    return expr.name

def extract_prefixed(prefix: str | typing.Pattern[str], val: str, mod_if_match: typing.Callable[[str], str]=lambda x: x) -> str:
    match = re.match(prefix, val)
    if match:
        return mod_if_match(match.group(1))

    return val

