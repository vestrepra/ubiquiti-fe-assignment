# AGENTS.md

Internal tool to browse the Ubiquiti product database (UIDB). See `README.md` for the assignment brief.

## Stack

React 19 (Compiler on) · Vite 8 · TS · React Router 7 · TanStack Query 5 · TanStack Virtual 3 · Zod 4 · Tailwind 4 · Base UI (`@base-ui/react`).

## Commands

- `npm run dev` — dev server
- `npm run build` — `tsc -b && vite build` (run before finishing; must pass)
- `npm run lint` — ESLint (must pass)
- `npm run format` — Prettier

## Layout

- `src/app/` — entry wiring: `providers`, `query-client`, `routes`, `App`.
- `src/features/<feature>/` — `pages/ components/ hooks/ lib/`. Features: `catalog`, `product`.
- `src/shared/ui/` — **presentational primitives only** (Button, Cta, Dialog, Drawer, Popover, Checkbox, Image, Skeleton, SearchBar, Logo, Hamburger). No data/business logic.
- `src/shared/layout/` — spatial chrome (Shell, Header, PageContainer, MainNavigation, Toolbar).
- `src/shared/api/products/` — `products.api` (fetch), `products.schema` (Zod + types), `products.queries` (hooks). Import via `@/shared/api/products`.
- `src/shared/error-boundary/`, `src/shared/lib/`, `src/shared/pages/`.

## Conventions

- Import alias `@/` → `src/` (see `vite.config.ts`). Prefer it over deep relative paths.
- One component per file, `PascalCase.tsx` matching the export. Colocate a component's `.css` next to it (e.g. `dialog.css`) and `@import` it from `src/styles/index.css`.
- Styling: Tailwind + design tokens from `src/styles/index.css` `@theme` (`text-primary`, `text-heading`, `bg-surface`, `radius-sm`, etc.). **Don't hardcode hex/px** that a token exists for.
- Merge classes with `cn()` (`@/shared/lib/cn`). Reuse focus styles from `@/shared/lib/focus-class`.
- Base UI parts are wrapped as primitives (Dialog, Drawer, Popover) exposing a `trigger` prop + controlled `open`/`onOpenChange`. Follow that shape for new ones.
- Routes in `src/app/routes.tsx`: `/`, `/product/:id`, `*` → `NotFoundPage`.

## Data & resilience

- Single upstream JSON; all hooks share query key `['all-products']` and use `select` to derive (`useProducts`, `useProduct`). Don't add new query keys for the same source.
- **Expect schema drift.** `DeviceSchema` is `z.looseObject` (unknown fields pass through — relied on by the JSON dialog). `ProductsResponseSchema` drops invalid devices individually via `safeParse` instead of failing the whole payload. Keep this fail-soft behavior.
- Fetch/render errors surface through `PageErrorFallback` + `ErrorBoundary` (keyed by pathname in `Shell`). Handle `isError` separately from empty results.

## Virtualization (catalog) — fragile, read before touching

- Window scroll (`useWindowVirtualizer`), not an inner scroll container.
- `CatalogViewTable` and `CatalogViewGrid` need `'use no memo';` at the top — React Compiler otherwise memoizes and rows blank out while scrolling.
- Call `useWindowVirtualizer` directly in the component, not inside a custom hook.
- Grid uses `lanes: columnCount` (`useCatalogGridColumns`); table uses spacer rows. Scroll offset resync on mount via `useWindowScrollMargin` (fixes blank list on back-navigation).

## Do / Don't

- Do run `npm run build` and `npm run lint` before wrapping up.
- Don't commit unless explicitly asked.
- Don't add narrating comments; comment only non-obvious intent.
