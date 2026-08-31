import { d as createAstro, c as createComponent, e as addAttribute, a as renderTemplate, m as maybeRenderHead, g as renderScript, u as unescapeHTML, r as renderComponent, b as renderHead, f as renderSlot } from './astro/server_ConNGWk6.mjs';
/* empty css                          */
import { S as SITE } from './site_oeBN6J79.mjs';

const $$Astro$4 = createAstro("https://example.com");
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const { title, description, image = "/social-share.png", type = "website", noindex = false } = Astro2.props;
  const canonical = new URL(Astro2.url.pathname, Astro2.site);
  const ogImage = new URL(image, Astro2.site);
  return renderTemplate`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="shortcut icon" href="/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><meta name="apple-mobile-web-app-title" content="BT Media"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#fafaf9"><title>${title}</title><meta name="description"${addAttribute(description, "content")}>${noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`}<link rel="canonical"${addAttribute(canonical, "href")}><link rel="sitemap" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml"${addAttribute(title, "title")}${addAttribute(new URL("rss.xml", Astro2.site), "href")}><!-- Open Graph --><meta property="og:type"${addAttribute(type, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImage, "content")}>`;
}, "/Users/btphotos/Git/btp/site/src/components/BaseHead.astro", void 0);

const $$Astro$3 = createAstro("https://example.com");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Header;
  const links = [
    { href: "/about/", label: "About" },
    { href: "/portfolio/", label: "Portfolio" },
    { href: "/pricing/", label: "Pricing" },
    { href: "/contact/", label: "Contact" },
    { href: "/book/", label: "Book now", cta: true }
  ];
  const path = Astro2.url.pathname;
  const isActive = (href) => path === href || path.startsWith(href);
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-40 border-b border-stone-200/80 bg-stone-50 backdrop-blur-md"> <nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6 sm:py-4"> <a href="/" class="flex items-center gap-3"${addAttribute(`${SITE.name} \u2014 home`, "aria-label")}> <img src="/logo.png" alt="" width="144" height="144" class="h-9 w-9 object-contain"> <span class="font-serif text-lg tracking-tight sm:text-xl">${SITE.name}</span> </a> <!-- Desktop nav --> <ul class="hidden items-center gap-8 text-sm md:flex"> ${links.map((l) => renderTemplate`<li> <a${addAttribute(l.href, "href")}${addAttribute(l.newTab ? "_blank" : void 0, "target")}${addAttribute(l.newTab ? "noopener noreferrer" : void 0, "rel")}${addAttribute(!l.newTab && isActive(l.href) ? "page" : void 0, "aria-current")}${addAttribute([
    l.cta ? "inline-flex min-h-[36px] items-center rounded-full bg-stone-900 px-5 text-white transition hover:bg-stone-700" : "inline-flex min-h-[44px] items-center text-stone-600 transition-colors hover:text-stone-900",
    !l.cta && isActive(l.href) && "font-medium text-stone-900"
  ], "class:list")}> ${l.label} </a> </li>`)} </ul> <!-- Mobile menu toggle --> <button id="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" class="-mr-2 inline-flex h-11 w-11 items-center justify-center text-stone-900 md:hidden"> <svg class="menu-open h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"></path> </svg> <svg class="menu-close hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path> </svg> </button> </nav> <!-- Mobile panel --> <div id="mobile-menu" hidden class="border-t border-stone-200 bg-stone-50 md:hidden"> <ul class="mx-auto max-w-6xl divide-y divide-stone-100 px-5 py-2"> ${links.map((l) => renderTemplate`<li> <a${addAttribute(l.href, "href")}${addAttribute(l.newTab ? "_blank" : void 0, "target")}${addAttribute(l.newTab ? "noopener noreferrer" : void 0, "rel")}${addAttribute(!l.newTab && isActive(l.href) ? "page" : void 0, "aria-current")}${addAttribute([
    "flex min-h-[52px] items-center text-base",
    l.cta ? "font-medium text-stone-900" : "text-stone-700",
    !l.cta && isActive(l.href) && "font-medium text-stone-900"
  ], "class:list")}> ${l.label} </a> </li>`)} </ul> </div> </header> ${renderScript($$result, "/Users/btphotos/Git/btp/site/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/btphotos/Git/btp/site/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="mt-24 border-t border-stone-200 sm:mt-32"> <div class="mx-auto max-w-6xl px-5 py-14 sm:px-6"> <div class="flex items-start justify-between gap-4 sm:items-end sm:gap-8"> <div> <p class="font-serif text-2xl tracking-tight">${SITE.name}</p> <p class="mt-2 max-w-xs text-balance text-sm text-stone-500">${SITE.tagline}</p> <div class="mt-4 flex flex-col gap-0.5 text-sm text-stone-600"> ${SITE.phone && renderTemplate`<a${addAttribute(`tel:+1${SITE.phone.replace(/\D/g, "")}`, "href")} class="inline-flex min-h-[36px] items-center transition hover:text-stone-900"> ${SITE.phone} </a>`} ${SITE.email && renderTemplate`<a${addAttribute(`mailto:${SITE.email}`, "href")} class="inline-flex min-h-[36px] items-center transition hover:text-stone-900"> ${SITE.email} </a>`} </div> </div> <a href="/contact/" class="inline-flex min-h-[48px] items-center justify-center self-start whitespace-nowrap rounded-full border border-stone-300 px-7 text-sm font-medium text-stone-800 transition hover:border-stone-500 hover:text-stone-950">
Contact me
</a> </div> <div class="mt-10 flex flex-col gap-3 border-t border-stone-100 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between"> <p>© ${year} ${SITE.name}</p> <div class="flex flex-wrap items-center gap-x-6"> <a href="/gallery-lab/" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-[44px] items-center transition hover:text-stone-900">
3D Gallery
</a> ${SITE.social?.map((s) => renderTemplate`<a${addAttribute(s.href, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-[44px] items-center transition hover:text-stone-900"> ${s.label} </a>`)} <a href="/blog/" class="inline-flex min-h-[44px] items-center transition hover:text-stone-900">
BLOG
</a> </div> </div> </div> </footer>`;
}, "/Users/btphotos/Git/btp/site/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro("https://example.com");
const $$JsonLd = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$JsonLd;
  const { schema } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)));
}, "/Users/btphotos/Git/btp/site/src/components/JsonLd.astro", void 0);

const $$Astro$1 = createAstro("https://example.com");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "/Users/btphotos/Git/btp/site/node_modules/.pnpm/@vercel+analytics@2.0.1_react@19.2.7/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/btphotos/Git/btp/site/node_modules/.pnpm/@vercel+analytics@2.0.1_react@19.2.7/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);

const $$Astro = createAstro("https://example.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description, image, type, jsonLd, noindex } = Astro2.props;
  const fullTitle = title === SITE.name ? title : `${title} \xB7 ${SITE.name}`;
  return renderTemplate`<html lang="en"${addAttribute(SITE.theme ?? "light", "data-theme")}> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": fullTitle, "description": description, "image": image, "type": type, "noindex": noindex })}${jsonLd && renderTemplate`${renderComponent($$result, "JsonLd", $$JsonLd, { "schema": jsonLd })}`}${renderComponent($$result, "Analytics", $$Index, {})}${renderHead()}</head> <body class="min-h-dvh bg-stone-50 font-sans text-stone-900 antialiased"> <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-stone-900 focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white">
Skip to content
</a> ${renderComponent($$result, "Header", $$Header, {})} <main id="main" tabindex="-1">${renderSlot($$result, $$slots["default"])}</main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/btphotos/Git/btp/site/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
