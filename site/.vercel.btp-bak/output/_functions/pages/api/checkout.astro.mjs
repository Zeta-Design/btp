import Stripe from 'stripe';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const stripe = new Stripe("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");
  const body = await request.formData();
  const name = body.get("name")?.trim();
  const email = body.get("email")?.trim();
  const phone = body.get("phone")?.trim();
  const service = body.get("service")?.trim();
  const shootDate = body.get("shootDate")?.trim();
  const address = body.get("address")?.trim();
  const address2 = body.get("address2")?.trim() ?? "";
  const city = body.get("city")?.trim();
  const state = body.get("state")?.trim();
  const zip = body.get("zip")?.trim();
  const tier = body.get("tier")?.trim() ?? "";
  const price = body.get("price")?.trim() ?? "";
  const paymentOption = body.get("paymentOption")?.trim() || "deposit";
  const serviceCategory = body.get("serviceCategory")?.trim() || "photo";
  const notes = body.get("notes")?.trim() ?? "";
  const addonVideo = body.get("addon_video") === "1";
  const addonTwilight = body.get("addon_twilight") === "1";
  const addonVideoSA = body.get("addon_video_sa") === "1";
  const addonTwilightSA = body.get("addon_twilight_sa") === "1";
  const addonVteQty = Math.max(0, parseInt((body.get("addon_vte_qty") || "").replace(/\D/g, "") || "0"));
  const isEditingService = serviceCategory === "editing";
  if (!name || !email || !phone || !service) {
    return new Response("Missing required fields", { status: 400 });
  }
  if (!isEditingService && (!shootDate || !address || !city || !state || !zip)) {
    return new Response("Missing required fields for shoot booking", { status: 400 });
  }
  const fullAddress = isEditingService ? "" : [address, address2 || null, `${city}, ${state} ${zip}`].filter(Boolean).join(", ");
  const siteUrl = "http://localhost:4324";
  const isFullPayment = paymentOption === "full" && !!price;
  const fullPriceCents = isFullPayment ? Math.round(parseFloat(price.replace(/[^0-9.]/g, "")) * 100) : 0;
  const unitAmount = isFullPayment && fullPriceCents > 0 ? fullPriceCents : 15e3;
  const productName = isFullPayment ? `Full Payment – ${service}` : `Booking Deposit – ${service}`;
  const productDescription = isFullPayment ? "Full session payment — no balance due after your shoot." : "Holds your shoot date. Balance due after your session.";
  const lineItems = [{
    price_data: {
      currency: "usd",
      product_data: { name: productName, description: productDescription },
      unit_amount: unitAmount
    },
    quantity: 1
  }];
  if (isFullPayment) {
    if (addonVideo) lineItems.push({
      price_data: { currency: "usd", product_data: { name: "Add-on: Walkthrough Video (Same Day)", description: "Gimbal walkthrough + 30–60 sec vertical social reel, same day as photo shoot" }, unit_amount: 2e4 },
      quantity: 1
    });
    if (addonTwilight) lineItems.push({
      price_data: { currency: "usd", product_data: { name: "Add-on: Twilight Session (Same Day)", description: "6–8 dusk/twilight exterior photos, same day as main shoot" }, unit_amount: 15e3 },
      quantity: 1
    });
    if (addonVideoSA) lineItems.push({
      price_data: { currency: "usd", product_data: { name: "Add-on: Walkthrough Video (Standalone)", description: "Gimbal walkthrough + 30–60 sec vertical social reel, separate appointment" }, unit_amount: 32500 },
      quantity: 1
    });
    if (addonTwilightSA) lineItems.push({
      price_data: { currency: "usd", product_data: { name: "Add-on: Twilight Session (Standalone)", description: "6–8 dusk/twilight exterior photos, separate appointment" }, unit_amount: 2e4 },
      quantity: 1
    });
    if (addonVteQty > 0) lineItems.push({
      price_data: { currency: "usd", product_data: { name: "Virtual Twilight Edit", description: "Daytime exterior digitally converted to a twilight look" }, unit_amount: 3500 },
      quantity: addonVteQty
    });
  }
  const addons = [
    addonVideo ? "Walkthrough Video — Same Day (+$200)" : null,
    addonTwilight ? "Twilight Session — Same Day (+$150)" : null,
    addonVideoSA ? "Walkthrough Video — Standalone (+$325)" : null,
    addonTwilightSA ? "Twilight Session — Standalone (+$200)" : null,
    addonVteQty > 0 ? `Virtual Twilight Edit ×${addonVteQty} (+$${addonVteQty * 35})` : null
  ].filter(Boolean).join("; ");
  const addonsTotal = String(
    (addonVideo ? 200 : 0) + (addonTwilight ? 150 : 0) + (addonVideoSA ? 325 : 0) + (addonTwilightSA ? 200 : 0) + addonVteQty * 35
  );
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    customer_email: email,
    metadata: {
      name,
      phone,
      service,
      tier,
      price,
      paymentOption,
      shootDate: shootDate || "",
      address: fullAddress,
      addons,
      addonsTotal,
      notes: notes.slice(0, 490)
    },
    success_url: `${siteUrl}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/book`
  });
  return Response.redirect(session.url, 303);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
