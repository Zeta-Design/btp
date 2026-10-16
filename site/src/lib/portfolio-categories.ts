import { portfolio } from './portfolio';
import { LIVE } from '../config/launch';

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
    intro: 'Curb appeal, backyards, pools and outdoor living — tap any image to view it larger.',
    seoTitle: 'Exterior Real Estate Photography',
    description: 'Exterior real estate and vacation rental photography — curb appeal, backyards, pools and outdoor living.',
    live: true,
    source: 'tags',
  },
  {
    id: 'interiors',
    label: 'Interiors',
    title: 'Interiors',
    intro: 'Bright, true-to-life rooms, from kitchens and bedrooms to one-of-a-kind themed spaces — tap any image to view it larger.',
    seoTitle: 'Interior Real Estate Photography',
    description: 'Interior real estate and vacation rental photography — kitchens, living spaces, bedrooms and themed rooms.',
    live: true,
    source: 'tags',
  },
  {
    id: 'twilight',
    label: 'Twilight',
    title: 'Twilight',
    intro: 'Dusk and night exteriors with glowing windows and dramatic skies — tap any image to view it larger.',
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

// Which categories each photo in src/assets/portfolio belongs to, by filename.
// A photo can be in several; untagged photos still show under All work.
// Renaming a photo file means renaming its key here too.
const TAGS: Record<string, string[]> = {
  '00-farmhouse-exterior-twilight.jpg': ['exteriors', 'twilight'],
  '01-dornoch-exterior-twilight.jpg': ['exteriors', 'twilight'],
  '01-troon-exterior-twilight.jpg': ['exteriors', 'twilight'],
  '01z-p3-DSC_8792.jpg': ['exteriors', 'twilight'],
  '01za-59th-pl-exterior.jpg': ['exteriors'],
  '18d-az-exterior-front.jpg': ['exteriors'],
  '02-0-troon-bedroom-navy.jpg': ['interiors'],
  '02-troon-cir-bedroom-green.jpg': ['interiors'],
  '18e-az-putting-green.jpg': ['exteriors'],
  '18f-oakmoss-loop-game-room.jpg': ['interiors'],
  '03-dornoch-71.jpg': ['interiors'],
  '03-troon-fire-pit-night.jpg': ['exteriors', 'twilight'],
  '03z-dornoch-bedroom-harry-potter.jpg': ['interiors'],
  '04-dornoch-23.jpg': ['exteriors'],
  '04-game-room-pool.jpg': ['exteriors'],
  '04a-eaton-st-26.jpg': ['exteriors', 'twilight'],
  '04a-eaton-st-38.jpg': ['interiors'],
  '04a-juliet-dr-bunk-room.jpg': ['interiors'],
  '04b-az-backyard-pool.jpg': ['exteriors'],
  '04c-az-great-room.jpg': ['interiors'],
  '04d-az-kitchen.jpg': ['interiors'],
  '04e-az-master-bedroom.jpg': ['interiors'],
  '05-dornoch-64.jpg': ['interiors'],
  '05-troon-pool-fire-pit.jpg': ['exteriors'],
  '05a-juliet-dr-living-dining.jpg': ['interiors'],
  '06-dornoch-62.jpg': ['interiors'],
  '06-dornoch-dining-open-plan.jpg': ['interiors'],
  '07-oakmoss-loop-resort-pool.jpg': ['exteriors', 'twilight'],
  '08-dornoch-46.jpg': ['interiors'],
  '09-continental-ave-exterior.jpg': ['exteriors'],
  '10-59th-pl-exterior-twilight.jpg': ['exteriors', 'twilight'],
  '11-dornoch-8.jpg': ['interiors'],
  '13-troon-bedroom-encanto.jpg': ['interiors'],
  '13a-continental-ave-front-entry.jpg': ['exteriors'],
  '14-dornoch-living-room.jpg': ['interiors'],
  '15-dornoch-game-room.jpg': ['interiors'],
  '16-dornoch-66.jpg': ['interiors'],
  '17-troon-living-room.jpg': ['interiors'],
  '18c-farmhouse-front-entry.jpg': ['exteriors', 'twilight'],
  '01zb-hot-tub-couple.jpg': ['exteriors'],
  '19b-hot-tub-night.jpg': ['exteriors', 'twilight'],
  '19c-oakmoss-loop-movie-night.jpg': ['interiors'],
  '00a-palm-exterior-sunset.jpg': ['exteriors', 'twilight'],
  '20b-scooby-doo-bedroom.jpg': ['interiors'],
  'p3-DSC_0580.jpg': ['interiors'],
  'p3-DSC_0772.jpg': ['interiors'],
};

const fileName = (key: string) => key.split('/').pop() ?? key;

/** Category ids a portfolio photo is tagged with (by its glob key). */
export const categoriesOf = (key: string): string[] => TAGS[fileName(key)] ?? [];

// Catch tags orphaned by a renamed/removed photo while working locally.
if (import.meta.env.DEV) {
  const files = new Set(portfolio.map((e) => fileName(e.key)));
  const orphaned = Object.keys(TAGS).filter((f) => !files.has(f));
  if (orphaned.length) console.warn(`[portfolio-categories] tagged photos not found (renamed?): ${orphaned.join(', ')}`);
}
