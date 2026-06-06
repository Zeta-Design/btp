# Photography sites (Astro)

One codebase that powers every photography-category site (one brand per domain),
with SEO and a blog built in. Public pages are static and fast; bookings,
contracts, and payments live in **Dubsado** (embedded on the Inquire page).

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static output → dist/
pnpm preview    # preview the production build
```

## Write a blog post (SEO-ready)

Add a Markdown file in `src/content/blog/`, e.g. `my-post.md`:

```md
---
title: "Best Wedding Venues in Asheville"
description: "A local photographer's guide to the most beautiful venues — required for SEO."
pubDate: 2026-06-10
tags: ["weddings", "asheville"]
---

Your content…
```

You get automatically: a static page at `/blog/my-post/`, canonical + Open Graph
tags, `BlogPosting` JSON-LD, an entry in `sitemap-index.xml` and `rss.xml`.
Set `draft: true` to hide a post until it's ready.

## Add photos (fast by default)

Put images in `src/assets/`, then use `astro:assets` — it outputs AVIF/WebP,
responsive sizes, and lazy-loads:

```astro
---
import { Image } from 'astro:assets';
import hero from '../assets/hero.jpg';
---
<Image src={hero} alt="Describe the photo" widths={[640, 1024, 1600]}
       sizes="100vw" formats={['avif', 'webp']} priority />
```

Mark the single largest above-the-fold image `priority` (it's your LCP element);
let everything else lazy-load.

## Connect Dubsado

In `src/config/site.ts`, paste your Dubsado lead-capture form's share link into
`dubsadoFormUrl`. The Inquire page embeds it automatically.

## Launch another category / domain

1. Add a brand to `BRANDS` in `src/config/site.ts` (name, tagline, Dubsado form).
2. Create a new Vercel project from this repo with env:
   `PUBLIC_BRAND=<your-brand>` and `SITE_URL=https://thatdomain.com`.
3. Point the domain at that project. Same code, separate fast static site.

## Deploy (Vercel)

Static output — Vercel auto-detects Astro. Set `SITE_URL` (and `PUBLIC_BRAND`
if not `main`) in the project's environment variables.
