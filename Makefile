.PHONY: run deploy commit

run:
	npm run dev

deploy:
	npm run generate && touch .output/public/.nojekyll

deploy-github:
	npm run generate && touch .output/public/.nojekyll && npx gh-pages -d .output/public -t

commit:
	git add -A
	git commit -m "$$(gh copilot suggest -t commit)"