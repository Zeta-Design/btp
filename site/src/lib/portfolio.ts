import type { ImageMetadata } from 'astro';

// Portfolio images come from src/assets/gallery/ (managed by the /admin CMS).
// The CMS writes src/data/gallery/index.json — an ordered list of { image, label }.
// We honor that order and use each label as alt text. If the data file is missing
// or malformed we fall back to globbing the gallery folder, and if that's empty we
// fall back to the original src/assets/portfolio/ set — so the site is never empty
// and existing photos are never at risk.
export type GalleryEntry = { meta: ImageMetadata; key: string; alt: string };

const galleryMods = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/gallery/*.{jpg,jpeg,png,webp}',
  { eager: true },
);
const portfolioMods = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/portfolio/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

// gallery image metadata keyed by filename, for lookups from the CMS data file
const galleryByName: Record<string, ImageMetadata> = {};
for (const path in galleryMods) {
  const name = path.split('/').pop();
  if (name) galleryByName[name] = galleryMods[path].default;
}

// Optional ordered data written by the CMS.
// Shape: { images: Array<{ image: string; label?: string } | string> }
const dataMods = import.meta.glob<{
  default: { images?: Array<{ image?: string; label?: string } | string> };
}>('../data/gallery/index.json', { eager: true });
const galleryData = Object.values(dataMods)[0]?.default;

const globEntries = (mods: Record<string, { default: ImageMetadata }>): GalleryEntry[] =>
  Object.keys(mods)
    .sort()
    .map((key) => ({ meta: mods[key].default, key, alt: '' }));

const dataEntries = (): GalleryEntry[] => {
  const items = galleryData?.images;
  if (!Array.isArray(items)) return [];
  const out: GalleryEntry[] = [];
  for (const item of items) {
    const file = typeof item === 'string' ? item : item?.image;
    const alt = typeof item === 'string' ? '' : (item?.label ?? '');
    if (!file) continue;
    const meta = galleryByName[file];
    if (meta) out.push({ meta, key: `../assets/gallery/${file}`, alt });
  }
  return out;
};

const fromData = dataEntries();
const galleryEntries = fromData.length > 0 ? fromData : globEntries(galleryMods);
const portfolioEntries = globEntries(portfolioMods);

/** Which source folder is live ("gallery" once the CMS has photos, else "portfolio"). */
export const portfolioSource: 'gallery' | 'portfolio' =
  galleryEntries.length > 0 ? 'gallery' : 'portfolio';

/** Ordered list of portfolio images for every gallery on the site. */
export const portfolio: GalleryEntry[] =
  galleryEntries.length > 0 ? galleryEntries : portfolioEntries;
