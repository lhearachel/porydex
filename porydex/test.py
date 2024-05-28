import dataclasses
import pathlib
import typing

from pycparser.c_ast import Decl, ExprList

import porydex.config

from porydex.parse import load_data, load_truncated, load_table_set
from porydex.parse.abilities import all_ability_names
from porydex.parse.form_tables import all_table_decls
from porydex.parse.items import all_item_names
from porydex.parse.maps import all_maps

@dataclasses.dataclass
class AllData:
    species: ExprList
    moves: ExprList
    abilities: typing.List[str]
    items: typing.List[str]
    forms: typing.Dict[str, typing.Dict[int, str]]
    maps: typing.List[str]

def load_moves() -> ExprList:
    expansion = pathlib.Path('../pokeemerald-expansion')
    moves_info = expansion / 'src' / 'data' / 'moves_info.h'
    return load_truncated(moves_info, extra_includes=[
        r'-include', r'constants/battle.h',
        r'-include', r'constants/moves.h',
    ])

def load_species() -> ExprList:
    expansion = pathlib.Path('../pokeemerald-expansion')
    species_info = expansion / 'src' / 'data' / 'pokemon' / 'species_info.h'
    return load_truncated(species_info, extra_includes=[
        r'-include', r'constants/moves.h',
    ])

def load_form_tables() -> typing.Tuple[typing.List[Decl], typing.List[Decl]]:
    expansion = pathlib.Path('../pokeemerald-expansion')
    form_species_tables = expansion / 'src' / 'data' / 'pokemon' / 'form_species_tables.h'
    return (
        load_table_set(form_species_tables, minimal_preprocess=True),
        load_table_set(form_species_tables, minimal_preprocess=False),
    )

def load_abilities() -> ExprList:
    expansion = pathlib.Path('../pokeemerald-expansion')
    abilities = expansion / 'src' / 'data' / 'abilities.h'
    return load_truncated(abilities, extra_includes=[
        r'-include', r'constants/abilities.h',
    ])

def load_items() -> ExprList:
    expansion = pathlib.Path('../pokeemerald-expansion')
    items = expansion / 'src' / 'data' / 'items.h'
    return load_truncated(items, extra_includes=[
        r'-include', r'constants/items.h',
    ])

def load_maps() -> ExprList:
    expansion = porydex.config.expansion
    map_entries = expansion / 'src' / 'data' / 'region_map' / 'region_map_entries.h'
    return load_data(map_entries) # we want the names here too

def load_all() -> AllData:
    return AllData(
        load_species(),
        load_moves(),
        all_ability_names(load_abilities()),
        all_item_names(load_items()),
        all_table_decls(*load_form_tables()),
        all_maps(load_maps()),
    )

