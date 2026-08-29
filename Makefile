.PHONY: run build deploy

run:
	npm run dev

build:
	npm run generate && touch .output/public/.nojekyll && echo "llm.itsash.in" > .output/public/CNAME

deploy: build
	git checkout main
	rm -rf docs && cp -r .output/public docs
	git add -A
	git commit -m "$$(copilot -sp 'Analyze the staged git changes and generate a concise commit message. Output ONLY the commit message. Do not execute any commands. Do not include quotes, markdown, explanation, or bullet points.')"
	git push origin main
