import pathlib

from pycparser.c_ast import ID, ExprList, NamedInitializer
from yaspin import yaspin

from porydex.parse import load_truncated, extract_int, extract_u8_str

def get_item_name(struct_init: NamedInitializer) -> str:
    for field_init in struct_init.expr.exprs:
        if field_init.name[0].name == 'name':
            return extract_u8_str(field_init.expr)

    print(struct_init.show())
    raise ValueError('no name for item structure')

def all_item_names(items_data) -> list[str]:
    d_items = {}
    for item in items_data:
        if isinstance(item.name[0], ID):
            continue
        d_items[extract_int(item.name[0])] = get_item_name(item)

    capacity = max(d_items.keys()) + 1
    l_items = [d_items[0]] * capacity
    for i, name in d_items.items():
        l_items[i] = name

    return l_items

def parse_items(fname: pathlib.Path) -> list[str]:
    items_data: ExprList
    with yaspin(text=f'Loading items data: {fname}', color='cyan') as spinner:
        items_data = load_truncated(fname, extra_includes=[
            r'-include', r'constants/items.h',
        ])
        spinner.ok("✅")

    return all_item_names(items_data)

