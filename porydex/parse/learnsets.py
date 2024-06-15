import collections
import pathlib
import re

import porydex.config

from pycparser.c_ast import Decl, ExprList
from yaspin import yaspin

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
                             move_names: list[str],
                             tm_moves: list[str]) -> dict[str, list[str]]:
    learnset = {
        'm': [],
        't': [],
    }
    entry_inits = decl.init.exprs
    for entry in entry_inits:
        move = extract_int(entry)
        if move == 0xFFFF:
            break

        move_name = move_names[move]
        if move_name in tm_moves:
            learnset['m'].append(name_key(move_name))
        else:
            learnset['t'].append(name_key(move_name))

    return learnset

def parse_level_up_learnsets_data(decls: list[Decl],
                                  move_names: list[str]) -> dict[str, dict[str, list[int]]]:
    return {
        decl.name: parse_level_up_learnset(decl, move_names)
        for decl in decls
    }

def parse_teachable_learnsets_data(decls: list[Decl],
                                   move_names: list[str],
                                   tm_moves: list[str]) -> dict[str, dict[str, list[str]]]:
    return {
        decl.name: parse_teachable_learnset(decl, move_names, tm_moves)
        for decl in decls
    }

def parse_level_up_learnsets(fname: pathlib.Path,
                             move_names: list[str]) -> dict[str, dict[str, list[int]]]:
    pattern = re.compile(r's(\w+)LevelUpLearnset')
    data: ExprList
    start: int

    with yaspin(text=f'Loading level-up learnsets: {fname}', color='cyan') as spinner:
        data, start = load_data_and_start(
            fname,
            pattern,
            extra_includes=[
                rf'-I{porydex.config.expansion}/src',
                r'-include', r'constants/moves.h',
            ]
        )
        spinner.ok("✅")

    return parse_level_up_learnsets_data(data[start:], move_names)

def parse_teachable_learnsets(fname: pathlib.Path,
                              move_names: list[str]) -> dict[str, dict[str, list[str]]]:
    pattern = re.compile(r's(\w+)TeachableLearnset')
    data: ExprList
    start: int

    with yaspin(text=f'Loading teachable learnsets: {fname}', color='cyan') as spinner:
        data, start = load_data_and_start(
            fname,
            pattern,
            extra_includes=[
                rf'-I{porydex.config.expansion}/src',
                r'-include', r'constants/moves.h',
            ]
        )
        spinner.ok("✅")

    # Don't preprocess these files
    tm_moves = []
    tm_hm_list_file = porydex.config.expansion / 'include' / 'constants' / 'tms_hms.h'
    with yaspin(text=f'Loading TM/HM list: {tm_hm_list_file}', color='cyan') as spinner, open(tm_hm_list_file, 'r') as tm_hm_file:
        tm_moves = list({
            move.replace('_', ' ').title() for move in re.findall(r'F\((.*)\)', tm_hm_file.read())
        })
        spinner.ok("✅")

    return parse_teachable_learnsets_data(data[start:], move_names, tm_moves)

