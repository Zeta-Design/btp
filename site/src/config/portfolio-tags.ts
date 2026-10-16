// Portfolio photo categories and order, for src/assets/portfolio (by filename).
//
// Order: the home page's Recent work shows RECENT_WORK below, and All work opens
// with the same photos. They're arranged so no two from the same category sit next to
// each other in the 3-across grid, side by side or stacked. Everything else
// follows in filename order. Category tabs keep that same order, filtered.
// Each photo has exactly one place category; `twilight` is a shooting style
// layered on top. Untagged photos still show under All work. Renaming a photo
// file means renaming its key here too.

/** Place categories (every photo has exactly one). */
export const PLACES = ['exteriors', 'interiors', 'themed-rooms', 'pools'] as const;

export const TAGS: Record<string, string[]> = {
  // Exteriors: fronts, entries and the home from the yard
  '00-farmhouse-exterior-twilight.jpg': ['exteriors', 'twilight'],
  '01z-p3-DSC_8792.jpg': ['exteriors', 'twilight'], // villa at night
  '00a-palm-exterior-sunset.jpg': ['exteriors', 'twilight'],
  '18d-az-exterior-front.jpg': ['exteriors'], // daytime, breaks up the dusk shots up top
  '01-dornoch-exterior-twilight.jpg': ['exteriors', 'twilight'],
  '01-troon-exterior-twilight.jpg': ['exteriors', 'twilight'],
  '18c-farmhouse-front-entry.jpg': ['exteriors', 'twilight'],
  '01za-59th-pl-exterior.jpg': ['exteriors'],
  '10-59th-pl-exterior-twilight.jpg': ['exteriors', 'twilight'],
  '13a-continental-ave-front-entry.jpg': ['exteriors'],
  '09-continental-ave-exterior.jpg': ['exteriors'],

  // Interiors: the regular rooms
  '14-dornoch-living-room.jpg': ['interiors'],
  '02-0-troon-bedroom-navy.jpg': ['interiors'],
  '06-dornoch-dining-open-plan.jpg': ['interiors'],
  '17-troon-living-room.jpg': ['interiors'],
  '04a-eaton-st-38.jpg': ['interiors'],
  '02-troon-cir-bedroom-green.jpg': ['interiors'],
  '02a-troon-cir-bathroom.jpg': ['interiors'],
  '08-dornoch-46.jpg': ['interiors'], // kitchen
  '04c-az-great-room.jpg': ['interiors'],
  '16-dornoch-66.jpg': ['interiors'], // bedroom
  '05-dornoch-64.jpg': ['interiors'], // twin bedroom
  '05a-juliet-dr-living-dining.jpg': ['interiors'],
  '04e-az-master-bedroom.jpg': ['interiors'],
  '11-dornoch-8.jpg': ['interiors'], // tulip detail
  '04d-az-kitchen.jpg': ['interiors'],
  '06-dornoch-62.jpg': ['interiors'], // bathroom

  // Themed rooms: game rooms, theaters and character bedrooms
  '15-dornoch-game-room.jpg': ['themed-rooms'], // Mario game room
  '18f-oakmoss-loop-game-room.jpg': ['themed-rooms'], // Ghostbusters
  '20b-scooby-doo-bedroom.jpg': ['themed-rooms'],
  '03z-dornoch-bedroom-harry-potter.jpg': ['themed-rooms'],
  'p3-DSC_0580.jpg': ['themed-rooms'], // Toy Story arcade
  '04a-juliet-dr-bunk-room.jpg': ['themed-rooms'], // Moana
  'p3-DSC_0772.jpg': ['themed-rooms'], // Mario bunk room
  '13-troon-bedroom-encanto.jpg': ['themed-rooms'],
  '19c-oakmoss-loop-movie-night.jpg': ['themed-rooms'], // kept well apart from the empty Ghostbusters shot
  '03-dornoch-71.jpg': ['themed-rooms'], // Mario billiards close-up, apart from the wide one

  // Pools & outdoor living: pools, hot tubs, lanais, fire pits, backyards
  '07-oakmoss-loop-resort-pool.jpg': ['pools', 'twilight'],
  '05-troon-pool-fire-pit.jpg': ['pools'], // pool lanai
  '19b-hot-tub-night.jpg': ['pools', 'twilight'],
  '03-troon-fire-pit-night.jpg': ['pools', 'twilight'],
  '04-game-room-pool.jpg': ['pools'], // flamingo pool
  '01zb-hot-tub-couple.jpg': ['pools'],
  '04a-eaton-st-26.jpg': ['pools', 'twilight'], // fire pit patio
  '04-dornoch-23.jpg': ['pools'], // covered outdoor dining
  '04b-az-backyard-pool.jpg': ['pools'],
  'dornoch-contact-banner.jpg': ['pools'], // poolside toast
  '18e-az-putting-green.jpg': ['pools'],
};

/** Home page Recent work (all of it) and the top of All work, in display order,
 *  rows of 3. Keep it a multiple of 3 so the last row is full. */
export const RECENT_WORK = [
  '00-farmhouse-exterior-twilight.jpg', '02-0-troon-bedroom-navy.jpg', '04-game-room-pool.jpg',
  '01zb-hot-tub-couple.jpg', '18f-oakmoss-loop-game-room.jpg', '01z-p3-DSC_8792.jpg',
  '00a-palm-exterior-sunset.jpg', '04a-eaton-st-38.jpg', '03-troon-fire-pit-night.jpg',
  '14-dornoch-living-room.jpg', '04a-eaton-st-26.jpg', '01-dornoch-exterior-twilight.jpg',
  '18d-az-exterior-front.jpg', '03z-dornoch-bedroom-harry-potter.jpg', '02-troon-cir-bedroom-green.jpg',
  '04-dornoch-23.jpg', '02a-troon-cir-bathroom.jpg', '01za-59th-pl-exterior.jpg',
];

/** Filenames that lead All work; the rest follow alphabetically. */
export const allWorkOrder = (): string[] => RECENT_WORK;
