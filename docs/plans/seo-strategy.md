# SEO & Traffic Strategy — Plan / SOP

> **Status:** Draft. Owner: Ben. Date: 2026-07-02.
> Related: [`future-categories-roadmap.md`](./future-categories-roadmap.md) (reopens its
> "one combined site vs. separate brands" open decision), [`google-business-profile-setup.md`](./google-business-profile-setup.md),
> [`photography-website-tech-stack.md`](./photography-website-tech-stack.md).
> The question: how do we maximize organic traffic to bentimsmedia.com while the owner
> wants a **broader mix** (real estate/STR **and** landscape/travel) — without wrecking
> local ranking? The constraint: solo operator, limited hours, **two real home bases
> (Austin TX + Denver CO) and travel-available nationwide** (Orlando, Miami, Phoenix, plus
> drivable Texas — San Antonio/Dallas/Houston); the owner does **not** want to be tied to
> one city. Strong technical SEO already in place.

---

## 1. TL;DR

- **The biggest traffic lever isn't the website — it's a verified Google Business Profile (GBP).**
  For "photographer near me / real estate photographer Austin" searches, the map "local pack"
  sits above the normal results. No GBP = invisible there. Set it up first. It's free.
- **Local SEO rewards proximity — you can't fake it.** Flying into Orlando/Phoenix occasionally will
  never rank you in *their* local pack; Google needs a real base there, and pretending risks a profile
  suspension. So the plan is **tiered by how real your presence is** in each place.
- **Split the strategy by service type — this is the key move:**
  - **Real estate (agent/MLS) = LOCAL.** Anchor to your two real bases, **Austin** and **Denver**
    (+ drivable cities like San Antonio). Local pack + reviews + location pages, base by base.
  - **Vacation rental / STR = TRAVEL/DESTINATION.** STR owners are often out-of-state and *want* a
    photographer who travels. Position as a **"destination STR photographer, available nationwide"**
    and win Orlando/Miami/Phoenix via portfolio + content + referrals — **not** the local pack.
  Your travel range becomes the selling point instead of a liability.
- **GBP with two bases is legitimate** (you genuinely operate from both) and the **address is hidden**
  for a service-area business — so your home base isn't advertised. But two half-tended profiles rank
  worse than one strong one: **start GBP at your busier base, add the second when you'll work it.**
- **Landscape/travel stays walled off** (below) — separate from *both* the local real-estate and the
  destination-STR strategies.
- **Landscape/travel stays on the *same website* but in a walled-off section** (e.g. `/prints` or
  `/travel`), presented as fine-art/personal work — **kept out of the real-estate navigation and
  keywords** so it doesn't blur the local signals. Do **not** put it on a separate subdomain or a
  second site right now; splitting a small site weakens both halves.
- **Build a few genuinely local pages, not city-swap spam.** A handful of pages like "Real Estate
  Photography in Round Rock" — each with *real* photos and specifics from that area — help. The same
  page copied with the city name swapped is against Google's rules and can get you penalized.
- **Fix the duplicate pricing pages now** (`pricing-b/c/d` are indexable near-duplicates — quick win).
- **Content is the slow compounding engine:** answer the questions agents and Airbnb hosts actually
  type into Google. One good article every ~2 weeks beats a burst then silence.
- **Rough target:** GBP + Search Console live within 2 weeks; 3 local pages + 2 service pages + fixed
  titles within ~6 weeks; first 5 Google reviews within 90 days; measure in Search Console, not likes.

**Jargon, defined once:** *Local pack* = the map + 3 businesses Google shows for local searches.
*GBP* = Google Business Profile, the free listing behind that map. *Topical authority* = Google
trusting you as an expert on one subject because your site covers it deeply; mixing unrelated
subjects dilutes it. *Search Console* = Google's free tool showing what you rank for.

---

## 2. The reasoning

