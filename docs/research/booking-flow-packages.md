# Booking Flow & Working Packages — Research Notes

> **Status: research only. Nothing here is committed or decided.** Input for a future
> decision record (booking-flow architecture) and any pricing-page rework.
> The question: how do real estate / short-term-rental photographers make "packages" actually
> function in their booking flow, and how should Ben Tims Media restructure so a "Premium" click
> really loads and charges the Premium bundle?
> The constraint: RE/STR genre; solo operator; current stack = Astro site + Calendly (scheduling)
> + Stripe (deposit/checkout) + Dubsado (CRM); pricing varies by property size (sq ft) or bedrooms.
> Related: [Portfolio / Multi-Property Bundle Pricing](../plans/portfolio-bundle-pricing.md).

## 1. TL;DR

- **Every serious RE/STR photography order form does the same thing: pick services first, schedule last.** The order is **services/package → property details → date/time → pay**. Ben's flow is backwards — it schedules (Calendly) in the *middle*, before the add-ons are chosen. That's the whole reason "Premium" can't work.
- **A "package" in this niche is not a separate thing — it's a preset that pre-ticks add-ons inside one order form.** Presets sit at the top, "build your own" à-la-carte below, one running total. (Confirmed on a live HDPhotoHub order form: Essential / Marketing Pro / Elite presets, à-la-carte below, then address, then schedule, then pay.)
- **The single rule that fixes Ben's problem:** *add-on selection must happen before scheduling.* As long as Calendly sits between "pick size" and "pick add-ons," a package can only change a heading — which is exactly what's happening now.
- **You don't have to build this.** The site that inspired this (Florida Rental Photos) hands off to an HDPhotoHub order form for exactly this reason — a purpose-built order form + scheduling + payment is genuinely hard to build well. Adopting **HDPhotoHub or Aryeo** is the industry-standard shortcut.
- **Three tiers works** — good/better/best lifts average order value ~15–25%, and ~60% of buyers pick the *middle*. So the "most popular" badge belongs on the **middle** tier (Signature), not the top.
- **Honest recommendation, in order:** (1) **Now** — stop showing packages that don't function (they misquote and over-promise); keep your working à-la-carte. (2) **The real fix** — move add-on selection *before* scheduling, and strongly consider **adopting HDPhotoHub/Aryeo** rather than rebuilding, since that's what the flow you admired actually runs on.

## 2. The reasoning

Think of an order form like a restaurant. You decide *what you want to eat* — entrée, sides, drinks — and only then does the waiter tell you a time and take payment. What Ben's site currently does is seat you, make you commit to a reservation time, and *then* ask what you want to order — at which point the "combo meal" you clicked on the way in is meaningless, because you're already past the counter. That's why "Premium" only changes a heading: the twilight and video get chosen on the far side of the Calendly scheduling step, so the package has nothing to attach to.

The whole industry has settled on the opposite sequence, and it's worth seeing how consistent it is. On a live HDPhotoHub order form, the client sees three preset packages first (Essential, Marketing Pro, Elite), à-la-carte add-ons underneath, *then* enters the address, *then* picks a date and time, *then* pays — with the price total assembled at the end. Aryeo works the same way: one branded order form that captures the order and suggested add-ons, with scheduling and Stripe payment built into the same flow. Neither treats "packages" as a separate fixed-price path — a package is simply a button that pre-selects a set of add-on toggles inside the one form. That is the missing idea. Ben built the packages as a *marketing* layer bolted onto an à-la-carte *engine*, and the two never connected because scheduling physically separates them.

So the fix is not cosmetic; it's a resequencing: **collect the property size and the package/add-ons together, on one screen, before anyone picks a date.** Once the full order (base + add-ons) is assembled up front, a "Premium" preset can genuinely tick twilight + video, the running total is real, and Stripe charges what the card said. Scheduling then happens last, as the final confirmation step — which is also better for cash flow, because you're capturing the whole order and deposit against a known number instead of a bare photo base.

