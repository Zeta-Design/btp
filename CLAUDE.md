# CLAUDE.md — Ben Tims Media (btp)

Project guide for working in this repo. Read before making changes.

## What this is
- **Ben Tims Media** — a real estate & short-term rental photography business site.
- **Live:** https://bentimsmedia.com · **Repo:** `Zeta-Design/btp` · **Host:** Vercel.
- The photographer's actual work currently includes landscape/nature/travel; the copy
  is real-estate-focused (a known mismatch to reconcile later).

## Repo layout
- `site/` — the **Astro app** (Vercel **Root Directory = `site`**).
- `docs/` — research & plans (see "Key docs" below).
- `.claude/skills/ui-ux-pro-max/` — vendored UI/UX design skill (MIT).

## Working rules (important)
1. **RESEARCH BEFORE CHANGING CODE TO FIX AN ERROR.** Web-search the exact error message +
   the tool/stack first, and apply the **documented/canonical** fix — do **not** guess-and-edit.
   Then **verify locally before pushing** with a clean reproduction (from `site/`):
   `rm -rf node_modules && pnpm install --frozen-lockfile && pnpm build`. Guessing here already
   caused several failed Vercel deploys (e.g. the `tslib` issue) — research first avoids that.
2. **NEVER `git push` / deploy without the user explicitly saying so.** Vercel auto-deploys on
   push to `main` and the project has a **100 deploys/day** cap. Committing locally is fine.
3. Branch off `main` for larger features; end commit messages with the
   `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>` trailer.

## Stack
- **Astro 5** (static-first) + **Tailwind v4** (`@tailwindcss/vite`), self-hosted **Inter**
  + **Playfair Display** fonts (Fontsource). No component lib beyond Tailwind.
- **Images:** `astro:assets` (sharp) → AVIF/WebP + responsive. High-res sources in, optimized
  out. **HEIC isn't supported** — convert with `sips -s format jpeg in.HEIC --out out.jpg`
  (not ffmpeg, which only grabs a thumbnail).
- **CMS/admin:** **Keystatic** (GitHub mode) at `/admin` → `/keystatic` (noindex, robots-blocked,
  unlinked). Adds `@astrojs/react` + `@astrojs/vercel` adapter → build is static **+** server
  routes for the admin only. See `docs/plans/admin-portal-setup.md` (needs a 1-time GitHub app).
  **⚠️ If the admin portal's instructions OR implementation change, update the "Admin portal"
  section in the root `README.md` to match (keep them in sync).**
- **3D gallery:** `/gallery-lab` — vendored Codrops depth gallery (`src/Experience/`, Three.js +
  GLSL via `vite-plugin-glsl`); isolated so its JS loads only on that page. **Dev-only for now**
  (`src/previews/gallery-lab.astro`, injected under `astro dev`; footer link shows in dev only).
- **CRM:** Dubsado lead form embedded on `/contact`. **Books:** QuickBooks Online (manual).

## Build / deploy gotchas
- `packageManager` pinned to **pnpm@11.3.0** (keep Vercel == local).
- pnpm settings live in `site/pnpm-workspace.yaml` (`allowBuilds: esbuild, sharp`) and
  `site/.npmrc` (`public-hoist-pattern[]=tslib` — required so Rollup can resolve `tslib` that
  `graphql-tag`/Keystatic pulls in under pnpm's strict node_modules).
- `astro.config.mjs`: `SITE_URL` is normalized (bare domains get `https://`); `@` → `src` alias
  for the depth-gallery engine; `/gallery-lab`, `/admin`, `/keystatic`, `/api/` excluded from sitemap.
- Multi-domain ready: `PUBLIC_BRAND` + `SITE_URL` env per deploy pick a brand from
  `site/src/config/site.ts`.
- `site/vercel.json` holds security headers + frozen install (no `outputDirectory` — the Vercel
  adapter owns the output).

## Where things live
- Brand/NAP/socials/Dubsado link: `site/src/config/site.ts`.
- Portfolio images: `site/src/assets/portfolio/` (or admin-managed `site/src/assets/gallery/`);
  galleries read both via `site/src/lib/portfolio.ts` (gallery wins, portfolio is the fallback).
- Pages: `site/src/pages/` (home `index`, `about`, `portfolio`, `contact`, `gallery-lab`, `admin`,
  `blog/`). Layouts/components in `site/src/layouts` / `site/src/components`.
- Blog: Markdown in `site/src/content/blog/` — authoring guide in `site/BLOG.md`.
- SEO: `LocalBusiness` JSON-LD on home; `robots.txt`/`rss.xml`/sitemap are endpoints in `pages/`.

## Key docs
- `docs/plans/photography-website-tech-stack.md` — stack decisions.
- `docs/plans/admin-portal-setup.md` — Keystatic admin setup steps.
- `docs/plans/google-business-profile-setup.md` — local SEO / GBP.
- `docs/plans/photography-pricing-notes.md` — captured pricing (not validated).
- `docs/plans/future-categories-roadmap.md` — parked service categories.
- `docs/plans/starting-a-photography-business.md` — evidence-based new-photographer plan
  (styled HTML/PDF export in `docs/exports/`).
- `docs/research/photography-crm-selection.md` — CRM (Dubsado) research.
- `docs/decisions/` — decision records (currently empty).

## Commands (run from `site/`)
- `pnpm dev` (localhost:4321) · `pnpm build` · `pnpm preview`.
- Verify a tricky build like Vercel does: `rm -rf node_modules && pnpm install --frozen-lockfile && pnpm build`.
