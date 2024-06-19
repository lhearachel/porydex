"""
Data Extraction Utility for pokeemerald-expansion Projects
"""

import pathlib
import pprint

import click
import toml
from xdg_base_dirs import xdg_config_home, xdg_state_home

from porydex.config import ExpansionConfig

PORYDEX_CONFIG_PATH = (xdg_config_home() / "porydex.toml").resolve()
PORYDEX_SHELF_DIR = (xdg_state_home() / "porydex" / ".shelf").resolve()
EXPANSION_CONFIG_SHELF_PATH = PORYDEX_SHELF_DIR / "expansion_config"
DEFAULT_EXPANSION_PATH = pathlib.Path("../pokeemerald-expansion")


@click.group(invoke_without_command=False)
def main():
    """
    A data extraction utility for pokeemerald-expansion projects
    """


@main.group(invoke_without_command=False)
def config():
    """
    Porydex configuration commands; pretty, scan
    """


def load_porydex_config() -> dict:
    """
    Load configuration from the expected porydex.toml file.
    If no such file exists, then it will be created and an empty
    dict will be returned.
    """
    if not PORYDEX_CONFIG_PATH.exists():
        PORYDEX_CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
        PORYDEX_CONFIG_PATH.touch()

    with open(PORYDEX_CONFIG_PATH, mode="r", encoding="utf-8") as porydex_toml:
        return toml.load(porydex_toml)


@config.command("scan")
@click.argument("repo_path", type=click.Path(), default=DEFAULT_EXPANSION_PATH)
def config_scan(repo_path: click.Path) -> ExpansionConfig:
    """
    Scan an expansion repository for configuration state.
    The given expansion repository will also be recorded for future data extraction.
    """
    porydex_config = load_porydex_config()
    if "porydex" not in porydex_config:
        porydex_config["porydex"] = {}

    repo_path = pathlib.Path(repo_path).resolve()
    shelf_path = pathlib.Path(porydex_config["porydex"].get("shelf_path", EXPANSION_CONFIG_SHELF_PATH))
    shelf_path = shelf_path.resolve()
    shelf_path.parent.mkdir(parents=True, exist_ok=True)

    cfg = ExpansionConfig.load(shelf_path, repo_path)
    cfg.save(shelf_path)

    porydex_config["porydex"]["repo_path"] = str(repo_path)
    porydex_config["porydex"]["shelf_path"] = str(shelf_path)

    with open(PORYDEX_CONFIG_PATH, mode="w", encoding="utf-8") as porydex_toml:
        toml.dump(porydex_config, porydex_toml)

    return cfg


@config.command("show")
@click.option("-p", "--pretty", is_flag=True, help="Pretty-print output")
def config_show(pretty=None):
    """
    Pretty-print the configuration state.
    If configuration has yet to be scanned, then this command will also scan it.
    """
    porydex_config = load_porydex_config()
    repo_path = pathlib.Path(porydex_config.get("porydex", {}).get("repo_path", DEFAULT_EXPANSION_PATH))
    shelf_path = pathlib.Path(porydex_config.get("porydex", {}).get("shelf_path", EXPANSION_CONFIG_SHELF_PATH))
    shelf_path = shelf_path.resolve()

    cfg = ExpansionConfig.load(shelf_path, repo_path)
    fmt = pprint.pformat(cfg, indent=4) if pretty else str(cfg)
    click.echo(fmt)


if __name__ == "__main__":
    main()
