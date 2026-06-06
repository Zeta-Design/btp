import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts live as Markdown/MDX in src/content/blog/.
// The typed schema means a post can't ship missing its SEO description.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(), // required → every post has a meta description
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      // Optional hero image — drop a file in src/content/blog/ and reference it.
      // Using image() means Astro optimizes it (AVIF/WebP, responsive) automatically.
      heroImage: image().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
