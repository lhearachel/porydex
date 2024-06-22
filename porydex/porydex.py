"""
Data Extraction Utility for pokeemerald-expansion Projects
"""

import pathlib
import pprint

import click
from xdg_base_dirs import xdg_config_home, xdg_state_home

from porydex.config import ExpansionConfig, PorydexConfig

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


def load_porydex_config() -> PorydexConfig:
    """
    Load configuration from the expected porydex.toml file.
    If no such file exists, then it will be created and an empty
    dict will be returned.
    """
    if not PORYDEX_CONFIG_PATH.exists() or PORYDEX_CONFIG_PATH.stat().st_size == 0:
        PORYDEX_CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
        PORYDEX_CONFIG_PATH.touch()
        return PorydexConfig.init(PORYDEX_CONFIG_PATH, str(DEFAULT_EXPANSION_PATH.resolve()), str(PORYDEX_SHELF_DIR))

    return PorydexConfig.load(PORYDEX_CONFIG_PATH)


@config.command("scan")
@click.argument("repo_path", type=click.Path(), default=DEFAULT_EXPANSION_PATH)
def config_scan(repo_path: click.Path) -> ExpansionConfig:
    """
    Scan an expansion repository for configuration state.
    The given expansion repository will also be recorded for future data extraction.
    """
    porydex_config = load_porydex_config()

    repo_path = pathlib.Path(repo_path).resolve()
    shelf_path = pathlib.Path(porydex_config.application.shelf_path)
    shelf_path = shelf_path.resolve()
    shelf_path.parent.mkdir(parents=True, exist_ok=True)

    cfg = ExpansionConfig.load(shelf_path, repo_path)
    cfg.save(shelf_path)

    porydex_config.application.repo_path = str(repo_path)
    porydex_config.application.shelf_path = str(shelf_path)
    porydex_config.save(PORYDEX_CONFIG_PATH)

    return cfg


@config.command("show")
@click.option("-p", "--pretty", is_flag=True, help="Pretty-print output")
def config_show(pretty=False):
    """
    Show the configuration state.
    If configuration has yet to be scanned, then this command will also scan it.
    """
    porydex_config = load_porydex_config()
    repo_path = pathlib.Path(porydex_config.application.repo_path)
    shelf_path = pathlib.Path(porydex_config.application.shelf_path)
    shelf_path = shelf_path.resolve()

    cfg = ExpansionConfig.load(shelf_path, repo_path)
    fmt = pprint.pformat(cfg, indent=4) if pretty else str(cfg)
    click.echo(fmt)


if __name__ == "__main__":
    main()
