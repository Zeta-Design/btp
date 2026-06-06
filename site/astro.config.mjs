// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// Each deployed domain sets its own SITE_URL (used for canonical URLs, sitemap,
// and RSS) and PUBLIC_BRAND (selects which brand in src/config/site.ts to render).
// One codebase → many category sites. Locally it falls back to the values below.
const site = process.env.SITE_URL || 'https://example.com';

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
