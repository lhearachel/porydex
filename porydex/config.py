import pathlib

compiler: pathlib.Path = pathlib.Path('gcc')
expansion: pathlib.Path = pathlib.Path('../pokeemerald-expansion').resolve()
output: pathlib.Path = pathlib.Path('./out').resolve()