The honest strategic question is *build vs. buy*. Ben already noticed that Florida Rental Photos' "Book" button jumps to an HDPhotoHub order form — that split (a pretty marketing site + a purpose-built ordering backend) exists precisely because building a good order-form-with-scheduling-and-payments is a lot of software to own and maintain as a solo shooter. Rebuilding it custom in Astro is possible, but it means owning that complexity forever. Adopting HDPhotoHub or Aryeo gets the exact flow, the presets, the deposits, the tax handling, and the scheduling out of the box — which is the "don't re-build solved problems" principle in action. The tradeoff is that ordering would live on a platform subdomain rather than fully on his own site, and there's a monthly fee.

Because that's a real fork with lasting consequences, the right move today is the smaller, honest one: **take the non-functional packages down** so the site doesn't quote a "$535 Premium" it can't actually assemble, keep the à-la-carte flow that already works and charges correctly, and treat the order-form rebuild-or-adopt as a separate, deliberate decision once volume justifies it.

## 3. Full research

### 3.1 How the industry platforms actually structure the flow

**The canonical sequence (observed on a live order form) [C — live competitor order form; strong direct observation]:** On the Parrish Real Estate Photography HDPhotoHub order form, the steps are, in order:
1. **Service selection first** — three preset packages (Essential $250, Marketing Pro $575, Elite $995) with à-la-carte add-ons grouped below.
2. **Property information** — address, city/state/zip, optional sq ft, MLS #, beds/baths.
3. **Appointment scheduling** — date and time.
4. **Account & project details** — contact info, vacant?, video orientation, etc.
5. **Payment last** — subtotal, travel fee, sales tax, order total; card / invoice / no-payment.

So: **services → property → schedule → pay.** Scheduling is *after* service selection and *before* payment — never before the order is assembled.

**HDPhotoHub platform docs [B — vendor docs]:** the order form supports "**One Package**" and "**Build your own package**," a customizable/branded shopping cart, and configurable product sets; payments via **Stripe or Square** with **deposits, sales tax collection, tip support, promo codes**, and special client pricing; smart scheduling shows clients a real-time calendar. This confirms presets + à-la-carte coexist in one cart, and payment/deposit/tax are part of the same flow.

**Aryeo platform docs [B — vendor docs]:** a custom-branded, embeddable **order form** where the photographer lists products/services and accepts orders; the platform "**displays relevant suggested add-ons to increase average order value**"; **Stripe/Square** payments integrate into the workflow; scheduling (live availability, auto/manual confirm) is part of the same platform. Same model: one order form, add-ons upsold in-line, scheduling + payment integrated.

**Takeaway:** both dominant platforms implement **one order form** where **packages are presets that pre-select add-on toggles**, property details are captured, and **scheduling and payment are integrated after** the order is assembled. There is no version where scheduling splits the base price from the add-ons — which is exactly Ben's current defect.

### 3.2 The two package models

| Model | How it works | Where it fits | Notes |
|---|---|---|---|
| **A. Order-form + presets** | Base price still varies by size/beds; packages are presets that pre-tick add-ons; à-la-carte "build your own" underneath; one running total | Price genuinely varies by property size — **Ben's exact case** | This is the HDPhotoHub/Aryeo default. Packages and à-la-carte are the *same* form. |
| **B. Flat-price packages** | Fixed package prices (e.g. Essential $250 / Pro $575 / Elite $995); property size handled by a **surcharge add-on** ("+$X over N sq ft") rather than driving the base | Photographer wants simple, legible fixed prices | The live Parrish form uses flat package prices — workable because size becomes an add-on, not the base. |

**Conversion note [C, corroborated; Ariely is B]:** three-tier good/better/best structures raise average order value **~15–25%**, and **~60%+ of buyers choose the middle tier** (buyers avoid the cheapest = "feels low quality" and the dearest = "feels excessive"; the middle wins both comparisons). The decoy/anchoring effect (Dan Ariely, *Predictably Irrational* [B]) is the mechanism. **Implication for Ben:** the "most popular" badge should sit on the **middle** tier (Signature) to ride the center-stage effect — his current build badges the *top* tier (Premium, "Most complete"), which pushes the dearest option rather than the highest-probability one. Badging the top is a legitimate choice if the goal is to maximize the *top* tier's take, but the higher-conversion default is to feature the middle.

