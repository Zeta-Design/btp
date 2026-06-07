# Admin Portal (Keystatic) — Setup & Usage

> **Date:** 2026-06-07
> **Status:** Built on branch **`admin-portal`** (committed, **not pushed/live yet**).
> Going live needs a one-time GitHub-app setup (below) that only the repo owner can do.

## What it is

- A private admin at **`/admin`** (redirects to `/keystatic`) — **noindex**, blocked in
  `robots.txt`, and **not linked anywhere** on the site.
- Manage **portfolio photos**: upload / remove / reorder. Saving **commits to GitHub**,
  which redeploys the site. New photos are auto-optimized (AVIF/WebP) like the rest.
- **Sign in with GitHub.** Editors = anyone with **write access** to `Zeta-Design/btp`.
- Admin-managed photos live in `site/src/assets/gallery/`. Until you add any there, the
  site keeps showing the existing `site/src/assets/portfolio/` set (nothing is lost).

## One-time setup (repo owner)

1. **Deploy the branch.** Merge `admin-portal` into `main` (or have Vercel build the
   branch as a preview) so `/keystatic` is live somewhere.
2. **Create the GitHub App.** Visit `https://bentimsmedia.com/keystatic` (or the preview
   URL). With no GitHub app configured, Keystatic shows a **setup screen** — follow it;
   GitHub auto-creates the app from a manifest. **Install the app on the `Zeta-Design/btp`
   repo.**
3. **Add the env vars** it gives you, in **Vercel → Settings → Environment Variables**:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET` (random value Keystatic provides)
   - `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
4. **Redeploy.** `/admin` now works.

## Add the "few others"

In **GitHub → repo Settings → Collaborators**, add their GitHub accounts with **write**
access. They can then sign in at `/admin`.

## Using it

Go to **`/admin`** → sign in with GitHub → **Gallery photos** → add/remove/reorder →
**Save**. It commits to GitHub and the site rebuilds (~1–2 min). *Each save = one Vercel
deploy (well within the 100/day limit).*

## Notes & caveats

- The Astro app lives in **`/site`**, so Keystatic's paths are repo-root-relative with a
  `site/` prefix. It runs in **GitHub mode only** (no local-filesystem mode) to keep paths
  consistent.
- Build switched from pure-static to **static + a Vercel server adapter** (only the admin
  routes are server-rendered; all marketing pages still prerender to static HTML — verified).
- **Alternative:** **Keystatic Cloud** (keystatic.cloud) handles auth without creating a
  GitHub App — say the word if you'd rather use that.
- The GitHub auth flow itself couldn't be tested here (it needs your app); the build and the
  static site output are verified.
