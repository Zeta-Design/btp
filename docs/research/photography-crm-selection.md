# Photography CRM Selection — Research Notes

> **Status: research only. Nothing here is committed or decided.** This is the starting point for a
> later, fuller market-research doc — not that doc itself.
> **Date:** 2026-06-06
> The question: *Which CRM best lets a photography business manage packages, take payment easily, and
> keep tax simple?* The constraint: a small/solo-to-small-team studio in the US that wants low friction
> on booking → paying → tax time, not enterprise complexity.

---

## My main suggestion

**Best starting point: free-trial HoneyBook and Dubsado side by side, keep the one that fits how you
work, and sync it to QuickBooks Online.** This is what *real users* point to (verified reviews + a
400+ photographer poll), not the affiliate listicles — see §6.

- **HoneyBook** — easiest and by far the most real-user-reviewed (**4.7/5, 667 Capterra reviews**);
  best if you're **US/Canada**. Watch its price hikes + transaction fees.
- **Dubsado** — the dedicated photographer community's favorite (**38% of a 400+ poll**), cheaper and
  more flexible, works anywhere; slightly steeper setup.
- **Just starting / tight budget?** A contract + invoice template + Stripe, or a free tier (Maroo
  free, Pixieset free), is enough at first — the ~$35/mo *starter* CRM plans **exclude automations**
  (the reason to pay), so upgrade once manual tracking starts causing errors or missed payments.
- **The tax part you asked about:** whichever you pick, **sync it to QuickBooks Online** — that combo
  keeps the books clean and taxes optimized (CRMs have no real financial reports). Confirm with a CPA.

---

## 1. TL;DR

- **No single tool does both the client side and your taxes well.** The setup that actually works is
  two pieces: a **CRM** (handles packages, contracts, invoices, and taking payment) that **feeds your
  accounting software** (QuickBooks Online is the standard) which handles **sales tax, quarterly
  taxes, 1099s, and profit/loss**. An accountant who only works with photographers says it plainly:
  CRMs have no real financial reports — don't try to do taxes inside one.
- **For "easy + packages + payments," the two most-used tools are Dubsado and HoneyBook.** In a poll
  of 400+ wedding/portrait photographers: **Dubsado 38%, HoneyBook 19%.** HoneyBook is the easiest and
  prettiest for clients; Dubsado is cheaper and far more customizable. HoneyBook is **US/Canada only**.
- **For the cheapest easy option, Studio Ninja**; **for a high-volume or multi-shooter studio, VSCO
  Workspace (the old Táve)** or **Sprout Studio**. Heads-up: **Táve was bought by VSCO in 2025 and
  renamed** — so older "the pros all use Táve" advice now points to VSCO Workspace.
- **All the main CRMs take payment** via Stripe/Square/PayPal, do payment plans, and most **sync to
  QuickBooks** (HoneyBook, Dubsado, 17hats, Square do). So "get paid" is basically solved by any of
  them — the real choice is ease-of-use vs. customization vs. price, and **whether it's US-only**.
- **Best first move:** pick the CRM that fits how you work (start a free trial of Dubsado *and*
  HoneyBook), and plan to connect it to QuickBooks Online for tax. Budget roughly **$20–$50/mo for the
  CRM + ~$30/mo for QuickBooks.**

> ⚠️ **Legal/tax line:** sales-tax rules, quarterly estimates, and 1099 handling are tax matters —
> this note points you to the tools and the standard approach, but confirm your actual filing with a
> CPA (ideally one who works with photographers).

---

## 2. The reasoning

