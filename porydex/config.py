"""
pokeemerald-expansion configuration loader
"""

import collections
import dataclasses
import pathlib
import re
import shelve

import toml

INCLUDE = pathlib.Path("include")
CONFIG_H = INCLUDE / "config.h"
CONFIG_DIR = INCLUDE / "config"

CONFIG_BATTLE_H = CONFIG_DIR / "battle.h"
CONFIG_ITEM_H = CONFIG_DIR / "item.h"
CONFIG_POKEMON_H = CONFIG_DIR / "pokemon.h"
CONFIG_SPECIES_ENABLED_H = CONFIG_DIR / "species_enabled.h"

CONFIG_DEFINE_PATTERN = re.compile(r"#define\s+([a-zA-Z_]\w+)\s+(\w+).*")

GLOBAL_MAPPINGS: dict[str, int | bool] = {
    "FALSE": False,
    "TRUE": True,
}

Primitive = int | str | bool


@dataclasses.dataclass
class ApplicationConfig:
    """
    Configuration for certain directories where application files are gathered
    from or stored to.
    """

    repo_path: str | None
    shelf_path: str | None


@dataclasses.dataclass
class PorydexConfig:
    """
    Top-level configuration instance.
    """

    application: ApplicationConfig

    def save(self, config_path: pathlib.Path):
        """
        Save the configuration object.
        """
        with open(config_path, mode="w", encoding="utf-8") as porydex_toml:
            toml.dump(dataclasses.asdict(self), porydex_toml)

    @staticmethod
    def init(config_path: pathlib.Path, repo_path: str, shelf_path: str) -> "PorydexConfig":
        """
        Initialize configuration to a filepath.
        """
        application_config = ApplicationConfig(repo_path, shelf_path)
        porydex_config = PorydexConfig(application_config)
        porydex_config.save(config_path)
        return porydex_config

    @staticmethod
    def load(config_path: pathlib.Path) -> "PorydexConfig":
        """
        Load existing configuration from a filepath.
        """
        with open(config_path, mode="r", encoding="utf-8") as porydex_toml:
            raw_config = toml.load(porydex_toml)
            application_config = ApplicationConfig(**raw_config.get("application", {}))
            return PorydexConfig(application_config)


def coerce(val: str) -> Primitive:
    """
    Coerce a string value into a Primitive.
    Numeric strings will be converted to int, and TRUE/FALSE
    will be converted to bool values.
    """
    if val.isnumeric():
        return int(val)

    return GLOBAL_MAPPINGS.get(val, val)


def definedict(config_file: pathlib.Path) -> dict[str, Primitive]:
    """
    Standard helper function to load #defines from an expansion config header.
    """
    with open(config_file, mode="r", encoding="utf-8") as infile:
        return {
            match.group(1): coerce(match.group(2))
            for match in filter(lambda m: m and len(m.groups()) == 2, map(lambda line: CONFIG_DEFINE_PATTERN.match(line.strip()), infile))
        }


def scan_config_h(repo_path: pathlib.Path) -> dict[str, Primitive]:
    """
    Scan configuration from expansion/include/config.h
    """
    return definedict(repo_path / CONFIG_H)


def scan_config_battle_h(repo_path: pathlib.Path) -> dict[str, Primitive]:
    """
    Scan configuration from expansion/include/config/battle.h
    """
    return definedict(repo_path / CONFIG_BATTLE_H)


def scan_config_item_h(repo_path: pathlib.Path) -> dict[str, Primitive]:
    """
    Scan configuration from expansion/include/config/item.h
    """
    return definedict(repo_path / CONFIG_ITEM_H)


def scan_config_pokemon_h(repo_path: pathlib.Path) -> dict[str, Primitive]:
    """
    Scan configuration from expansion/include/config/pokemon.h
    """
    return definedict(repo_path / CONFIG_POKEMON_H)


def scan_config_species_enabled_h(repo_path: pathlib.Path) -> dict[str, Primitive]:
    """
    Scan configuration from expansion/include/config/species_enabled.h
    """
    return definedict(repo_path / CONFIG_SPECIES_ENABLED_H)


class ExpansionConfig(collections.UserDict[str, Primitive]):
    """
    Thin wrapper around dictionary for accessing scanned expansion
    configuration files, as well as saving/loading via shelve.
    """

    def __init__(self, data=None, /, **kwargs):
        if data:
            super().__init__(data, **kwargs)
        else:
            super().__init__(**kwargs)

    @staticmethod
    def scan(repo_path: pathlib.Path | None) -> "ExpansionConfig":
        """
        Scan an expansion repository's configuration files.
        """
        if not repo_path:
            return ExpansionConfig()

        return ExpansionConfig(
            scan_config_h(repo_path)
            | scan_config_battle_h(repo_path)
            | scan_config_item_h(repo_path)
            | scan_config_pokemon_h(repo_path)
            | scan_config_species_enabled_h(repo_path)
        )

    @staticmethod
    def load(shelf_path: pathlib.Path | None, repo_path: pathlib.Path | None = None) -> "ExpansionConfig":
        """
        Load existing configuration, if it exists. If it does not,
        then scan an expansion repository instead.
        """
        if not shelf_path or not shelf_path.exists():
            return ExpansionConfig.scan(repo_path)

        with shelve.open(shelf_path) as shelf:
            return shelf["ExpansionConfig"]

    def save(self, shelf_path: pathlib.Path) -> pathlib.Path:
        """
        Save scanned expansion configuration.
        """
        with shelve.open(shelf_path) as shelf:
            shelf["ExpansionConfig"] = self

    def get(self, key: str, default: int | bool | None = None, resolve: bool = True) -> int | bool:
        """
        Access an element in the underlying dict. By default, results
        will be recursively coerced into primitive types until no further
        resolution is possible.
        """
        if key not in self:
            return default

        res = self.get(key, None)
        if resolve:
            while isinstance(res, str):
                tmp = self.get(res, res)
                if tmp == res:
                    break
                res = tmp

        return res
