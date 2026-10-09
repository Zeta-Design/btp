// Sections that are built but not launched. `preview` is true only under
// `astro dev`, so these show on the local dev server and never in production.
// To launch one, set it to `true` (preview pages also need moving from
// src/previews into src/pages — see the note at the top of each file).
const preview = import.meta.env.DEV;

export const LIVE = {
  drone: preview,
  aerials: preview,
  virtualStaging: preview,
};
