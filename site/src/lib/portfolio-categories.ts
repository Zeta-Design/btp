import { portfolio } from './portfolio';
import { LIVE } from '../config/launch';
import { TAGS } from '../config/portfolio-tags';

export interface PortfolioCategory {
  id: string;
  /** tab text */
  label: string;
  /** page heading */
  title: string;
  intro: string;
  /** <title> and meta description */
  seoTitle: string;
  description: string;
  /** false while unlaunched (see src/config/launch.ts) */
  live: boolean;
  /** 'tags': photos from All work, picked by TAGS below — these filter in place
   *  on the portfolio page. 'folder': its own photo folder and preview page. */
  source: 'tags' | 'folder';
}

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: 'exteriors',
    label: 'Exteriors',
    title: 'Exteriors',
    intro: 'Curb appeal, front entries and the home from every side — tap any image to view it larger.',
    seoTitle: 'Exterior Real Estate Photography',
    description: 'Exterior real estate and vacation rental photography — curb appeal, front entries and the home from every side.',
    live: true,
    source: 'tags',
  },
  {
    id: 'interiors',
    label: 'Interiors',
    title: 'Interiors',
    intro: 'Bright, true-to-life rooms, from kitchens and living spaces to bedrooms and baths — tap any image to view it larger.',
    seoTitle: 'Interior Real Estate Photography',
    description: 'Interior real estate and vacation rental photography — kitchens, living spaces, bedrooms and bathrooms.',
    live: true,
    source: 'tags',
  },
  {
    id: 'themed-rooms',
    label: 'Themed rooms',
    title: 'Themed rooms',
    intro: 'Game rooms, home theaters and one-of-a-kind character bedrooms — tap any image to view it larger.',
    seoTitle: 'Themed Room & Game Room Photography',
    description: 'Themed room photography for vacation rentals — game rooms, home theaters and character bedrooms that get guests booking.',
    live: true,
    source: 'tags',
  },
  {
    id: 'pools',
    label: 'Pools & outdoor',
    title: 'Pools & outdoor living',
    intro: 'Pools, hot tubs, lanais and backyard spaces made for vacation days — tap any image to view it larger.',
    seoTitle: 'Pool & Outdoor Living Photography',
    description: 'Pool and outdoor living photography for vacation rentals and real estate — pools, hot tubs, lanais, fire pits and backyards.',
    live: true,
    source: 'tags',
  },
  {
    // A shooting style rather than a place: twilight photos also sit in their
    // place category (Exteriors, Pools & outdoor), unlike the place tabs, which
    // never share a photo.
    id: 'twilight',
    label: 'Twilight',
    title: 'Twilight',
    intro: 'Dusk and night shots with glowing windows, lit pools and dramatic skies — tap any image to view it larger.',
    seoTitle: 'Twilight Real Estate Photography',
    description: 'Twilight and dusk real estate photography — glowing windows, dramatic skies and night exteriors.',
    live: true,
    source: 'tags',
  },
  {
    id: 'aerials',
    label: 'Aerials',
    title: 'Aerials',
    intro: 'Drone photography that shows the whole property, the lot and the neighborhood — tap any image to view it larger.',
    seoTitle: 'Aerial Drone Real Estate Photography',
    description: 'Aerial drone photography for real estate and vacation rentals — the property, the lot and the neighborhood.',
    live: LIVE.aerials,
    source: 'folder',
  },
  {
    id: 'virtual-staging',
    label: 'Virtual staging',
    title: 'Virtual staging',
    intro: 'Empty rooms, furnished digitally so buyers can picture living there. Every staged image is clearly labeled for MLS disclosure — tap any image to view it larger.',
    seoTitle: 'Virtual Staging Portfolio',
    description: 'Virtually staged real estate photography — empty rooms furnished digitally so buyers can picture living there.',
    live: LIVE.virtualStaging,
    source: 'folder',
  },
];

export const visibleCategories = portfolioCategories.filter((c) => c.live);

export const getCategory = (id: string): PortfolioCategory => {
  const c = portfolioCategories.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown portfolio category: ${id}`);
  return c;
};

// Which categories each photo belongs to, and their order: see
// src/config/portfolio-tags.ts.
const fileName = (key: string) => key.split('/').pop() ?? key;

/** Category ids a portfolio photo is tagged with (by its glob key). */
export const categoriesOf = (key: string): string[] => TAGS[fileName(key)] ?? [];

// Catch tags orphaned by a renamed/removed photo while working locally.
if (import.meta.env.DEV) {
  const files = new Set(portfolio.map((e) => fileName(e.key)));
  const orphaned = Object.keys(TAGS).filter((f) => !files.has(f));
  if (orphaned.length) console.warn(`[portfolio-categories] tagged photos not found (renamed?): ${orphaned.join(', ')}`);
}
