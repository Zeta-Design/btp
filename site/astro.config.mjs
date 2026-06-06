// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// Each deployed domain sets its own SITE_URL (used for canonical URLs, sitemap,
// and RSS) and PUBLIC_BRAND (selects which brand in src/config/site.ts to render).
// One codebase → many category sites. Locally it falls back to the default below.
//
// Hardened so a missing/bare/malformed SITE_URL can never break the build:
// a value without a scheme (e.g. "mysite.com") gets "https://" prepended,
// and anything unparseable falls back to the placeholder.
function resolveSite(raw) {
  const fallback = 'https://example.com';
  const value = (raw ?? '').trim();
  if (!value) return fallback;
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    return new URL(withScheme).origin;
  } catch {
    return fallback;
  }
}
const site = resolveSite(process.env.SITE_URL);

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Astro uses sharp by default. Prefer modern formats for photos.
    // Use <Image> / <Picture> from "astro:assets" and it negotiates AVIF/WebP.
  },
});
