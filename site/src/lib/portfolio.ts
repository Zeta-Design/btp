import type { ImageMetadata } from 'astro';

// Fallback placeholder set (the original photos). Used by the home "Selected
// work", the 3D gallery, and the Portfolio page until you've built categories
// with photos in /admin — see src/lib/gallery.ts for the live gallery.
export type GalleryEntry = { meta: ImageMetadata; key: string; alt: string };

const mods = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/portfolio/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

export const portfolio: GalleryEntry[] = Object.keys(mods)
  .sort()
  .map((key) => ({ meta: mods[key].default, key, alt: '' }));

/** The 3D gallery samples colours from disk; this names the source folder. */
export const portfolioSource: 'portfolio' = 'portfolio';
