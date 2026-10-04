# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Atelier Store: an ecommerce app at the initial-scaffold stage. Stack is Next.js 16 (App Router, `src/` dir, Turbopack), TypeScript, Tailwind CSS v4, Better Auth, Drizzle ORM, and Postgres on Neon. Package manager is npm. Path alias `@/*` maps to `src/*`.

Next.js 16 differs from older versions; per AGENTS.md, check `node_modules/next/dist/docs/` before using Next APIs.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)
- `npm run typecheck` — `tsc --noEmit`
- `npm run db:generate` — generate SQL migrations from the Drizzle schema into `./drizzle`
- `npm run db:migrate` — apply migrations
- `npm run db:push` — push schema directly to the database (no migration files)
- `npm run db:studio` — Drizzle Studio
- `npm run db:seed` — upsert the initial catalogue from `src/db/seed-data.ts` (idempotent; reads `.env.local`)

No test framework is set up yet.

## Environment

Copy `.env.example` to `.env.local`. Required: `DATABASE_URL` (Neon), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`. `drizzle.config.ts` loads `.env.local` explicitly via dotenv, since drizzle-kit runs outside Next and does not read Next's env files on its own. `.gitignore` ignores `.env*` except `.env.example`.

## Architecture

- **Database** — `src/db/index.ts` exports `db`, a Drizzle client over Neon's HTTP driver (`drizzle-orm/neon-http`), constructed with the full schema from `src/db/schema.ts`. The HTTP driver does not support interactive transactions; switch to `drizzle-orm/neon-serverless` (WebSocket `Pool`) if those are needed.
- **Schema** — `src/db/schema.ts` is the single schema entry point used by both drizzle-kit (`drizzle.config.ts`) and the runtime client. Put tables there or re-export them from it. It currently holds the catalogue: `categories` 1─N `products` 1─1 `product_stock`.
- **Auth** — `src/lib/auth.ts` is the server-side Better Auth instance using `drizzleAdapter(db, { provider: "pg", schema })`. `nextCookies()` must stay the last plugin. `src/lib/auth-client.ts` is the React client (`better-auth/react`). All auth HTTP traffic goes through the catch-all route `src/app/api/auth/[...all]/route.ts`.
- **Design system** — `src/app/globals.css` is the single source of design tokens (`@theme`) and reusable primitives (`@utility`); there is no `tailwind.config`. Fonts are loaded via `next/font` in `src/app/layout.tsx` (Jost → `font-sans`, Cormorant Garamond → `font-serif`). Rules: monochrome palette (`ink`, `paper`, `surface`, `muted`, `line`; `danger`/`success` for states only), square corners, 1px `line` hairlines, uppercase tracked `label`/`eyebrow` for UI text, serif only via `display-*` headings. Compose buttons as `btn btn-primary|secondary|inverse|ghost` (+ `btn-sm`, `btn-block`). Page width comes from `container-page|wide|text` and the responsive `--gutter`/`--section-y` vars, not ad-hoc `px-*`/`max-w-*`. Custom utilities are only emitted once a class is used somewhere.
- **Storefront & catalogue** — Customer-facing pages live in the `src/app/(storefront)/` route group, whose layout adds the announcement bar, header and footer. Product data is read through `src/lib/catalog.ts` (see Database conventions). Site content (navigation, editorial images, collections, services) lives in `src/lib/sample-data.ts`. Images come from Unsplash via `src/lib/unsplash.ts` (gallery "detail shots" are focal-point crops of the main photo); `next.config.ts` allows `images.unsplash.com/photo-*`. Sample photos are checked for third-party logos/labels; keep new ones brand-free.
- **Auth tables don't exist yet.** Better Auth needs `user`, `session`, `account`, `verification` tables. Generate them with `npx @better-auth/cli generate --output src/db/auth-schema.ts`, re-export from `src/db/schema.ts`, then `npm run db:generate` + `npm run db:migrate` as a separate migration. Re-run the generator after adding Better Auth plugins that add tables or fields.

## Database conventions

- **Scope.** The schema covers only categories, products and stock. Don't add carts, orders, payments, reviews, wishlists or product variants unless asked.
- **Migrations.** Change the schema with versioned migrations: `db:generate`, review the SQL in `drizzle/`, then `db:migrate`. Don't use `db:push`, and don't edit migrations that have already been applied.
- **Money.** Store prices as integer minor units (`price_cents`), never as floats or decimals in JS.
- **Stock.** Quantity lives in `product_stock` (1:1 with products, 0 = sold out). Don't add stock columns to `products`. `products.sizes` is display-only (`{label, inStock}[]` set by hand) and is not inventory. Per-size stock waits for variants.
- **Keys.** Tables use integer identity PKs. Public-facing lookups (URLs, seed upserts, curated lists) go by the unique `slug`.
- **Delete rules.** A category can't be deleted while products use it (`restrict`). Child rows owned by a product, such as stock, are removed with it (`cascade`).
- **Data access.** Pages and components never import `db`. All catalogue reads go through `src/lib/catalog.ts`, which maps rows to plain domain types (`Product`, `Category`). Change the mapping there rather than leaking row shapes into the UI.
- **Merchandising stays in code.** Hand-picked lists such as `newArrivalSlugs` and `giftEditSlugs` in `src/lib/sample-data.ts` are slug arrays, not DB flags. Queries return them in the listed order.
- **Seeding.** `src/db/seed.ts` must stay idempotent (upsert by slug). The neon-http driver has no interactive transactions, so write with `db.batch([...])` and resolve foreign keys by slug subqueries rather than by returned ids.
- **Imports.** Files under `src/db/` use relative imports, not `@/`, because drizzle-kit and `tsx` run outside Next.
- **Build.** Storefront pages query at build time and revalidate every 60s, so `next build` needs `DATABASE_URL`.
