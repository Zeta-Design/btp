# Future Service Categories — Roadmap

> **Date:** 2026-06-06
> **Status:** parked for later. The website currently launches with **Real Estate &
> Airbnb only**. This doc preserves the *other* categories Ben offers so we can add
> them back deliberately, not lose them. Pricing for all categories lives in
> [`photography-pricing-notes.md`](./photography-pricing-notes.md).

## Current focus

**Real Estate & short-term rental (Airbnb/VRBO) photography** — the only category
on the live site (`bentimsmedia.com`) right now. Interiors, exteriors, and gimbal
walkthrough video. Everything below is intentionally excluded from the site today.

## Categories excluded for now (to add later)

Captured from Ben's original full-service site copy:

| Category | What it covers (original copy) |
|---|---|
| **Portrait Sessions** | Individuals, couples, and families — on location, in studio, or "I'll come to you." Headshots for professionals and creatives. |
| **Events** | Live events, performances, and entertainment — from comedy clubs to concert stages. Capturing energy and moments that can't be recreated. |
| **Maternity & Newborn** | "Bump to baby" — expecting or just-welcomed. The moments worth slowing down for. |
| **Pets** | Pet photography (appeared in the portfolio filters + contact session-type list; no long description yet). |
| **Landscape** | Landscape photography (appeared in the portfolio filters; no long description yet). |

> Original site also described Ben's work as spanning "portraits, event photography,
> real estate, landscapes, families, and pets." We narrowed the public site to real
> estate; the rest are preserved here.

## How to bring a category back (when ready)

The site is already built for this — two clean options per category:

1. **Add it as a section/page on the current site** — extend `What I offer`, add
   portfolio filtering, and add the session type to the Dubsado lead form.
2. **Give it its own brand/domain** — the multi-brand architecture in
   `site/src/config/site.ts` (`BRANDS`) + a per-deploy `PUBLIC_BRAND`/`SITE_URL`
   lets each category run as its own site (e.g. a portraits domain) from the same
   codebase, with its own Dubsado brand + lead form.

**Open decisions for later:** one combined site vs. separate brands; which 1–2
categories to add first (based on demand + margin); whether pets/landscape get full
treatment or stay as occasional work. Revisit alongside the pricing/market research.
