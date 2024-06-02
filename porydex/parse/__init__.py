import pathlib
import pickle
import re
import typing

import porydex.config

from pycparser import parse_file
from pycparser.c_ast import (
    BinaryOp,
    Cast,
    CompoundLiteral,
    Decl,
    ExprList,
    FuncCall,
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
              extra_includes: typing.List[str]=[]) -> ExprList:
    exts = _load_pickled(fname)
    if not exts:
        include_dirs = [f'-I{porydex.config.expansion / dir}' for dir in EXPANSION_INCLUDES]
        exts = parse_file(
            fname,
            use_cpp=True,
            cpp_path=porydex.config.compiler,
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

def load_truncated(fname: pathlib.Path,
                   extra_includes: typing.List[str]=[]) -> ExprList:
    return load_data(fname, extra_includes)[-1].init.exprs

def load_table_set(fname: pathlib.Path,
                   extra_includes: typing.List[str]=[],
                   minimal_preprocess: bool=False) -> typing.List[Decl]:
    include_dirs = [f'-I{porydex.config.expansion / dir}' for dir in EXPANSION_INCLUDES]

    if minimal_preprocess:
        # do NOT dump this version
        exts = parse_file(
            fname,
            use_cpp=True,
            cpp_path=porydex.config.compiler,
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
            cpp_path=porydex.config.compiler,
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

def load_data_and_start(fname: pathlib.Path,
                        pattern: typing.Pattern[str],
                        extra_includes: typing.List[str]=[]) -> typing.Tuple[ExprList, int]:
    all_data = load_data(fname, extra_includes)

    start = 0
    if pattern:
        end = len(all_data)
        for i in range(-1, -end, -1):
            if not all_data[i].name or not pattern.match(all_data[i].name):
                start = i + 1
                break

    return (all_data, start)

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

def extract_compound_str(expr) -> str:
    # Depending on the compiler used for preprocessing, this could be expanded
    # to a number of types.

    # arm-none-eabi-gcc expands the macro to Cast(FuncCall(ExprList([Constant])))
    if isinstance(expr, Cast):
        return expr.expr.args.exprs[0].value.replace('\\n', ' ')[1:-1]

    # clang expands the macro to CompoundLiteral(InitList([Constant]))
    if isinstance(expr, CompoundLiteral):
        return expr.init.exprs[0].value.replace('\\n', ' ')[1:-1]

    if isinstance(expr.exprs[0], FuncCall):
        return extract_compound_str(expr.exprs[0].args)
    return expr.exprs[-1].value.replace('\\n', ' ')[1:-1]

def extract_u8_str(expr) -> str:
    # Depending on the compiler used for preprocessing, this could be expanded
    # to a number of types.

    # arm-none-eabi-gcc and gcc expand the macro to FuncCall(ExprList([Constant]))
    if isinstance(expr, FuncCall):
        return expr.args.exprs[-1].value.replace('\\n', ' ')[1:-1]

    # clang expands the macro to InitList([Constant])
    return expr.exprs[0].value.replace('\\n', ' ')[1:-1]

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

