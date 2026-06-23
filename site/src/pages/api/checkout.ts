import type { APIRoute } from 'astro';
import Stripe from 'stripe';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY as string);

  const body = await request.formData();
  const name      = (body.get('name')      as string)?.trim();
  const email     = (body.get('email')     as string)?.trim();
  const phone     = (body.get('phone')     as string)?.trim();
  const service   = (body.get('service')   as string)?.trim();
  const shootDate = (body.get('shootDate') as string)?.trim();
  const address   = (body.get('address')   as string)?.trim();
  const address2  = (body.get('address2')  as string)?.trim() ?? '';
  const city      = (body.get('city')      as string)?.trim();
  const state     = (body.get('state')     as string)?.trim();
  const zip       = (body.get('zip')       as string)?.trim();
  const tier      = (body.get('tier')      as string)?.trim() ?? '';

  if (!name || !email || !phone || !service || !shootDate || !address || !city || !state || !zip) {
    return new Response('Missing required fields', { status: 400 });
  }

  const fullAddress = [address, address2 || null, `${city}, ${state} ${zip}`].filter(Boolean).join(', ');

  const siteUrl = (import.meta.env.SITE_URL as string) ?? 'https://bentimsmedia.com';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Booking Deposit – ${service}`,
          description: 'Holds your shoot date. Balance due after your session.',
        },
        unit_amount: 15000,
      },
      quantity: 1,
    }],
    mode: 'payment',
    customer_email: email,
    metadata: { name, phone, service, tier, shootDate, address: fullAddress },
    success_url: `${siteUrl}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/book`,
  });

  return Response.redirect(session.url!, 303);
};
