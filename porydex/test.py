import dataclasses
import pathlib
import re

from pycparser.c_ast import Decl, ExprList

import porydex.config

from porydex.parse import load_data, load_data_and_start, load_truncated, load_table_set
from porydex.parse.abilities import all_ability_names
from porydex.parse.form_tables import all_table_decls
from porydex.parse.items import all_item_names
from porydex.parse.maps import all_maps

@dataclasses.dataclass
class AllData:
    species: ExprList
    moves: ExprList
    abilities: list[str]
    items: list[str]
    forms: dict[str, dict[int, str]]
    maps: list[str]
    lvlup_learnsets: tuple[ExprList, int]
    teach_learnsets: tuple[ExprList, int]

def load_moves() -> ExprList:
    moves_info = porydex.config.expansion / 'src' / 'data' / 'moves_info.h'
    return load_truncated(moves_info, extra_includes=[
        r'-include', r'constants/battle.h',
        r'-include', r'constants/moves.h',
    ])

def load_species() -> ExprList:
    species_info = porydex.config.expansion / 'src' / 'data' / 'pokemon' / 'species_info.h'
    return load_truncated(species_info, extra_includes=[
        r'-include', r'constants/moves.h',
    ])

def load_form_tables() -> tuple[list[Decl], list[Decl]]:
    form_species_tables = porydex.config.expansion / 'src' / 'data' / 'pokemon' / 'form_species_tables.h'
    return (
        load_table_set(form_species_tables, minimal_preprocess=True),
        load_table_set(form_species_tables, minimal_preprocess=False),
    )

def load_abilities() -> ExprList:
    abilities = porydex.config.expansion / 'src' / 'data' / 'abilities.h'
    return load_truncated(abilities, extra_includes=[
        r'-include', r'constants/abilities.h',
    ])

def load_items() -> ExprList:
    items = porydex.config.expansion / 'src' / 'data' / 'items.h'
    return load_truncated(items, extra_includes=[
        r'-include', r'constants/items.h',
    ])

def load_maps() -> ExprList:
    map_entries = porydex.config.expansion / 'src' / 'data' / 'region_map' / 'region_map_entries.h'
    return load_data(map_entries) # we want the names here too

def load_level_up_learnsets() -> tuple[ExprList, int]:
    # in order to properly determine what learnset to use, we have to utilize this custom header file
    # to correcty assess the P_LVL_UP_LEARNSETS define
    level_up_learnsets = pathlib.Path('custom_headers') / 'level_up_learnsets.h'
    pattern = re.compile(r's(\w+)LevelUpLearnset')
    return load_data_and_start(
        level_up_learnsets,
        pattern,
        extra_includes=[
            rf'-I{porydex.config.expansion}/src',
            r'-include', r'constants/moves.h',
        ]
    )

def load_teachable_learnsets() -> tuple[ExprList, int]:
    teachable_learnsets = porydex.config.expansion / 'src' / 'data' / 'pokemon' / 'teachable_learnsets.h'
    pattern = re.compile(r's(\w+)TeachableLearnset')
    return load_data_and_start(
        teachable_learnsets,
        pattern,
        extra_includes=[
            rf'-I{porydex.config.expansion}/src',
            r'-include', r'constants/moves.h',
        ]
    )

def load_encounters():
    wild_encounters = porydex.config.expansion / 'src' / 'data' / 'wild_encounters.h'
    return load_data(wild_encounters)

def load_all() -> AllData:
    return AllData(
        load_species(),
        load_moves(),
        all_ability_names(load_abilities()),
        all_item_names(load_items()),
        all_table_decls(*load_form_tables()),
        all_maps(load_maps()),
        load_level_up_learnsets(),
        load_teachable_learnsets(),
    )

