import type { APIRoute } from 'astro';

// Lets crawlers in and points them at the sitemap (per-domain, absolute URL).
export const GET: APIRoute = ({ site }) => {
  const body = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /keystatic
Disallow: /api/keystatic
Disallow: /approve-booking

Sitemap: ${new URL('sitemap-index.xml', site).href}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
