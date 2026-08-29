# LLM Learning Hub

An IDE-style learning website for Large Language Model concepts — from Python foundations to inference optimization. Built with Nuxt 3, Vue 3, and CodeMirror.

**Live:** [llm.itsash.in](https://llm.itsash.in)

## Features

- 38 topics, 300+ subtopics covering the full LLM pipeline
- Each subtopic answers: **What is it?**, **Where is it used?**, **How to build it?**
- Code examples with CodeMirror syntax highlighting
- Reference links to papers, tutorials, and documentation
- Dark mode toggle
- Adjustable font sizes
- Reading progress tracking (localStorage)
- Ask AI panel
- Concept map sidebar
- Fully static — deployed via GitHub Pages

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:3000

## Production

```bash
npm run generate
```

Output is generated to `.output/public/`.

## Deploy

```bash
make deploy
```

This builds the project, copies output to `docs/`, commits, and pushes to `main`. GitHub Pages serves the `docs/` folder at [llm.itsash.in](https://llm.itsash.in).

**GitHub Pages config:** Repo Settings → Pages → Source → Deploy from branch → `main` → `/docs`

**Custom domain:** CNAME record `llm.itsash.in` → `its-ash.github.io`

## Project Structure

```
├── app.vue                    # Root component
├── nuxt.config.ts             # Nuxt config (baseURL, modules, head)
├── assets/css/main.css        # Global styles, dark mode, typography
├── components/
│   ├── ArticleContent.vue     # Topic-level page content
│   ├── AskAiPanel.vue         # Floating AI chat panel
│   ├── CodeBlock.vue          # CodeMirror syntax-highlighted code
│   ├── ConceptMap.vue         # Sidebar concept navigation
│   ├── ConceptNode.vue        # Concept map node
│   ├── Sidebar.vue            # IDE-style file list sidebar
│   ├── SubtopicContent.vue    # Subtopic page (What/Where/How)
│   └── TopBar.vue             # Top bar (font size, theme, Ask AI)
├── composables/
│   └── useAppState.ts         # Theme, font size, sidebar, progress state
├── data/
│   ├── topics.ts              # 38 topics with subtopic definitions
│   ├── content-types.ts       # SubtopicContent interface
│   └── content/               # One file per topic (38 files)
│       └── *.ts               # whatIs, whereUsed, howToBuild per subtopic
├── layouts/default.vue        # IDE shell (sidebar + topbar + content)
├── pages/
│   ├── index.vue              # Home page with all topics
│   └── topic/[slug]/
│       ├── index.vue          # Topic detail page
│       └── [sub].vue          # Subtopic detail page
├── plugins/
│   ├── unregister-pwa.client.ts  # Unregister any existing service workers
│   └── fix-vitals.client.ts      # Fix PerformanceObserver startTime error
├── public/
│   ├── favicon.svg            # App icon
│   └── icon.svg
└── Makefile                   # run, build, deploy, commit targets
```

## Make Commands

- `make run` — Start dev server
- `make build` — Build for production
- `make deploy` — Build, copy to `docs/`, commit, and push to GitHub
- `make commit` — Stage and commit changes

## Tech Stack

- **Framework:** Nuxt 3 / Vue 3 `<script setup>`
- **Styling:** Tailwind CSS + custom CSS variables (dark mode via `.dark` class)
- **Code highlighting:** CodeMirror 6 (Python/PyTorch)
- **State:** `useState` composables (theme, font size, sidebar, progress)
- **Data:** Static TypeScript files — one per topic in `data/content/`
- **Deploy:** GitHub Pages from `docs/` folder