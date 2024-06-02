import collections
import pathlib
import re

import porydex.config

from pycparser.c_ast import Decl

from porydex.common import name_key
from porydex.parse import extract_int, load_data_and_start

def parse_level_up_learnset(decl: Decl,
                            move_names: list[str]) -> dict[str, list[int]]:
    learnset = collections.defaultdict(list)
    entry_inits = decl.init.exprs
    for entry in entry_inits:
        move = extract_int(entry.exprs[0].expr)
        if move == 0xFFFF:
            break

        level = extract_int(entry.exprs[1].expr)
        learnset[name_key(move_names[move])].append(level)

    return learnset

def parse_teachable_learnset(decl: Decl,
                             move_names: list[str]) -> list[str]:
    learnset = []
    entry_inits = decl.init.exprs
    for entry in entry_inits:
        move = extract_int(entry)
        if move == 0xFFFF:
            break

        learnset.append(name_key(move_names[move]))

    return learnset

def parse_level_up_learnsets_data(decls: list[Decl],
                                  move_names: list[str]) -> dict[str, dict[str, list[int]]]:
    return {
        decl.name: parse_level_up_learnset(decl, move_names)
        for decl in decls
    }

def parse_teachable_learnsets_data(decls: list[Decl],
                                   move_names: list[str]) -> dict[str, list[str]]:
    return {
        decl.name: parse_teachable_learnset(decl, move_names)
        for decl in decls
    }

def parse_level_up_learnsets(fname: pathlib.Path,
                             move_names: list[str]) -> dict[str, dict[str, list[int]]]:
    pattern = re.compile(r's(\w+)LevelUpLearnset')
    data, start = load_data_and_start(
        fname,
        pattern,
        extra_includes=[
            rf'-I{porydex.config.expansion}/src',
            r'-include', r'constants/moves.h',
        ]
    )

    return parse_level_up_learnsets_data(data[start:], move_names)

def parse_teachable_learnsets(fname: pathlib.Path,
                              move_names: list[str]) -> dict[str, dict[str, list[str]]]:
    pattern = re.compile(r's(\w+)TeachableLearnset')
    data, start = load_data_and_start(
        fname,
        pattern,
        extra_includes=[
            rf'-I{porydex.config.expansion}/src',
            r'-include', r'constants/moves.h',
        ]
    )

    return parse_teachable_learnsets_data(data[start:], move_names)

