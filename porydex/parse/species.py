# Necessary headers:
#   - species_info_struct.h (extract from pokemon.h)
#       - u8, u16, u32 (just define these globally tbh)
#       - NUM_ABILITY_SLOTS (constants/pokemon.h -> feed into scanned config)
#       - POKEMON_NAME_LENGTH (constants/global.h -> feed into scanned config)
#       - AnimCmd (sprite.h -> needs its own parser)
#       - LevelUpMove (same file)
#       - Evolution (same file)
#       - FormChange (same file)
#       - the struct itself
#   - footprint / overworld macro defs (just define them?)
#   - constants/species.h
#   - constants/pokedex.h (enum-extracted)
"""
Extraction routines for src/data/pokemon/species_info headers
"""

import pathlib

from pycparser import parse_file

from porydex.parse.utils import CacheFunc, extract_structs


def extract_species_info_struct(project_path: pathlib.Path,
                                cache_dir: pathlib.Path,
                                force: bool=False):
    """
    Extract the struct SpeciesInfo definition from include/pokemon.h
    """
    source_file = project_path / 'include' / 'pokemon.h'
    cache_file = cache_dir / 'species_info.h'
    structs = ('SpeciesInfo', 'LevelUpMove', 'Evolution', 'FormChange')
    extract_structs(source_file, cache_file, structs, force=force)


def extract_animcmd_union(project_path: pathlib.Path,
                          cache_dir: pathlib.Path,
                          force: bool=False):
    """
    Extract the union AnimCmd definition from gflib/sprite.h
    """
    source_file = project_path / 'gflib' / 'sprite.h'
    cache_file = cache_dir / 'animcmd.h'
    structs = ('AnimCmd', 'AnimFrameCmd', 'AnimLoopCmd', 'AnimJumpCmd')
    extract_structs(source_file, cache_file, structs, force=force)


CACHED_DEPENDENCIES: dict[pathlib.Path, CacheFunc] = {
    'species_info.h': extract_species_info_struct,
    'animcmd.h': extract_animcmd_union,
}


def parse_ast(project_path: pathlib.Path,
              gen: int,
              cache_dir: pathlib.Path,
              project_config: dict,
              cpp: str='gcc',
              force: bool=False):
    """
    Parse the AST for a given gen's species_info header
    """
    for dep, func in CACHED_DEPENDENCIES.items():
        if not (cache_dir / dep).exists():
            func(project_path, cache_dir, force)

    species_info_cache = cache_dir / 'species_info.h'
    animcmd_cache = cache_dir / 'animcmd.h'

    source_file = project_path / 'src' / 'data' / 'pokemon' / 'species_info' / f'gen_{gen}_families.h'
    cpp_args = [
        '-E',
        '-D__INTELLISENSE__',
        '-Du8=int',
        '-Du16=int',
        '-Du32=int',
        '-Ds16=int',
        f'-DPOKEMON_NAME_LENGTH={project_config["POKEMON_NAME_LENGTH"]}',
        '-DFOOTPRINT(x)=',
        '-DOVERWORLD(...)=',
        '-DMON_TYPES(...)={__VA_ARGS__}',
        '-D_(x)={x}',
        '-DTRUE=1',
        '-DFALSE=0',
        '-include',
        project_path / 'include' / 'config' / 'species_enabled.h',
        '-include',
        project_path / 'include' / 'constants' / 'pokemon.h',
        '-include',
        species_info_cache,
        '-include',
        animcmd_cache,
    ]
    return parse_file(source_file,
                      use_cpp=True,
                      cpp_path=cpp,
                      cpp_args=cpp_args)
