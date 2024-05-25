FAKE_LIBC := fake_libc_include
GIT := git
MAKE := make
PYTHON := python
PIP := pip
PYCPARSER := pycparser
PYCPARSER_GIT := git@github.com:eliben/$(PYCPARSER).git
PYCPARSER_UTILS := $(PYCPARSER)/utils
PYCPARSER_FAKE_LIBC := $(PYCPARSER_UTILS)/$(FAKE_LIBC)
REQUIREMENTS := requirements.txt
VENV := .venv
VENV_PIP := $(VENV)/bin/pip

setup:
	$(PYTHON) -m venv "$(VENV)"
	@$(VENV_PIP) install -r $(REQUIREMENTS)
	@$(MAKE) fake_libc

fake_libc:
	@echo "fetch $(PYCPARSER) repository"
	$(GIT) clone -n --depth=1 --filter=tree:0 "$(PYCPARSER_GIT)"
	cd $(PYCPARSER) ; $(GIT) sparse-checkout set --no-cone utils
	cd $(PYCPARSER) ; $(GIT) checkout
	cp -r "$(PYCPARSER_FAKE_LIBC)" "$(FAKE_LIBC)"
	rm -rf "$(PYCPARSER)"
	
clean:
	rm -rf "$(VENV)"
	rm -rf "$(PYCPARSER)"

