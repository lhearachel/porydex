UNAME_S := $(shell uname -s)
ifeq ($(UNAME_S),Darwin)
	REALPATH := grealpath
else
	REALPATH := realpath
endif

BUILD := build
DIST := dist
FAKE_LIBC := fake_libc_include
GIT := git
MAKE := make
PYTHON := python
PIP := pip
PYCPARSER := pycparser
PYCPARSER_GIT := git@github.com:eliben/$(PYCPARSER).git
PYCPARSER_UTILS := $(PYCPARSER)/utils
PYCPARSER_FAKE_LIBC := $(PYCPARSER_UTILS)/$(FAKE_LIBC)
PYINSTALLER := pyinstaller
REQUIREMENTS := requirements.txt
VENV := .venv
VENV_PIP := $(VENV)/bin/pip

setup:
	@$(MAKE) venv
	@$(MAKE) dependencies
	@$(MAKE) fake_libc
	@$(MAKE) install
	@$(MAKE) link

venv:
	$(PYTHON) -m venv "$(VENV)"

dependencies:
	@$(MAKE) pip_requirements
	@$(MAKE) fake_libc

pip_requirements:
	@$(VENV_PIP) install -r $(REQUIREMENTS)

fake_libc:
	@echo "fetch $(PYCPARSER) repository"
	$(GIT) clone -n --depth=1 --filter=tree:0 "$(PYCPARSER_GIT)"
	cd $(PYCPARSER) ; $(GIT) sparse-checkout set --no-cone utils
	cd $(PYCPARSER) ; $(GIT) checkout
	cp -r "$(PYCPARSER_FAKE_LIBC)" "$(FAKE_LIBC)"
	rm -rf "$(PYCPARSER)"

install:
	$(PYINSTALLER) porydex.py

link:
	ln -s $(shell $(REALPATH) dist/porydex/porydex) "$(VENV)/bin/porydex"
	
clean:
	rm -rf "$(VENV)"
	rm -rf "$(PYCPARSER)"
	rm -rf "$(FAKE_LIBC)"
	rm -rf "$(BUILD)"
	rm -rf "$(DIST)"

