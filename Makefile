SHELL = /bin/bash
# We assume an active virtualenv for development
include make-requirements.txt
PYENV_REGEX = .pyenv/shims
VIRTUAL_ENV ?= .venv
VENV_ACTIVATE_FILE = $(VIRTUAL_ENV)/bin/activate
VENV_ACTIVATE = . $(VENV_ACTIVATE_FILE)
VEPYTHON = $(VIRTUAL_ENV)/bin/python3
PYENV_ERROR = "\033[0;31mIMPORTANT\033[0m: Please install pyenv.\n"
PYENV_PATH_ERROR = "\033[0;31mIMPORTANT\033[0m: Please add $(HOME)/$(PYENV_REGEX) to your PATH env.\n"
PYENV_PREREQ_HELP = "\033[0;31mIMPORTANT\033[0m: please type \033[0;31mpyenv init\033[0m, follow the instructions there and restart your terminal before proceeding any further.\n"
VE_MISSING_HELP = "\033[0;31mIMPORTANT\033[0m: Couldn't find $(PWD)/$(VIRTUAL_ENV); have you executed make venv-create?\033[0m\n"

prereq: make-requirements.txt
	pyenv install --skip-existing $(PY310)
	pyenv local $(PY310)
	-@ printf $(PYENV_PREREQ_HELP)

venv-create:
	# Only create an environment if one does not already exist
	@if [[ ! -f $(VENV_ACTIVATE_FILE) ]]; then \
		if [[ ! -x $$(command -v pyenv) ]]; then \
			printf $(PYENV_ERROR); \
			exit 1; \
		fi; \
		eval "$$(pyenv init -)" && eval "$$(pyenv init --path)" && python3 -mvenv $(VIRTUAL_ENV); \
		printf "Created python3 venv under $(PWD)/$(VIRTUAL_ENV).\n"; \
	fi;

check-venv:
	@if [[ ! -f $(VENV_ACTIVATE_FILE) ]]; then \
	printf $(VE_MISSING_HELP); \
	fi

install: venv-create
	# Force-upgrade pip - usually the system version is pretty outdated and we rely on new features
	# e.g. to install Rally as a git dependency. Installing wheel also makes installs faster.
	. $(VENV_ACTIVATE_FILE); pip install --upgrade pip==23.1.2 wheel==0.40.0
	# also install development/release dependencies
	. $(VENV_ACTIVATE_FILE); pip install -e .[develop]

clean:
	rm -rf .eggs dist

python-caches-clean:
	-@find . -name "__pycache__" -prune -exec rm -rf -- \{\} \;

lint: check-venv
	. $(VENV_ACTIVATE_FILE); find porydex -name "*.py" -exec pylint -j0 -rn --rcfile=$(CURDIR)/.pylintrc \{\} +
	. $(VENV_ACTIVATE_FILE); black --check --diff porydex
	. $(VENV_ACTIVATE_FILE); isort --check --diff porydex

format: check-venv
	@. $(VENV_ACTIVATE_FILE); black porydex
	@. $(VENV_ACTIVATE_FILE); isort porydex
