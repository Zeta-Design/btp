# Photography Website — Tech Stack Plan

> **Date:** 2026-06-06
> **Decision inputs (from the user):** CRM = **Dubsado**; build approach = **custom-coded (Next.js)**.
> **Goal:** one codebase serving **multiple domains** (one per photography category), **low cost +
> easy to scale**, **fast image rendering**, **contracts tracked**, integrating cleanly with the CRM,
> bookkeeping, and payments. Pairs with [`../research/photography-crm-selection.md`](../research/photography-crm-selection.md).

---

## TL;DR — the recommended stack

| Layer | Pick | Why | ~Cost to start |
|---|---|---|---|
| **Frontend** | **Next.js (App Router)**, one multi-tenant codebase | Hostname-based routing serves every category domain from one deploy; best-in-class image component | — |
| **Hosting** | **Vercel** to launch → Cloudflare as the scale/cost fallback | Native Next.js host, zero-config SSL on every custom domain, fastest path live | $0 (Hobby) → $20 (Pro) |
| **Images** | **Cloudflare Images** (or ImageKit) on top of **R2** storage | Per-image pricing (not per-GB) wins for large photo files; auto AVIF/WebP, no egress fees | ~$5–9 |
| **CMS** | **Sanity** (free tier) | Structured galleries/portfolios, great DX, generous free plan, CDN-backed | $0 |
| **CRM / contracts / booking** | **Dubsado Premier** + **multi-brand** | Embedded lead forms per domain; contracts + e-sign + invoices + payment plans live here | $55 + $10/extra brand |
| **Payments** | **Stripe** (through Dubsado) | No custom checkout needed; Dubsado runs deposits + payment plans on Stripe | (Stripe fees only) |
| **Bookkeeping** | **QuickBooks Online**, synced from Dubsado | Sales/1099/P&L/quarterly taxes (CRMs can't — see CRM note) | ~$32 |
| **Glue** | **Zapier** (Dubsado Premier includes it) | Form → Dubsado → QBO automation; future hooks | $0 → $20 |
| **Domains/DNS/analytics** | **Cloudflare Registrar + DNS + Web Analytics** | At-cost domains, free privacy-friendly analytics | ~$1/domain/mo |

**All-in starting cost ≈ $90–130/mo** (excl. Stripe transaction fees), scaling gracefully because the
expensive part — image delivery — is on per-image/flat pricing rather than per-GB bandwidth.

> **The key architectural idea:** the *website* does not store contracts, payments, or client data —
> **Dubsado does.** The site is a fast, beautiful marketing/portfolio front-end that funnels leads into
> Dubsado via embedded forms. This keeps the custom build small, cheap, and low-risk, and means
> "track contracts" is a solved, off-the-shelf capability (Dubsado), not something we build.

---

## 1. Multi-domain architecture (one codebase, many category sites)

You want separate domains per photography category (e.g. `weddings.com`, `portraits.com`,
`commercial.com`). The clean way to do this in Next.js is **one multi-tenant app** that routes by
**hostname**, not one project per domain:

- A small **middleware** reads the incoming `Host` header → looks up a **brand/category config**
  (name, theme/colors, logo, copy, which Sanity dataset, which **Dubsado brand** to embed) → renders
  that experience. One deploy, one bill, N domains. [Vercel Platforms pattern]
- This maps **1:1 to Dubsado's multi-brand feature** (+$10/mo per brand): each website domain ↔ one
  Dubsado brand with its own branded forms, portal, contracts, and invoices.
- Adding a new category later = add a config entry + a domain + a Dubsado brand. No new codebase.

> Because you have a *handful* of category domains (not thousands of tenant sites), this is the *easy*
> end of multi-tenancy — both Vercel and Cloudflare add custom domains + free SSL in seconds. [A/B]

---

## 2. Hosting: start on Vercel, keep Cloudflare as the cost valve

- **Vercel (recommended to launch):** it's the first-party Next.js host — automatic SSL per custom
  domain, image optimization, edge CDN, zero config. Free **Hobby** tier to prototype, **$20/mo Pro**
  for production. Fastest route to live. [A]
- **The watch-out:** Vercel bills bandwidth + function execution at a premium (~$0.08/GB vs
  Cloudflare ~$0.05/GB; ~40% higher at scale). For a *photo-heavy* site that could bite. [B]
- **The mitigation (important):** we **offload all heavy image delivery to a dedicated image CDN**
  (§3), so Vercel isn't serving big files. That keeps Vercel bandwidth low and the host choice cheap.
- **The fallback:** if traffic grows and costs climb, the same Next.js app deploys to **Cloudflare
  Workers/Pages** (via the OpenNext adapter) for ~40% lower hosting cost on global edge. Architect
  cleanly now (no Vercel-only APIs in hot paths) so this migration stays a config change. [B]

---

## 3. Fast images — the single biggest performance + cost lever

For a photography site, images *are* the product and *are* the cost. Two parts: **delivery** and **format**.

### 3a. Where images live and how they're served
- **Store originals in Cloudflare R2** (S3-compatible, **zero egress fees** — 70–90% cheaper than
  S3+CloudFront for media). [C]
- **Serve through an image CDN that transforms on the fly:**
  - **Cloudflare Images** — **$5 per 100k stored + $1 per 100k delivered, no bandwidth fees.** Because
    it charges *per image* not *per GB*, it's ideal for large photo files (a 5MB and a 50KB image cost
    the same to serve). ~60–80% cheaper than Cloudinary at scale. **Recommended for predictable cost.** [C]
  - **ImageKit** — most generous *free* tier (20GB bandwidth, unlimited transforms), $9/mo after. Good
    if you'd rather start free and pay for bandwidth. [C]
  - **Avoid Cloudinary** at scale — 3–5× the cost once transformation credits + bandwidth overages hit. [C]

