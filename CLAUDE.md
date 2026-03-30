# CLAUDE.md — AI Assistant Guide for unduck-startpage

## Project Overview

**unduck-startpage** is a browser startpage built with SvelteKit, featuring DuckDuckgo bang-powered search (via [unduck.link](https://unduck.link)), themes, search suggestions, shortcuts, and a configurable clock/title. It is deployed to Vercel at [search.gs0.me](https://search.gs0.me).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | SvelteKit 2.x with Svelte 5 |
| Language | TypeScript (strict: false) |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Build tool | Vite 7 |
| Package manager | pnpm (see `.npmrc`, `pnpm-workspace.yaml`) |
| Deployment | Vercel (`@sveltejs/adapter-vercel`) |
| Analytics | `@vercel/analytics` |
| ASCII art | `figlet` (for clock display) |

---

## Project Structure

```
unduck-startpage/
├── src/
│   ├── app.html              # HTML shell
│   ├── app.css               # Global styles, @theme vars, all theme definitions
│   ├── app.d.ts              # TypeScript ambient declarations
│   ├── lib/
│   │   ├── index.ts          # $lib barrel (currently empty)
│   │   ├── bangSearch.ts     # Client-side bang search (lazy-loads /data/bangs.json)
│   │   ├── assets/
│   │   │   └── favicon.svg
│   │   ├── Clock.svelte      # ASCII/basic clock display (uses figlet)
│   │   ├── Logo.svelte       # SVG search logo (fills accent color)
│   │   ├── Searchbar.svelte  # Search input + suggestions display
│   │   ├── Shortcut.svelte   # Individual shortcut bookmark tile
│   │   ├── Theme.svelte      # Theme preview card (used in /themes)
│   │   └── stores/
│   │       ├── options.ts    # User preferences (bang, suggestions, title, clock font, etc.)
│   │       ├── shortcuts.ts  # Shortcuts list (localStorage-backed)
│   │       ├── suggestions.ts# Reactive visibility state for suggestions dropdown
│   │       └── theme.ts      # Active theme (localStorage-backed, applies data-theme attr)
│   └── routes/
│       ├── +layout.svelte    # Root layout: meta tags, header nav, analytics
│       ├── +page.svelte      # Home page: clock/title, searchbar, shortcuts
│       ├── options/
│       │   └── +page.svelte  # Settings page: bang, suggestions, title, shortcuts CRUD
│       ├── themes/
│       │   └── +page.svelte  # Theme picker grid
│       └── api/
│           └── suggestions/
│               └── +server.ts # Server-side proxy to DuckDuckGo autocomplete API
├── static/
│   ├── robots.txt
│   ├── assets/               # card.webp (OG image), screenshot.png
│   └── fonts/                # Self-hosted Inter + Space Mono woff2 files
│                             # + figlet .flf font files (Alligator2, Banner3, Slant)
├── svelte.config.js          # SvelteKit config (adapter-vercel, vitePreprocess)
├── vite.config.ts            # Vite plugins: tailwindcss(), sveltekit()
├── tsconfig.json             # TypeScript config (strict: false, moduleResolution: bundler)
└── package.json
```

---

## Development Commands

```bash
pnpm dev          # Start dev server (hot reload)
pnpm build        # Production build
pnpm preview      # Preview production build locally
pnpm check        # Type-check with svelte-check
pnpm check:watch  # Type-check in watch mode
```

There is no test suite currently.

---

## Architecture & Key Conventions

### Svelte Version Mixing
The codebase uses **both Svelte 4 and Svelte 5 syntax** in different files:
- `+layout.svelte` uses Svelte 5 runes: `$props()`, `{@render children?.()}`
- `Searchbar.svelte`, `Shortcut.svelte`, `Theme.svelte` use Svelte 4 syntax: `export let`, `on:event`, `$:`
- `+page.svelte` (home) uses Svelte 5 syntax: `$state()`, `$derived()`, `$:`
- When editing existing components, match the syntax already used in that file. New components should use **Svelte 5 runes** (`$state`, `$derived`, `$props`, `onclick=` instead of `on:click=`).

### State Management — Svelte Stores + localStorage
All user preferences are managed via Svelte writable stores in `src/lib/stores/`. Every store auto-persists to `localStorage` via a `subscribe` side-effect at module level. The pattern is consistent across all stores:

```ts
const getInitialValue = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("key");
    if (stored) return stored; // or parse/validate as needed
  }
  return defaultValue;
};

export const myStore = writable(getInitialValue());

if (typeof window !== "undefined") {
  myStore.subscribe((value) => localStorage.setItem("key", String(value)));
}
```

**Always guard with `typeof window !== "undefined"`** — SvelteKit does SSR.

### Theme System
Themes are defined exclusively in `src/app.css` as `[data-theme="name"]` CSS attribute selectors. Each theme sets three CSS custom properties:
- `--color-accent` — primary highlight color
- `--color-background` — page background
- `--color-text` — body text color

Tailwind classes `text-text`, `bg-background`, `text-accent`, `fill-accent`, etc. map to these variables via `@theme` in `app.css`.

**To add a new theme:**
1. Add the theme name (string literal) to the `Theme` union type in `src/lib/stores/theme.ts`
2. Add the string to the validation list inside `getInitialTheme()`
3. Add a `[data-theme="name"]` block to `src/app.css` with the three color variables
4. Add a radio+label entry in `src/routes/themes/+page.svelte`

Theme is applied by setting `document.documentElement.setAttribute("data-theme", theme)`. A `<script>` block in `+layout.svelte` does this synchronously on page load (before hydration) to prevent flash of wrong theme.

### Search / Bangs
- Searches route through `https://unduck.link?q=<query>` which resolves DuckDuckGo bangs
- Default bang is stored in `selectedBang` store (default: `!g`)
- If the user's query already contains a bang (`/!\w+/`), the default bang is not prepended
- The bang must start with `!` and contain no spaces to be valid

### Search Suggestions API
`GET /api/suggestions?q=<query>` — a server-side proxy that fetches from `https://duckduckgo.com/ac/?q=<query>`. The proxy exists to avoid CORS issues. Returns an array of `{ phrase: string }` objects. The client trims results to 5 (`data.splice(5)`).

### Bang Suggestions
When the input matches `/^!\S*$/` (i.e. the query is just a bang fragment with nothing after it), `Searchbar.svelte` enters **bang mode** and filters bangs entirely client-side via `src/lib/bangSearch.ts`.

**Static data (`static/data/bangs.json`):**
- Generated at build time by `scripts/generate-bangs.ts` (run via `npx tsx`) from `src/lib/data/bangs.ts`.
- Contains only the fields needed for display: `{ t, s, d, c, r }` — drops `u` (URL template) and `sc` (subcategory).
- `t` and `s` are pre-lowercased to avoid runtime string allocations.
- ~1.1MB raw / ~220KB gzipped. Listed in `.gitignore`; regenerated on every `pnpm dev` and `pnpm build`.

**Search module (`src/lib/bangSearch.ts`):**
- Lazy-loads `/data/bangs.json` on the first bang keystroke; subsequent calls use the in-memory cache.
- `loadPromise` deduplicates concurrent fetches (e.g. rapid typing before the first load completes).
- `searchBangs(q)` implements the same three-tier matching as the old API: exact trigger → prefix match → site substring match, each tier sorted descending by `r` (popularity). Returns top 5.
- After the initial fetch, filtering 13,569 entries takes <1ms — effectively instant.

**Client (`Searchbar.svelte`):**
- Bang mode is detected reactively: `$: isBangMode = /^!\S*$/.test(query)`.
- On input, if bang mode is active, normal suggestions are cleared and `getBangSuggestions()` is called; it calls `searchBangs(fragment)` and guards against stale results (checks `query` still matches before assigning).
- The dropdown renders each result as `!{bang.t}` (accent monospace) followed by `- {bang.s}` (dimmed).
- Clicking a bang suggestion sets the query to `!{bang.t} ` (with a trailing space) so the user can immediately type their search term; it does **not** submit the search.
- When the query has a bang prefix followed by a space and more text (e.g. `!g foo`), normal suggestions are fetched for the text after the bang (`foo`), and the bang prefix is prepended (dimmed) in the dropdown. Clicking a suggestion preserves the bang prefix and fires the search.

### Shortcuts
- Stored as an array of `{ title: string, url: string, icon: string }` in `localStorage` under key `"shortcuts"`
- Max 14 shortcuts enforced in the options UI
- URLs without `http` prefix are auto-prefixed with `http://`
- Icons are optional; if missing or fails to load, a globe SVG fallback is shown

### CSS / Tailwind Conventions
- Tailwind v4 is used; utility classes are standard Tailwind
- `lang="postcss"` is used in component `<style>` blocks that reference `app.css` via `@reference "../../app.css"` (or `"../app.css"` depending on depth)
- Semantic color tokens: always use `text-text`, `bg-background`, `text-accent`, `fill-accent` rather than literal colors, so themes work correctly
- Opacity variants like `text-text/70` and `bg-neutral-500/10` are used throughout for subtle effects
- Responsive breakpoints: `sm:` prefix is used for tablet+; `max-sm:` for mobile-only overrides

### Fonts
- **Inter** (UI font): self-hosted in `static/fonts/` as woff2 (300, regular, 700, plus italics)
- **Space Mono** (monospace): self-hosted in `static/fonts/` as woff2
- **figlet FLF files**: `Alligator2.flf`, `Banner3.flf`, `Slant.flf` live in `static/fonts/` and are used by the `figlet` npm package to render ASCII-art clock text

### Navigation
The header (in `+layout.svelte`) has three icon links: `/` (home/search), `/themes`, `/options`. Active route highlights the icon by switching `fill-accent`; inactive icons highlight on hover.

---

## localStorage Keys Reference

| Key | Store | Default | Notes |
|---|---|---|---|
| `theme` | `theme` | `"dark"` | Must match `Theme` union type |
| `defaultBang` | `selectedBang` | `"!g"` | Must start with `!` |
| `useSuggestions` | `useSuggestions` | `true` | Stored as `"true"`/`"false"` string |
| `titleMode` | `titleMode` | `"clock"` | `"clock"` \| `"title"` \| `"text"` \| `"none"` |
| `clockFont` | `clockFont` | `"none"` | `"Alligator2"` \| `"Banner3"` \| `"Slant"` \| `"none"` |
| `showDate` | `showDate` | `false` | Shows date below clock |
| `titleText` | `titleText` | `"unduck $L"` | `$L` is replaced by the Logo SVG |
| `shortcuts` | `shortcuts` | `[]` | JSON array of `{title, url, icon}` |

---

## Deployment

- Deployed on **Vercel** using `@sveltejs/adapter-vercel`
- `svelte.config.js` uses `adapter-vercel` directly (not `adapter-auto`)
- Vercel Analytics is injected in `+layout.svelte` via `injectAnalytics()`
- The API route (`/api/suggestions`) runs as a Vercel serverless function
- Production URL: `https://start.gs0.me`

---

## Planned / In-Progress Features (from README)

- [ ] Custom colors, background image support
- [ ] Favicon auto-fetching for shortcuts
- [x] Bang suggestions/display in the search bar
- [ ] Weather widget
- [ ] Self-hosted search (not relying on unduck.link)
