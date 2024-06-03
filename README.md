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
usage: porydex [-h] {config,extract} ...

generate data exports from pokeemerald-expansion for showdown dex

positional arguments:
  {config,extract}
    config          setup configuration options for porydex
    extract         run data extraction

options:
  -h, --help        show this help message and exit
```

### `config`

`porydex` is configurable according to your system. By default, it assumes the
following options:

* Your expansion repository is located at `../pokeemerald-expansion`
* Your compiler is invoked by the command `gcc`
* Your desired directory for output files is `./out`

If any of these are not true, use the `config set` command to update them to
the proper values:

```text
usage: porydex config set [-h] [-e EXPANSION] [-c COMPILER]

options:
  -h, --help            show this help message and exit
  -e EXPANSION, --expansion EXPANSION
                        path to the root of your pokeemerald-expansion
                        repository; default: ../pokeemerald-expansion
  -c COMPILER, --compiler COMPILER
                        command for or path to the compiler to be used for
                        pre-processing; default: gcc
  -o OUTPUT, --output OUTPUT
                        path to output directory for extracted data files;
                        default: ./out
```

Configuration is persisted in `porydex.ini`; to view configured options, either
view `porydex.ini` via your favorite text editor, or use the `config show`
command.

### `extract`

Extraction with `porydex` is easy; just run:

```bash
porydex extract
```

And that's it! Your output data files will be located in the configured output
directory.

`porydex` maintains a cache of pre-processed files that it parses from your
repository. If you need to reload this cache -- e.g., if you make a change to
any of the files that it reads -- then you will need to force it to reload the
cache:

```bash
porydex extract --reload
```

## Current Features and Backlog

**Supported:**

* Move data
* Species data (including forms, evolutions, and learnable movessets)
* Encounter data
* Configurable expansion target and compiler support

**In Progress:**

* Custom Pokédex web-app (based on Showdown fork)

**Backlog:**

* Trainer data and teams (in Showdown damage calculator format)
* Item data
* Descriptions for Abilities and Items
