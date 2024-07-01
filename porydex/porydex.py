"""
A utility for extracting data from pokeemerald-expansion projects
"""

import pathlib

import click


@click.group()
def cli():
    """
    A utility for extracting data from pokeemerald-expansion projects
    """


@cli.group()
@click.option(
    "-p",
    "--project-path",
    type=click.Path(
        exists=True,
        file_ok=False,
        path_type=pathlib.Path
    ),
    default="../pokeemerald-expansion",
    help="Path to the pokeemerald-expansion project; defaults to ../pokeemerald-expansion"
)
@click.option(
    "--reload",
    is_flag=True,
    default=False,
    help="If specified, forces a reload of all project configuration"
)
def config():
    """
    Configure values used during data extraction
    """


@config.command(name="show")
def show_config():
    """
    Show project configuration
    """


@cli.group()
def extract():
    """
    Extract chosen data from the configured project
    """
