import type { ImageMetadata } from 'astro';

// Reads the /admin-managed Category → Collection → Photo structure.
//   categories:  src/data/categories/<slug>.json    { name, order, cover }
//   collections: src/data/collections/<slug>.json    { name, category, date, photos[] }
// Keystatic stores array images in indexed subfolders and references them by a
// full path (e.g. "/src/assets/gallery/images/0/image.png"), so we glob the
// asset dirs recursively and match by the path relative to the asset folder
// (falling back to the bare filename). Everything is defensive: if the data is
// missing or shaped differently, callers fall back to placeholders.

export type Photo = { meta: ImageMetadata; alt: string; featured: boolean; file: string };
export type Collection = { name: string; date: string; category: string; photos: Photo[] };
export type Category = {
  slug: string;
  name: string;
  order: number;
  cover?: ImageMetadata;
  href: string;
};

// ── image metadata (recursive: array images live in subfolders) ──────────────
const photoMods = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/gallery/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);
const coverMods = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/categories/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

type ImageIndex = { byRel: Record<string, ImageMetadata>; byName: Record<string, ImageMetadata> };
const indexImages = (mods: Record<string, { default: ImageMetadata }>, base: string): ImageIndex => {
  const marker = `/assets/${base}/`;
  const byRel: Record<string, ImageMetadata> = {};
  const byName: Record<string, ImageMetadata> = {};
  for (const p in mods) {
    const meta = mods[p].default;
    const i = p.indexOf(marker);
    if (i >= 0) byRel[p.slice(i + marker.length)] = meta;
    const name = p.split('/').pop();
    if (name) byName[name] = meta;
  }
  return { byRel, byName };
};
const photoIdx = indexImages(photoMods, 'gallery');
const coverIdx = indexImages(coverMods, 'categories');

// Resolve a CMS ref → { meta, file } where `file` is the path relative to the
// asset folder (used by the 3D gallery's colour sampling).
const resolve = (
  ref: string | undefined | null,
  idx: ImageIndex,
  base: string,
): { meta: ImageMetadata; file: string } | undefined => {
  if (!ref) return undefined;
  const marker = `/assets/${base}/`;
  const i = ref.indexOf(marker);
  const rel = i >= 0 ? ref.slice(i + marker.length) : ref;
  if (idx.byRel[rel]) return { meta: idx.byRel[rel], file: rel };
  const name = ref.split('/').pop()!;
  if (idx.byName[name]) return { meta: idx.byName[name], file: name };
  return undefined;
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
      cover: resolve(d.cover, coverIdx, 'categories')?.meta,
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
      const found = resolve(p.image, photoIdx, 'gallery');
      return found ? { meta: found.meta, alt: p.label ?? '', featured: !!p.featured, file: found.file } : null;
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