### 3.3 Sequencing: why "schedule last" matters, and what it means for Ben

The industry sequence is **services → property → schedule → pay**. Ben's is **pick size → schedule (Calendly) → pay + pick add-ons**. Two consequences of the inversion:
1. **Packages can't function.** The add-ons live *after* the Calendly hop, so a package chosen *before* it has nothing to attach to. State would have to survive a round-trip through Calendly's redirect (currently only `utm_content`=price and `utm_term`=tier are passed) — fragile, and untestable without a live booking.
2. **Cash-flow signal is weaker (Principle 7).** Scheduling and taking a deposit against a bare photo *base* (then hoping the client adds video later) is a weaker capture than committing the full assembled order + deposit up front, which is what "schedule last / pay last against a real total" achieves.

**The rule that fixes it:** move **add-on/package selection before scheduling**. Whether via a rebuilt custom order form or an adopted platform, the base + add-ons must be assembled *before* the date is picked, so the total (and any Stripe charge) reflects the real package.

### 3.4 Candidate options (vs. the Principle Lens)

| Option | What it is | Honors | Strains | Verdict |
|---|---|---|---|---|
| **A. Rebuild custom order-form-first flow** | New Astro flow: property size + package/add-on toggles + live total → schedule (inline) → Stripe with full order. Add-ons held in page/server state, **not** round-tripped through Calendly | 2 (sells the outcome/bundle), 5 (clean experience), 7 (full order + deposit up front) | 8 (you now own/maintain order-form software forever) | **Viable, high-control, high-maintenance** |
| **B. Flat-price packages + size surcharge** | Convert to fixed package prices; size becomes a "+$X over N sq ft" add-on | 5 (simplest to grasp), 8 (less logic) | 1/2 (a blended flat price can under/over-charge vs. true size-based cost; must set the surcharge so margin holds) | **Simplest pricing, but re-prices the whole menu** |
| **C. Keep à-la-carte, drop packages** | Remove the non-functional package cards; keep size tiers + add-on toggles that already charge correctly | 5 (honest, nothing broken), 8 (no new code), 10 (nothing to mis-measure) | 2 slightly (loses the guided-bundle upsell) | **Recommended now** — honest, zero-risk |
| **D. Adopt HDPhotoHub / Aryeo** | Marketing site stays; "Book" hands off to a purpose-built order form (presets + à-la-carte + scheduling + Stripe + tax) — the exact pattern Florida Rental Photos uses | 8 (buy the solved problem), 5 (proven flow), 2, 7 | 9 (ordering lives on a platform subdomain, not fully owned), monthly fee | **Recommended as the real fix** if RE/STR volume is steady |

### 3.5 Technical implication (for whichever build path)

- **Add-on selection must move ahead of scheduling.** The failure mode today is structural, not cosmetic.
- **Do not rely on the Calendly UTM round-trip to carry add-ons.** Only two UTM slots are currently used and passing rich order state out to Calendly and back is fragile. If staying custom (Option A), hold the order in the browser/session (or create a draft order server-side / a Stripe Checkout Session first) so the add-ons survive to payment — scheduling becomes an embedded step, not a state-carrying redirect. **Flag: the round-trip approach needs a live test booking to prove; prefer an architecture that avoids it.**
- **Honesty guardrail (see 3.6):** the total shown on the package must equal the amount Stripe charges. Any preset that displays "$535" must assemble to exactly that at checkout, or it misquotes.

### 3.6 Guardrails (honesty, scope, money)

