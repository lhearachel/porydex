# `porydex`

`porydex` is a simple utility for exporting data from `pokeemerald-expansion`
for use in a custom Pokémon Showdown Pokédex for your fan-game. Additionally,
it provides a modified version of the official Pokémon Showdown Pokédex as
a base for extracted data.

Thanks to [the original Pokémon Showdown Pokédex](https://dex.pokemonshowdown.com) for the base implementation.

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
usage: porydex config set [-h] [-e EXPANSION] [-c COMPILER] [-o OUTPUT] [-f {json,showdown}] [-i INCLUDED_SPECIES_FILE] [-a CUSTOM_ABILITY_DEFS]

options:
  -h, --help            show this help message and exit
  -e EXPANSION, --expansion EXPANSION
                        path to the root of your pokeemerald-expansion repository; default: ../pokeemerald-expansion
  -c COMPILER, --compiler COMPILER
                        command for or path to the compiler to be used for pre-processing; default: gcc
  -o OUTPUT, --output OUTPUT
                        path to output directory for extracted data files; default: ./out
  -f {json,showdown}, --format {json,showdown}
                        format for output files
  -i INCLUDED_SPECIES_FILE, --included-species-file INCLUDED_SPECIES_FILE
                        text file describing species to be included in the pokedex
  -a CUSTOM_ABILITY_DEFS, --custom-ability-defs CUSTOM_ABILITY_DEFS
                        JSON file describing custom ability definitions and descriptions for a Showdown Dex
```

Configuration is persisted in `porydex.ini`; to view configured options, either
view `porydex.ini` via your favorite text editor, or use the `config show`
command.

#### Specifying Obtainable Pokemon

Your game may not give a player access to all species of Pokémon. In such cases,
you can specify a text-file of obtainable species using `config set --included-species-file`.
This file is expected to be a text-based list with one entry per line and each
entry being the name of an available Pokémon using Showdown-recognized names, e.g.,

```text
Bulbasaur
Ivysaur
Venusaur
Venusaur-Mega
Venusaur-Gmax
...
```

#### Specifying Descriptions for Custom Abilities

`vanilla/abilities.json` specifies the latest version of the data file used by
the official Showdown Pokédex for ability descriptions. For abilities which
already exist in a vanilla Expansion repository, this file can be edited to
modify those descriptions. If there are custom abilities in your game, then
you will need to specify a file with those ability names and descriptions
using `config set --custom-ability-defs`. The provided file should be in JSON
format and adhere to the following schema:

```json
{
    "<NAME OF ABILITY>": {
        "desc": "<LONG-FORM DESCRIPTION>",
        "short": "<SHORT-FORM DESCRIPTION>"
    }
}
```

If `short` is not provided, then the value for `desc` will be used instead. To
illustrate with an ability in the vanilla Expansion:

```json
{
    "Aerilate": {
        "desc": "This Pokemon's Normal-type moves become Flying-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
        "short": "This Pokemon's Normal-type moves become Flying type and have 1.2x power."
    }
}
```

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
* Custom Pokédex web-app (based on Showdown fork)
* Descriptions for custom Abilities

**Backlog:**

* Trainer data and teams (in Showdown damage calculator format)
* Custom Item data and descriptions
