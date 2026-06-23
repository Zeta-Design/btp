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
  const tier          = (body.get('tier')          as string)?.trim() ?? '';
  const price         = (body.get('price')         as string)?.trim() ?? '';
  const paymentOption = (body.get('paymentOption') as string)?.trim() || 'deposit';
  const addonVideo    = body.get('addon_video')    === '1';
  const addonTwilight = body.get('addon_twilight') === '1';

  if (!name || !email || !phone || !service || !shootDate || !address || !city || !state || !zip) {
    return new Response('Missing required fields', { status: 400 });
  }

  const fullAddress = [address, address2 || null, `${city}, ${state} ${zip}`].filter(Boolean).join(', ');
  const siteUrl = (import.meta.env.SITE_URL as string) ?? 'https://bentimsmedia.com';

  // Base session charge
  const isFullPayment = paymentOption === 'full' && !!price;
  const fullPriceCents = isFullPayment
    ? Math.round(parseFloat(price.replace(/[^0-9.]/g, '')) * 100)
    : 0;
  const unitAmount = isFullPayment && fullPriceCents > 0 ? fullPriceCents : 15000;

  const productName = isFullPayment
    ? `Full Payment – ${service}`
    : `Booking Deposit – ${service}`;
  const productDescription = isFullPayment
    ? 'Full session payment — no balance due after your shoot.'
    : 'Holds your shoot date. Balance due after your session.';

  type LineItem = { price_data: { currency: string; product_data: { name: string; description: string }; unit_amount: number }; quantity: number };
  const lineItems: LineItem[] = [{
    price_data: {
      currency: 'usd',
      product_data: { name: productName, description: productDescription },
      unit_amount: unitAmount,
    },
    quantity: 1,
  }];

  if (addonVideo) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'Add-on: Walkthrough Video', description: 'Gimbal walkthrough + 30–60 sec vertical social reel' },
        unit_amount: 20000,
      },
      quantity: 1,
    });
  }
  if (addonTwilight) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'Add-on: Twilight Session', description: '6–8 dusk/twilight exterior photos, same day as main shoot' },
        unit_amount: 15000,
      },
      quantity: 1,
    });
  }

  const addons = [addonVideo ? 'Walkthrough Video' : null, addonTwilight ? 'Twilight Session' : null]
    .filter(Boolean).join(', ');

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    customer_email: email,
    metadata: { name, phone, service, tier, price, paymentOption, shootDate, address: fullAddress, addons },
    success_url: `${siteUrl}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/book`,
  });

  return Response.redirect(session.url!, 303);
};
