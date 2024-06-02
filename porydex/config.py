import configparser
import pathlib

compiler: pathlib.Path = pathlib.Path('gcc')
expansion: pathlib.Path = pathlib.Path('../pokeemerald-expansion').resolve()
output: pathlib.Path = pathlib.Path('./out').resolve()

_CONFIG_FILE: pathlib.Path = pathlib.Path('porydex.ini')

def save():
    config = configparser.ConfigParser()
    config['default'] = {
        'compiler': str(compiler),
        'expansion': str(expansion),
        'output': str(output),
    }
    with open(_CONFIG_FILE, 'w', encoding='utf-8') as cfgfile:
        config.write(cfgfile)

def load():
    global compiler
    global expansion
    global output

    _CONFIG_FILE.touch(exist_ok=True)

    config = configparser.ConfigParser()
    config.read(_CONFIG_FILE)

    compiler = pathlib.Path(config['default']['compiler'])
    expansion = pathlib.Path(config['default']['expansion'])
    output = pathlib.Path(config['default']['output'])

