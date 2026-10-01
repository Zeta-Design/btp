import { createHmac, timingSafeEqual } from 'node:crypto';

// Approve/decline links carry an HMAC of the PaymentIntent id so only the holder
// of the emailed link can act on a booking. The signing key is derived from the
// Stripe secret key (anyone holding that already has full Stripe access), so
// there is no extra secret to configure.
const signingKey = () =>
  createHmac('sha256', import.meta.env.STRIPE_SECRET_KEY as string)
    .update('btp-booking-approval-v1')
    .digest();

const sign = (paymentIntentId: string) =>
  createHmac('sha256', signingKey()).update(paymentIntentId).digest('base64url');

export const verifyApproval = (paymentIntentId: string, sig: string): boolean => {
  const expected = Buffer.from(sign(paymentIntentId));
  const given = Buffer.from(sig);
  return given.length === expected.length && timingSafeEqual(given, expected);
};

export const approvalUrl = (siteUrl: string, paymentIntentId: string): string => {
  const url = new URL('/approve-booking/', siteUrl);
  url.searchParams.set('pi', paymentIntentId);
  url.searchParams.set('sig', sign(paymentIntentId));
  return url.toString();
};
