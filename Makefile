VIRTUAL_ENV ?= .venv
VENV_ACTIVATE_FILE = $(VIRTUAL_ENV)/bin/activate
VENV_ACTIVATE = . $(VENV_ACTIVATE_FILE)

GREEN = \033[0;32m
RED = \033[0;31m
YELLOW = \033[0;33m
RESET = \033[0m

venv:
	@if [[ ! -f $(VENV_ACTIVATE_FILE) ]]; then \
		if [[ ! -x $$(command -v pyenv) ]]; then \
			printf "$(RED)✗$(RESET) $(YELLOW)pyenv$(RESET) not found; please install it\n"; \
			exit 1; \
		fi; \
		eval "$$(pyenv init -)" && eval "$$(pyenv init --path)" && python3 -mvenv $(VIRTUAL_ENV); \
		printf "$(GREEN)✓$(RESET) $(YELLOW)python$(RESET) venv created under $(YELLOW)$(PWD)/$(VIRTUAL_ENV)$(RESET)\n"; \
	fi;

install: venv
	$(VENV_ACTIVATE) ; pip install --upgrade pip wheel
	$(VENV_ACTIVATE) ; pip install -e .[dev]

clean:
	-@ rm -rf .venv
	-@ find . -name "__pycache__" -prune -exec rm -rf -- \{\} \;

lint: venv
	$(VENV_ACTIVATE) ; find porydex -name "*.py" -exec pylint -j0 -rn --rcfile=$(CURDIR)/.pylintrc \{\} +
	$(VENV_ACTIVATE) ; black --check --diff porydex
	$(VENV_ACTIVATE) ; isort --check --diff porydex

format: venv
	$(VENV_ACTIVATE) ; black porydex
	$(VENV_ACTIVATE) ; isort porydex