**Why real estate is the money-niche and landscape is not (for local SEO).** Real-estate/STR
photography is a *local, high-intent, commercial* service: someone in Austin needs listing photos
this week and will pay. Landscape/travel is the opposite: a *global, low-commercial-intent*
audience buying prints or licensing stock, who don't care where you're based. These are two
different businesses with two different customers. Google's local pack — the single biggest source
of calls for a service business — only serves the local one. And Google only lets a business hold
**one** Business Profile with **one** primary category, so you can't be "the Austin real estate
photographer" *and* "the landscape print artist" in the map. You have to choose which one the local
machinery points at, and the one that pays locally is real estate.

**Why keep landscape on the same domain anyway (just walled off).** The instinct is "put landscape
on its own subdomain or site so it doesn't interfere." For a solo operator that's the wrong move.
SEO authority and topical trust don't flow freely between a subdomain and the main site, and
splitting a small amount of content across two properties means neither builds up enough signal to
rank — you'd be starting two weak sites instead of one getting stronger. The clean compromise:
**one domain, landscape lives in its own subfolder** (`/prints` or `/travel`), clearly framed as
personal/fine-art work, and deliberately kept out of the real-estate nav, homepage, and keyword
targets. Search engines and clients both see a focused real-estate business with a tasteful "personal
work" wing — not a confused generalist. If landscape ever grows into a real revenue stream, the
codebase already supports spinning it into its own brand/domain later (the `BRANDS` architecture);
that's a *future* decision, not a now decision.

**Why the boring stuff (GBP, reviews, Search Console) beats clever tricks.** For local service
businesses, the ranking factors that move the needle are proximity, the Business Profile, and
reviews — not meta-tag wizardry. Your technical SEO is already good; the gap is that the free local
tools aren't set up and there's almost no content. So the plan front-loads GBP + Search Console +
reviews (off-site, only you can do them), then the on-site pages, then the slow content engine.

**Why location pages are a scalpel, not a firehose.** It's tempting to auto-generate a page for all
20 cities you serve. Google's spam policy explicitly targets exactly that — "doorway" pages that are
the same boilerplate with the city name swapped — and the penalty is a ranking drop or deindexing.
So we build a *few* real ones for cities where you actually have shot (or will), each with genuine
local specifics and real photos, internally linked. Quality over coverage.

**The principle underneath all of it (specialize to escape competition):** a focused "Austin real
estate & STR photographer" out-ranks and out-earns an "I shoot everything" generalist, because both
Google and clients reward a clear, dominant answer to one question. The whole plan is in service of
making the site the obvious answer to "who photographs listings/Airbnbs in the Austin area."

---

## 3. Full plan

### 3.0 Foundational positioning (resolve first — everything else depends on it)