People shopping for a "photography CRM" usually hope one app will run the whole money side of the
business — quote the package, take the deposit, collect the balance, *and* sort out taxes. The
research says: it'll do the first three beautifully and the fourth badly. Every serious CRM here
(Dubsado, HoneyBook, Studio Ninja, VSCO Workspace, Sprout, 17hats, Pixifi…) can build packages, send
a contract, take a card, and run payment plans. **None of them produces the financial reports you
need at tax time** — that's what an accountant who specializes in photographers stresses, and it's
why the common, durable setup is *CRM + QuickBooks Online*, with the CRM syncing its sales into QBO.
QBO is also where the genuinely annoying tax jobs live: it **calculates and tracks sales tax**,
tracks contractor payments and **files 1099s**, and gives you the profit/loss you need to size your
**quarterly estimated tax** payments.

So the CRM decision is really about *fit*, not capability. The field clusters into three buckets:

- **Easiest + best client experience:** **HoneyBook** — polished, mobile, AI helpers, great for the
  client-facing feel, but the priciest and **US/Canada only**, and it leans on Stripe so you can't
  fully bring your own processor.
- **Most flexible for the money:** **Dubsado** — cheaper, deeply customizable workflows and forms,
  the single most popular pick in the photographer poll, works outside North America. The trade-off
  is a steeper setup.
- **Cheapest-but-easy / volume / teams:** **Studio Ninja** (built by photographers, very easy,
  cheapest), and for high-volume or multi-shooter studios **VSCO Workspace** (ex-Táve, the most
  powerful/automated but least pretty) or **Sprout Studio** (best all-in-one for small studios,
  includes galleries + email marketing). A respected high-volume studio educator (SLR Lounge / Lin &
  Jirsa) recommends VSCO Workspace for 5+ person teams and Sprout for smaller ones.

A reasonable, low-regret path: trial **Dubsado and HoneyBook** side by side (HoneyBook for feel,
Dubsado for flexibility/price), and connect whichever you keep to **QuickBooks Online**. If budget is
the deciding factor, **Studio Ninja**; if you're already a busy multi-shooter studio, look at **VSCO
Workspace or Sprout** before the others.

---

## 3. Full research

### Background facts that shape the decision

- **Market context (who earns what).** *State of the Photo Industry Survey 2024* (Prof. Heather
  Morton, Sheridan College; n=1,294 across 43 countries, 714 US, fielded May–June 2025): most
  respondents earn **under $50k net**; **27.2%** earn $50–99k; **21.5%** earn $100–199k; **14% of US
  photographers** make ≥$200k; **4.2% globally / 6% in the US** clear **$300k+**. [A] Implication: a
  CRM that costs $20–50/mo is trivial against revenue even for mid-tier shooters — optimize for fit
  and time saved, not for saving $10/mo.
- **The Táve → VSCO change.** Táve was **acquired by VSCO (≈May 2025)** and **rebranded "VSCO
  Workspace" (≈Aug 2025)**; core features and pricing reportedly intact, dev team expanded. [B/C]
  *(Sources disagree on the exact dates — acquisition ~May, rebrand ~Aug; treat as "during 2025.")*
- **HoneyBook raised prices (early/Feb 2025)** and is **US/Canada only**. [B/C]
- **Dubsado raised prices (≈Dec 1, 2025)**, narrowing its long-standing price gap vs. HoneyBook. [C]

### The core architecture finding (this is the real answer to "easy to track tax too")

A photographer-specialist accountant (Bastian Accounting) is explicit: **"CRMs are great, but none
of them have robust financial reports."** [B] The recommended structure:

- **CRM** owns: packages/quotes, proposals, contracts + e-sign, invoices, payment collection, payment
  plans, client comms, scheduling.
- **Accounting software (QuickBooks Online)** owns: categorized income/expense, **automated sales-tax
  calculation + liability reports**, **1099 contractor tracking + e-filing**, **P&L for quarterly
  estimated taxes**. [A/B]
- **The link:** HoneyBook, Dubsado, 17hats, and Square **sync sales into QBO**. [B] So the CRM is the
  front of house; QBO is the books.

