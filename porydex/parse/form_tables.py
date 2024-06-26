import functools
import pathlib
import re

from pycparser.c_ast import ArrayDecl, Decl
from yaspin import yaspin

from porydex.parse import load_table_set, extract_id, extract_int

_SYMBOL_NAME_PATTERN = re.compile(r's(.+)FormSpeciesIdTable')

def upper_snake(s: str) -> str:
    return '_'.join(
        re.sub('([A-Z][a-z]+)', r' \1',
            re.sub('([A-Z]+)', r' \1',
                s.replace('-', ' ')
            )
        ).split()
    ).upper()

def snake_to_kebab(s: str) -> str:
    return '-'.join(map(str.capitalize, s.split('_')))

def parse_table_decl(minimal: Decl, full: Decl) -> tuple[str, dict[int, str]]:
    name = full.name
    true_name = re.match(_SYMBOL_NAME_PATTERN, name)
    if not true_name:
        raise ValueError('form species table symbol does not match expected name pattern: ', name)

    true_name = true_name.group(1)
    form_name_pattern = re.compile(r'SPECIES_{}(_(.+))'.format(upper_snake(true_name)))

    result = {}
    for minimal_expr, full_expr in zip(minimal.init.exprs, full.init.exprs):
        id = extract_id(minimal_expr)
        val = extract_int(full_expr)

        # terminator sentinel
        if val == 0xFFFF:
            break

        # species form names follow a standard pattern: SPECIES_{NAME}_{FORM_NAME}
        form_name_match = form_name_pattern.match(id)
        if not form_name_match:
            result[val] = 'Base'
        else:
            result[val] = snake_to_kebab(form_name_match.group(2)) \
                .replace('Alolan', 'Alola') \
                .replace('Galarian', 'Galar') \
                .replace('Hisuian', 'Hisui') \
                .replace('Paldean', 'Paldea') \
                .replace('Gigantamax', 'Gmax')

    return name, result

def all_table_decls(minimal: list[Decl], full: list[Decl]) -> dict[str, dict[int, str]]:
    # find the starting index in the full list
    start = 0
    end = -1 * len(full)
    for i in range(-1, end, -1):
        if not isinstance(full[i].type, ArrayDecl):
            start = i + 1
            break

    return functools.reduce(
        lambda d, t: d.update({ t[0]: t[1] }) or d,
        [
            parse_table_decl(min_entry, full_entry)
            for min_entry, full_entry in zip(minimal, full[start:])
        ],
        {}
    )

def parse_form_tables(fname: pathlib.Path):
    minimal: list[Decl]
    full: list[Decl]
    with yaspin(text=f'Loading form tables: {fname}', color='cyan') as spinner:
        minimal = load_table_set(fname, minimal_preprocess=True)
        full = load_table_set(fname, minimal_preprocess=False)
        spinner.ok("✅")

    return all_table_decls(minimal, full)

