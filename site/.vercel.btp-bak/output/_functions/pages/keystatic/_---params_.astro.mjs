import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_ConNGWk6.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$KeystaticAstroPage = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Keystatic", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/btphotos/Git/btp/site/node_modules/.pnpm/@keystatic+astro@5.1.0_@keystatic+core@0.5.50_@react-spectrum+provider@3.11.1_react-dom_9276a562521506a95ecb756a9fdaa6e0/node_modules/@keystatic/astro/internal/keystatic-page.js", "client:component-export": "Keystatic" })}`;
}, "/Users/btphotos/Git/btp/site/node_modules/.pnpm/@keystatic+astro@5.1.0_@keystatic+core@0.5.50_@react-spectrum+provider@3.11.1_react-dom_9276a562521506a95ecb756a9fdaa6e0/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", void 0);

const $$file = "/Users/btphotos/Git/btp/site/node_modules/.pnpm/@keystatic+astro@5.1.0_@keystatic+core@0.5.50_@react-spectrum+provider@3.11.1_react-dom_9276a562521506a95ecb756a9fdaa6e0/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$KeystaticAstroPage,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
