import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY as string);

  const body    = await request.formData();
  const name    = (body.get('name')    as string)?.trim();
  const email   = (body.get('email')   as string)?.trim();
  const phone   = (body.get('phone')   as string)?.trim() ?? '';
  const service = (body.get('service') as string)?.trim() ?? '';
  const message = (body.get('message') as string)?.trim();

  if (!name || !email || !message) {
    return new Response('Missing required fields', { status: 400 });
  }

  const rows = [
    ['Name',    name],
    ['Email',   email],
    ...(phone   ? [['Phone',   phone]]   : []),
    ...(service ? [['Service', service]] : []),
    ['Message', message.replace(/\n/g, '<br/>')],
  ] as [string, string][];

  const html = `
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:560px;">
      ${rows.map(([label, value]) => `
        <tr>
          <td style="padding:10px 16px;background:#f5f4f2;font-weight:600;color:#78716c;width:28%;vertical-align:top;border-bottom:1px solid #e7e5e4;">${label}</td>
          <td style="padding:10px 16px;color:#1c1917;border-bottom:1px solid #e7e5e4;">${value}</td>
        </tr>`).join('')}
    </table>`;

  await resend.emails.send({
    from: 'Ben Tims Media <info@bentims.com>',
    to:   ['info@bentims.com'],
    reply_to: email,
    subject:  `New inquiry from ${name}${service ? ` — ${service}` : ''}`,
    html,
  });

  const siteUrl = (import.meta.env.SITE_URL as string) ?? 'https://bentimsmedia.com';
  return Response.redirect(`${siteUrl}/contact/?sent=1`, 303);
};
