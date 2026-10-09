import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { LIVE } from '../../config/launch';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY as string);

  const body = await request.formData();
  const name            = (body.get('name')            as string)?.trim();
  const email           = (body.get('email')           as string)?.trim();
  const phone           = (body.get('phone')           as string)?.trim();
  const service         = (body.get('service')         as string)?.trim();
  const shootDate       = (body.get('shootDate')       as string)?.trim();
  const address         = (body.get('address')         as string)?.trim();
  const address2        = (body.get('address2')        as string)?.trim() ?? '';
  const city            = (body.get('city')            as string)?.trim();
  const state           = (body.get('state')           as string)?.trim();
  const zip             = (body.get('zip')             as string)?.trim();
  const tier            = (body.get('tier')            as string)?.trim() ?? '';
  const price           = (body.get('price')           as string)?.trim() ?? '';
  const paymentOption   = (body.get('paymentOption')   as string)?.trim() || 'deposit';
  const serviceCategory = (body.get('serviceCategory') as string)?.trim() || 'photo';
  const notes           = (body.get('notes')           as string)?.trim() ?? '';

  // Add-ons: same day
  const addonVideo      = body.get('addon_video')       === '1';
  const addonTwilight   = body.get('addon_twilight')    === '1';
  const addonDrone      = LIVE.drone && body.get('addon_drone') === '1';
  // Add-ons: standalone (separate appointment)
  const addonVideoSA    = body.get('addon_video_sa')    === '1';
  const addonTwilightSA = body.get('addon_twilight_sa') === '1';
  // Add-on: Virtual Twilight Edit (qty × $35)
  const addonVteQty     = Math.max(0, parseInt(((body.get('addon_vte_qty') as string) || '').replace(/\D/g, '') || '0'));

  const isEditingService = serviceCategory === 'editing';

  if (!name || !email || !phone || !service) {
    return new Response('Missing required fields', { status: 400 });
  }
  if (!isEditingService && (!shootDate || !address || !city || !state || !zip)) {
    return new Response('Missing required fields for shoot booking', { status: 400 });
  }

  const fullAddress = isEditingService
    ? ''
    : [address, address2 || null, `${city}, ${state} ${zip}`].filter(Boolean).join(', ');
  const siteUrl = (import.meta.env.SITE_URL as string) ?? 'https://bentimsmedia.com';

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

  // Add-on line items only apply to Pay in Full — deposit is always $150 flat.
  // In deposit mode, add-ons are tracked in metadata and billed with the final balance.
  if (isFullPayment) {
    if (addonVideo) lineItems.push({
      price_data: { currency: 'usd', product_data: { name: 'Add-on: Walkthrough Video (Same Day)', description: 'Gimbal walkthrough + 30–60 sec vertical social reel, same day as photo shoot' }, unit_amount: 21000 },
      quantity: 1,
    });
    if (addonTwilight) lineItems.push({
      price_data: { currency: 'usd', product_data: { name: 'Add-on: Twilight Session (Same Day)', description: '6–8 dusk/twilight exterior photos, same day as main shoot' }, unit_amount: 15500 },
      quantity: 1,
    });
    if (addonDrone) lineItems.push({
      price_data: { currency: 'usd', product_data: { name: 'Add-on: Drone Aerials (Same Day)', description: 'Aerial photos of the property, flown the same day as the photo shoot' }, unit_amount: 12500 },
      quantity: 1,
    });
    if (addonVideoSA) lineItems.push({
      price_data: { currency: 'usd', product_data: { name: 'Add-on: Walkthrough Video (Standalone)', description: 'Gimbal walkthrough + 30–60 sec vertical social reel, separate appointment' }, unit_amount: 34000 },
      quantity: 1,
    });
    if (addonTwilightSA) lineItems.push({
      price_data: { currency: 'usd', product_data: { name: 'Add-on: Twilight Session (Standalone)', description: '6–8 dusk/twilight exterior photos, separate appointment' }, unit_amount: 21000 },
      quantity: 1,
    });
    if (addonVteQty > 0) lineItems.push({
      price_data: { currency: 'usd', product_data: { name: 'Virtual Twilight Edit', description: 'Daytime exterior digitally converted to a twilight look' }, unit_amount: 3500 },
      quantity: addonVteQty,
    });
  }

  const addons = [
    addonVideo      ? 'Walkthrough Video — Same Day (+$210)'      : null,
    addonTwilight   ? 'Twilight Session — Same Day (+$155)'       : null,
    addonDrone      ? 'Drone Aerials — Same Day (+$125)'          : null,
    addonVideoSA    ? 'Walkthrough Video — Standalone (+$340)'    : null,
    addonTwilightSA ? 'Twilight Session — Standalone (+$210)'     : null,
    addonVteQty > 0 ? `Virtual Twilight Edit ×${addonVteQty} (+$${addonVteQty * 35})` : null,
  ].filter(Boolean).join('; ');

  const addonsTotal = String(
    (addonVideo      ? 210 : 0)
    + (addonTwilight   ? 155 : 0)
    + (addonDrone      ? 125 : 0)
    + (addonVideoSA    ? 340 : 0)
    + (addonTwilightSA ? 210 : 0)
    + (addonVteQty     * 35),
  );

  const metadata = {
    name, email, phone, service, tier, price, paymentOption,
    shootDate: shootDate || '',
    address: fullAddress,
    addons, addonsTotal,
    notes: notes.slice(0, 490),
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    // Stripe's collapsed "Add promotion code" field — shown ONLY on pay-in-full,
    // where a code discounts the true total. Hidden on the deposit path so a code
    // can't shave the $150 deposit (promo codes require paying in full). Manage
    // the actual codes in the Stripe dashboard.
    allow_promotion_codes: isFullPayment,
    customer_email: email,
    metadata,
    // Authorize only: the card is held, and charged when Ben approves the booking
    // on /approve-booking (or released if he declines / the hold expires in 7 days).
    payment_intent_data: {
      capture_method: 'manual',
      description: [productName, fullAddress].filter(Boolean).join(' – '),
      metadata,
    },
    success_url: `${siteUrl}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${siteUrl}/book`,
  });

  return Response.redirect(session.url!, 303);
};
