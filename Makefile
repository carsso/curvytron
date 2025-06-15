.PHONY: setup build run

# Commandes de développement
setup:
	nvm use
	npm install

build: setup
	npm run build

watch: setup
	npm run watch

run:
	npm run start