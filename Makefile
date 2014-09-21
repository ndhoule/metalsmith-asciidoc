NPM = $(shell which npm)
MOCHA = ./node_modules/.bin/mocha

MOCHA_OPTS = \
	--check-leaks \
	--reporter spec

node_modules: package.json
	$(NPM) install

test: node_modules
	$(MOCHA) $(MOCHA_OPTS) test/index.js

.PHONY: test
