import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Cwb0ia0R.mjs';
import { manifest } from './manifest_CMN6j0OJ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/admin.astro.mjs');
const _page4 = () => import('./pages/api/checkout.astro.mjs');
const _page5 = () => import('./pages/api/contact.astro.mjs');
const _page6 = () => import('./pages/api/keystatic/_---params_.astro.mjs');
const _page7 = () => import('./pages/api/webhooks/stripe.astro.mjs');
const _page8 = () => import('./pages/blog/_slug_.astro.mjs');
const _page9 = () => import('./pages/blog.astro.mjs');
const _page10 = () => import('./pages/book.astro.mjs');
const _page11 = () => import('./pages/booking-confirmed.astro.mjs');
const _page12 = () => import('./pages/contact.astro.mjs');
const _page13 = () => import('./pages/gallery-lab.astro.mjs');
const _page14 = () => import('./pages/keystatic/_---params_.astro.mjs');
const _page15 = () => import('./pages/portfolio/_category_.astro.mjs');
const _page16 = () => import('./pages/portfolio.astro.mjs');
const _page17 = () => import('./pages/pricing.astro.mjs');
const _page18 = () => import('./pages/pricing-b.astro.mjs');
const _page19 = () => import('./pages/pricing-c.astro.mjs');
const _page20 = () => import('./pages/pricing-d.astro.mjs');
const _page21 = () => import('./pages/robots.txt.astro.mjs');
const _page22 = () => import('./pages/rss.xml.astro.mjs');
const _page23 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.18.2_@types+node@24.13.0_@vercel+functions@2.2.13_idb-keyval@6.2.5_jiti@2.7.0_l_08aa026fa78a356dca56ced11b80e0ba/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/admin.astro", _page3],
    ["src/pages/api/checkout.ts", _page4],
    ["src/pages/api/contact.ts", _page5],
    ["node_modules/.pnpm/@keystatic+astro@5.1.0_@keystatic+core@0.5.50_@react-spectrum+provider@3.11.1_react-dom_9276a562521506a95ecb756a9fdaa6e0/node_modules/@keystatic/astro/internal/keystatic-api.js", _page6],
    ["src/pages/api/webhooks/stripe.ts", _page7],
    ["src/pages/blog/[slug].astro", _page8],
    ["src/pages/blog/index.astro", _page9],
    ["src/pages/book.astro", _page10],
    ["src/pages/booking-confirmed.astro", _page11],
    ["src/pages/contact.astro", _page12],
    ["src/pages/gallery-lab.astro", _page13],
    ["node_modules/.pnpm/@keystatic+astro@5.1.0_@keystatic+core@0.5.50_@react-spectrum+provider@3.11.1_react-dom_9276a562521506a95ecb756a9fdaa6e0/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", _page14],
    ["src/pages/portfolio/[category].astro", _page15],
    ["src/pages/portfolio.astro", _page16],
    ["src/pages/pricing.astro", _page17],
    ["src/pages/pricing-b.astro", _page18],
    ["src/pages/pricing-c.astro", _page19],
    ["src/pages/pricing-d.astro", _page20],
    ["src/pages/robots.txt.ts", _page21],
    ["src/pages/rss.xml.ts", _page22],
    ["src/pages/index.astro", _page23]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "3e301c21-6d78-49db-9540-073caaa01e20",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
