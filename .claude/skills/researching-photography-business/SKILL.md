---
name: researching-photography-business
description: Runs rigorous, source-graded research on the business of photography — pricing & packages, licensing & usage rights, contracts, client management & experience, marketing & lead generation, positioning/niche, and the craft/gear questions that affect deliverables — grounded in primary/authoritative sources (industry benchmark data like PPA & BLS, legal primaries like the US Copyright Office & ASMP, named pricing/marketing research) rather than blog hearsay, and evaluates every option against a fixed set of durable photography-business principles. Then documents the result to a defined quality bar — picking the right artifact (research note, decision record, or plan/SOP) and writing goals/requirements that are measurable and verifiable. Produces a dated markdown doc in docs/. Use when the user asks to research how to price/package, license images, write or improve a contract, onboard or manage clients, market or get leads, choose a niche/positioning, or "how should I handle X" for the photography business — or to write a decision record or a plan/SOP.
---

# Researching the Photography Business

Turns an open business question — "how should I price this?", "what should my contract say?",
"how do I get more of the right clients?" — or a "write the plan/SOP for X" request, into a
**dated, source-graded markdown document** in `docs/`, where every claim traces to a real source,
every option is judged against the durable principles of running a profitable, low-stress
photography business, and every goal or requirement is written to be measurable.

**Three guiding principles:**
1. **Research is only as trustworthy as its weakest source.** "Charge 2–3× your costs" repeated on a
   forum is folklore; the PPA Cost-of-Doing-Business method, a BLS wage figure, and a named pricing
   author together are a decision input. Grade sources, cite primaries, state what you're *not* sure of.
