import Stripe from 'stripe';
import { Resend } from 'resend';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const stripe = new Stripe("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");
  const resend = new Resend("re_H9nQrbpX_rgpTHQYTLw2mSxm4agAftWdH");
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") ?? "";
  const webhookSecret = "whsec_gbcIj8XDFjPIgCUhJNEu36Y84YlwJMo9";
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(`Webhook signature error: ${msg}`, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { name, phone, service, tier, price, paymentOption, shootDate, address, addons, addonsTotal, notes } = session.metadata ?? {};
    const email = session.customer_email ?? "";
    if (email) {
      await resend.emails.send({
        from: "Ben Tims Media <info@bentims.com>",
        to: [email],
        bcc: ["info@bentims.com"],
        subject: `Booking Confirmed – ${service ?? "Your Photography Session"}`,
        html: buildConfirmationEmail({ name, phone, service, tier, price, paymentOption, shootDate, address, addons, addonsTotal, notes })
      });
    }
  }
  return new Response("OK", { status: 200 });
};
const PHOTOGRAPHER_PHONE = "(512) 956-5646";
function formatShootDate(raw) {
  if (!raw || raw === "To be confirmed") return "To be confirmed";
  if (raw.startsWith("N/A")) return raw;
  try {
    return new Date(raw).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short"
    });
  } catch {
    return raw;
  }
}
function remainingBalance(price, addonsTotal = 0) {
  if (!price) return "";
  const num = parseFloat(price.replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return "";
  return `$${(num - 150 + addonsTotal).toFixed(0)}`;
}
function buildConfirmationEmail(d) {
  const shootDateFormatted = formatShootDate(d.shootDate);
  const firstName = (d.name ?? "there").split(" ")[0];
  const addonsTotalNum = parseInt(d.addonsTotal ?? "0") || 0;
  const remaining = remainingBalance(d.price, addonsTotalNum);
  const isPaidInFull = d.paymentOption === "full";
  const isVTE = (d.service ?? "") === "Virtual Twilight Edit";
  const isSTR = (d.service ?? "").toLowerCase().includes("vacation") || (d.service ?? "").toLowerCase().includes("str");
  const heroTitle = isPaidInFull ? "Payment received!" : "Deposit received!";
  const heroBody = isVTE ? `Hi ${firstName}, your order is confirmed. I'll be in touch within 24 hours to confirm receipt of your photos and start editing.` : `Hi ${firstName}, your shoot date is locked in. Here's everything you need to know.`;
  const whatsIncluded = isVTE ? [
    "Professional digital twilight conversion of each image",
    "Realistic sky replacement and exterior lighting adjustments",
    "Warm window glow and exterior light effects added",
    "High-res JPEGs delivered via online gallery",
    "Delivery within 24–48 hours of receiving your photos",
    "Licensed for all marketing and listing use"
  ] : (d.service ?? "").includes("Walkthrough") ? [
    "Full gimbal stabilizer walkthrough of the property",
    "30–60 second vertical social media reel cut",
    "Professional color grade and background music",
    "Delivery within 24–48 hours",
    "Licensed for all platforms — Instagram, Facebook, TikTok, MLS",
    "Unlimited downloads — no watermarks"
  ] : (d.service ?? "").includes("Twilight") ? [
    "6–8 professional dusk/twilight exterior photos",
    "Professional HDR editing on every image",
    "High-res JPEGs delivered via online gallery",
    "Delivery within 24–48 hours of your shoot",
    "Licensed for MLS, listing sites &amp; social media",
    "Unlimited downloads — no watermarks"
  ] : [
    "Professional HDR editing on every image",
    isSTR ? "High-res JPEGs delivered via online gallery" : "MLS-ready JPEGs delivered via online gallery",
    "Delivery within 24–48 hours of your shoot",
    isSTR ? "Licensed for Airbnb, VRBO &amp; marketing use" : "Licensed for MLS, listing sites &amp; social media",
    ...isSTR ? ["Styled staging suggestions included"] : [],
    "Unlimited downloads — no watermarks"
  ];
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Booking Confirmed – Ben Tims Media</title>
</head>
<body style="margin:0;padding:0;background:#f5f4f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1c1917;">

<!-- Wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f2;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

  <!-- Header -->
  <tr>
    <td style="padding-bottom:32px;text-align:center;">
      <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#78716c;">Ben Tims Media</p>
      <p style="margin:6px 0 0;font-size:11px;color:#a8a29e;letter-spacing:0.08em;text-transform:uppercase;">Real Estate &amp; Short-Term Rental Photography</p>
    </td>
  </tr>

  <!-- Hero card -->
  <tr>
    <td style="background:#1c1917;border-radius:12px 12px 0 0;padding:40px 40px 32px;text-align:center;">
      <!-- Checkmark -->
      <div style="display:inline-block;width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.08);line-height:56px;font-size:24px;margin-bottom:20px;">✓</div>
      <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#a8a29e;">You're booked</p>
      <h1 style="margin:10px 0 12px;font-size:32px;font-weight:300;color:#fafaf9;line-height:1.15;">${heroTitle}</h1>
      <p style="margin:0;font-size:15px;color:#d6d3d1;line-height:1.6;">${heroBody}</p>
    </td>
  </tr>

  <!-- Booking details -->
  <tr>
    <td style="background:#ffffff;padding:32px 40px;">
      <p style="margin:0 0 20px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#a8a29e;border-bottom:1px solid #e7e5e4;padding-bottom:12px;">Booking Details</p>

      <table width="100%" cellpadding="0" cellspacing="0">
        ${d.service ? `<tr>
          <td style="padding:8px 0;font-size:13px;color:#78716c;width:38%;vertical-align:top;">Service</td>
          <td style="padding:8px 0;font-size:13px;font-weight:500;color:#1c1917;">${d.service}</td>
        </tr>` : ""}
        ${d.tier && d.tier !== d.service ? `<tr>
          <td style="padding:8px 0;font-size:13px;color:#78716c;vertical-align:top;">Package</td>
          <td style="padding:8px 0;font-size:13px;font-weight:500;color:#1c1917;">${d.tier}</td>
        </tr>` : ""}
        ${!isVTE && shootDateFormatted ? `<tr>
          <td style="padding:8px 0;font-size:13px;color:#78716c;vertical-align:top;">Date &amp; Time</td>
          <td style="padding:8px 0;font-size:13px;font-weight:500;color:#1c1917;">${shootDateFormatted}</td>
        </tr>` : ""}
        ${d.address ? `<tr>
          <td style="padding:8px 0;font-size:13px;color:#78716c;vertical-align:top;">Property</td>
          <td style="padding:8px 0;font-size:13px;font-weight:500;color:#1c1917;">${d.address}</td>
        </tr>` : ""}
        ${d.phone ? `<tr>
          <td style="padding:8px 0;font-size:13px;color:#78716c;vertical-align:top;">Phone</td>
          <td style="padding:8px 0;font-size:13px;font-weight:500;color:#1c1917;">${d.phone}</td>
        </tr>` : ""}
        ${d.addons ? `<tr>
          <td style="padding:8px 0;font-size:13px;color:#78716c;vertical-align:top;">Add-ons</td>
          <td style="padding:8px 0;font-size:13px;font-weight:500;color:#1c1917;">${d.addons}</td>
        </tr>` : ""}
        ${d.notes ? `<tr>
          <td style="padding:8px 0;font-size:13px;color:#78716c;vertical-align:top;">Notes</td>
          <td style="padding:8px 0;font-size:13px;font-weight:500;color:#1c1917;">${d.notes}</td>
        </tr>` : ""}
      </table>

      <!-- Payment summary -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:#f5f4f2;border-radius:8px;padding:16px 20px;">
        ${isPaidInFull ? `
        <tr>
          <td style="font-size:13px;color:#78716c;">Paid in full</td>
          <td style="font-size:13px;font-weight:600;color:#16a34a;text-align:right;">${d.price ?? ""}${addonsTotalNum > 0 ? ` + $${addonsTotalNum} add-ons` : ""} ✓</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:#78716c;padding-top:8px;">Balance due after shoot</td>
          <td style="font-size:13px;font-weight:500;color:#1c1917;text-align:right;padding-top:8px;">$0</td>
        </tr>
        ` : `
        <tr>
          <td style="font-size:13px;color:#78716c;">Deposit paid</td>
          <td style="font-size:13px;font-weight:600;color:#16a34a;text-align:right;">$150 ✓</td>
        </tr>
        ${addonsTotalNum > 0 ? `<tr>
          <td style="font-size:13px;color:#78716c;padding-top:8px;">Add-ons (due with balance)</td>
          <td style="font-size:13px;font-weight:500;color:#1c1917;text-align:right;padding-top:8px;">$${addonsTotalNum}</td>
        </tr>` : ""}
        <tr>
          <td style="font-size:13px;color:#78716c;padding-top:8px;">Balance due after shoot</td>
          <td style="font-size:13px;font-weight:500;color:#1c1917;text-align:right;padding-top:8px;">${remaining || "TBD"}</td>
        </tr>
        <tr>
          <td colspan="2" style="padding-top:8px;font-size:12px;color:#a8a29e;">Balance is collected via Zelle after gallery delivery — <strong style="color:#78716c;">benjammintims@icloud.com</strong></td>
        </tr>
        ${d.price ? `<tr>
          <td style="font-size:13px;color:#78716c;padding-top:8px;">Total</td>
          <td style="font-size:13px;color:#78716c;text-align:right;padding-top:8px;">${d.price}${addonsTotalNum > 0 ? ` + $${addonsTotalNum} add-ons` : ""}</td>
        </tr>` : ""}
        `}
      </table>
    </td>
  </tr>

  <!-- Divider -->
  <tr><td style="background:#ffffff;padding:0 40px;"><hr style="border:none;border-top:1px solid #f5f4f2;margin:0;" /></td></tr>

  <!-- What's included -->
  <tr>
    <td style="background:#ffffff;padding:28px 40px;">
      <p style="margin:0 0 16px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#a8a29e;">What's Included</p>
      <table cellpadding="0" cellspacing="0">
        ${whatsIncluded.map((item) => `
        <tr>
          <td style="padding:5px 0;font-size:13px;color:#44403c;vertical-align:top;">
            <span style="color:#1c1917;margin-right:10px;">→</span>${item}
          </td>
        </tr>`).join("")}
      </table>
    </td>
  </tr>

  <!-- Divider -->
  ${!isVTE ? `<tr><td style="background:#ffffff;padding:0 40px;"><hr style="border:none;border-top:1px solid #f5f4f2;margin:0;" /></td></tr>` : ""}

  <!-- Prep checklist (not shown for editing services) -->
  ${!isVTE ? `<tr>
    <td style="background:#ffffff;padding:28px 40px 36px;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#a8a29e;">Preparing Your Property</p>
      <p style="margin:0 0 20px;font-size:13px;color:#78716c;line-height:1.6;">A little prep goes a long way toward great photos. Here's the standard checklist I send all clients:</p>

      <!-- Interior -->
      <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#1c1917;">Interior</p>
      <table cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
        ${(isSTR ? [
    "Turn on <strong>all</strong> lights — lamps, under-cabinet, closets, fans",
    "Open all blinds, curtains, and shades fully",
    "Stage the space as if guests are checking in",
    "Set out fresh, neatly folded towels and linens",
    "Display all amenities visibly — coffee maker, toaster, etc.",
    "Clear countertops of personal items; leave only decor",
    "Remove all personal belongings from drawers, closets &amp; surfaces",
    "Put all toilet lids down; set out fresh hand towels",
    "Tuck away cords, chargers &amp; appliances",
    "Replace any burnt-out bulbs — match color temperature throughout",
    "Ensure welcome guides or house manuals are neatly placed"
  ] : [
    "Turn on <strong>all</strong> lights — lamps, under-cabinet, closets, fans",
    "Open all blinds, curtains, and shades fully",
    "Clear and de-clutter countertops, tables &amp; shelves",
    "Make all beds and fluff pillows",
    "Hide personal photos, valuables &amp; mail",
    "Remove trash cans, pet bowls, toys &amp; litter boxes",
    "Put all toilet lids down",
    "Tuck away cords, chargers &amp; appliances",
    "Replace any burnt-out bulbs"
  ]).map((item) => `
        <tr>
          <td style="padding:4px 0;font-size:13px;color:#44403c;vertical-align:top;">
            <span style="color:#a8a29e;margin-right:10px;font-size:11px;">☐</span>${item}
          </td>
        </tr>`).join("")}
      </table>

      <!-- Exterior -->
      <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#1c1917;">Exterior</p>
      <table cellpadding="0" cellspacing="0">
        ${(isSTR ? [
    "Move all vehicles out of the driveway",
    "Mow, edge, and blow the lawn &amp; walkways",
    "Sweep the porch, patio &amp; front entry",
    "Remove garden hoses, tools &amp; outdoor clutter",
    "Set up and stage all outdoor furniture",
    "Clean the pool or hot tub; remove any covers",
    "Turn on pool/spa lighting if applicable",
    "Put away children's toys &amp; sports equipment"
  ] : [
    "Move all vehicles out of the driveway",
    "Mow, edge, and blow the lawn &amp; walkways",
    "Sweep the porch, patio &amp; front entry",
    "Remove garden hoses, tools &amp; outdoor clutter",
    "Put away children's toys &amp; sports equipment",
    "Stage the patio/deck if furnished"
  ]).map((item) => `
        <tr>
          <td style="padding:4px 0;font-size:13px;color:#44403c;vertical-align:top;">
            <span style="color:#a8a29e;margin-right:10px;font-size:11px;">☐</span>${item}
          </td>
        </tr>`).join("")}
      </table>
    </td>
  </tr>` : ""}

  <!-- Next steps -->
  <tr>
    <td style="background:#f9fafb;border:1px solid #e7e5e4;border-radius:0;padding:28px 40px;">
      <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#a8a29e;">What Happens Next</p>
      <p style="margin:0;font-size:14px;color:#44403c;line-height:1.7;">
        ${isVTE ? `I'll reach out within <strong>24 hours</strong> to confirm receipt of your photos. Once I have them, edits will be delivered within 24–48 hours via an online gallery link.` : `I'll reach out within <strong>24 hours</strong> to confirm all the details and answer any questions.<br/><br/>On the day of the shoot, please have the property ready and accessible at the scheduled time. I'll take care of the rest.${!isPaidInFull ? `<br/><br/>Once your gallery is delivered, I'll send a Zelle request to collect the remaining balance.` : ""}`}
      </p>
    </td>
  </tr>

  <!-- CTA -->
  <tr>
    <td style="background:#ffffff;padding:32px 40px 36px;text-align:center;border-radius:0 0 12px 12px;">
      <p style="margin:0 0 8px;font-size:14px;color:#44403c;">Questions? I'm easy to reach.</p>
      <p style="margin:0;font-size:13px;color:#78716c;">
        Email: <a href="mailto:info@bentims.com" style="color:#1c1917;text-decoration:underline;">info@bentims.com</a>
        &nbsp;&nbsp;·&nbsp;&nbsp;
        Text/Call: <a href="tel:${PHOTOGRAPHER_PHONE.replace(/\D/g, "")}" style="color:#1c1917;text-decoration:underline;">${PHOTOGRAPHER_PHONE}</a>
      </p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="padding:28px 16px 8px;text-align:center;">
      <p style="margin:0;font-size:11px;color:#a8a29e;">Ben Tims Media</p>
      <p style="margin:6px 0 0;font-size:11px;color:#a8a29e;">
        <a href="https://bentimsmedia.com" style="color:#a8a29e;text-decoration:none;">bentimsmedia.com</a>
        &nbsp;·&nbsp;
        <a href="https://www.facebook.com/profile.php?id=61590507817692" style="color:#a8a29e;text-decoration:none;">Facebook</a>
      </p>
      <p style="margin:12px 0 0;font-size:11px;color:#d6d3d1;">You're receiving this because you booked a session with Ben Tims Media.</p>
    </td>
  </tr>

</table>
</td></tr>
</table>

</body>
</html>`;
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  buildConfirmationEmail,
  formatShootDate,
  prerender,
  remainingBalance
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
