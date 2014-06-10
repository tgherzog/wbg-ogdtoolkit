dev: install
	@./node_modules/.bin/gulp development --open --port 4000

install:
	@npm install
	@./node_modules/.bin/bower install

build: install
	@./node_modules/.bin/gulp

.PHONY: dev install build
