import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_ConNGWk6.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BFcgBhdG.mjs';
import { S as SITE } from '../chunks/site_oeBN6J79.mjs';
import Stripe from 'stripe';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const prerender = false;
const $$BookingConfirmed = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BookingConfirmed;
  const sessionId = Astro2.url.searchParams.get("session_id") ?? "";
  let serviceTitle = "Photography Session";
  let tierTitle = "";
  let address = "";
  let isPaidInFull = false;
  let gcalUrl = null;
  let icsDataUri = null;
  if (sessionId) {
    try {
      const stripe = new Stripe("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");
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const meta = session.metadata ?? {};
      serviceTitle = meta.service ?? "Photography Session";
      tierTitle = meta.tier ?? "";
      address = meta.address ?? "";
      isPaidInFull = meta.paymentOption === "full";
      const shootDate = meta.shootDate ?? "";
      const isRealDate = shootDate && !shootDate.startsWith("N/A") && shootDate !== "To be confirmed";
      if (isRealDate) {
        const start = new Date(shootDate);
        if (!isNaN(start.getTime())) {
          const svc = serviceTitle.toLowerCase();
          let durMs = 2.5 * 60 * 60 * 1e3;
          if (svc.includes("vacation") || svc.includes("str")) durMs = 4 * 60 * 60 * 1e3;
          if (svc.includes("video")) durMs = 2 * 60 * 60 * 1e3;
          if (svc.includes("twilight")) durMs = 1 * 60 * 60 * 1e3;
          const end = new Date(start.getTime() + durMs);
          const fmt = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
          const gUrl = new URL("https://www.google.com/calendar/render");
          gUrl.searchParams.set("action", "TEMPLATE");
          gUrl.searchParams.set("text", "Photography Shoot – Ben Tims Media");
          gUrl.searchParams.set("dates", `${fmt(start)}/${fmt(end)}`);
          gUrl.searchParams.set("details", [serviceTitle, tierTitle, "bentimsmedia.com"].filter(Boolean).join("\n"));
          if (address) gUrl.searchParams.set("location", address);
          gcalUrl = gUrl.toString();
          const ics = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Ben Tims Media//Photography Booking//EN",
            "BEGIN:VEVENT",
            `DTSTART:${fmt(start)}`,
            `DTEND:${fmt(end)}`,
            "SUMMARY:Photography Shoot – Ben Tims Media",
            `DESCRIPTION:${[serviceTitle, tierTitle].filter(Boolean).join(" · ")}`,
            ...address ? [`LOCATION:${address}`] : [],
            "END:VEVENT",
            "END:VCALENDAR"
          ].join("\r\n");
          icsDataUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
        }
      }
    } catch {
    }
  }
  const showCal = !!(gcalUrl && icsDataUri);
  const heroTitle = isPaidInFull ? "Payment received!" : "Deposit received!";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Booking Confirmed", "description": "Your deposit was received. Ben Tims Media will be in touch shortly." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto max-w-2xl px-5 py-20 sm:px-6 sm:py-32 text-center"> <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path> </svg> </div> <p class="text-xs uppercase tracking-[0.25em] text-stone-500">You're booked</p> <h1 class="mt-3 font-serif leading-[1.05] text-[clamp(2rem,5vw,3rem)]">${heroTitle}</h1> <p class="mt-4 text-pretty text-stone-600"> ${isPaidInFull ? "Your payment has been processed and your shoot date is confirmed." : "Your $150 deposit has been processed and your shoot date is held."} ${" "}I'll reach out within 24 hours to confirm the details and answer any questions.
</p> ${showCal && renderTemplate`<div class="mt-8"> <p class="text-xs font-medium uppercase tracking-widest text-stone-500">Add to your calendar</p> <div class="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"> <a${addAttribute(gcalUrl, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:text-stone-900"> <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14v11zM7 11h5v5H7z"></path> </svg>
Google Calendar
</a> <a${addAttribute(icsDataUri, "href")} download="shoot-ben-tims-media.ics" class="inline-flex items-center gap-2 rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:text-stone-900"> <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14v11zM7 11h5v5H7z"></path> </svg>
Apple / Outlook
</a> </div> </div>`} <p class="mt-8 text-sm text-stone-500">
Questions? Reach me at${" "} ${SITE.email && renderTemplate`<a${addAttribute(`mailto:${SITE.email}`, "href")} class="underline underline-offset-2 hover:text-stone-800"> ${SITE.email} </a>`} ${" "}or${" "} <a href="tel:5129565646" class="underline underline-offset-2 hover:text-stone-800">
(512) 956-5646
</a> </p> <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"> <a href="/" class="rounded-lg bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700">
Back to home
</a> <a href="/portfolio/" class="rounded-lg border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:text-stone-900">
View portfolio
</a> </div> </section> ` })}`;
}, "/Users/btphotos/Git/btp/site/src/pages/booking-confirmed.astro", void 0);
const $$file = "/Users/btphotos/Git/btp/site/src/pages/booking-confirmed.astro";
const $$url = "/booking-confirmed";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$BookingConfirmed,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
