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
          // Inline images dropped into a post are saved to public/blog-images and
          // referenced by a public URL, so they always display on the live site.
          // (Served as-is, not astro:assets-optimized — keep uploads reasonably sized.)
          options: {
            image: {
              directory: 'site/public/blog-images',
              publicPath: '/blog-images/',
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
          fields.object({
            image: fields.image({
              label: 'Photo',
              directory: 'site/src/assets/gallery',
              publicPath: '/src/assets/gallery/',
              validation: { isRequired: true },
            }),
            label: fields.text({
              label: 'Label',
              description:
                'Short caption / alt text (e.g. "Sunlit kitchen"). Shows in this list and as the image alt text on the site.',
            }),
          }),
          {
            label: 'Photos',
            // Use the editable label as the list item title (always a string, so it
            // never tries to render the image object — which caused React #31).
            itemLabel: (props) => props.fields.label.value || 'Photo',
          },
        ),

      },
    }),
  },
});
