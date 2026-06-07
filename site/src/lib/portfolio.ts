import type { ImageMetadata } from 'astro';

// Portfolio images come from src/assets/gallery/ (managed by the /admin CMS).
// Until any are added there, we fall back to the original src/assets/portfolio/
// set — so the site is never empty and existing photos are never at risk.
export type GalleryEntry = { meta: ImageMetadata; key: string };

const galleryMods = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/gallery/*.{jpg,jpeg,png,webp}',
  { eager: true },
);
const portfolioMods = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/portfolio/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

const toEntries = (mods: Record<string, { default: ImageMetadata }>): GalleryEntry[] =>
  Object.keys(mods)
    .sort()
    .map((key) => ({ meta: mods[key].default, key }));

const galleryEntries = toEntries(galleryMods);
const portfolioEntries = toEntries(portfolioMods);

/** Which source folder is live ("gallery" once the CMS has photos, else "portfolio"). */
export const portfolioSource: 'gallery' | 'portfolio' =
  galleryEntries.length > 0 ? 'gallery' : 'portfolio';

/** Ordered list of portfolio images for every gallery on the site. */
export const portfolio: GalleryEntry[] =
  galleryEntries.length > 0 ? galleryEntries : portfolioEntries;
