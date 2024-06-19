SHELL = /bin/bash
PY312 = 3.12
PIPV = 24.0
PYENV_REGEX = .pyenv/shims
VIRTUAL_ENV ?= .venv
VENV_ACTIVATE_FILE = $(VIRTUAL_ENV)/bin/activate
VENV_ACTIVATE = . $(VENV_ACTIVATE_FILE)
VEPYTHON = $(VIRTUAL_ENV)/bin/python3

GREEN = \033[0;32m
RED = \033[0;31m
YELLOW = \033[0;33m
RESET = \033[0m

PYENV_PATH_ERROR = "\033[0;31mIMPORTANT\033[0m: Please add $(HOME)/$(PYENV_REGEX) to your PATH env.\n"
PYENV_PREREQ_HELP = "\033[0;31mIMPORTANT\033[0m: please type \033[0;31mpyenv init\033[0m, follow the instructions there and restart your terminal before proceeding any further.\n"

all: install

prereq:
	pyenv install --skip-existing $(PY312)
	pyenv local $(PY312)
	-@ printf "$(RED)[INFO]$(RESET) Please execute $(YELLOW)pyenv init$(RESET) and follow the instructions there to proceed\n"

venv:
	@if [[ ! -f $(VENV_ACTIVATE_FILE) ]]; then \
		if [[ ! -x $$(command -v pyenv) ]]; then \
			printf "$(RED)[FATAL]$(RESET) Could not find $(YELLOW)pyenv$(RESET); please install it\n"; \
			exit 1; \
		fi; \
		eval "$$(pyenv init -)" && eval "$$(pyenv init --path)" && python3 -mvenv $(VIRTUAL_ENV); \
		printf "$(GREEN)[INFO]$(RESET) Created $(YELLOW)python3$(RESET) venv under $(PWD)/$(VIRTUAL_ENV).\n"; \
	fi;

check-venv:
	@if [[ ! -f $(VENV_ACTIVATE_FILE) ]]; then \
	printf "$(RED)[FATAL]$(RESET) Could not find $(YELLOW)$(PWD)/$(VIRTUAL_ENV)$(RESET); have you executed $(YELLOW)venv-create$(RESET)?\n"; \
	fi

install: venv
	@printf "$(GREEN)[INFO]$(RESET) Upgrading $(YELLOW)pip$(RESET)...\n"
	@$(VENV_ACTIVATE); pip install --upgrade pip==$(PIPV) wheel==0.40.0
	@printf "$(GREEN)[INFO]$(RESET) Installing project dependencies...\n"
	@$(VENV_ACTIVATE); pip install -e .[develop]

clean:
	rm -rf .venv

clean-pycache:
	- find . -name "__pycache__" -prune -exec rm -rf -- \{\} \;

lint: check-venv
	@. $(VENV_ACTIVATE_FILE); find porydex -name "*.py" -exec pylint -j0 -rn --rcfile=$(CURDIR)/.pylintrc \{\} +
	@. $(VENV_ACTIVATE_FILE); black --check --diff porydex
	@. $(VENV_ACTIVATE_FILE); isort --check --diff porydex

format: check-venv
	@. $(VENV_ACTIVATE_FILE); black porydex
	@. $(VENV_ACTIVATE_FILE); isort porydex

precommit: lint format
