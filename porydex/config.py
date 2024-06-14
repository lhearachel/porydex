import configparser
import enum
import pathlib
import os

class OutputFormat(enum.Enum):
    json = enum.auto()
    showdown = enum.auto()

    def __str__(self) -> str:
        return self.name.lower()

    def __repr__(self) -> str:
        return str(self)

    @staticmethod
    def argparse(s):
        try:
            return OutputFormat[s.lower()]
        except KeyError:
            return s

compiler: pathlib.Path = pathlib.Path('gcc')
expansion: pathlib.Path = pathlib.Path('../pokeemerald-expansion').resolve()
output: pathlib.Path = pathlib.Path('./site/data').resolve()
format: OutputFormat = OutputFormat.showdown
included_mons_file: pathlib.Path | None = None

_CONFIG_FILE: pathlib.Path = pathlib.Path('porydex.ini')

def save():
    config = configparser.ConfigParser()
    config['default'] = {
        'compiler': str(compiler),
        'expansion': str(expansion),
        'output': str(output),
        'format': str(format),
    }

    if included_mons_file:
        config['pokedex']['included_mons_file'] = str(included_mons_file.resolve())

    with open(_CONFIG_FILE, 'w', encoding='utf-8') as cfgfile:
        config.write(cfgfile)

def load():
    global compiler
    global expansion
    global output
    global format
    global included_mons_file

    # if no config exists, ensure it exists with defaults for the next load
    if not _CONFIG_FILE.exists():
        _CONFIG_FILE.touch(exist_ok=True)
        save()
    else:
        config = configparser.ConfigParser()
        config.read(_CONFIG_FILE)

        compiler = pathlib.Path(config['default']['compiler'])
        expansion = pathlib.Path(config['default']['expansion'])
        output = pathlib.Path(config['default']['output'])
        format = OutputFormat[config['default']['format']]

        if 'pokedex' in config and 'included_mons_file' in config['pokedex']:
            included_mons_file = pathlib.Path(config['pokedex']['included_mons_file'])

def clear():
    os.remove(_CONFIG_FILE)

