# GitHub Copilot Instructions

## Project: LLM Learning Hub

Nuxt 3 (Vue 3) single-page application rendering an IDE-style learning interface for LLM concepts.

### Stack
- **Framework:** Nuxt 3 / Vue 3 `<script setup>` SFCs
- **Styling:** Tailwind-like utility classes via hand-written CSS (`assets/css/main.css`); `dark:` variant via `.dark` class on `<html>`
- **State:** Local component refs + `useState` for app-wide state (theme, font size, open tabs, progress)
- **Data:** `data/topics.ts` — static topic definitions parsed from `topic.md`

### Conventions
- Use `<script setup lang="ts">` in all components and pages.
- Prefer Nuxt auto-imports (`ref`, `computed`, `useState`, `navigateTo`, etc.) — do not import them explicitly.
- Components in `components/` are auto-imported by Nuxt (use `<Sidebar />` not `<SidebarComponent />`).
- No CSS preprocessors — use plain CSS with custom properties in `assets/css/main.css`.
- Keep components small and focused; compose with slots where possible.
- Code examples use CodeMirror for syntax highlighting (see `components/CodeBlock.vue`).

### Naming
- Pages: `pages/index.vue`, `pages/topic/[slug].vue`
- Components: `components/Sidebar.vue`, `components/TopBar.vue`, `components/ConceptMap.vue`, `components/ArticleContent.vue`
- Interactive widgets: `components/interactives/<Name>.vue` (e.g. `TokenPlayground.vue`)
- Topic data: `data/topics.ts` — exported `topics` array

### Styling Rules
- Dark mode is toggled by adding/removing `dark` class on `<html>`.
- Use the utility classes defined in `main.css` (`.btn`, `.card`, `.mono`, `.grid-bg`, etc.).
- Font-size steppers use `data-size` attribute: `sm | base | lg | xl`.
- Reading progress is tracked per-topic in localStorage.