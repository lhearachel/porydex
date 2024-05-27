import operator
import pathlib

PICKLE_PATH = pathlib.Path('./.pickled')

PREPROCESS_LIBC = [
    r'-E',
    r'-Ifake_libc_include',
    r'-D__attribute__(x)=', # these are irrelevant to preprocessing, and it doesn't know how to parse them anyways
]

EXPANSION_INCLUDES = [
    r'include',
    r'gflib',
]

GLOBAL_PREPROC_INTELLISENSE = [
    r'-D__INTELLISENSE__',
    r'-include', r'global.h',
]

GLOBAL_PREPROC = [
    r'-D__INTELLISENSE__',
    r'-include', r'global.h',
    r'-U__INTELLISENSE__',
]

CONFIG_INCLUDES = [
    r'-include', r'config/battle.h',
    r'-include', r'config/item.h',
    r'-include', r'config/pokemon.h',
    r'-include', r'config/species_enabled.h',
]

COMMON_CPP_ARGS = [
    r'-DTRUE=1',
    r'-DFALSE=0',
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
    '+': operator.add,
    '-': operator.sub,
    '*': operator.mul,
    '/': operator.itruediv,
}