> ⚠️ **Legal/tax line.** Sales-tax nexus, quarterly estimates (IRS Form 1040-ES; due Apr/Jun/Sep/Jan),
> Schedule C / Schedule SE, and 1099-K thresholds are tax matters. Tools make it easier; a CPA confirms
> it's correct. Photographer CRMs with built-in payments (HoneyBook, etc.) may issue **1099-Ks**. [B/C]

### What real photographers actually use (Tier C signal — corroborated where noted)

Poll of **400+ photographers** in the "Weddings & Wanderlust" Facebook group [C]:

| CRM | Share |
|---|---|
| **Dubsado** | 38% |
| **HoneyBook** | 19% |
| **Pixieset Studio Manager** | 9% |
| **Studio Ninja** | 8% |
| **17hats** | 6% |
| **VSCO Workspace** (ex-Táve) | 6% |
| **Sprout Studio** | 4% |
| Other (Session, Unscripted, Lightfolio) | 10% |

Named practitioners (Tier C, illustrative — to be expanded in Round 2): **Alicia Petitti** (400+
weddings) → Dubsado; **Vaughn Barry** → Sprout Studio; **Kyle Goldie** → HoneyBook (education) +
17hats (photography); **SLR Lounge / Lin & Jirsa** (high-volume studio) → VSCO Workspace (5+ team) /
Sprout (smaller). [C]

### Candidate CRMs vs. the Principle Lens

Lens principles most relevant here: **#4 contract+deposit before the date**, **#7 cash flow**
(deposits/payment plans), **#8 systematize the repeatable** (automations/templates), **#10 measure**
(reporting), plus **money hygiene** (accounting sync). All prices are entry/representative and drift.