- **Displayed total == charged total.** A package price is a quote; if the flow can't charge that exact number, don't display it. This is the specific way the current build fails.
- **Only bundle what Ben delivers.** Presets must contain *only* photos / twilight / walkthrough video / virtual twilight edit. **Do not** copy HDPhotoHub/Aryeo menus wholesale — they include **drone/aerial, floor plans, 3D/Matterport tours, virtual staging**, which Ben does **not** offer (no drone confirmed). Listing them over-promises.
- **Sales tax.** HDPhotoHub/Aryeo both collect sales tax in-cart. Texas generally taxes photography services and products; whether/how to collect on RE/STR shoots is a **tax question — confirm with a CPA** before switching on tax collection or setting flat package prices that need to be tax-inclusive. *(This note is not tax advice.)*
- **Deposit / contract (Principle 4, 7).** Whichever flow, keep a deposit before the date and terms in writing (Dubsado). Assembling the full order up front strengthens both.

### 3.7 Recommendation

- **Immediately: Option C.** Remove the non-functional package cards from the pricing page (they misquote a bundle the flow can't assemble and imply add-ons that aren't pre-selected). Keep the size-tier + add-on à-la-carte flow, which already charges correctly. This makes the site honest today at zero risk.
- **The real fix: prefer Option D over A**, i.e. adopt a purpose-built order form (HDPhotoHub or Aryeo) rather than rebuild — *because that is exactly what the flow you admired runs on*, and it delivers the presets-before-scheduling model out of the box. Rebuild custom (Option A) only if owning the whole experience on your domain outweighs the maintenance, and volume justifies it.
- **If you keep it in-house at all** (A or a lighter interim), the non-negotiable is **add-on selection before scheduling**, and **not** carrying add-ons through the Calendly redirect.
- **Whichever tier structure you keep, badge the middle** (Signature) as "Most popular" to ride the ~60% center-stage effect, unless you specifically want to push the top tier.

**Confidence:** **High** on the industry pattern and the sequencing diagnosis (direct observation of a live order form + two platforms' docs). **Medium** on build-vs-buy for Ben specifically — it depends on his RE/STR volume, appetite for a monthly platform fee, and how much he values keeping ordering on his own domain (open question below). **Legal/tax line:** sales-tax handling → CPA.

### Sources
- [HDPhotoHub — Ordering & Scheduling](https://hdphotohub.com/learn-ordering-scheduling) **[B]** — "One Package" + "Build your own package," branded cart, Stripe/Square, deposits, sales tax, promo codes, real-time scheduling calendar.
- [Parrish Real Estate Photography — live HDPhotoHub order form](https://parrishrealestatephotography.hd.pics/order) **[C]** — direct observation of the step order: preset packages + à-la-carte → property → schedule → pay.
- [Aryeo — Orders & Invoicing](https://www.aryeo.com/products/orders) · [Aryeo — Add-Ons](https://www.aryeo.com/products/add-ons) · [Aryeo — Scheduling](https://www.aryeo.com/products/scheduling) **[B]** — single branded order form, suggested add-ons to raise average order value, integrated scheduling + Stripe/Square.
- [Dan Ariely — *Predictably Irrational* (decoy effect)] **[B]** — the behavioral mechanism behind good/better/best and the middle-tier default.
- [Bundle/tier pricing psychology overview](https://smartsmssolutions.com/resources/blog/business/bundle-pricing-psychology) **[C, corroborated]** — three-tier lifts AOV ~15–25%; ~60%+ pick the middle; "most popular" badge on the anchor tier. *(Figures are general e-commerce benchmarks, not RE-photography-specific — directional.)*
- [Florida Rental Photos](https://www.floridarentalphotos.com) → its HDPhotoHub order form **[C]** — real example of the "marketing site + purpose-built order form" split Ben was inspired by.

---

## Open questions
- **Build vs. buy:** does Ben want ordering **on his own domain** (rebuild, Option A) or is a platform subdomain (HDPhotoHub/Aryeo, Option D) acceptable? Drives everything downstream. *(Owner decision.)*
- **RE/STR volume:** how many shoots/month? Below a threshold, a monthly platform fee or a custom rebuild may both be over-investment vs. staying à-la-carte (Option C).
- **Tax:** should sales tax be collected on RE/STR shoots in TX, and does that change flat-package feasibility (Option B)? *(CPA.)*
- **Tier badge:** feature the **middle** (Signature, higher conversion) or the **top** (Premium, higher AOV)?
- Promote the chosen model to a **decision record** before building.
