# LLM Learning Hub

An interactive learning website for Large Language Model concepts, built with Nuxt 3.

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

## Project Structure

- `pages/` — Route pages (index, topic detail)
- `components/` — Reusable UI components (sidebar, topbar, concept map, article)
- `data/topics.ts` — All LLM topics parsed from `topic.md`
- `assets/css/main.css` — Global styles (dark mode, grid background, typography)
- `layouts/default.vue` — IDE-style application shell

## Make Commands

- `make run` — Start dev server
- `make deploy` — Build for production
- `make commit` — Stage and commit changes