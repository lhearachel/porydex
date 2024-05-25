import operator

PREPROCESS_LIBC = [
    '-E',
    '-Ifake_libc_include',
]

COMMON_CPP_ARGS = [
    r'-DTRUE=1',
    r'-DFALSE=0',
    r'-D__INTELLISENSE__',
    r'-Du8=char',
    r'-DGEN_1=1',
    r'-DGEN_2=2',
    r'-DGEN_3=3',
    r'-DGEN_4=4',
    r'-DGEN_5=5',
    r'-DGEN_6=6',
    r'-DGEN_7=7',
    r'-DGEN_8=8',
    r'-DGEN_9=9',
]

BINARY_BOOL_OPS = {
    '==': operator.eq,
    '>': operator.gt,
    '>=': operator.ge,
    '<=': operator.le,
    '<': operator.lt,
    '!=': operator.ne,
}

