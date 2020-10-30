.PHONY: start
start:
	npm run start

.PHONY: test
test:
	npm install
	npm test

.PHONY: build
build:
	npm install
	npm run build
