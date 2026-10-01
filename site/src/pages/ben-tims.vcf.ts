import type { APIRoute } from 'astro';

// "Save my contact" card at /ben-tims.vcf. Served by a server route (not a
// static file) so the vCard MIME type and filename headers are exact. No
// `attachment`: iOS Safari previews an inline vCard as a contact card with
// Add/Create Contact; Android downloads it under the filename and opens it in
// the contacts app.
export const prerender = false;

// vCard 3.0 (RFC 2426): CRLF line endings; text values escape \ , ; and newlines.
const text = (s: string) => s.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\r?\n/g, '\\n');

const vcard = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  `N:${text('Tims')};${text('Ben')};;;`,
  `FN:${text('Ben Tims')}`,
  `ORG:${text('Ben Tims Media')}`,
  `TITLE:${text('Real Estate Photographer')}`,
  'TEL;TYPE=CELL,VOICE:+1-512-956-5646',
  'EMAIL;TYPE=INTERNET,WORK:info@bentims.com',
  'URL:https://bentimsmedia.com',
  'URL:https://www.instagram.com/bentimsmedia/',
  'END:VCARD',
].join('\r\n') + '\r\n';

export const GET: APIRoute = () =>
  new Response(vcard, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'inline; filename="ben-tims.vcf"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
