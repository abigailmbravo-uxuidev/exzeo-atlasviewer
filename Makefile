.PHONY: start
start:
	npm run build
	npm run serve -- -H 0.0.0.0

.PHONY: test
test:
	npm install
	npm test

.PHONY: build
build:
	npm install
	npm run build
	mv ./public ./build