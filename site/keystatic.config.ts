import { config, fields, collection } from '@keystatic/core';

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

    // Categories (e.g. Real Estate, Portraits) → tiles on the Portfolio page.
    categories: collection({
      label: 'Categories',
      slugField: 'name',
      path: 'site/src/data/categories/*',
      format: { data: 'json' },
      columns: ['name', 'order'],
      schema: {
        name: fields.slug({
          name: { label: 'Category name', validation: { isRequired: true } },
        }),
        order: fields.integer({
          label: 'Sort order',
          description: 'Lower numbers appear first on the Portfolio page.',
          defaultValue: 0,
        }),
        cover: fields.image({
          label: 'Cover image',
          description: 'Shown on the category tile on the Portfolio page.',
          directory: 'site/src/assets/categories',
          publicPath: '/src/assets/categories/',
        }),
      },
    }),

    // Collections (e.g. House 1, Kelsey) belong to a category and hold the photos.
    collections: collection({
      label: 'Collections',
      slugField: 'name',
      path: 'site/src/data/collections/*',
      format: { data: 'json' },
      columns: ['name', 'date'],
      schema: {
        name: fields.slug({
          name: { label: 'Collection name', validation: { isRequired: true } },
        }),
        category: fields.relationship({
          label: 'Category',
          description: 'Which category this collection belongs to.',
          collection: 'categories',
          validation: { isRequired: true },
        }),
        date: fields.date({
          label: 'Date',
          description: 'Newer collections appear first on the category page.',
          defaultValue: { kind: 'today' },
        }),
        photos: fields.array(
          fields.object({
            image: fields.image({
              label: 'Photo',
              directory: 'site/src/assets/gallery',
              publicPath: '/src/assets/gallery/',
              validation: { isRequired: true },
            }),
            label: fields.text({
              label: 'Label',
              description: 'Short caption / alt text (used for accessibility & SEO).',
            }),
            featured: fields.checkbox({
              label: 'Feature on homepage',
              defaultValue: false,
            }),
          }),
          {
            label: 'Photos',
            itemLabel: (props) => props.fields.label.value || 'Photo',
          },
        ),
      },
    }),
  },
});
