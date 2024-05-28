# `porydex`

`porydex` is a simple utility for exporting data from `pokeemerald-expansion`
for use in a custom Pokémon Showdown Pokédex for your fan-game.

## Requirements

* `python >= 3.10.6`
* one of the following C compilers:
  * `arm-none-eabi-gcc` (tested: `v13.2.1`)
  * `clang` (tested: `v15.0`)
  * `gcc` (tested: `v14.1.1`)

## Setup

Setup is simple; run the following commands:

```bash
make setup
source .venv/bin/activate
```

## Usage

```txt
usage: porydex [-h] [-e EXPANSION] [-o OUT_DIR] [--reload]

generate data exports from pokeemerald-expansion for showdown dex

options:
  -h, --help            show this help message and exit
  -e EXPANSION, --expansion EXPANSION
                        path to the root of your pokeemerald-expansion repository
  -o OUT_DIR, --out-dir OUT_DIR
                        path to directory where output files will be dumped
  --reload              if specified, flush the cache of parsed data and reload from expansion
```

On first run, `porydex` requires the `--expansion` option, which points to your
fork of `pokeemerald-expansion` on your local file system:

```bash
python porydex.py --expansion <path/to/expansion/directory>
```

By default, output files are stored in the directory `out`; this can be changed
as a program option:

```bash
python porydex.py --expansion <path/to/expansion/directory> --out-dir <path/to/output/directory>
```

`porydex` maintains a cache of pre-processed files that it parses from your
repository. If you need to reload this cache -- e.g., if you make a change to
any of the files that it reads -- then you will need to force it to reload the
cache:

```bash
python porydex.py --expansion <path/to/expansion/directory> --reload
```

## Current Features and Backlog

**Supported:**

* Move data
* Species data (including forms, excluding evolutions)

**In Progress:**

* Evolution exports in Species data
* Learnset exports

**Backlog:**

* Items
* Descriptions for Abilities and Items
* Custom Showdown Pokédex fork
