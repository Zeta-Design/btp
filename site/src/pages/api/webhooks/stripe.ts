import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { approvalUrl } from '../../../lib/booking-approval';
import {
  FROM_ADDRESS,
  OWNER_EMAIL,
  bookingFromMetadata,
  buildConfirmationEmail,
  buildOwnerApprovalEmail,
  buildRequestEmail,
  formatDeadline,
} from '../../../lib/booking-emails';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY as string);
  const resend = new Resend(import.meta.env.RESEND_API_KEY as string);

  const body = await request.text();
  const sig  = request.headers.get('stripe-signature') ?? '';
  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return new Response(`Webhook signature error: ${msg}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const booking = bookingFromMetadata(session.metadata, session.customer_email);
    const piId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
    const pi = piId
      ? await stripe.paymentIntents.retrieve(piId, { expand: ['latest_charge'] })
      : null;

    if (pi?.status === 'requires_capture') {
      // Card is only authorized — the booking waits for Ben's approval.
      const charge = pi.latest_charge as Stripe.Charge | null;
      const siteUrl = (import.meta.env.SITE_URL as string) ?? 'https://bentimsmedia.com';

      await resend.emails.send({
        from: FROM_ADDRESS,
        to: [OWNER_EMAIL],
        ...(booking.email && { replyTo: booking.email }),
        subject: `Approve booking? ${booking.service ?? 'New request'} – ${booking.name ?? 'Client'}`,
        html: buildOwnerApprovalEmail(booking, {
          amountCents: pi.amount_capturable,
          approveUrl: approvalUrl(siteUrl, pi.id),
          deadline: formatDeadline(charge?.payment_method_details?.card?.capture_before),
        }),
      });

      if (booking.email) {
        await resend.emails.send({
          from: FROM_ADDRESS,
          to: [booking.email],
          subject: `Booking Request Received – ${booking.service ?? 'Your Photography Session'}`,
          html: buildRequestEmail(booking, pi.amount_capturable),
        });
      }
    } else if (booking.email) {
      // Already charged (e.g. a checkout started before holds were enabled).
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: [booking.email],
        bcc: [OWNER_EMAIL],
        subject: `Booking Confirmed – ${booking.service ?? 'Your Photography Session'}`,
        html: buildConfirmationEmail(booking, session.amount_total ?? undefined),
      });
    }
  }

  return new Response('OK', { status: 200 });
};