### 3b. Format + loading best practices (the 2026 playbook) [D]
- **Serve AVIF → WebP → JPEG fallback.** AVIF ≈ 40% smaller than WebP, which is ≈ 30% smaller than
  JPEG. `next/image` negotiates this automatically per browser.
- **One LCP hero per page** with `priority` / `fetchpriority="high"` so it starts loading early
  (saves 1–2s LCP). Don't mark many images high-priority — it cancels the benefit.
- **Lazy-load everything below the fold** (`loading="lazy"`), responsive `srcset` so phones don't
  download desktop-sized files, and **blur-up placeholders** for perceived speed.
- **Cache correctly:** CDN negotiates format via `Accept` header and caches variants with `Vary:
  Accept` (Cloudflare's "Vary for Images") so one URL serves AVIF/WebP/JPEG without cache poisoning.
- Wire `next/image` to the chosen CDN with a **custom loader** so the framework's API stays the same.

> Net effect: visitors get the smallest correctly-sized modern-format image their browser supports,
> from an edge node near them, with the hero prioritized — that's the "loads quick" you asked for.

---

## 4. CMS — managing galleries/portfolio content

- **Sanity (recommended), free tier.** Structured content (shoots, galleries, categories, testimonials),
  real-time editing, code-defined schemas, and a hosted CDN. Generous free plan for a
  portfolio-scale site. [E]
- **Alternative — Payload** (free, self-hosted/code-first) if you want to fully own the data layer;
  more setup, best for very technical teams. [E]
- **Pattern:** Sanity holds metadata + image references; **originals live in R2 / the image CDN** so
  the CMS isn't the delivery path. Editors upload once; the site renders optimized derivatives.

---

## 5. CRM, contracts, booking, payments (Dubsado-centric)

This is where "track contracts" is *solved*, not built:

- **Embed Dubsado lead-capture forms** on each domain (script/iframe snippet). Submissions land in the
  matching **Dubsado brand** → kick off that brand's workflow. Premier = **unlimited lead forms**.
- **Contracts + e-sign, proposals, invoices, payment plans, client portal** all live in Dubsado. The
  website links/embeds; it stores none of this. Built-in contract tracking ✔.
- **Payments = Stripe through Dubsado** (deposits + balances + payment plans). No custom checkout to
  build or secure. (Add direct Stripe or a gallery store later only if you sell prints/products on-site.)
- **Zapier (included in Dubsado Premier)** glues edge cases (e.g. push new bookings to a calendar,
  Slack, or a marketing list) without custom backend code.

---

## 6. Bookkeeping / tax (unchanged from the CRM research — the durable part)

- **QuickBooks Online (~$32/mo)**, with **Dubsado → QBO sync** (native on Premier). QBO owns sales
  tax, 1099s, P&L, and quarterly-estimate sizing. CRMs have no real financial reports — don't try to
  do taxes in Dubsado. Confirm filing with a CPA. [see CRM note §2]

---

## 7. Full monthly cost (starting → scaling)

| Item | Start | At scale | Notes |
|---|---|---|---|
| Domains (Cloudflare Registrar, at cost) | ~$1/domain | ~$1/domain | one per category |
| Hosting (Vercel Pro) | $0–20 | $20 (or ~$5 on Cloudflare) | image CDN keeps bandwidth low |
| Image CDN (Cloudflare Images) | ~$5 | scales per-image, predictable | or ImageKit free → $9 |
| Storage (Cloudflare R2) | ~$0–2 | low (zero egress) | originals |
| CMS (Sanity) | $0 | $0–15 | free tier covers portfolio scale |
| **Dubsado Premier** | **$55** | $55 | + **$10/mo per extra brand/domain** |
| QuickBooks Online | ~$32 | ~$32 | taxes/books |
| Zapier | $0 | $0–20 | if automations grow |
| **Total** | **~$90–110/mo** + $10/extra brand | **~$120–160/mo** | excl. Stripe fees |

---

## 8. Suggested build phases

1. **MVP (1 domain):** Next.js + Sanity + Cloudflare Images, one Dubsado brand with an embedded lead
   form, Stripe-via-Dubsado, QBO sync. Ship the fastest, best-looking single-category site.
2. **Multi-domain:** add hostname-based brand config + 2nd/3rd domain + matching Dubsado brands.
   Validate the "one codebase, N sites" pattern.
3. **Performance hardening:** AVIF/WebP pipeline, LCP hero tuning, blur placeholders, Lighthouse/Core
   Web Vitals pass; add Cloudflare Web Analytics + per-domain SEO/sitemaps.
4. **Scale/cost review:** if bandwidth/function costs climb, port to Cloudflare Workers (OpenNext).
   Add a gallery/print-sales platform (Pic-Time/Pixieset) only if you sell deliverables on-site.

---

## 9. Open questions before building

- Do you need **client photo delivery / print sales** on the sites, or will galleries live in a
  separate tool (Pic-Time/Pixieset)? Dubsado has no galleries — this affects whether we add a sales layer.
- How many **category domains** at launch vs. later (sizes the Dubsado multi-brand cost)?
- Do you want a **blog/SEO content** engine per domain (Sanity handles it; affects schema design)?
- Any need for **online scheduling** on-site (Dubsado Premier has a scheduler we can embed)?

---

## Sources (graded)

- **[A]** Vercel — *Next.js multi-tenant guide* / Platforms starter — https://vercel.com/guides/nextjs-multi-tenant-application · https://github.com/vercel/platforms
- **[B]** DEV / Digital Koncept — *Vercel vs Cloudflare Pages cost 2026* (~40% hosting delta; Cloudflare edge) — https://dev.to/johalputt/contrarian-view-2026-startups-should-skip-vercel-for-nextjs-15-use-cloudflare-pages-for-40-5gl4 · https://www.digitalkoncept.in/blog/vercel-vs-cloudflare-hosting-ai-cost-nextjs-vinext-best-practices-2026
- **[C]** LeanOps / theimagecdn / Cloudflare docs — *Cloudflare Images vs Cloudinary vs ImageKit + R2 pricing 2026* — https://leanopstech.com/blog/cloudflare-images-pricing-2026/ · https://developers.cloudflare.com/images/pricing/ · https://leanopstech.com/blog/media-storage-serverless-cost-comparison-2026/
- **[D]** Request Metrics / DebugBear / Next.js docs — *high-performance images, next/image, AVIF/WebP, LCP* — https://requestmetrics.com/web-performance/high-performance-images/ · https://www.debugbear.com/blog/nextjs-image-optimization · https://nextjs.org/docs/14/app/building-your-application/optimizing/images
- **[E]** Hygraph / Prismic — *best (free) headless CMS 2026; Sanity & Payload* — https://hygraph.com/blog/best-free-headless-cms · https://prismic.io/blog/best-nextjs-headless-cms-platforms
- **[Dubsado]** Pricing + lead-capture embedding 2026 — https://assembly.com/blog/dubsado-pricing · https://help.dubsado.com/en/articles/467061-share-a-lead-capture-form

> _Status: tech-stack plan v1, based on the chosen Dubsado + custom-Next.js direction. Pairs with the
> CRM selection research note. Next: resolve §9 open questions, then scaffold the MVP (phase 1)._
