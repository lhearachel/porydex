"""
Configuration management
"""

import pathlib
import re

import toml
from xdg_base_dirs import xdg_config_home

APP_CONFIG_FILE: pathlib.Path = xdg_config_home() / "porydex.toml"
DEFAULTS: dict[str, str] = {
    "project_compiler": "arm-none-eabi-gcc",
    "project_path": pathlib.Path("../pokeemerald-expansion").absolute().resolve().as_posix(),
}

Primitive = int | bool | str

project_compiler: pathlib.Path = pathlib.Path(DEFAULTS["project_compiler"])
project_path: pathlib.Path = pathlib.Path(DEFAULTS["project_path"])
project_config: dict[str, Primitive] = {}


def resolve(val: str, default: Primitive | None = None) -> Primitive:
    """
    Attempt to resolve a value against the current configuration
    """
    if val.isnumeric():
        return int(val)

    key = project_config.get(val, default)
    while key and key != val and isinstance(key, str):
        key = project_config.get(key, default)

    if key == val:
        raise ValueError(f"circular resolution for {val}")

    return key


def show() -> dict:
    """
    Return a dictionary representation of the current config
    """
    return {
        "project_compiler": project_compiler.as_posix(), # do not resolve; assume it is on the path
        "project_path": project_path.resolve().absolute().as_posix(),
    }


def load():
    """
    Load configuration from the porydex.toml config file
    """
    global project_compiler
    global project_path

    with open(APP_CONFIG_FILE, "r+", encoding="utf-8") as cfg_file:
        cfg = toml.load(cfg_file)
        project_compiler = pathlib.Path(cfg.get("project_compiler", DEFAULTS["project_compiler"]))
        project_path = pathlib.Path(cfg.get("project_path", DEFAULTS["project_path"]))


def save():
    """
    Save configuration to the porydex.toml config file
    """
    with open(APP_CONFIG_FILE, "w+", encoding="utf-8") as cfg_file:
        cfg = show()
        toml.dump(cfg, cfg_file)


def parse_project_config_file(path: pathlib.Path, config_def: re.Pattern) -> dict:
    """
    Parse a project configuration file's contents
    """
    global project_config

    with open(path, "r", encoding="utf-8") as cfg_file:
        for line in cfg_file:
            if match := config_def.match(line.strip()):
                project_config[match.group(1)] = resolve(match.group(2))


def scan_project():
    """
    Scan a project's full configuration
    """
    global project_config

    project_config = {
        "TRUE": True,
        "FALSE": False,
        "A_BUTTON": 0x0001,
        "B_BUTTON": 0x0002,
        "SELECT_BUTTON": 0x0004,
        "START_BUTTON": 0x0008,
        "DPAD_RIGHT": 0x0010,
        "DPAD_LEFT": 0x0020,
        "DPAD_UP": 0x0040,
        "DPAD_DOWN": 0x0080,
        "R_BUTTON": 0x0100,
        "L_BUTTON": 0x0200,
        "GEN_1": 0,
        "GEN_2": 1,
        "GEN_3": 2,
        "GEN_4": 3,
        "GEN_5": 4,
        "GEN_6": 5,
        "GEN_7": 6,
        "GEN_8": 7,
        "GEN_9": 8,
        "GEN_LATEST": 8,
    }

    config_def = re.compile(r"#define ([\w0-9]+)\s+([\w0-9]+)")

    project_config_dir = project_path / "include" / "config"
    parse_project_config_file(project_config_dir / "battle.h", config_def)
    parse_project_config_file(project_config_dir / "item.h", config_def)
    parse_project_config_file(project_config_dir / "pokemon.h", config_def)
    parse_project_config_file(project_config_dir / "species_enabled.h", config_def)
