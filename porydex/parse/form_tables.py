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
            # holy overrides batman
            result[val] = snake_to_kebab(form_name_match.group(2)) \
                .replace('Alolan', 'Alola') \
                .replace('Galarian', 'Galar') \
                .replace('Hisuian', 'Hisui') \
                .replace('Paldean', 'Paldea') \
                .replace('Gigantamax', 'Gmax') \
                .replace('-Cloak', '') \
                .replace('Family-Of-Three', 'Three') \
                .replace('Family-Of-Four', 'Four') \
                .replace('-Partner', '-Starter') \
                .replace('-Starter-Cap', '-Partner') \
                .replace('-Cap', '') \
                .replace('Emark', 'Exclamation') \
                .replace('Qmark', 'Question') \
                .replace('East-Sea', 'East') \
                .replace('West-Sea', 'West') \
                .replace('Male', 'M') \
                .replace('Female', 'F') \
                .replace('Standard-Mode', 'Standard') \
                .replace('Galar-Standard', 'Galar') \
                .replace('Zen-Mode', 'Zen') \
                .replace('-Drive', '') \
                .replace('Battle-Bond', 'Bond') \
                .replace('-Flower', '') \
                .replace('Totem-Disguised', 'Totem') \
                .replace('Totem-Busted', 'Busted-Totem') \
                .replace('Original-Color', 'Original') \
                .replace('Amped-Gmax', 'Gmax') \
                .replace('Noice-Face', 'Noice') \
                .replace('Hero-Of-Many-Battles', 'Hero') \
                .replace('Crowned-Sword', 'Crowned') \
                .replace('Crowned-Shield', 'Crowned') \
                .replace('Ice-Rider', 'Ice') \
                .replace('Shadow-Rider', 'Shadow') \
                .replace('Green-Plumage', 'Green') \
                .replace('Blue-Plumage', 'Blue') \
                .replace('Yellow-Plumage', 'Yellow') \
                .replace('White-Plumage', 'White') \
                .replace('Cornerstone-Mask', 'Cornerstone') \
                .replace('Wellspring-Mask', 'Wellspring') \
                .replace('Hearthflame-Mask', 'Hearthflame') \
                .replace('Teal-Mask', 'Teal') \
                .replace('-Trim', '') \
                .replace('50-Aura-Break', '50%') \
                .replace('50-Power-Construct', '50%-Power-Construct') \
                .replace('10-Aura-Break', '10%') \
                .replace('10-Power-Construct', '10%-Power-Construct') \
                .replace('Core-Red', 'Red') \
                .replace('Core-Orange', 'Orange') \
                .replace('Core-Yellow', 'Yellow') \
                .replace('Core-Green', 'Green') \
                .replace('Core-Blue', 'Blue') \
                .replace('Core-Indigo', 'Indigo') \
                .replace('Core-Violet', 'Violet')

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

