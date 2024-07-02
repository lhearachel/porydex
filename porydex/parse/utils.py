"""
Utility functions for parsing and extracting C code
"""

import pathlib
import typing


CacheFunc = typing.Callable[[pathlib.Path, pathlib.Path, bool], None]

def extract_structs(defn_file: pathlib.Path,
                    cache_file: pathlib.Path,
                    structs: tuple[str],
                    force: bool=False):
    """
    Extract the specified struct definitions from a given file
    """
    if not force and cache_file.exists():
        return

    out_lines = []
    with open(defn_file, 'r', encoding='utf-8') as infile:
        struct_scope = False
        for line in infile:
            for struct in structs:
                if line.strip().startswith(f'struct {struct}') or line.strip().startswith(f'union {struct}'):
                    struct_scope = True

            if struct_scope:
                out_lines.append(line)
                if line.strip().startswith('};'):
                    struct_scope = False

    with open(cache_file, 'w', encoding='utf-8') as outfile:
        outfile.writelines(out_lines)
