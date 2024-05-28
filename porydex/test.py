import pathlib
import typing

from pycparser.c_ast import Decl, ExprList

from porydex.parse import load_data, load_table_set
from porydex.parse.abilities import all_ability_names
from porydex.parse.items import all_item_names
from porydex.parse.form_tables import all_table_decls

def load_moves() -> ExprList:
    expansion = pathlib.Path('../pokeemerald-expansion')
    moves_info = expansion / 'src' / 'data' / 'moves_info.h'
    return load_data(moves_info, expansion, extra_includes=[
        r'-include', r'constants/battle.h',
        r'-include', r'constants/moves.h',
    ])

def load_species() -> ExprList:
    expansion = pathlib.Path('../pokeemerald-expansion')
    species_info = expansion / 'src' / 'data' / 'pokemon' / 'species_info.h'
    return load_data(species_info, expansion)

def load_form_tables() -> typing.Tuple[typing.List[Decl], typing.List[Decl]]:
    expansion = pathlib.Path('../pokeemerald-expansion')
    form_species_tables = expansion / 'src' / 'data' / 'pokemon' / 'form_species_tables.h'
    return (
        load_table_set(form_species_tables, expansion, minimal_preprocess=True),
        load_table_set(form_species_tables, expansion, minimal_preprocess=False),
    )

def load_abilities() -> ExprList:
    expansion = pathlib.Path('../pokeemerald-expansion')
    abilities = expansion / 'src' / 'data' / 'abilities.h'
    return load_data(abilities, expansion, extra_includes=[
        r'-include', r'constants/abilities.h',
    ])

def load_items() -> ExprList:
    expansion = pathlib.Path('../pokeemerald-expansion')
    items = expansion / 'src' / 'data' / 'items.h'
    return load_data(items, expansion, extra_includes=[
        r'-include', r'constants/items.h',
    ])

def load_all_species_data() -> typing.Tuple[ExprList, typing.List[str], typing.List[str], typing.Dict[str, typing.Dict[int, str]]]:
    return (
        load_species(),
        all_ability_names(load_abilities()),
        all_item_names(load_items()),
        all_table_decls(*load_form_tables()),
    )