> This reopens and answers the open decision parked in
> [`future-categories-roadmap.md`](./future-categories-roadmap.md) ("one combined site vs. separate
> brands"). It is significant enough to also record as a formal decision record (**DR-0002**) once
> confirmed.

**Decision to confirm:** *Primary public positioning = real estate & short-term-rental photography,
run as a **two-base + travel** business — not tied to one city.* Structure the SEO in three tiers
(by how real the presence is) and split by service type:
- **Local tier (real estate / MLS):** anchored to the two genuine home bases, **Austin** and
  **Denver**, each with its own GBP + location pages + reviews; extended to drivable cities in each
  base's ~2-hr service area (e.g. San Antonio from Austin).
- **Destination tier (vacation rental / STR):** a **nationwide "destination STR photographer"**
  positioning that turns travel availability into the selling point (Orlando, Miami, Phoenix, etc.),
  won via portfolio + content + referrals rather than the local pack.
- **Walled-off tier (landscape/travel):** a secondary "personal / fine-art work" section on the same
  domain, excluded from *both* the local and destination commercial surfaces.

**Consequences (incl. the downsides):**
- ✅ Honest with Google (real presence where we claim local), so no suspension risk; still captures
  fly-in markets through the STR/destination angle.
- ✅ Travel range becomes an *asset* for the STR niche instead of a liability.
- ✅ One domain compounds authority across both bases + the destination content.
- ⚠️ **Two GBP profiles = double the local upkeep** (reviews, posts) for a solo op — mitigated by
  launching the busier base first, second base later.
- ⚠️ Fly-in markets **won't rank in the local pack** — accepted; they're won organically/by referral,
  which is slower and less certain than local-pack for the home bases.
- ⚠️ Landscape gets *less* SEO investment and won't rank nationally for travel/landscape terms.
- ⚠️ Requires discipline: don't spin up GBP profiles for cities you only fly into (guideline violation).

### 3.1 Candidate options considered (vs. the Principle Lens)

| Option | What it is | Principles honored / strained | Verdict |
|---|---|---|---|
| **A. One site, real-estate-first, landscape in a walled subfolder** | `/`, `/pricing`, `/real-estate-photography`, `/airbnb-photography`, `/austin`, `/round-rock`… for the money niche; `/prints` or `/travel` for landscape, off the main nav | Honors **#6 specialize**, **#9 own your audience**, **#10 measure**; consolidates topical authority | **Recommended** |
| B. Landscape on a subdomain (`travel.bentimsmedia.com`) | Physically separate the two | Strains #6 and authority consolidation; splits a small site into two weak ones | Rejected now |
| C. Second standalone site/brand for landscape | Full separate domain via `BRANDS` | Same dilution as B + double the upkeep for a solo op; only worth it if landscape becomes real revenue | Deferred (future) |
| D. Blend both equally across one site (generalist) | Homepage + nav mix real estate and landscape | Directly violates **#6**; muddies local signals; weakest ranking outcome | Rejected |

### 3.2 On-site work I can implement (grouped by the four levers)

**Lever 1 — Location + service landing pages** *(highest on-site ROI; build real, not boilerplate)*
- **S-1. Service pages.** Create `/real-estate-photography/` and `/vacation-rental-photography/`, each targeting its commercial keyword, with unique copy, sample work, an FAQ, `Service` + `LocalBusiness` schema, and internal links to pricing/book.
  - **Done when:** both pages are live, in the sitemap, each ≥600 words of unique copy, and link to `/pricing` and `/book`.
- **S-1b. Destination-STR positioning page.** A `/vacation-rental-photography/` (or `/travel`-scoped) page that explicitly markets **"available nationwide — I travel to your rental,"** listing markets shot (Orlando, Miami, Phoenix, Denver mountain towns…) with real travel-shoot photos. Targets "destination/traveling STR photographer" + "[destination] Airbnb photographer" intent that the local pack can't serve.
  - **Done when:** live, names the travel markets with ≥1 real image each, and states the travel offer + how to book.
- **S-2. Local location pages — base-anchored, only where presence is real (start with the 2 bases + 1–2 drivable).** e.g. `/real-estate-photography/austin/`, `/denver/`, `/san-antonio/`. Each needs genuinely local content (neighborhoods/market notes, a real photo shot there, a local testimonial if available), not city-swapped boilerplate.
  - **Done when:** pages live for Austin + Denver (+ drivable cities with real work), each with ≥1 real local image + ≥400 words of non-duplicated local copy + `LocalBusiness`/`areaServed` schema, internally linked from an "Areas served" section, in the sitemap. **Gate:** no real local content for a city → don't publish it (esp. fly-in markets — route those to S-1b instead).

**Lever 2 — Keyword titles + quick technical wins** *(fast, low-risk)*
- **S-3. Fix duplicate pricing pages.** `pricing-b/c/d` are unlinked but indexable near-duplicates (keyword cannibalization). Add `noindex` and exclude from the sitemap, or delete them if the A/B test is over.
  - **Done when:** `pricing-b/c/d` return `noindex` (or 404) and no longer appear in `sitemap-index.xml`.
- **S-4. Keyword-targeted titles & descriptions, unique per page.** Homepage `<title>` → e.g. *"Real Estate & Airbnb Photographer in Austin, TX | Ben Tims Media"*; every page gets a unique, intent-matched title + meta description.
  - **Done when:** every indexable page has a unique `<title>` and `<meta description>` that names its target keyword + location.
- **S-5. Image SEO for the portfolio.** Descriptive `alt` text and descriptive file names (`austin-modern-kitchen-listing.jpg`, not `DSC_8792.jpg`) on real-estate images; consider an image sitemap.
  - **Done when:** all portfolio images on indexable pages have descriptive, non-empty `alt` and human-readable filenames.

**Lever 3 — Content / blog strategy** *(slow compounding engine)*
- **S-6. Refocus the blog on the money-niche.** Move the off-topic *Portugal* post into the walled `/travel` section (or unpublish); keep the blog topically about real estate/STR photography.
  - **Done when:** the main `/blog` index lists only real-estate/STR/business-of-listing content; travel posts live under the landscape section.
- **S-7. Publish buyer-intent + informational articles on a cadence.** Target real queries: *"how much does real estate photography cost in Austin", "do professional listing photos help sell faster", "Airbnb photography tips", "twilight photos for listings", "how to prepare a home for a photoshoot"*. Each targets one keyword, links to a service/pricing page.
  - **Done when:** ≥1 new on-topic article every 2 weeks for a quarter (≥6 articles), each targeting a named keyword and internally linking to a conversion page.

**Lever 4 — Landscape/travel section (walled off)**
- **S-8. Build the separated personal-work section.** `/prints` or `/travel` with its own gallery, reachable from the footer (not the primary/real-estate nav), framed as fine-art/personal work.
  - **Done when:** the section exists, is linked only from the footer/about, and no landscape terms appear in the homepage hero, primary nav, or real-estate service/location pages.

### 3.3 Off-site actions — **owner-only** (biggest local levers; I can't do these for you)

- **O-1. Create & verify Google Business Profile — busier base first.** Follow [`google-business-profile-setup.md`](./google-business-profile-setup.md): service-area business, **hide the home address** (privacy + guideline-correct), primary category **Photographer**, fewest necessary secondary categories, service area ≤ ~2 hrs drive / ≤ 20 areas, NAP identical to the site. Launch **one** profile at whichever base (Austin or Denver) has more real-estate work now; nail reviews there before adding the second base's profile. **Do not** create profiles for fly-in markets (Orlando/Miami/Phoenix) — no genuine presence = suspension risk; those are served by the S-1b destination page instead.
  - **Done when:** the primary-base GBP is verified, live, address hidden, service area set, and NAP matches `site/src/config/site.ts`. (Second base = a later milestone, not blocking.)
- **O-2. Set up Google Search Console (+ Bing Webmaster Tools).** Verify the domain, submit `sitemap-index.xml`, and check the Performance report monthly.
  - **Done when:** domain verified, sitemap submitted, no coverage errors.
- **O-3. Earn reviews.** After each shoot, ask the client to leave a Google review (a short link/QR helps). Reviews are a top-3 local-pack factor.
  - **Done when:** ≥5 Google reviews within 90 days; then a steady ask after every shoot.
- **O-4. Build local citations (NAP consistency).** List the business in a few reputable directories (Yelp, Apple Maps, local real-estate/STR directories) with the *exact same* name/phone/area.
  - **Done when:** ≥5 consistent citations live.
- **O-5. Pursue local, topical backlinks.** Partner links from realtors, brokerages, property managers, stagers you work with; a local feature or guest post. Relevance > volume.
  - **Done when:** ≥3 relevant local inbound links within the quarter.

### 3.4 Targets & metrics *(measure what compounds — Principle #10)*

- **Foundation:** GBP verified + Search Console live **within 14 days**.
- **On-site:** pricing duplicates fixed + titles/descriptions unique **within 2 weeks**; 2 service pages + 3 location pages live **within 6 weeks**.
- **Reviews:** ≥5 Google reviews **within 90 days**.
- **Content:** ≥6 on-topic articles **in the first quarter** (1 / 2 weeks).
- **Track in Search Console (not vanity metrics):** impressions, clicks, and average position for target keywords; local-pack visibility for "real estate photographer Austin" (+ nearby cities); and — the one that pays — **inquiry/booking conversions by lead source** (so you know whether organic actually books work, per Principle #10). Baseline now; review monthly.

### 3.5 Out of scope
- Paid ads (Google/Meta) — this plan is organic only.
- Pricing changes — see [`photography-pricing-notes.md`](./photography-pricing-notes.md) /
  [`real-estate-photography-pricing.md`](../research/real-estate-photography-pricing.md).
- A full separate landscape/travel business & its own SEO strategy (deferred; revisit only if it
  becomes real revenue — then reconsider Option C).

### 3.6 Open questions
- ~~Which base launches GBP first?~~ **Resolved (2026-07-02): Austin leads** (primary base + first
  GBP + first location page); **Denver is the fast-follow** second base — owner wants both, Austin first.
- **Which drivable cities have enough real work to justify a location page?** (San Antonio is the
  obvious Austin extension; Dallas/Houston only once there are real projects — they're too far for the
  Austin GBP service area so they'd be organic-only pages.)
- The current site config ([`site/src/config/site.ts`](../../site/src/config/site.ts)) hardcodes a
  single Austin `location`/`areaServed`. The two-base model may want per-base location data — decide
  during S-2.
- Formalize §3.0 as **DR-0002** once the owner confirms the positioning.

> **Resolved (2026-07-02):** the earlier open question "is Austin the true single base?" — answered by
> the owner: **two real bases (Austin + Denver), travel-available nationwide**, handled via the tiered
> model in §3.0.

## Definition of Done
- Positioning confirmed (§3.0) and, ideally, recorded as DR-0002.
- GBP verified + address hidden; Search Console verified + sitemap submitted.
- Duplicate pricing pages de-indexed; every indexable page has a unique keyword-targeted title/description.
- 2 service pages + 3 genuinely-local location pages live and internally linked.
- Landscape/travel section walled off (footer-linked, absent from real-estate surface).
- Content cadence running (≥6 on-topic posts/quarter); Portugal post relocated.
- Metrics baselined in Search Console, reviewed monthly; ≥5 reviews within 90 days.
- This doc indexed in `docs/README.md`.

---

## Sources (graded)

- **[A]** Google Business Profile Help — [Guidelines for representing your business on Google](https://support.google.com/business/answer/3038177?hl=en) and [Manage your service areas](https://support.google.com/business/answer/9157481?hl=en): one profile per business, service-area businesses hide the address, ≤ ~2 hrs / ≤ 20 areas, fewest necessary categories.
- **[A]** Google Search Central — Spam policies, **Doorway abuse** ([policy discussion](https://support.google.com/webmasters/thread/346436308/spam-policies-doorway-abuse?hl=en)): city-swap/boilerplate location pages funnelling to one page are spam and risk a manual action.
- **[B/C]** Subdomain vs. subdirectory consensus — [Semrush](https://www.semrush.com/blog/subdomain-vs-subdirectory/), [Backlinko](https://backlinko.com/subdirectory-vs-subdomain): Google (Mueller) says it handles both, but authority/topical relevance consolidate better in subdirectories on one domain; splitting content across properties dilutes topical relevancy. *(Applied to a solo small site: keep one domain.)*
- **[C]** Location-page quality guidance — [RicketyRoo, "Should I Create a Landing Page for Every Location I Service?"](https://ricketyroo.com/blog/landing-page-for-every-location/) and [location-page spam](https://ricketyroo.com/blog/location-page-spam/): each location page must stand alone with genuine local content, not swapped city names.
- **[B]** Principle Lens (this skill's library): #6 specialize to escape competition (Godin), #9 own your audience, #10 measure what compounds (Reichheld/Dib) — the strategic backbone for choosing one niche and measuring bookings, not likes.
- **[B]** Existing repo docs: [`google-business-profile-setup.md`](./google-business-profile-setup.md), [`future-categories-roadmap.md`](./future-categories-roadmap.md).

> **Note on local rates/keywords:** keyword *demand* (search volume) is market-specific and drifts;
> validate the exact target keywords in Search Console + a keyword tool once GBP/GSC are live rather
> than assuming the national phrasing.
