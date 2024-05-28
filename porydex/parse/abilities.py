import pathlib
import typing

from pycparser.c_ast import NamedInitializer

from porydex.parse import load_truncated, extract_int, extract_u8_str

def get_ability_name(struct_init: NamedInitializer) -> str:
    for field_init in struct_init.expr.exprs:
        if field_init.name[0].name == 'name':
            return extract_u8_str(field_init.expr)

    print(struct_init.show())
    raise ValueError('no name for ability structure')

def all_ability_names(abilities_data) -> typing.List[str]:
    d_abilities = {
        extract_int(init.name[0]): get_ability_name(init)
        for init in abilities_data
    }

    capacity = max(d_abilities.keys()) + 1
    l_abilities = [d_abilities[0]] * capacity
    for i, name in d_abilities.items():
        l_abilities[i] = name

    return l_abilities

def parse_abilities(fname: pathlib.Path) -> typing.List[str]:
    abilities_data = load_truncated(fname, extra_includes=[
        r'-include', r'constants/abilities.h',
    ])

    return all_ability_names(abilities_data)

