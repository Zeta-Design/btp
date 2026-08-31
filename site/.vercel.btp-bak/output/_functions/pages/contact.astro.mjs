import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_ConNGWk6.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BFcgBhdG.mjs';
import { S as SITE } from '../chunks/site_oeBN6J79.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const prerender = false;
const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contact;
  const sent = Astro2.url.searchParams.get("sent") === "1";
  const copy = SITE.contactCopy ?? {
    heading: "Let's make your listing shine",
    intro: "Whether you have a specific listing in mind or are just exploring, I'd love to hear from you. Inquiries are typically answered within 24 hours.",
    placeholder: "Tell us a bit about what you\u2019re looking for\u2026"
  };
  const serviceOptions = SITE.contactServices ?? [
    { label: "Not sure yet" },
    { label: "Real Estate Photography" },
    { label: "Vacation Rental Photography" },
    { label: "Multiple Properties (Portfolio Package)", param: "bundle" },
    { label: "Walkthrough Video" },
    { label: "Twilight Session" },
    { label: "Virtual Twilight Edit" }
  ];
  const serviceParam = Astro2.url.searchParams.get("service");
  const preselected = serviceOptions.find((o) => o.param && o.param === serviceParam)?.label ?? "";
  const messagePlaceholder = serviceParam === "bundle" ? "How many properties, which communities, and the bedroom count of each? I\u2019ll reply with an exact bundle quote." : copy.placeholder;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Contact \u2014 Book Real Estate & Airbnb Photography", "description": `Get in touch with ${SITE.name} for real estate, Airbnb & short-term rental photography \u2014 available for travel. Inquiries answered within 24 hours.` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto max-w-2xl px-5 py-14 sm:px-6 sm:py-20"> <p class="text-xs uppercase tracking-[0.25em] text-stone-500">Get in touch</p> <h1 class="mt-3 font-serif leading-[1.05] text-[clamp(2.25rem,6vw,3.5rem)]"> ${copy.heading} </h1> <p class="mt-4 text-pretty text-stone-600">${copy.intro}</p> <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-10"> ${SITE.phone && renderTemplate`<a${addAttribute(`tel:+1${SITE.phone.replace(/\D/g, "")}`, "href")} class="inline-flex min-h-[40px] items-center gap-2 text-sm text-stone-800 transition hover:text-stone-950"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"></path> </svg> ${SITE.phone} </a>`} ${SITE.email && renderTemplate`<a${addAttribute(`mailto:${SITE.email}`, "href")} class="inline-flex min-h-[40px] items-center gap-2 text-sm text-stone-800 transition hover:text-stone-950"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"></path> </svg> ${SITE.email} </a>`} </div> <div class="mt-10 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm"> <!-- Banner image --> <div class="w-full overflow-hidden"> <img src="/blog-images/how-to-prepare-for-your-session/contact-form-header.jpg" alt="" class="w-full"> </div> ${sent ? renderTemplate`<div class="px-8 py-12 text-center"> <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-900"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path> </svg> </div> <h2 class="font-serif text-2xl">Message received</h2> <p class="mt-3 text-stone-600">Thanks for reaching out — I'll get back to you within 24 hours.</p> <a href="/" class="mt-6 inline-flex items-center rounded-full bg-stone-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700">Back to home</a> </div>` : renderTemplate`<div class="px-6 py-8 sm:px-8"> <p class="mb-6 text-sm text-stone-600">
Welcome! Fill out the form below and I'll be in touch shortly to discuss your project.
</p> <form method="POST" action="/api/contact" class="space-y-5"> <div class="grid gap-4 sm:grid-cols-2"> <div> <label for="firstName" class="mb-1.5 block text-sm font-medium text-stone-700">First Name <span class="text-stone-500">*</span></label> <input id="firstName" name="firstName" type="text" required autocomplete="given-name" class="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-500 transition focus:border-stone-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-500" placeholder="Jane"> </div> <div> <label for="lastName" class="mb-1.5 block text-sm font-medium text-stone-700">Last Name <span class="text-stone-500">*</span></label> <input id="lastName" name="lastName" type="text" required autocomplete="family-name" class="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-500 transition focus:border-stone-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-500" placeholder="Smith"> </div> </div> <div> <label for="email" class="mb-1.5 block text-sm font-medium text-stone-700">Email Address <span class="text-stone-500">*</span></label> <input id="email" name="email" type="email" required autocomplete="email" class="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-500 transition focus:border-stone-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-500" placeholder="jane@example.com"> </div> <div> <label for="phone" class="mb-1.5 block text-sm font-medium text-stone-700">Phone Number <span class="text-stone-500 font-normal">(optional)</span></label> <input id="phone" name="phone" type="tel" autocomplete="tel" class="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-500 transition focus:border-stone-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-500" placeholder="(512) 555-0100"> </div> <hr class="border-stone-100"> <div> <label for="preferredDate" class="mb-1.5 block text-sm font-medium text-stone-700">Interested Date <span class="text-stone-500 font-normal">(optional)</span></label> <input id="preferredDate" name="preferredDate" type="date" class="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 transition focus:border-stone-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-500"> </div> <div> <label for="service" class="mb-1.5 block text-sm font-medium text-stone-700">Which service are you interested in? <span class="text-stone-500">*</span></label> <select id="service" name="service" required class="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 transition focus:border-stone-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-500"> <option value=""${addAttribute(!preselected, "selected")}>Select</option> ${serviceOptions.map((o) => renderTemplate`<option${addAttribute(o.label, "value")}${addAttribute(preselected === o.label, "selected")}>${o.label}</option>`)} </select> </div> <div> <label for="message" class="mb-1.5 block text-sm font-medium text-stone-700">Project Details <span class="text-stone-500">*</span></label> <textarea id="message" name="message" required rows="4" class="w-full rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-500 transition focus:border-stone-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-500"${addAttribute(messagePlaceholder, "placeholder")}></textarea> </div> <div class="flex justify-end"> <button type="submit" class="inline-flex min-h-[44px] items-center rounded-lg bg-stone-900 px-8 text-sm font-medium text-white transition hover:bg-stone-700">
Submit
</button> </div> </form> </div>`} </div> </section> ` })}`;
}, "/Users/btphotos/Git/btp/site/src/pages/contact.astro", void 0);

const $$file = "/Users/btphotos/Git/btp/site/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
