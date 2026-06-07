# Ben Tims Media

Marketing + portfolio site for **Ben Tims Media** — real estate & short-term rental
photography (Greater Austin). Live at **https://bentimsmedia.com**.

- **`site/`** — the Astro app (Vercel **Root Directory = `site`**).
- **`docs/`** — research, plans, and decision records.
- **`CLAUDE.md`** — guide for working in this repo (read it first).

## Quick start

```bash
cd site
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # production build
```

## Admin portal — managing photos (`/admin`)

A private CMS lets you update the site's **gallery photos** without touching code.

- **Where:** `https://bentimsmedia.com/admin` (redirects to `/keystatic`). It's
  **not linked anywhere**, is **noindex**, and is blocked in `robots.txt`, so it
  won't show up in search — you reach it only by typing the URL.
- **Sign in:** with **GitHub**. Editors are whoever has **write access** to the
  `Zeta-Design/btp` repo (add collaborators in GitHub → Settings → Collaborators).
- **Use it:** sign in → **Gallery photos** → add / remove / reorder → **Save**.
  Saving commits to GitHub and the site **redeploys automatically** (~1–2 min);
  new photos are auto-optimized (AVIF/WebP). Each save is one Vercel deploy.
- **How it's wired:** admin photos live in `site/src/assets/gallery/`; the galleries
  read those via `site/src/lib/portfolio.ts`, falling back to
  `site/src/assets/portfolio/` until you add gallery photos — so nothing is ever lost.
- **First-time setup** (one-time, repo owner): create the GitHub app + add env vars —
  full steps in **[`docs/plans/admin-portal-setup.md`](docs/plans/admin-portal-setup.md)**.

> The admin currently manages **photos only** — not blog posts. Blog posts are written
> as Markdown (see below); adding them to the admin is a possible future enhancement.

## Blog

Posts are Markdown files in `site/src/content/blog/`. Authoring guide:
**[`site/BLOG.md`](site/BLOG.md)**. They can be added via the GitHub web editor (no
local setup) or locally, and publish on commit.

## Docs

See `docs/plans/` (tech stack, admin setup, Google Business Profile, pricing notes,
category roadmap, new-photographer plan) and `docs/research/` (CRM selection).
