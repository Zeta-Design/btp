import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { buildConfirmationEmail } from './webhooks/stripe';

export const prerender = false;

// TEMPORARY — delete after confirming email looks correct
export const GET: APIRoute = async () => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY as string);

  const shootDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const result = await resend.emails.send({
    from: 'Ben Tims Media <info@bentims.com>',
    to: ['benjammintims@gmail.com'],
    bcc: ['info@bentims.com'],
    subject: '[TEST] Booking Confirmed – Real Estate Photography',
    html: buildConfirmationEmail({
      name: 'Jane Smith',
      email: 'benjammintims@gmail.com',
      phone: '(512) 555-0123',
      service: 'Real Estate Photography',
      tier: 'Real Estate – Up to 1,500 sq ft',
      price: '$185',
      shootDate,
      address: '123 Main St, Austin, TX 78701',
    }),
  });

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
