// Booking email templates (client request/confirmed/declined + owner approval).
// Table-based inline-styled HTML for email-client compatibility.

const PHOTOGRAPHER_PHONE = '(512) 956-5646';
export const OWNER_EMAIL = 'info@bentims.com';
export const FROM_ADDRESS = 'Ben Tims Media <info@bentims.com>';

export interface Booking {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  tier?: string;
  price?: string;
  paymentOption?: string;
  shootDate?: string;
  address?: string;
  addons?: string;
  addonsTotal?: string;
  notes?: string;
}

export const bookingFromMetadata = (
  meta: Record<string, string> | null | undefined,
  email?: string | null,
): Booking => ({ ...(meta ?? {}), email: email || meta?.email || '' });

// Client-entered values go into HTML — always escape them.
export const esc = (s?: string | null): string =>
  (s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const formatCents = (cents: number): string =>
  `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;

export const formatDeadline = (unixSeconds?: number | null): string =>
  unixSeconds
    ? new Date(unixSeconds * 1000).toLocaleString('en-US', {
        timeZone: 'America/Chicago',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    : '';

// Calendly's event_start_time carries the invitee's UTC offset; render it in the
// business's timezone — the server itself runs in UTC.
export function formatShootDate(raw?: string): string {
  if (!raw || raw === 'To be confirmed') return 'To be confirmed';
  if (raw.startsWith('N/A')) return raw;
  try {
    return new Date(raw).toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  } catch {
    return raw;
  }
}

export function remainingBalance(price?: string, addonsTotal = 0): string {
  if (!price) return '';
  const num = parseFloat(price.replace(/[^0-9.]/g, ''));
  if (isNaN(num)) return '';
  return `$${(num - 150 + addonsTotal).toFixed(0)}`;
}

const isVTE = (d: Booking) => (d.service ?? '') === 'Virtual Twilight Edit';
const isSTR = (d: Booking) => {
  const s = (d.service ?? '').toLowerCase();
  return s.includes('vacation') || s.includes('str');
};
const firstName = (d: Booking) => esc((d.name ?? 'there').split(' ')[0]);

// ── shared building blocks ──────────────────────────────────────────────────

const shell = (title: string, rows: string, footerNote: string) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f4f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1c1917;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f2;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

  <tr>
    <td style="padding-bottom:32px;text-align:center;">
      <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#78716c;">Ben Tims Media</p>
      <p style="margin:6px 0 0;font-size:11px;color:#a8a29e;letter-spacing:0.08em;text-transform:uppercase;">Real Estate &amp; Short-Term Rental Photography</p>
    </td>
  </tr>
${rows}
  <tr>
    <td style="padding:28px 16px 8px;text-align:center;">
      <p style="margin:0;font-size:11px;color:#a8a29e;">Ben Tims Media</p>
      <p style="margin:6px 0 0;font-size:11px;color:#a8a29e;">
        <a href="https://bentimsmedia.com" style="color:#a8a29e;text-decoration:none;">bentimsmedia.com</a>
        &nbsp;·&nbsp;
        <a href="https://www.facebook.com/profile.php?id=61590507817692" style="color:#a8a29e;text-decoration:none;">Facebook</a>
      </p>
      <p style="margin:12px 0 0;font-size:11px;color:#d6d3d1;">${footerNote}</p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;

const hero = (eyebrow: string, title: string, body: string, icon = '✓') => `
  <tr>
    <td style="background:#1c1917;border-radius:12px 12px 0 0;padding:40px 40px 32px;text-align:center;">
      <div style="display:inline-block;width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.08);line-height:56px;font-size:24px;color:#fafaf9;margin-bottom:20px;">${icon}</div>
      <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#a8a29e;">${eyebrow}</p>
      <h1 style="margin:10px 0 12px;font-size:32px;font-weight:300;color:#fafaf9;line-height:1.15;">${title}</h1>
      <p style="margin:0;font-size:15px;color:#d6d3d1;line-height:1.6;">${body}</p>
    </td>
  </tr>`;

const divider = `
  <tr><td style="background:#ffffff;padding:0 40px;"><hr style="border:none;border-top:1px solid #f5f4f2;margin:0;" /></td></tr>`;

const sectionLabel = (text: string, margin = '0 0 16px') =>
  `<p style="margin:${margin};font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#a8a29e;">${text}</p>`;

// `value` must already be safe HTML.
const detailRow = (label: string, value?: string) =>
  value
    ? `<tr>
          <td style="padding:8px 0;font-size:13px;color:#78716c;width:38%;vertical-align:top;">${label}</td>
          <td style="padding:8px 0;font-size:13px;font-weight:500;color:#1c1917;">${value}</td>
        </tr>`
    : '';

const summaryRow = (label: string, value: string, opts: { strong?: boolean; green?: boolean; first?: boolean } = {}) => `<tr>
          <td style="font-size:13px;color:#78716c;${opts.first ? '' : 'padding-top:8px;'}">${label}</td>
          <td style="font-size:13px;font-weight:${opts.strong ? 600 : 500};color:${opts.green ? '#16a34a' : '#1c1917'};text-align:right;${opts.first ? '' : 'padding-top:8px;'}">${value}</td>
        </tr>`;

const summaryNote = (html: string) =>
  `<tr><td colspan="2" style="padding-top:8px;font-size:12px;color:#a8a29e;line-height:1.5;">${html}</td></tr>`;

const bookingDetails = (d: Booking, extraRows = '') => `
      <table width="100%" cellpadding="0" cellspacing="0">
        ${detailRow('Service', esc(d.service))}
        ${d.tier && d.tier !== d.service ? detailRow('Package', esc(d.tier)) : ''}
        ${!isVTE(d) ? detailRow('Date &amp; Time', esc(formatShootDate(d.shootDate))) : ''}
        ${detailRow('Property', esc(d.address))}
        ${detailRow('Phone', esc(d.phone))}
        ${detailRow('Add-ons', esc(d.addons))}
        ${detailRow('Notes', esc(d.notes))}
        ${extraRows}
      </table>`;

const whatsIncluded = (d: Booking): string[] =>
  isVTE(d)
    ? [
        'Professional digital twilight conversion of each image',
        'Realistic sky replacement and exterior lighting adjustments',
        'Warm window glow and exterior light effects added',
        'High-res JPEGs delivered via online gallery',
        'Delivery within 24–48 hours of receiving your photos',
        'Licensed for all marketing and listing use',
      ]
    : (d.service ?? '').includes('Walkthrough')
      ? [
          'Full gimbal stabilizer walkthrough of the property',
          '30–60 second vertical social media reel cut',
          'Professional color grade and background music',
          'Delivery within 24–48 hours',
          'Licensed for all platforms — Instagram, Facebook, TikTok, MLS',
          'Unlimited downloads — no watermarks',
        ]
      : (d.service ?? '').includes('Twilight')
        ? [
            '6–8 professional dusk/twilight exterior photos',
            'Professional HDR editing on every image',
            'High-res JPEGs delivered via online gallery',
            'Delivery within 24–48 hours of your shoot',
            'Licensed for MLS, listing sites &amp; social media',
            'Unlimited downloads — no watermarks',
          ]
        : [
            'Professional HDR editing on every image',
            isSTR(d) ? 'High-res JPEGs delivered via online gallery' : 'MLS-ready JPEGs delivered via online gallery',
            'Delivery within 24–48 hours of your shoot',
            isSTR(d) ? 'Licensed for Airbnb, VRBO &amp; marketing use' : 'Licensed for MLS, listing sites &amp; social media',
            ...(isSTR(d) ? ['Styled staging suggestions included'] : []),
            'Unlimited downloads — no watermarks',
          ];

const includedBlock = (d: Booking) => `
  <tr>
    <td style="background:#ffffff;padding:28px 40px;">
      ${sectionLabel("What's Included")}
      <table cellpadding="0" cellspacing="0">
        ${whatsIncluded(d)
          .map(
            (item) => `
        <tr>
          <td style="padding:5px 0;font-size:13px;color:#44403c;vertical-align:top;">
            <span style="color:#1c1917;margin-right:10px;">→</span>${item}
          </td>
        </tr>`,
          )
          .join('')}
      </table>
    </td>
  </tr>`;

const checklist = (items: string[]) =>
  items
    .map(
      (item) => `
        <tr>
          <td style="padding:4px 0;font-size:13px;color:#44403c;vertical-align:top;">
            <span style="color:#a8a29e;margin-right:10px;font-size:11px;">☐</span>${item}
          </td>
        </tr>`,
    )
    .join('');

const prepBlock = (d: Booking) => `
  <tr>
    <td style="background:#ffffff;padding:28px 40px 36px;">
      ${sectionLabel('Preparing Your Property', '0 0 6px')}
      <p style="margin:0 0 20px;font-size:13px;color:#78716c;line-height:1.6;">A little prep goes a long way toward great photos. Here's the standard checklist I send all clients:</p>

      <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#1c1917;">Interior</p>
      <table cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
        ${checklist(
          isSTR(d)
            ? [
                'Turn on <strong>all</strong> lights — lamps, under-cabinet, closets, fans',
                'Open all blinds, curtains, and shades fully',
                'Stage the space as if guests are checking in',
                'Set out fresh, neatly folded towels and linens',
                'Display all amenities visibly — coffee maker, toaster, etc.',
                'Clear countertops of personal items; leave only decor',
                'Remove all personal belongings from drawers, closets &amp; surfaces',
                'Put all toilet lids down; set out fresh hand towels',
                'Tuck away cords, chargers &amp; appliances',
                'Replace any burnt-out bulbs — match color temperature throughout',
                'Ensure welcome guides or house manuals are neatly placed',
              ]
            : [
                'Turn on <strong>all</strong> lights — lamps, under-cabinet, closets, fans',
                'Open all blinds, curtains, and shades fully',
                'Clear and de-clutter countertops, tables &amp; shelves',
                'Make all beds and fluff pillows',
                'Hide personal photos, valuables &amp; mail',
                'Remove trash cans, pet bowls, toys &amp; litter boxes',
                'Put all toilet lids down',
                'Tuck away cords, chargers &amp; appliances',
                'Replace any burnt-out bulbs',
              ],
        )}
      </table>

      <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#1c1917;">Exterior</p>
      <table cellpadding="0" cellspacing="0">
        ${checklist(
          isSTR(d)
            ? [
                'Move all vehicles out of the driveway',
                'Mow, edge, and blow the lawn &amp; walkways',
                'Sweep the porch, patio &amp; front entry',
                'Remove garden hoses, tools &amp; outdoor clutter',
                'Set up and stage all outdoor furniture',
                'Clean the pool or hot tub; remove any covers',
                'Turn on pool/spa lighting if applicable',
                "Put away children's toys &amp; sports equipment",
              ]
            : [
                'Move all vehicles out of the driveway',
                'Mow, edge, and blow the lawn &amp; walkways',
                'Sweep the porch, patio &amp; front entry',
                'Remove garden hoses, tools &amp; outdoor clutter',
                "Put away children's toys &amp; sports equipment",
                'Stage the patio/deck if furnished',
              ],
        )}
      </table>
    </td>
  </tr>`;

const nextSteps = (html: string) => `
  <tr>
    <td style="background:#f9fafb;border:1px solid #e7e5e4;border-radius:0;padding:28px 40px;">
      ${sectionLabel('What Happens Next', '0 0 8px')}
      <p style="margin:0;font-size:14px;color:#44403c;line-height:1.7;">${html}</p>
    </td>
  </tr>`;

const contactBlock = `
  <tr>
    <td style="background:#ffffff;padding:32px 40px 36px;text-align:center;border-radius:0 0 12px 12px;">
      <p style="margin:0 0 8px;font-size:14px;color:#44403c;">Questions? I'm easy to reach.</p>
      <p style="margin:0;font-size:13px;color:#78716c;">
        Email: <a href="mailto:info@bentims.com" style="color:#1c1917;text-decoration:underline;">info@bentims.com</a>
        &nbsp;&nbsp;·&nbsp;&nbsp;
        Text/Call: <a href="tel:${PHOTOGRAPHER_PHONE.replace(/\D/g, '')}" style="color:#1c1917;text-decoration:underline;">${PHOTOGRAPHER_PHONE}</a>
      </p>
    </td>
  </tr>`;

// Payment summary for the client emails. `held` = card authorized, not yet charged.
const paymentSummary = (d: Booking, held: boolean, amountCents?: number) => {
  const addonsTotalNum = parseInt(d.addonsTotal ?? '0') || 0;
  const isPaidInFull = d.paymentOption === 'full';
  const fullAmount =
    amountCents != null
      ? formatCents(amountCents)
      : `${esc(d.price)}${addonsTotalNum > 0 ? ` + $${addonsTotalNum} add-ons` : ''}`;
  const status = held
    ? '<span style="color:#78716c;font-weight:500;">authorized</span>'
    : '✓';

  const rows = isPaidInFull
    ? [
        summaryRow(held ? 'Full payment' : 'Paid in full', `${fullAmount} ${status}`, { strong: true, green: !held, first: true }),
        summaryRow('Balance due after shoot', '$0'),
      ]
    : [
        summaryRow(held ? 'Deposit' : 'Deposit paid', `$150 ${status}`, { strong: true, green: !held, first: true }),
        addonsTotalNum > 0 ? summaryRow('Add-ons (due with balance)', `$${addonsTotalNum}`) : '',
        summaryRow('Balance due after shoot', remainingBalance(d.price, addonsTotalNum) || 'TBD'),
        summaryNote('Balance is collected via Zelle after gallery delivery — <strong style="color:#78716c;">benjammintims@icloud.com</strong>'),
        d.price
          ? summaryRow('Total', `${esc(d.price)}${addonsTotalNum > 0 ? ` + $${addonsTotalNum} add-ons` : ''}`)
          : '',
      ];

  if (held) {
    rows.push(
      summaryNote(
        '<strong style="color:#78716c;">Your card has been authorized, not charged.</strong> The charge goes through when I confirm your booking. If I can\'t take it, the hold is released and you won\'t be charged.',
      ),
    );
  }

  return `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:#f5f4f2;border-radius:8px;padding:16px 20px;">
        ${rows.join('')}
      </table>`;
};

// ── client: booking request received (card held, awaiting approval) ─────────

export function buildRequestEmail(d: Booking, amountCents?: number): string {
  const vte = isVTE(d);
  const rows = `
${hero(
  'Request received',
  vte ? 'Order received!' : "You're almost booked!",
  vte
    ? `Hi ${firstName(d)}, thanks for your order! I review every order personally and will confirm within 24 hours.`
    : `Hi ${firstName(d)}, thanks for booking! I review every booking personally and will confirm within 24 hours.`,
)}
  <tr>
    <td style="background:#ffffff;padding:32px 40px;">
      ${sectionLabel(vte ? 'Order Details' : 'Booking Details', '0 0 20px')}
      ${bookingDetails(d)}
      ${paymentSummary(d, true, amountCents)}
    </td>
  </tr>
${divider}
${includedBlock(d)}
${nextSteps(
  vte
    ? `I'll confirm your order within <strong>24 hours</strong> — that's when your card is charged. Once I have your photos, edits are delivered within 24–48 hours via an online gallery link.`
    : `I'll review your booking and confirm within <strong>24 hours</strong>. You'll get a confirmation email with a property prep checklist as soon as it's approved — that's when your card is charged.<br/><br/>If I can't take this booking, the hold on your card is released and you won't be charged. Depending on your bank, a released hold can take a few business days to disappear from your statement.`,
)}
${contactBlock}`;
  return shell(
    'Booking Request Received – Ben Tims Media',
    rows,
    "You're receiving this because you requested a booking with Ben Tims Media.",
  );
}

// ── client: booking confirmed (charged) ─────────────────────────────────────

export function buildConfirmationEmail(d: Booking, amountCents?: number): string {
  const vte = isVTE(d);
  const isPaidInFull = d.paymentOption === 'full';
  const rows = `
${hero(
  "You're booked",
  isPaidInFull ? 'Payment received!' : 'Deposit received!',
  vte
    ? `Hi ${firstName(d)}, your order is confirmed. I'll be in touch within 24 hours to confirm receipt of your photos and start editing.`
    : `Hi ${firstName(d)}, your shoot date is locked in. Here's everything you need to know.`,
)}
  <tr>
    <td style="background:#ffffff;padding:32px 40px;">
      ${sectionLabel('Booking Details', '0 0 20px')}
      ${bookingDetails(d)}
      ${paymentSummary(d, false, amountCents)}
    </td>
  </tr>
${divider}
${includedBlock(d)}
${!vte ? divider + prepBlock(d) : ''}
${nextSteps(
  vte
    ? `I'll reach out within <strong>24 hours</strong> to confirm receipt of your photos. Once I have them, edits will be delivered within 24–48 hours via an online gallery link.`
    : `I'll reach out within <strong>24 hours</strong> to confirm all the details and answer any questions.<br/><br/>On the day of the shoot, please have the property ready and accessible at the scheduled time. I'll take care of the rest.${!isPaidInFull ? `<br/><br/>Once your gallery is delivered, I'll send a Zelle request to collect the remaining balance.` : ''}`,
)}
${contactBlock}`;
  return shell(
    'Booking Confirmed – Ben Tims Media',
    rows,
    "You're receiving this because you booked a session with Ben Tims Media.",
  );
}

// ── client: booking declined (hold released) ────────────────────────────────

export function buildDeclineEmail(d: Booking, amountCents: number, note: string): string {
  const vte = isVTE(d);
  const what = vte ? 'order' : 'booking';
  const noteHtml = note
    ? `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;background:#f5f4f2;border-radius:8px;">
        <tr><td style="padding:16px 20px;font-size:14px;color:#44403c;line-height:1.6;">${esc(note).replace(/\r?\n/g, '<br/>')}<br/><span style="color:#78716c;">— Ben</span></td></tr>
      </table>`
    : '';
  const rows = `
${hero(
  vte ? 'Order update' : 'Booking update',
  `I'm not able to take this ${what}`,
  `Hi ${firstName(d)}, thank you for reaching out — unfortunately I can't take this ${what}. You have not been charged.`,
  '×',
)}
  <tr>
    <td style="background:#ffffff;padding:32px 40px;">
      ${sectionLabel(vte ? 'Order Details' : 'Booking Details', '0 0 20px')}
      ${bookingDetails(d)}
      ${noteHtml}
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:#f5f4f2;border-radius:8px;padding:16px 20px;">
        ${summaryRow('Hold released', `${formatCents(amountCents)} — not charged`, { strong: true, first: true })}
        ${summaryNote('Depending on your bank, the pending charge can take a few business days to disappear from your statement.')}
      </table>
    </td>
  </tr>
${contactBlock}`;
  return shell(
    'Booking Update – Ben Tims Media',
    rows,
    "You're receiving this because you requested a booking with Ben Tims Media.",
  );
}

// ── owner: new request needing approval ─────────────────────────────────────

export function buildOwnerApprovalEmail(
  d: Booking,
  opts: { amountCents: number; approveUrl: string; deadline: string },
): string {
  const held = `${formatCents(opts.amountCents)} ${d.paymentOption === 'full' ? 'full payment' : 'deposit'} on hold`;
  const clientRows = `
        ${detailRow('Client', esc(d.name))}
        ${detailRow('Email', d.email ? `<a href="mailto:${esc(d.email)}" style="color:#1c1917;">${esc(d.email)}</a>` : '')}
        ${detailRow('Package price', esc(d.price))}
        ${detailRow('Payment', held)}`;
  const rows = `
${hero(
  'New booking request',
  esc(d.service) || 'Booking request',
  `${esc(d.name) || 'A client'} booked and their card is authorized. Nothing is charged until you approve.`,
  '!',
)}
  <tr>
    <td style="background:#ffffff;padding:32px 40px;">
      ${sectionLabel('Request Details', '0 0 20px')}
      ${bookingDetails(d, clientRows)}
    </td>
  </tr>
  <tr>
    <td style="background:#ffffff;padding:8px 40px 36px;text-align:center;border-radius:0 0 12px 12px;">
      <a href="${esc(opts.approveUrl)}" style="display:inline-block;background:#1c1917;color:#fafaf9;text-decoration:none;font-size:15px;font-weight:600;padding:15px 36px;border-radius:999px;">Review &amp; approve →</a>
      <p style="margin:16px 0 0;font-size:13px;color:#78716c;line-height:1.6;">
        ${opts.deadline ? `Approve by <strong style="color:#1c1917;">${esc(opts.deadline)}</strong> — after that` : 'If you don\'t act within 7 days,'} the hold cancels on its own and nothing is charged.<br/>
        If you decline, also cancel the Calendly event so the slot opens back up.<br/>
        Reply to this email to reach the client directly.
      </p>
    </td>
  </tr>`;
  return shell('New Booking Request – Ben Tims Media', rows, 'Sent to you because a client booked on bentimsmedia.com.');
}
