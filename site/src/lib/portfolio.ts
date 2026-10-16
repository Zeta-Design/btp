import type { ImageMetadata } from 'astro';
import { allWorkOrder } from '../config/portfolio-tags';

// Fallback placeholder set (the original photos). Used by the home "Selected
// work", the 3D gallery, and the Portfolio page until you've built categories
// with photos in /admin — see src/lib/gallery.ts for the live gallery.
export type GalleryEntry = { meta: ImageMetadata; key: string; alt: string };

const mods = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/portfolio/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

// All work order (see src/config/portfolio-tags.ts); photos not listed there
// go last, alphabetically.
const rank = new Map(allWorkOrder().map((file, i) => [file, i]));
const rankOf = (key: string) => rank.get(key.split('/').pop() ?? key) ?? Infinity;
export const portfolio: GalleryEntry[] = Object.keys(mods)
  .sort((a, b) => rankOf(a) - rankOf(b) || a.localeCompare(b))
  .map((key) => ({ meta: mods[key].default, key, alt: '' }));

/** The 3D gallery samples colours from disk; this names the source folder. */
export const portfolioSource: 'portfolio' = 'portfolio';