| CRM | ~Entry price | Packages/quotes | Payments & plans | Tax/accounting | Best for | Lens notes |
|---|---|---|---|---|---|---|
| **Dubsado** | ~$20/mo (unltd trial, 3 clients) | Custom packages & proposals | Stripe/Square/PayPal, payment plans | **QBO sync** | Customization at low price; works outside US | Strong on #8 (workflows/forms), #4, #7; setup curve is the cost |
| **HoneyBook** | ~$36/mo (raised 2025) | Custom packages & proposals | Stripe/Square/PayPal (leans Stripe) | **QBO sync** | Easiest + best client UX; **US/CA only** | Best on client experience (#5); priciest; processor lock-in |
| **Studio Ninja** | ~$18–22/mo | Quotes & packages | Stripe etc.; Pic-Time/ShootProof/Fundy | **QBO sync** | Cheapest *easy* option; beginners | Easiest learning curve; lighter automation; no built-in scheduler |
| **VSCO Workspace** (ex-Táve) | ~$22.5/mo (14-day trial) | Custom packages & proposals | Broad payment options; Pic-Time | Advanced reporting; **public API**; Excel export | High-volume / multi-shooter studios | Best on #10 (reporting/automation); least intuitive, dated UI |
| **Sprout Studio** | ~$19/mo (30-day trial) | Packages, quotes, booking pages/catalog | Built-in billing | Limited (export) | Best **all-in-one** for small studios (galleries + email mktg) | Strong #8/#5; advanced features need higher tiers |
| **17hats** | ~$199/yr | Custom packages & proposals | Payments + plans; if/then questionnaires | **QBO sync**; Lightroom | General small-biz owners; less photo-specific | Solid #4/#8; less tailored to photo workflows |
| **Pixieset Studio Manager** | Free tier / low | Available | Unlimited invoices on free plan | Limited | Budget; already-Pixieset users | Cheap; **no real workflow automation** beyond reminders |
| **Pixifi** | ~$25/mo | Granular customization | Stripe etc. | Excel export | Single-shooter; **mini sessions**; analytics | Strong #10 analytics; built by a wedding photographer |
| **Iris Works** | ~$25/mo | Packages | Payments | **QBO integration** | Studios needing basic automation | Limited advanced automation vs. peers |
| **Bloom.io** | ~$9/mo | Core packages | Payments/contracts/sign | (newer) | Freelancers wanting simplicity | Cheapest; newer, fewer features |
| **Picsello** | ~$35/mo | Booking | Stripe; calendar booking | — | Bookings + galleries + comms; WHCC partner | All-in-one leaning |
| **ShootQ** | ~$24–29/mo | Packages | Payments | — | Solo → multi-person scaling; recently revived | Was stagnant; new ownership |

### Recommendation (for this question; confidence: medium-high on architecture, medium on the pick)

1. **Adopt the two-tool architecture:** a CRM **+ QuickBooks Online**, with the CRM syncing sales to
   QBO. This is the durable answer to "easy to track tax too" — and the part most "best CRM" lists
   skip. *(High confidence — directly sourced from a photographer-specialist accountant + QBO docs.)*
2. **Shortlist by fit, then trial:** run free trials of **Dubsado** (flexible, cheaper, most popular,
   works anywhere) and **HoneyBook** (easiest, best client UX, US/CA only) at the same time. If price
   is decisive → **Studio Ninja**. If you're a **busy/multi-shooter studio** → **VSCO Workspace** or
   **Sprout Studio**. *(Medium confidence — the "best" pick is genuinely workflow-dependent; the poll
   and educators point at Dubsado/HoneyBook for solo/small.)*
3. **Confirm tax handling with a CPA** before relying on any tool's sales-tax/1099 output.

**Open questions (for Round 2 / the market-research doc):**
- Genre and team size for *this* business (wedding vs. portrait vs. commercial changes the pick).
- Do you need built-in client galleries (Sprout/Pixieset) or will you pair Pic-Time/Pixieset
  separately? HoneyBook has **no gallery delivery**.
- Are you US-only (HoneyBook fine) or international (rules out HoneyBook)?
- Newer entrants to vet: **Wedola**, **Session**, **Unscripted**, **Lightfolio**, **ShootProof Studio**.

---

## 4. Round 2 — Expanded CRM list (incl. niche/new entrants)

Beyond the core field in Section 3, these widen the option set. Grade: all [C] unless noted.

| CRM | ~Entry price | What it's for | Packages | Payments | Tax/acct | Notes / watch-outs |
|---|---|---|---|---|---|---|
| **Wedola** | ~£9/mo (UK) | New, clean, easy CRM for **wedding creatives** (UK-friendly, intl.) | Yes | Yes | Basic | Built 2024–25 by Russell Kent Nicholls (videographer + CS); very new, small feature set |
| **Session** | low | **Mini-sessions** & portrait booking | Session types | Yes | Limited | Popular for mini-session scheduling/booking; CRM-light |
| **Unscripted** | low | **Mobile-first**, posing prompts + CRM-lite + galleries | Templates | Invoices | Manual | "CRM lite"; **no print/album sales in galleries**; for minimalists/newer photographers |
| **Lightfolio** | low | **Galleries first** (proofing, downloads, store) + a "Studio Manager" | Limited | Store | — | Not a full CRM; pair with a real CRM |
| **ShootProof** | usage-based | **Galleries + store/print sales**, has studio/CRM features | Yes | Yes | Reports | Strong on print/album sales; often paired with Studio Ninja/VSCO |
| **ShootQ** | ~$24–29/mo | Solo → multi-person scaling | Packages | Yes | — | Recently revived under new ownership after stagnation |
| **Picsello** | ~$35/mo | Bookings + galleries + comms | Booking | Stripe | — | WHCC print partnership |

**Categories worth keeping straight** (a common source of confusion): a **CRM/studio manager**
(Dubsado, HoneyBook, Studio Ninja, VSCO Workspace, Sprout, 17hats, Pixifi) ≠ a **gallery/sales
platform** (Pic-Time, Pixieset, ShootProof, Lightfolio) ≠ **accounting** (QuickBooks). Sprout, VSCO
Workspace, Pixifi and Pixieset blur the first two; **none** of them replaces accounting. Pick one from
each layer that integrate, rather than expecting one app to do all three.

## 5. Round 2 — Photographer profiles (attainable high-revenue) — *seed for the market-research doc*

> **Why these and not the famous-by-celebrity names:** the brief was photographers a real person could
> realistically become — people who serve ordinary clients (couples, families, businesses) at premium
> prices, not those hired only by brands/celebrities. **Honest caveat:** most names below amplify
> shooting income with a large **education** business (courses/memberships). Their *shooting* models
> are the attainable part; their *headline* revenue often isn't shooting alone. Profiles are [C]
> (self-reported / press); treat revenue as directional, to verify in the market-research doc.

| Photographer | Genre / base | Shooting model & pricing | Revenue signal | Tools / stack | The attainable lesson |
|---|---|---|---|---|---|
| **Katelyn James** (VA) | Weddings | ~4 weddings/yr now; six figures from weddings by 2013 | Education biz ~**$240k/mo** (~$230k passive); multi-7-fig overall | KJ All Access membership ($29/mo); fast 7-day galleries | Charge premium, shoot few, then productize knowledge |
| **India Earl** (UT) | Weddings / **elopements** | Scaled **from 70 weddings/yr down** to intentional few | Six-figure shooting + 6 courses/15 guides | Online course stack (Narrative case study) | "Say no" — fewer, higher-value bookings beat volume |
| **Pye Jirsa / Lin & Jirsa** (Orange County, CA) | Weddings + portraits (**studio/team**) | **~350 weddings/yr**, ~1,000 commissions/yr; **$8,000 wedding min** | Multi-**million**-dollar studio; team of **50+** | SLR Lounge edu + **Visual Flow** tools; studio mgmt (VSCO Workspace-class) | The **team/studio** path: roles split (product / sales / marketing) |
| **Sue Bryce** (portrait) | **Portraits / personal branding** | Paid **upfront**; high **average sale** (free shoot + ~$2,000 product) | Built to **$15,000/week** from a garage | The Portrait System (education/membership) | Portrait profit is in **in-person sales & average order value**, not session fees |

**Pricing benchmark to anchor the above** [C, multiple sources incl. The Knot/WeddingWire]:
US **average wedding photographer ≈ $2,900**; most couples pay **$2,500–$4,000**; **established
$2,500–$5,000+**; **luxury/top-tier $8,000–$20,000**; beginners $1,000–$2,500. So "attainable
high-revenue" shooting ≈ a solo charging **$4k–$8k × 20–40 weddings = ~$100k–$300k** gross, or a
portrait studio living on **average order value**, before any education income.

**More names to profile in the market-research doc (Round 3):** Amy & Jordan (systems/education),
Vanessa Joy, Susan Stripling, Jasmine Star, Jenna Kutcher (brand/marketing pivot), plus their actual
CRM/stack and verified numbers.

---

## 6. Round 3 — What *real users* say is the best starting point (not affiliate blogs)

**First, the bias filter.** Most "best CRM for photographers" listicles are **affiliate-monetized** —
HoneyBook and Dubsado both run referral programs, and many "Dubsado specialists" are paid setup VAs,
so their "winner" follows the commission. [C] The least-biased real-user signal comes from two places,
cross-checked: **(a) verified-review platforms** and **(b) photographer community polls**. (Reddit
threads exist but couldn't be fetched directly here; the poll below is the best community proxy.)

**Verified real-user ratings (Capterra — verified reviews):** [C]

| Tool | Rating | # reviews | Read |
|---|---|---|---|
| **HoneyBook** | **4.7 / 5** | **667** | Mainstream small-biz favorite; huge sample |
| **Studio Ninja** | 4.4 / 5 | 68 | Liked, smaller base; see support note |
| **Dubsado** | 4.2 / 5 | 59 | Solid; fewer reviews, steeper setup |

**The population gap (the honest part the blogs skip).** HoneyBook wins on *review volume and rating*
because it markets broadly to all small businesses and is US/Canada-focused — a big, general crowd.
But inside **dedicated wedding/portrait communities**, **Dubsado leads (38%)** for price and
customization. Same question, two different populations, two different "bests": **HoneyBook =
mainstream/easiest; Dubsado = photographers' value pick.** Neither is universally correct — which is
exactly why the real recommendation is "trial both."

**Real complaints verified users raise (that affiliate posts bury):** [C]
- **HoneyBook:** price increases + transaction fees; rigid templates/branding; **no built-in
  galleries**; scheduler bugs; some users migrating to Dubsado/Bloom/Maroo after 2025 price hikes.
- **Studio Ninja:** acquired by **ImageQuix** → reviewers report **support quality dropped** and it
  "lacks basic components" peers have.
- **Dubsado:** steeper setup/learning curve; smallest verified-review base of the three.

**Do you even need one yet?** Real-user consensus: at the *very* start, a contract + invoice template
+ a payment processor (or a free/cheap tier — **Maroo** free, **Pixieset** free, **Bloom** ~$9) is
enough. The ~$35/mo HoneyBook/Dubsado **starter** plans **exclude automations** — the main reason to
pay for a CRM — so buying early gets you little over templates. A CRM earns its keep once manual
tracking starts causing errors or lost payments. [C]

**Best starting point, grounded in the above:**
1. **US/Canada, want easiest + most-proven** → start a **HoneyBook** trial (accept the fees).
2. **Want best value + the photographer crowd's pick, work internationally, OK with setup** →
   **Dubsado**.
3. **Truly just starting / budget-tight** → templates + Stripe, or **Maroo (free)**; add Dubsado/
   HoneyBook when volume justifies automations.
4. **Always:** free-trial both finalists, confirm **QuickBooks Online** sync (your real need), and
   discount any listicle's "winner" — judge from your own trial + verified reviews.

> ⚠️ **Source caveat:** Maroo's glowing testimonials are on **maroo.us itself** (vendor marketing) —
> treat as biased; the "migration to Maroo/Bloom" trend appears in third-party context but verify
> independently. G2's HoneyBook page (4.x, large sample) corroborates Capterra but couldn't be fetched
> directly here.

### Sources (graded)

- **[A]** Heather Morton — *State of the Photo Industry Survey 2024* (n=1,294), via PetaPixel, 2025-08-29 — https://petapixel.com/2025/08/29/how-many-photographers-are-making-over-300000-a-year/ · report: https://hmphotoprof.substack.com/
- **[A/B]** Intuit QuickBooks — automated sales tax setup/use — https://quickbooks.intuit.com/learn-support/en-us/help-article/sales-taxes/set-use-automated-sales-tax-quickbooks-online/L4Lx8eL7V_US_en_US
- **[B]** Bastian Accounting (photographer-specialist CPA) — *QuickBooks Online for Photographers* ("CRMs… none have robust financial reports") — https://www.bastianaccounting.com/blog/quickbooks-online-for-photographers-allthethings · *Decoding the 1099-K* — https://www.bastianaccounting.com/blog/1099-k
- **[B/C]** SLR Lounge — *Photography Studio Management Software Guide* (Lin & Jirsa; VSCO Workspace acquired ~May 2025) — https://www.slrlounge.com/photography-studio-management-software-guide/
- **[C]** Adventure Instead Academy — *7 Best CRMs for Photographers 2025* (400+ photographer poll; Dubsado 38% / HoneyBook 19%) — https://adventureinstead.com/academy/blog/best-crms-for-photographers/
- **[C]** Aftershoot — *Best CRM for Photographers 2026* — https://aftershoot.com/blog/crm-for-photographers/
- **[C]** Bloom — *15 Best CRMs for Photographers (2026)* — https://blog.bloom.io/best-crm-photographers/
- **[C]** Colie James — *HoneyBook vs Dubsado* — https://coliejames.com/honeybook-vs-dubsado/
- **[C]** Alicia Petitti — *Why I Chose Dubsado* — https://aliciapetitti.com/blog/the-best-crm-for-wedding-photographers-why-i-chose-dubsado/
- **[A]** US Bureau of Labor Statistics — *Photographers* (Occupational Outlook) — https://www.bls.gov/ooh/media-and-communication/photographers.htm

**Round 2 additions**
- **[C]** Russell Kent Nicholls — *Launching Wedola* — https://www.russellkentnicholls.com/blogs/latest/russell-kent-nicholls-launches-wedola-an-easy-crm-for-wedding-creatives · https://wedola.co/
- **[C]** Savvy Leigh — *Unscripted: the up-and-coming CRM* — https://savvyleigh.com/business/unscripted-the-new-up-and-coming-crm-for-photographers/
- **[C]** Lightfolio — *CRM for Photographers* — https://www.lightfolio.com/crm-for-photographers
- **[C]** Rebecca Rice — *Comparing CRMs for Minis: HoneyBook, Dubsado, Session* — https://rebeccaricephoto.com/2021/06/28/comparing-crms-for-mini-sessions-honeybook-dubsado-and-session/
- **[C]** WealthCaves — *Katelyn James* (revenue) — https://www.wealthcaves.com/self-made-millionaire-katelyn-james/ · CNBC Make It — *$240k/mo side hustle* — https://www.cnbc.com/2023/02/06/35-year-old-mom-built-side-hustle-that-brings-in-240000-a-month-i-work-just-4-hours-a-day.html
- **[C]** Narrative — *India Earl: building an online course* — https://narrative.so/blog/india-earl
- **[B/C]** PPA — *Reverse your thinking, put business first* (Lin & Jirsa: ~350 weddings/yr, team 50+, $8k min) — https://www.ppa.com/ppmag/articles/reverse-your-thinking-and-put-business-first · SLR Lounge — *Pye Jirsa* — https://www.slrlounge.com/pye-jirsa-photographer-and-educator/
- **[C]** The Portrait System / PhotoBizX — *Sue Bryce* (paid upfront; $15k/week) — https://photobizx.com/how-to-make-real-money-from-your-photography-business-sue-bryce/
- **[C]** The Knot — *Average Wedding Photographer Cost* — https://www.theknot.com/content/average-cost-wedding-photographer · WeddingWire — https://www.weddingwire.com/cost/wedding-photographer

**Round 3 additions (real-user signal)**
- **[C]** Capterra — verified reviews: HoneyBook (4.7/5, 667) https://www.capterra.com/p/162588/HoneyBook/reviews/ · Studio Ninja (4.4/5, 68) https://www.capterra.com/p/143855/Studio-Ninja/reviews/ · Dubsado (4.2/5, 59) https://www.capterra.com/p/206389/Dubsado/reviews/
- **[C]** G2 — HoneyBook reviews (large verified sample; couldn't fetch directly) — https://www.g2.com/products/honeybook/reviews
- **[C]** Joy Michelle — *Pros and Cons of HoneyBook* — https://joymichelle.co/pros-and-cons-of-honeybook-for-photographers/
- **[C, vendor-biased]** Maroo — free CRM for wedding pros (testimonials are first-party marketing) — https://www.maroo.us/solutions/photographers
- **[C, affiliate-disclosed]** Colie James / Lindsey Garvey / Kyle Goldie — comparison posts that *disclose* HoneyBook/Dubsado affiliate links (illustrating the bias to filter) — https://coliejames.com/honeybook-vs-dubsado/

> _Status: Rounds 1–3 complete (CRM selection · expanded CRMs + attainable-photographer seed ·
> real-user starting-point signal). **Next (Round 4, not started):** the standalone market-research
> doc — verify photographer revenue with primary/press sources, add each one's confirmed CRM/stack,
> profile the remaining names, and segment by genre. This doc is the starting point, not that doc._
