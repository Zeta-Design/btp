import type { ImageMetadata } from 'astro';

// Reads the /admin-managed Category → Collection → Photo structure.
//   categories:  src/data/categories/<slug>.json   { name, order, cover }
//   collections: src/data/collections/<slug>.json   { name, category, date, photos[] }
// Photo/cover image files live in src/assets/* and are matched by filename so
// astro:assets can optimize them. Everything here is defensive: if the data is
// missing or shaped slightly differently, callers fall back to placeholders.

export type Photo = { meta: ImageMetadata; alt: string; featured: boolean; file: string };
export type Collection = { name: string; date: string; category: string; photos: Photo[] };
export type Category = {
  slug: string;
  name: string;
  order: number;
  cover?: ImageMetadata;
  href: string;
};

// ── image metadata, keyed by filename ───────────────────────────────────────
const photoMods = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/gallery/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);
const coverMods = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/categories/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);
const byName = (mods: Record<string, { default: ImageMetadata }>): Record<string, ImageMetadata> => {
  const out: Record<string, ImageMetadata> = {};
  for (const path in mods) {
    const name = path.split('/').pop();
    if (name) out[name] = mods[path].default;
  }
  return out;
};
const photoByName = byName(photoMods);
const coverByName = byName(coverMods);

const findImage = (
  ref: string | undefined | null,
  map: Record<string, ImageMetadata>,
): ImageMetadata | undefined => {
  if (!ref) return undefined;
  return map[ref.split('/').pop()!]; // tolerate a bare filename or a path
};

// ── raw CMS data (glob handles either <slug>.json or <slug>/index.json) ──────
type CatData = { name?: string; order?: number; cover?: string };
type ColData = {
  name?: string;
  category?: string;
  date?: string;
  photos?: Array<{ image?: string; label?: string; featured?: boolean }>;
};
const catMods = import.meta.glob<{ default: CatData }>('../data/categories/**/*.json', { eager: true });
const colMods = import.meta.glob<{ default: ColData }>('../data/collections/**/*.json', { eager: true });

const slugFromPath = (path: string): string => {
  const parts = path.split('/');
  const file = parts.pop()!;
  if (file.toLowerCase() === 'index.json') return parts.pop() ?? '';
  return file.replace(/\.json$/i, '');
};

// ── categories ───────────────────────────────────────────────────────────────
export const categories: Category[] = Object.entries(catMods)
  .map(([path, mod]) => {
    const d = mod.default ?? {};
    const slug = slugFromPath(path);
    return {
      slug,
      name: d.name || slug,
      order: typeof d.order === 'number' ? d.order : 0,
      cover: findImage(d.cover, coverByName),
      href: `/portfolio/${slug}/`,
    };
  })
  .filter((c) => c.slug)
  .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

// ── collections ──────────────────────────────────────────────────────────────
const allCollections: Collection[] = Object.values(colMods).map((mod) => {
  const d = mod.default ?? {};
  const photos: Photo[] = (Array.isArray(d.photos) ? d.photos : [])
    .map((p) => {
      const meta = findImage(p.image, photoByName);
      const file = (p.image ?? '').split('/').pop() ?? '';
      return meta ? { meta, alt: p.label ?? '', featured: !!p.featured, file } : null;
    })
    .filter((p): p is Photo => p !== null);
  return {
    name: d.name ?? '',
    date: d.date ?? '',
    category: (d.category ?? '').split('/').pop() ?? '',
    photos,
  };
});

const byDateDesc = (a: Collection, b: Collection) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : a.name.localeCompare(b.name);

/** Collections in a category, newest first. */
export const collectionsForCategory = (slug: string): Collection[] =>
  allCollections.filter((c) => c.category === slug && c.photos.length > 0).sort(byDateDesc);

/** Featured photos across everything (newest collections first). */
export const featured: Photo[] = [...allCollections]
  .sort(byDateDesc)
  .flatMap((c) => c.photos.filter((p) => p.featured));

/** Categories that actually have at least one photo. */
export const visibleCategories: Category[] = categories.filter(
  (c) => collectionsForCategory(c.slug).length > 0,
);

export const hasGallery = visibleCategories.length > 0;
