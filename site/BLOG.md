# Writing Blog Posts (Journal)

**Easiest way:** write posts in the **admin** at `/admin` → **Blog posts** (no files,
no Git). This guide covers the file-based way, which still works and is what the admin
reads/writes underneath.

Posts are **Markdown/MDX files** — no database. You add a file (or use the admin), and
you get a fully SEO-optimized page automatically.

> ⚠️ **Don't** put this file (or any non-post `.md`) inside `src/content/blog/` —
> everything in that folder is treated as a blog post. That's why this guide lives
> in `site/BLOG.md`.

---

## Where posts live

```
site/src/content/blog/
  how-to-prepare-for-your-session.md
  your-next-post.md
```

**The file name becomes the URL.** `best-austin-listing-tips.md` →
`bentimsmedia.com/blog/best-austin-listing-tips/`. Use lowercase words separated by
hyphens.

---

## Anatomy of a post

Every post starts with a **frontmatter** block (between the `---` lines), then the
body in Markdown:

```md
---
title: "How to Prep Your Home for Listing Photos"
description: "A quick checklist to get a property camera-ready — required, and used for SEO + the Journal preview."
pubDate: 2026-06-10
tags: ["real estate", "tips"]
draft: false
---

Your post content goes here, written in Markdown.
```

### Frontmatter fields

| Field | Required? | What it does |
|---|---|---|
| `title` | ✅ yes | Post title (page `<title>`, heading, SEO) |
| `description` | ✅ yes | 1–2 sentence summary — shows in the Journal list, search results, and social previews |
| `pubDate` | ✅ yes | Publish date, `YYYY-MM-DD` |
| `updatedDate` | optional | Show a "last updated" date |
| `tags` | optional | List of tags, e.g. `["real estate", "austin"]` |
| `draft` | optional | `true` hides the post from the site, list, sitemap, and RSS until you're ready. Defaults to `false` (published) |
| `heroImage` | optional | Reserved for a header image — *not displayed on the page yet*; ask to enable it |

If you forget `title` or `description`, the build will fail on purpose — that keeps
every post SEO-complete.

---

## Markdown basics

```md
## A section heading

Normal paragraph text. Make words **bold** or *italic*.

- bullet point
- another point

1. numbered step
2. next step

[A link](https://example.com)

> A pull quote.
```

---

## Adding photos

**Inline image in the body** — drop the image file in the same folder as the post,
then reference it relatively. Astro automatically optimizes it (AVIF/WebP, resized):

```md
![Bright living room with natural light](./living-room.jpg)
```

The text in brackets is the **alt text** — always describe the photo (good for
accessibility and image SEO).

**Video / embeds** (e.g. a YouTube walkthrough) need the richer `.mdx` format
instead of `.md`. Ask when you want this and we'll set up an embed component.

---

## What you get automatically

For every post, with zero extra work:
- A fast, static page at `/blog/<file-name>/`
- SEO tags (title, description, canonical, social preview)
- `BlogPosting` structured data (Google rich-result eligible)
- An entry in `sitemap-index.xml` and `rss.xml`
- It appears in the **Journal** list, newest first

---

## Publishing (how it goes live)

The site rebuilds and deploys when changes reach GitHub (`main` branch). Two ways to
add a post **without any local setup**:

1. **GitHub web editor (no tools needed):**
   - Go to the repo → `site/src/content/blog/` → **Add file → Create new file**
   - Name it `my-post.md`, paste the frontmatter + content, click **Commit**
   - Vercel rebuilds automatically; the post is live in ~a minute
   - *(Uploading photos this way is clunky — fine for text, less so for image-heavy posts.)*

2. **Locally** (if you have the project open): add the `.md` file, run
   `pnpm dev` to preview at `localhost:4321/blog/...`, then commit + push.

> Each publish triggers one Vercel deploy (the project has a 100 deploys/day limit —
> plenty for blogging).

---

## Coming later: a visual editor

When you want to write posts and drag in photos from a browser — no Markdown, no
GitHub — we'll add **Keystatic** (an editor at `/keystatic`). This guide stays valid
either way; Keystatic just writes these same files for you.