2. **A goal you can't measure isn't a goal — it's a wish.** Every recommendation must come with a
   number or a pass/fail test (a price, a margin, a booking rate, a response-time SLA, "contract
   signed before shoot"), and the doc must be the *right kind* for the question.
3. **This is money and legal territory — flag the line you can't cross.** This skill researches and
   documents; it is **not** legal, tax, or accounting advice. When a question turns on contract
   enforceability, copyright, employment classification, or taxes, say so and recommend a qualified
   professional. Cite the primary law, never improvise it.

---

## ⚠️ READ FIRST — Explain it like I'm not a numbers person, then go deep

**Assume the reader runs on instinct and craft, not spreadsheets.** Make *no* assumptions about
business jargon ("CODB", "LTV", "usage license", "CAC"). Every doc this skill produces MUST open
with the few things that actually matter, in the plainest possible language, so the reader gets the
point without reading further — and *then* lets them choose to go deeper.

This is **not** a reason to be brief. Do the opposite: research exhaustively and write the full
report (Section 3). Then distill upward into two plain-language layers on top of it.

**Every doc is structured in three layers, top to bottom:**

| # | Section | Audience | Rules |
|---|---|---|---|
| 1 | **TL;DR** | Anyone, 30 seconds | The handful of things that truly matter, in the simplest words, with the actual numbers. No jargon — if a term is unavoidable, define it in the same breath. Lead with what to *do*. ~5–10 lines. |
| 2 | **The reasoning** | The owner / a partner, 3–5 minutes | The trade-offs and the recommendation in plain English, with the *why*. Analogies welcome. Prose, not fragments. |
| 3 | **Full research** | The operator / an expert / an AI | Everything: source grades, citations, the Principle Lens evaluation, the math worked out, the fine print. The base of record. |

**Derivation rule:** Section 3 is written **first** and is the source of truth. Sections 1 and 2 are
each distilled **independently from Section 3** — not 1 from 2 (a summary-of-a-summary drops the real
point). If something is in the TL;DR, it's because it's load-bearing in the full research.

**Jargon rule:** Sections 1–2 contain no unexplained terms. Section 3 may be as technical as the
topic demands.

This skill does **research and documentation only** — it never books a client, signs a contract, or
sends an email. Output is a markdown doc the owner reads before acting.

## Workflow

Copy this checklist into your response and check items off as you go:

```
Research Progress:
- [ ] Step 1: Frame the question + the real constraints (the niche, the market, the goals, the budget)
- [ ] Step 2: Gather sources top-down by tier; grade each one
- [ ] Step 3: Read the primaries, extract claims (and any numbers/math) with citations
- [ ] Step 4: Evaluate each option against the Principle Lens
- [ ] Step 5: Pick the document type (research note / decision record / plan-SOP)
- [ ] Step 6: Write the doc in docs/; if it states goals/requirements, meet the Quality Bar
- [ ] Step 7: Add it to docs/README.md and tell the user (flag any legal/tax line)
```

### Step 1: Frame the question against *this* business
Before searching, write down the actual question and the constraints that bound it: the **genre**
(wedding / portrait / commercial / product / editorial — they have wildly different economics), the
**market** (city, price tier, who the ideal client is), the **goals** (revenue, number of shoots,
margin, hours), and the **current setup** (solo vs. team, gear owned, tools in use). Read any
existing decision records in `docs/decisions/` and prior research in `docs/research/`. A wedding
pricing answer and a commercial-licensing answer share almost no math — anchor to the real genre.

### Step 2: Gather sources top-down, and grade every one
Search the strongest tiers first. Bias web search toward primary/authoritative sources (`ppa.com`,
`asmp.org`, `copyright.gov`, `bls.gov`, `*.gov`, `nolo.com`, the official docs of the tools in use).
Grade each source you cite:

| Tier | What it is | Trust |
|------|-----------|-------|
| **A — Primary / authoritative data & law** | Industry benchmark data (PPA Benchmark Survey & CODB method), gov statistics (BLS Occupational Outlook), primary law (US Copyright Office circulars, statutes), peer-reviewed pricing/marketing/loyalty research | Cite directly; the backbone of the note |
| **B — Authoritative practitioner** | ASMP business-practices guidance, named pricing/marketing authors (Simon, Nagle, Godin, Reichheld), established trade bodies, the official docs of the CRM/booking/gallery tools actually used | Cite for "how the field and our tools actually work" |
| **C — Community signal** | Photographer forums/subreddits, well-reasoned educator blogs & YouTube, conference talks, competitor pricing pages | Use for *real-world experience*, local rates, and gotchas; corroborate against A/B before relying |
| **D — Derived / AI summary** | Search-result snippets, blog paraphrases of surveys, "10 tips" listicles, LLM output | A lead, never a citation. Trace back to the A/B source behind it |

Rules: **never cite D.** If a C source makes a strong claim ("charge 3× costs", "you own the
copyright automatically"), find the A/B source behind it — and check whether it's even true. Prefer
recent for market/rate data (it drifts fast and is local), timeless for principles (value-based
pricing and copyright-on-creation are durable). **Local rates beat national averages** for pricing —
say so when you're extrapolating from a national figure.

### Step 3: Read primaries, extract claims (and the math) with citations
Fetch the actual surveys/circulars/books (not just snippets). Pull out concrete claims, each tagged
with its source. For anything quantitative, **work the math out explicitly** — a Cost-of-Doing-
Business calculation, a break-even, a per-image licensing build-up — so the reader can check it.
Capture the *trade-off* each source names, not just the headline.

### Step 4: Evaluate options against the Principle Lens
For each candidate option (pricing model, contract clause, marketing channel, package structure),
score it against the durable principles below. Note which it honors, which it strains, and why
that's acceptable (or not) for *this* business and genre.

### Step 5–7: Pick the doc type, write it, index it
Choose the artifact that fits the question (see **Choosing the document type**). Write
`docs/<folder>/<topic>.md` in the matching template; if it states goals/requirements, hold them to
the **Quality Bar**. Add a row to `docs/README.md` and tell the user. If it's research-only (not a
committed decision), say so with the Status banner — and surface any legal/tax line loudly.

---

## The Principle Lens

Judge every option against these durable principles. Each traces to a real authority in the library.
Note which an option honors, which it strains, and why.

1. **Price from your Cost of Doing Business, not from competitors.** Your price floor must cover
   overhead, taxes, gear replacement, *and* a real salary, divided by the number of shoots you can
   actually book — then add profit. Pricing off the photographer down the street imports their bad
   math. *(PPA Cost of Doing Business method.)*
2. **Sell the value and the usage, not the hours.** What a client buys is the outcome and the right
   to *use* the images, not your time on site. Commercial work especially: separate the creative fee
   from a licensing fee scoped by use, media, duration, and territory. *(ASMP; value-based pricing —
   Simon, Nagle.)*
3. **Know and protect the rights.** In the US, copyright exists the moment the shutter fires and
   belongs to the photographer unless it's work-for-hire or assigned in writing; registration before
   (or shortly after) infringement unlocks statutory damages. Get model/property releases when
   images will be used commercially. *(US Copyright Office; ASMP.)*
4. **Nothing happens without a signed contract and a deposit.** A retainer/deposit and signed
   agreement before the date is the difference between a business and a hobby that loses money on
   cancellations. Put the scope, deliverables, timeline, kill/cancellation, and usage in writing.
5. **The client experience *is* the product.** Perceived value comes from the whole journey —
   inquiry response time, clarity, the shoot day, delivery — not just image quality. A great
   experience drives referrals and repeat work, the cheapest growth there is. *(Service-profit chain,
   Heskett et al., HBR; Reichheld, loyalty/NPS.)*
6. **Specialize to escape price competition.** A clear niche and a defined ideal client let you
   charge more and market cheaper than a "I shoot everything" generalist. Pick the smallest viable
   market you can dominate. *(Godin, "This Is Marketing".)*
7. **Cash flow beats revenue.** Deposits, payment schedules, and smoothing seasonality keep the
   doors open; a fully-booked calendar that pays in arrears can still go broke. Model the timing of
   money, not just the total.
8. **Systematize the repeatable.** Contracts, questionnaires, pricing guides, galleries, and email
   sequences as reusable templates. Your shooting/editing time is the scarce resource — protect it
   by not re-deciding solved problems.
9. **Own your audience.** An email list and direct client relationships are assets you control;
   rented reach on a platform can vanish with an algorithm change. Prefer channels you own. *(Godin,
   "Permission Marketing".)*
10. **Measure what compounds.** Track booking/inquiry-conversion rate, average order value, lead
    source, and client lifetime value — not follower counts. You can't improve what you don't
    measure, and vanity metrics flatter without paying. *(Reichheld; marketing-plan discipline — Dib.)*

**Genre translation:** weddings and commercial work pull these levers very differently — weddings
live on principles 4, 5, 7, 10 (one-shot, referral-driven, cash-flow-sensitive); commercial/product
work lives on 2, 3 (licensing and usage rights are the whole game). When a principle doesn't apply
to the genre at hand, say so explicitly rather than forcing it.

---

## Reference Library (canonical, graded)

The starting bibliography. Lead here before generic web search; expand from these and append strong
new primaries you find (with their tier) so the library compounds.

**Industry data & benchmarks (Tier A)**
- **PPA — Professional Photographers of America**: Benchmark Survey + the **Cost of Doing Business**
  method/calculator (the canonical way to derive a price floor) — https://www.ppa.com/
- **US Bureau of Labor Statistics** — Occupational Outlook Handbook, *Photographers* (wages, market
  size, self-employment share) — https://www.bls.gov/ooh/media-and-communication/photographers.htm

**Rights, licensing & contracts (Tier A/B — and the legal-line markers)**
- **US Copyright Office** — copyright basics, registration, and the photography circular
  (copyright-on-creation, work-for-hire, statutory damages) — https://www.copyright.gov/
- **ASMP — American Society of Media Photographers** — professional business practices, pricing &
  licensing, model/property releases, sample agreements — https://www.asmp.org/
- **Nolo** — plain-English small-business & IP legal reference (a starting point, not a substitute
  for a lawyer) — https://www.nolo.com/
> Contracts, copyright disputes, employment classification, and taxes are **legal/tax questions** —
> cite the primary source and recommend a qualified attorney/CPA; do not give the advice yourself.

**Pricing (Tier B)**
- Hermann Simon — *Confessions of the Pricing Man* (value-based pricing, willingness-to-pay).
- Thomas Nagle & Georg Müller — *The Strategy and Tactics of Pricing* (the standard pricing text).

**Marketing & clients (Tier A/B)**
- Seth Godin — *This Is Marketing* (smallest viable market, positioning) and *Permission Marketing*
  (own your audience).
- Allan Dib — *The 1-Page Marketing Plan* (a measurable, end-to-end plan for a small business).
- Fred Reichheld — *The Ultimate Question 2.0* / Net Promoter research (referrals & loyalty as growth).
- Heskett, Sasser & Schlesinger — *The Service-Profit Chain* (HBR) (experience → loyalty → profit).

**Our tools (Tier B — always check the official docs)**
- The CRM / booking / contract / gallery / accounting tools actually in use (e.g. Studio Ninja,
  HoneyBook, Pic-Time, Pixieset, QuickBooks). Their own docs > any third-party description of them.

> When you add a strong new primary while researching (a fresh benchmark survey, a relevant statute,
> a named author), append it here with its tier.

---

## Choosing the document type

Match the artifact to the question — using the wrong one is the most common documentation failure.

| The question is… | Write a… | Lives in | Shape |
|---|---|---|---|
| "What are the options / is this a good idea / what does the field/data say / how should I approach X?" | **Research / approach note** (the "brain") | `docs/research/<topic>.md` | TL;DR → options vs Principle Lens → recommendation → graded Sources |
| "Which option do we commit to, and why — a choice with lasting consequences (a pricing model, a niche, standard contract terms)?" | **Decision record** | `docs/decisions/NNNN-*.md` | Status → Context → Decision → Consequences (incl. the downsides) |
| "Do/launch/run X — what exactly should happen?" (a new package, a client workflow, a marketing campaign, a repeatable SOP) | **Plan / SOP** | `docs/plans/<thing>.md` | Goal & ideal client → the steps/requirements (measurable) → metrics/targets → out of scope → open questions |

> Folder lifecycle: `research/` (thinking that informs us) → `decisions/` (choices we commit to) →
> `plans/` (what we'll actually do). Put thought-process docs in `research/`, not loose in the repo.

Guidance:
- **Start from the client and the goal, not the tactic.** A plan opens with the ideal client and the
  outcome, then derives the steps — never opens with "post on Instagram three times a week".
- **Prose for reasoning, structure for requirements.** Narrative explains *why* a price or niche is
  right; individual goals/steps should be discrete, numbered, and measurable. Use each where it fits.
- **Keep it short and in-repo.** A decision record is ~1 page; everything lives in `docs/` next to
  the work, so it's found and stays current.
- **One decision per record**, and write *all* the consequences — including what gets harder.

## Quality Bar (goals, plans & SOPs)

Any doc that states goals or requirements must clear this bar — the photography-business version of
"measurable and verifiable".

**Every individual goal/requirement is** *necessary* (drop it and something breaks), *unambiguous*
(one reading), *singular* (one thing, not five joined by "and"), *complete* (no "TBD"), *feasible*
(possible for this business/budget), and **SMART**: Specific, Measurable, Achievable, Relevant, and
Time-bound. "Raise prices" is a wish; "raise the 2-hour portrait package from \$X to \$Y by
September, holding booking rate ≥ N%" is a goal.

**Write steps testably:** frame as "When <situation>, do <action>, so that <observable outcome>".
A reader (or a future you) must be able to mechanically decide whether each step was done — "client
receives gallery within 14 days of the shoot" passes/fails; "deliver promptly" doesn't.

**Always include the business equivalents of non-functional requirements — the half people forget:**
- **The numbers** — price, margin, break-even, target booking/conversion rate. A target without a
  number is a wish.
- **Legal & rights** — required contract signed before the date, deposit terms, usage license scoped
  (use/media/duration/territory), model/property releases where needed, copyright handling. *(Flag
  anything that needs a lawyer/CPA.)*
- **Client-experience SLAs** — inquiry response time, delivery turnaround, revision policy — stated
  as measurable promises.
- **Brand consistency** — tone, look, and naming the deliverable must match across touchpoints.
- **Money hygiene** — how it's invoiced, tracked, and reconciled; what's logged so you know later
  whether it worked (lead source, conversion, AOV).

**Make "done" explicit.** End a plan/SOP with a **Definition of Done**: targets defined with numbers,
contract/deposit/release requirements stated, client-experience SLAs set, metrics-to-track named,
and the doc indexed. Define these *before* the work starts, not after.

## Output formats

### Research / approach note — `docs/research/<topic>.md`
Follow the three-layer structure from **READ FIRST**. Write Section 3 first; distill 1 and 2 upward
from it independently.
```markdown
# <Topic> — Research Notes

> **Status: research only. Nothing here is committed or decided.** (or: Status — input to decision NNNN)
> The question: <one sentence>. The constraint: <genre / market / goal that bounds it>.

## 1. TL;DR
<5–10 lines, zero jargon, with the actual numbers. The handful of things that matter and what to do.
Define any unavoidable term in the same breath.>

## 2. The reasoning
<3–5 minutes, plain English, no unexplained jargon. The trade-offs, the recommendation, the *why* —
in prose. Distilled directly from Section 3, not from the TL;DR.>

## 3. Full research
<Everything — the base of record. Use the subsections below.>

### Candidate options (vs. the Principle Lens)
<for each: what it is, which principles it honors/strains, the named trade-off, the math worked out,
fit for this genre/market.>

### Recommendation
<what to do / defer, and why. State confidence, open questions, and any legal/tax line.>

### Sources
<graded list — mark each [A]/[B]/[C]; never list a [D]. Markdown links. Note where a figure is a
national average being applied locally.>
```

### Decision record — `docs/decisions/NNNN-<slug>.md`
```markdown
# DR-NNNN — <decision title>
- **Status:** Proposed | Accepted | Superseded by DR-XXXX
- **Date:** YYYY-MM-DD

## Context
<the forces and constraints; what makes this a decision (the genre, the market, the goal).>

## Decision
<the choice, in active voice: "We will …">

## Consequences
<resulting reality — positive, negative, AND neutral. What gets easier; what gets harder; what we
give up.>
```

### Plan / SOP — `docs/plans/<thing>.md`
```markdown
# <Thing> — Plan / SOP

> **Status:** Draft | Approved. Owner: <name>. Related: DR-XXXX, <research note>.

## Goal & ideal client  (start from the client and the outcome)
<who this is for; what success looks like, with a number and a date.>

## Steps / requirements
S-1. <singular, measurable step.>
  - **Done when:** <observable, pass/fail outcome>.
<…each numbered, each with a "done when".>

## Targets & metrics
- Price / margin / break-even: <numbers>  · Booking or conversion target: <%>
- Client-experience SLAs: <response time, turnaround>  · Lead source(s) tracked
- Legal & rights: <contract signed before date · deposit terms · usage license · releases> (flag legal line)

## Out of scope
<what this explicitly does NOT cover.>

## Open questions
<unknowns needing a decision — who/when. Mark any that need a lawyer/CPA.>

## Definition of Done
<targets numbered · contract/deposit/release stated · SLAs set · metrics named · doc indexed>
```

## Anti-patterns (don't do these)

- **Citing folklore.** "Charge 2–3× costs", "you can't use a photo of someone without a release ever",
  "you automatically lose copyright when you're paid" — open the PPA method, the Copyright Office, or
  ASMP and cite *that*. Never cite Tier D, and check whether the folk-claim is even true.
- **National average as a local price.** A BLS or PPA national figure is a starting reference, not
  your market rate. Say when you're extrapolating, and corroborate with local Tier-C signals.
- **Wrong artifact.** A lasting choice (the standard contract terms, the niche) buried in a research
  note instead of a decision record; a "launch this package" request answered with vibes instead of
  a measurable plan.
- **Unmeasurable goals.** "Grow the business", "be more premium", "better clients" with no number,
  date, or pass/fail test. If you can't write a "done when", it isn't a goal.
- **Forgetting the business NFRs.** A plan with tactics but no price/margin, no contract/deposit/
  release requirement, no response-time SLA, no metric to track.
- **Giving legal or tax advice.** Drafting an enforceable contract clause, ruling on copyright
  disputes, or classifying employees/contractors. Cite the primary source and send them to a pro.
- **Hiding uncertainty.** If sources disagree, the data is old, or you're extrapolating, say so.
  False confidence is worse than a flagged unknown.
- **Doing the thing.** This skill stops at the document. Booking, sending, signing, and posting are
  separate, later steps the owner takes.
```
