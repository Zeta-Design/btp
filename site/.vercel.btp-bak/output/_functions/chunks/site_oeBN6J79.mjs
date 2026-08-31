const BRANDS = {
  main: {
    slug: "main",
    name: "Ben Tims Media",
    tagline: "Real estate & short-term rental photography — available for travel.",
    email: "info@bentims.com",
    phone: "(512) 956-5646",
    social: [
      { label: "IG", href: "https://www.instagram.com/bentimsmedia/" },
      { label: "FB", href: "https://www.facebook.com/profile.php?id=61590507817692" },
      { label: "LI", href: "https://www.linkedin.com/company/bentimsmedia/" }
    ],
    location: { locality: "Austin", region: "TX", postalCode: "78701", country: "US" },
    areaServed: [
      "Austin",
      "Georgetown",
      "Round Rock",
      "Cedar Park",
      "Pflugerville",
      "Leander"
    ],
    dubsadoFormUrl: "https://app.bentimsmedia.com/public/form/view/6a2489c3971b89d2159a3901",
    clientPortalUrl: "https://app.bentimsmedia.com/public/client/portal/6a247906a4dda9d09818a8da"
  },
  /**
   * Event & portrait side of the business — its own domain + Vercel deploy
   * (PUBLIC_BRAND=thebt). Dark theme to distinguish it from the media brand.
   */
  thebt: {
    slug: "thebt",
    name: "The BT Photography",
    theme: "dark",
    tagline: "Event & portrait photography — Austin and beyond.",
    email: "info@bentims.com",
    phone: "(512) 956-5646",
    hero: {
      eyebrow: "Event & portrait photography",
      heading: "Moments worth keeping.",
      sub: "Parties, celebrations, and portraits — photographed naturally, delivered fast."
    },
    servicesHeading: "Photography people actually want to look back on.",
    services: [
      {
        title: "Portrait sessions",
        body: "Relaxed portraits for individuals, couples, and families that actually look like you."
      },
      {
        title: "Headshots",
        body: "Clean, professional headshots for teams and personal branding, shot on location or on a backdrop."
      },
      {
        title: "Event photography",
        body: "Parties, birthdays, and celebrations captured as they happen — candid, natural, and never stiff."
      }
    ],
    location: { locality: "Austin", region: "TX", postalCode: "78701", country: "US" },
    areaServed: ["Austin", "Round Rock", "Cedar Park", "Georgetown", "Pflugerville", "Leander"],
    dubsadoFormUrl: "",
    depositNote: "50% deposit holds your date · balance due day of",
    contactCopy: {
      heading: "Let's capture it",
      intro: "Whether you have a date in mind or are just exploring, I'd love to hear from you. Inquiries are typically answered within 24 hours.",
      placeholder: "Tell me about your session or event — date, location, and roughly how many people…"
    },
    contactServices: [
      { label: "Not sure yet" },
      { label: "Portrait Session", param: "portraits" },
      { label: "Headshots", param: "headshots" },
      { label: "Event Photography", param: "events" }
    ],
    pricingCopy: {
      heading: "Simple, honest rates",
      intro: "No hidden fees. Every session includes professional editing and a private online gallery. Tap any package to get started."
    },
    pricingGroups: [
      {
        id: "portraits-section",
        title: "Portraits",
        subtitle: "Individuals, couples & families — priced by session length",
        service: "portraits",
        bookUrl: "/contact/?service=portraits",
        included: [
          "Relaxed, guided session — no stiff posing",
          "Professional editing on every delivered image",
          "High-res photos in a private online gallery",
          "Delivered within 1 week",
          "Unlimited downloads — no watermarks",
          "Personal use rights — print and share freely"
        ],
        tiers: [
          { label: "Mini · 30 min", price: "$200", detail: "1 look · ~15 edited photos" },
          { label: "Full · 60 min", price: "$325", detail: "2 looks · ~35 edited photos" },
          { label: "Extended · 90 min", price: "$450", detail: "Multiple looks · ~50 edited photos" }
        ]
      },
      {
        id: "headshots-section",
        title: "Headshots",
        subtitle: "Professional & personal branding — on location or on a backdrop",
        service: "headshots",
        bookUrl: "/contact/?service=headshots",
        included: [
          "On location or on a clean backdrop — your choice",
          "Hand-retouched final images",
          "Web + print sizes, ready for LinkedIn and press",
          "Delivered within 1 week",
          "Licensed for personal and professional use"
        ],
        tiers: [
          { label: "Express · 20 min", price: "$175", detail: "1 look · 2 retouched images" },
          { label: "Professional · 45 min", price: "$275", detail: "2 looks · 5 retouched images" },
          { label: "Team · on location", price: "$95 / person", detail: "3 person minimum" }
        ]
      },
      {
        id: "events-section",
        title: "Events",
        subtitle: "Parties, birthdays & celebrations — priced by coverage",
        service: "events",
        bookUrl: "/contact/?service=events",
        included: [
          "Candid, natural coverage for the whole event",
          "Professional editing on every delivered image",
          "High-res photos in a private online gallery",
          "Delivered within 2 weeks",
          "Unlimited downloads — no watermarks",
          "Personal use rights — print and share freely"
        ],
        tiers: [
          { label: "2 Hours", price: "$425", detail: "~100 edited photos" },
          { label: "3 Hours", price: "$595", detail: "~150 edited photos" },
          { label: "4 Hours", price: "$750", detail: "~200 edited photos" },
          { label: "6 Hours", price: "$1,050", detail: "~300 edited photos" },
          { label: "Additional Hour", price: "$175", detail: "Added to any package" }
        ]
      }
    ]
  }
};
const active = "main";
const SITE = BRANDS[active] ?? BRANDS.main;

export { SITE as S };
