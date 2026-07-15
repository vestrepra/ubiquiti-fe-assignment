# Context

## Home Task

Imagine that you are a developer at Ubiquiti, Inc. and your product manager has
asked you to help another team - to kick-start a project and put it in good shape
for that other team to take over.

Your product manager has shared the context: multiple teams need a shared
internal productivity tool to help developers, designers, PM’s and other roles to
discover, verify, share and align on insights about Ubiquit’s products and their
images to visualize the product database [UIDB](https://static.ui.com/fingerprint/ui/public.json) which is used by many systems.

The designers have defined the UX and UI for all the features that the teams were
asking for – Figma file in the attachments. But they have not negotiated the
design with you. Feel free to alter things if you have good reasons.

Currently these are the key fields in UIDB:

- `id` - primary key
- `line` - what you use for Filters
- `product.name` - human readable name
- `shortnames` - multiple lookup keys as used by various systems and their versions
- `images.default` - used for image urls

Image urls can be built using:
`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${id}%2Fdefault%2${images.default}.png&w=${size}&q=75`

For an example see:
[https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2Fed67d43e-2d5c-4928-ace8-edf984baeff1%2Fdefault%2F977c1f8c477549aeb7238727fd4ecc62.png&w=640&q=75](https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2Fed67d43e-2d5c-4928-ace8-edf984baeff1%2Fdefault%2F977c1f8c477549aeb7238727fd4ecc62.png&w=640&q=75)

The UIDB team is not guaranteeing the schema won't change tomorrow. Your
product manager asks you to expect the unexpected and fail gracefully.

React and Typescript are requirements, but the other teams will adopt potential
additional choices.

You don’t know the other team and have no ability to talk to them. Whatever you
hand over has to be in the git repository.

Product managers and designers will not be able to run your code just to see
what you have built. Deploy your latest version somewhere online.

---

## Developer guide

### Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build
npm run lint     # ESLint
npm run format   # Prettier
```

Live demo: [GitHub Pages](https://vestrepra.github.io/ubiquiti-fe-assignment/) (deploys from `main` via GitHub Actions).

### Stack

| Layer               | Choice                                                                   |
| ------------------- | ------------------------------------------------------------------------ |
| UI                  | React 19 + React Compiler                                                |
| Build               | Vite 8                                                                   |
| Language            | TypeScript                                                               |
| Routing             | React Router 7                                                           |
| Server state        | TanStack Query 5                                                         |
| List virtualization | TanStack Virtual 3 (window scroll)                                       |
| Validation          | Zod 4                                                                    |
| Styling             | Tailwind CSS 4 + design tokens                                           |
| Headless UI         | Base UI (`@base-ui/react`) — Dialog, Drawer, Popover, Autocomplete, etc. |
| SVG icons           | `vite-plugin-svgr` (`import Icon from '@/assets/foo.svg?react'`)         |

### Architecture

The app is a client-side SPA that fetches a single UIDB JSON payload, caches it with TanStack Query, and derives views via `select`. There is no custom backend.

```
main.tsx
  └── Providers (QueryClient)
        └── App
              └── Router (basename-aware)
                    └── Shell (Header + ErrorBoundary + Outlet)
                          ├── CatalogPage
                          └── ProductDetailPage
```

**Data flow:** `products.api` fetches JSON → `products.schema` validates (fail-soft per device) → `products.queries` exposes hooks → feature pages/components consume hooks and render UI.

**URL state:** catalog filters live in search params (`?q=`, `?line=`, `?view=`). Product detail uses path params (`/product/:id`).

### Folder structure

```
src/
├── app/                    # App wiring (no feature logic)
│   ├── App.tsx
│   ├── providers.tsx       # QueryClientProvider
│   ├── query-client.tsx
│   └── routes.tsx          # Route definitions
├── features/               # Feature slices (vertical ownership)
│   ├── catalog/
│   │   ├── pages/          # Route-level screens
│   │   ├── components/     # Feature-specific UI (grouped by area)
│   │   ├── hooks/          # Feature hooks (filters, grid columns, scroll)
│   │   └── lib/            # Pure helpers (e.g. filterDevices)
│   └── product/
│       ├── pages/
│       ├── components/
│       └── hooks/
├── shared/
│   ├── api/products/       # Fetch, Zod schema, query hooks
│   ├── ui/                 # Presentational primitives only
│   ├── layout/             # Shell, Header, Toolbar, navigation chrome
│   ├── lib/                # Cross-cutting utilities (cn, image URL, focus)
│   ├── error-boundary/     # ErrorBoundary + PageErrorFallback
│   └── pages/              # Shared pages (NotFound)
├── assets/                 # SVGs, static images imported by components
└── styles/
    └── index.css           # Tailwind + @theme design tokens
```

### Component layers

Three layers — keep responsibilities separate:

1. `shared/ui/` — dumb primitives (Button, Cta, Dialog, Image, Skeleton, SearchBar…). No data fetching, no business rules. Wrap Base UI parts here with project styling.
2. `shared/layout/` — spatial chrome reused across pages (Shell, Header, Toolbar, PageContainer).
3. `features/*/components/` — composed UI for a specific feature (CatalogFilter, ProductDetailsImage, CatalogViewGrid…). May use hooks and shared primitives.

**Pages** (`features/*/pages/`) are thin: wire hooks, handle loading/error/empty states, compose feature components.

### Where to put new work

| Adding…                         | Put it in…                                                  |
| ------------------------------- | ----------------------------------------------------------- |
| New screen / route              | `features/<name>/pages/` + register in `src/app/routes.tsx` |
| Feature-specific UI             | `features/<name>/components/<area>/`                        |
| Feature hooks / URL state       | `features/<name>/hooks/`                                    |
| Pure feature logic              | `features/<name>/lib/`                                      |
| Reusable button, input, overlay | `shared/ui/<name>/`                                         |
| New API endpoint + types        | `shared/api/<resource>/` (`.api`, `.schema`, `.queries`)    |
| Layout chrome                   | `shared/layout/`                                            |
| App-wide utility                | `shared/lib/`                                               |
| Design token                    | `src/styles/index.css` `@theme` block                       |

**New feature checklist:**

1. Create `src/features/<feature>/` with `pages/`, `components/`, `hooks/` as needed.
2. Add route(s) under `Shell` in `routes.tsx`.
3. Reuse `shared/api/products` if the data still comes from UIDB; add a new `shared/api/` module only for a different source.
4. Add primitives to `shared/ui/` only when the component is generic enough to reuse elsewhere.

### Conventions

- Import alias `@/` → `src/` (configured in `vite.config.ts`).
- One component per file; filename matches export (`PascalCase.tsx`).
- Colocate component CSS next to the component (e.g. `dialog.css`) and `@import` it from `src/styles/index.css`.
- Merge classes with `cn()` from `@/shared/lib/cn`. Use focus tokens from `@/shared/lib/focus-class`.
- Prefer design tokens (`text-primary`, `bg-surface`, `radius-sm`…) over hardcoded values.
- Base UI wrappers use a `trigger` prop + controlled `open` / `onOpenChange` (see Dialog, Drawer, Popover).

### Data & resilience

- All product hooks share query key `['all-products']` and derive via `select` — don't add duplicate keys for the same JSON.
- `DeviceSchema` uses `z.looseObject` so unknown UIDB fields pass through (used by the JcoSON details dialog).
- Invalid devices are dropped individually (`safeParse` per item), not by failing the whole response.
- Distinguish **fetch errors** (`isError` → `PageErrorFallback`) from **empty results** (filtered list length 0).
- Render throws are caught by `ErrorBoundary` in `Shell` (keyed by pathname).

### Catalog virtualization

The catalog table and grid virtualize against **window scroll** (`useWindowVirtualizer`). If you touch this code, read `AGENTS.md` — React Compiler requires `'use no memo'` on the virtualized views and `useWindowVirtualizer` must be called directly in the component.

### Deployment

- **GitHub Pages** at `/ubiquiti-fe-assignment/` — `base` in `vite.config.ts` and `basename` in `routes.tsx` must stay in sync.
- CI workflow: `.github/workflows/deploy.yml` (build + deploy on push to `main`).

For AI-assisted development conventions, see `[AGENTS.md](./AGENTS.md)`.
