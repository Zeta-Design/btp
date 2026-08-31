import { e as defineMiddleware, s as sequence } from './chunks/render-context_DqLVeNij.mjs';
import './chunks/astro-designed-error-pages_t4SWtdJF.mjs';
import './chunks/astro/server_ConNGWk6.mjs';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const isOAuthRoute = context.url.pathname.includes("/github/oauth/") || context.url.pathname.includes("/github/login");
  if (isOAuthRoute) {
    const forwardedHost = context.request.headers.get("x-forwarded-host");
    const forwardedProto = context.request.headers.get("x-forwarded-proto");
    if (forwardedHost && forwardedProto) {
      const correctUrl = new URL(context.url);
      correctUrl.protocol = forwardedProto;
      correctUrl.host = forwardedHost;
      const newRequest = new Request(correctUrl.toString(), {
        method: context.request.method,
        headers: context.request.headers,
        body: context.request.body,
        // @ts-ignore - duplex required when a body is present
        duplex: "half"
      });
      Object.defineProperty(context, "url", { value: correctUrl, writable: false });
      Object.defineProperty(context, "request", { value: newRequest, writable: false });
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
