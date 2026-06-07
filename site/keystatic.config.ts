import { config, fields, singleton } from '@keystatic/core';

// Admin CMS for managing portfolio photos. GitHub mode: editors sign in with
// GitHub and changes are committed to the repo, which redeploys the site.
//
// NOTE: the Astro app lives in /site within the repo, so all paths are pinned
// with the `site/` prefix (Keystatic GitHub mode is relative to the repo root).
export default config({
  storage: {
    kind: 'github',
    repo: { owner: 'Zeta-Design', name: 'btp' },
  },
  ui: {
    brand: { name: 'Ben Tims Media' },
  },
  singletons: {
    gallery: singleton({
      label: 'Gallery photos',
      path: 'site/src/data/gallery',
      format: { data: 'json' },
      schema: {
        images: fields.array(
          fields.image({
            label: 'Photo',
            directory: 'site/src/assets/gallery',
            publicPath: '/src/assets/gallery/',
            validation: { isRequired: true },
          }),
          {
            label: 'Photos',
            itemLabel: (props) => props.value ?? 'Photo',
          },
        ),
      },
    }),
  },
});
