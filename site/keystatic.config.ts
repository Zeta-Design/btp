import { config, fields, collection, singleton } from '@keystatic/core';

// Admin CMS. GitHub mode: editors sign in with GitHub and changes are committed
// to the repo, which redeploys the site.
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
  collections: {
    // Blog posts → src/content/blog/*.mdx, rendered by the existing Astro
    // content collection (+ @astrojs/mdx). Schema mirrors src/content.config.ts.
    posts: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'site/src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'pubDate'],
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } }),
        description: fields.text({
          label: 'Description',
          description: 'One or two sentences — used for SEO and the post preview.',
          multiline: true,
          validation: { isRequired: true },
        }),
        pubDate: fields.date({ label: 'Publish date', defaultValue: { kind: 'today' } }),
        updatedDate: fields.date({ label: 'Updated date (optional)' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({ label: 'Draft (hidden from the site)', defaultValue: false }),
        content: fields.mdx({
          label: 'Content',
          // Inline images you drop into a post are saved here and referenced with a
          // /src/ path so Astro optimizes them (AVIF/WebP) at build.
          options: {
            image: {
              directory: 'site/src/assets/blog',
              publicPath: '/src/assets/blog/',
            },
          },
        }),
      },
    }),
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
