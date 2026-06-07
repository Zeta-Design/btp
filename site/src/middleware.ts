import { defineMiddleware } from 'astro:middleware';

// Fix Keystatic's GitHub OAuth `redirect_uri` in production.
// On Vercel, Keystatic builds the redirect_uri from the request URL, which comes
// through as https://localhost/... — so GitHub rejects it ("redirect_uri is not
// associated with this application"). We rewrite the request host from Vercel's
// x-forwarded-host/proto headers on the OAuth routes so it uses the real domain.
// Workaround for https://github.com/Thinkmill/keystatic/issues/1022
export const onRequest = defineMiddleware(async (context, next) => {
  const isOAuthRoute =
    context.url.pathname.includes('/github/oauth/') ||
    context.url.pathname.includes('/github/login');

  if (isOAuthRoute) {
    const forwardedHost = context.request.headers.get('x-forwarded-host');
    const forwardedProto = context.request.headers.get('x-forwarded-proto');

    if (forwardedHost && forwardedProto) {
      const correctUrl = new URL(context.url);
      correctUrl.protocol = forwardedProto;
      correctUrl.host = forwardedHost;

      const newRequest = new Request(correctUrl.toString(), {
        method: context.request.method,
        headers: context.request.headers,
        body: context.request.body,
        // @ts-ignore - duplex required when a body is present
        duplex: 'half',
      });

      Object.defineProperty(context, 'url', { value: correctUrl, writable: false });
      Object.defineProperty(context, 'request', { value: newRequest, writable: false });
    }
  }

  return next();
});
