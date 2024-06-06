import pathlib
import re

def parse_national_dex_enum(fname: pathlib.Path) -> dict[str, int]:
    ENUM_ENTRY_PATTERN = re.compile(r'(NATIONAL_DEX_\w+),')
    enum_ctx = False
    national_dex = {}
    counter = 0
    with open(fname, 'r', encoding='utf-8') as enum_file:
        for line in enum_file:
            line = line.strip()
            if enum_ctx:
                if line.startswith('};'):
                    enum_ctx = False
                    if national_dex:
                        break

                match = ENUM_ENTRY_PATTERN.match(line)
                if match:
                    national_dex[match.group(1)] = counter
                    counter = counter + 1

            elif line.startswith('enum'):
                enum_ctx = True

    return national_dex

