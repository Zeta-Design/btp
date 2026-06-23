import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

// TEMPORARY — delete after confirming email works
export const GET: APIRoute = async () => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY as string);

  const result = await resend.emails.send({
    from: 'Ben Tims Media <info@bentims.com>',
    to: ['benjammintims@gmail.com'],
    subject: '[TEST] Booking Confirmed – Real Estate Photography',
    html: `<p>Test email from Ben Tims Media — if you see this, Resend is working correctly and confirmation emails will fire after real bookings.</p>`,
  });

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
