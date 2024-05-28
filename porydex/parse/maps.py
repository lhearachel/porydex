import pathlib
import typing

from pycparser.c_ast import Decl, ExprList

from porydex.parse import load_data, extract_id, extract_int, extract_u8_str

def all_maps(existing: ExprList) -> typing.List[str]:
    # Start by walking backward from -2 until we run out of map name symbols,
    # adding them to a tracking dictionary as we go
    map_name_defs = {}
    for entry in existing[-2::-1]:
        if not isinstance(entry, Decl): # assume we are done
            break

        # TODO: Properly capitalize these strings
        if entry.name and isinstance(entry.name, str) and entry.name.startswith('sMapName_'):
            map_name_defs[entry.name] = extract_u8_str(entry.init)
        else:
            break

    # Now map constants to names and store them in a name map
    map_names = {
        extract_int(entry.name[0]): map_name_defs[extract_id(entry.expr.exprs[-1])]
        for entry in existing[-1].init.exprs
    }

    # Zip the map down to a list
    return [ map_name for _, map_name in sorted(map_names.items(), key=lambda e: e[0]) ]

def parse_maps(fname: pathlib.Path) -> typing.List[str]:
    maps_data = load_data(fname, extra_includes=[
        r'-include', r'constants/abilities.h',
    ])

    return all_maps(maps_data)
