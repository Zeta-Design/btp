import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const resend = new Resend("re_H9nQrbpX_rgpTHQYTLw2mSxm4agAftWdH");
  const body = await request.formData();
  const firstName = body.get("firstName")?.trim();
  const lastName = body.get("lastName")?.trim();
  const email = body.get("email")?.trim();
  const phone = body.get("phone")?.trim() ?? "";
  const service = body.get("service")?.trim() ?? "";
  const preferredDate = body.get("preferredDate")?.trim() ?? "";
  const message = body.get("message")?.trim();
  if (!firstName || !lastName || !email || !message) {
    return new Response("Missing required fields", { status: 400 });
  }
  const name = `${firstName} ${lastName}`;
  const rows = [
    ["Name", name],
    ["Email", email],
    ...phone ? [["Phone", phone]] : [],
    ...preferredDate ? [["Interested Date", preferredDate]] : [],
    ...service ? [["Service", service]] : [],
    ["Message", message.replace(/\n/g, "<br/>")]
  ];
  const html = `
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:560px;">
      ${rows.map(([label, value]) => `
        <tr>
          <td style="padding:10px 16px;background:#f5f4f2;font-weight:600;color:#78716c;width:28%;vertical-align:top;border-bottom:1px solid #e7e5e4;">${label}</td>
          <td style="padding:10px 16px;color:#1c1917;border-bottom:1px solid #e7e5e4;">${value}</td>
        </tr>`).join("")}
    </table>`;
  await resend.emails.send({
    from: "Ben Tims Media <info@bentims.com>",
    to: ["info@bentims.com"],
    reply_to: email,
    subject: `New inquiry from ${name}${service ? ` — ${service}` : ""}${preferredDate ? ` (${preferredDate})` : ""}`,
    html
  });
  const siteUrl = "http://localhost:4324";
  return Response.redirect(`${siteUrl}/contact/?sent=1`, 303);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
