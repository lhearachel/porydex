import re
import typing

from pycparser.c_ast import (
    BinaryOp,
    ExprList,
    FuncCall,
    ID,
    TernaryOp,
    UnaryOp,
)

from porydex.common import BINARY_BOOL_OPS

def process_binary(expr: BinaryOp) -> bool:
    op = BINARY_BOOL_OPS[expr.op]
    return op(expr.left.value, expr.right.value)

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

