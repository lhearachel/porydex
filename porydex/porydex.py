"""
A utility for extracting data from pokeemerald-expansion projects
"""

import pathlib

import click
import rich

from porydex import config


@click.group()
@click.help_option("-h", "--help")
def cli():
    """
    A utility for extracting data from pokeemerald-expansion projects
    """


@cli.group(name="config", invoke_without_command=True)
@click.help_option("-h", "--help")
@click.option(
    "-c",
    "--compiler",
    type=click.Path(dir_okay=False, path_type=pathlib.Path),
    default="arm-none-eabi-gcc",
    help="Path to the compiler executable used for your project; defaults to arm-none-eabi-gcc",
)
@click.option(
    "-p",
    "--project-path",
    type=click.Path(exists=True, file_okay=False, path_type=pathlib.Path),
    default="../pokeemerald-expansion",
    help="Path to the pokeemerald-expansion project; defaults to ../pokeemerald-expansion",
)
@click.pass_context
def cfg(ctx: click.Context,
        compiler: pathlib.Path = pathlib.Path('arm-none-eabi-gcc'),
        project_path: pathlib.Path = pathlib.Path("../pokeemerald-expansion")):
    """
    Configure values used during data extraction
    """
    if ctx.invoked_subcommand is None:
        config.project_compiler = compiler
        config.project_path = project_path
        config.save()


@cfg.command(name="show")
@click.help_option("-h", "--help")
def showcfg():
    """
    Show project configuration
    """
    config.load()
    config.scan_project()
    rich.print(config.show())


@cli.group()
@click.help_option("-h", "--help")
def extract():
    """
    Extract chosen data from the configured project
    """
