.PHONY: run build deploy

run:
	npm run dev

build:
	npm run generate && touch .output/public/.nojekyll && echo "llm.itsash.in" > .output/public/CNAME

deploy: build
	git checkout main
	rm -rf docs && cp -r .output/public docs
	git add -A
	git commit -m "$$(copilot -p 'Output only a concise git commit message for the currently staged changes. No quotes, explanation, or markdown.')"
	git push origin main
