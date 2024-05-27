import pathlib
import pickle
import re
import typing

from pycparser import parse_file
from pycparser.c_ast import (
    BinaryOp,
    ExprList,
    FuncCall,
    Decl,
    ID,
    TernaryOp,
    UnaryOp,
)

from porydex.common import (
    PICKLE_PATH,
    BINARY_BOOL_OPS,
    CONFIG_INCLUDES,
    EXPANSION_INCLUDES,
    GLOBAL_PREPROC,
    PREPROCESS_LIBC,
)

def _pickle_target(fname: pathlib.Path) -> pathlib.Path:
    return PICKLE_PATH / fname.stem

def _load_pickled(fname: pathlib.Path) -> typing.Optional[ExprList]:
    target = _pickle_target(fname)
    exts = None
    if target.exists():
        with open(target, 'rb') as f:
            exts = pickle.load(f)
    return exts

def _dump_pickled(fname: pathlib.Path, exts: list):
    PICKLE_PATH.mkdir(parents=True, exist_ok=True)
    target = _pickle_target(fname)
    with open(target, 'wb') as f:
        pickle.dump(exts, f, protocol=pickle.HIGHEST_PROTOCOL)

def load_data(fname: pathlib.Path,
              expansion: pathlib.Path,
              extra_includes: typing.List[str]=[]) -> ExprList:
    exts = _load_pickled(fname)
    if not exts:
        include_dirs = [f'-I{expansion / dir}' for dir in EXPANSION_INCLUDES]
        exts = parse_file(
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
        ).ext
        _dump_pickled(fname, exts)

    return exts[-1].init.exprs

def load_table_set(fname: pathlib.Path,
                   expansion: pathlib.Path,
                   extra_includes: typing.List[str]=[],
                   minimal_preprocess: bool=False) -> typing.List[Decl]:
    include_dirs = [f'-I{expansion / dir}' for dir in EXPANSION_INCLUDES]

    if minimal_preprocess:
        # do NOT dump this version
        exts = parse_file(
            fname,
            use_cpp=True,
            cpp_path='gcc', # TODO: support clang?
            cpp_args=[
                *PREPROCESS_LIBC,
                *include_dirs,
                r'-DTRUE=1',
                r'-DFALSE=0',
                r'-Du16=short',
                r'-include', r'config/species_enabled.h',
                *extra_includes
            ]
        ).ext
    else:
        exts = _load_pickled(fname)

    if not exts:
        exts = parse_file(
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
        ).ext
        _dump_pickled(fname, exts)

    return exts

def eval_binary_operand(expr) -> int:
    if isinstance(expr, BinaryOp):
        return int(process_binary(expr))
    elif isinstance(expr, TernaryOp):
        return int(process_ternary(expr).value)
    return int(expr.value)

def process_binary(expr: BinaryOp) -> int | bool:
    left = eval_binary_operand(expr.left)
    right = eval_binary_operand(expr.right)
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

    try:
        return int(expr.value)
    except ValueError:
        # try hexadecimal; if that doesn't work, just fail
        return int(expr.value, 16)

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

