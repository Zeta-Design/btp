/**
 * Brand configuration — the heart of the multi-domain setup.
 *
 * One codebase serves every photography-category site. Each deployed domain
 * sets PUBLIC_BRAND (and SITE_URL) in its environment to pick a brand below.
 * To launch a new category: add a brand here, point a domain at a new Vercel
 * deploy with that PUBLIC_BRAND, and create a matching Dubsado brand + form.
 */
export interface Brand {
  /** key used in PUBLIC_BRAND */
  slug: string;
  /** studio/brand name shown in nav, titles, footer */
  name: string;
  /** short tagline / meta description default */
  tagline: string;
  /** contact email shown in footer/inquire (optional) */
  email?: string;
  /** social links shown in the footer */
  social?: { label: string; href: string }[];
  /**
   * Base location for local SEO. Service-area business — no street address.
   * Keep in sync with your Google Business Profile (NAP consistency).
   */
  location?: { locality: string; region: string; postalCode: string; country: string };
  /** cities/areas served, for local-SEO structured data */
  areaServed?: string[];
  /**
   * Dubsado lead-capture form share/embed link for THIS brand.
   * Get it in Dubsado → Forms → your lead-capture form → Share.
   * Leave empty until you have it; the Inquire page shows a placeholder.
   */
  dubsadoFormUrl: string;
  /** Dubsado client portal — existing-client login, linked from header + footer. */
  clientPortalUrl?: string;
}

export const BRANDS: Record<string, Brand> = {
  main: {
    slug: 'main',
    name: 'Ben Tims Media',
    tagline: 'Real estate & short-term rental photography based in Austin.',
    email: 'info@bentims.com',
    social: [
      { label: 'IG', href: 'https://www.instagram.com/thebtphotography/' },
      { label: 'FB', href: 'https://www.facebook.com/profile.php?id=61590507817692' },
      { label: 'VSCO', href: 'https://vsco.co/benjammin-visuals/gallery' },
    ],
    location: { locality: 'Austin', region: 'TX', postalCode: '78701', country: 'US' },
    areaServed: [
      'Austin',
      'Georgetown',
      'Round Rock',
      'Cedar Park',
      'Pflugerville',
      'Leander',
    ],
    dubsadoFormUrl: 'https://app.bentimsmedia.com/public/form/view/6a2489c3971b89d2159a3901',
    clientPortalUrl: 'https://app.bentimsmedia.com/public/client/portal/6a247906a4dda9d09818a8da',
  },

  // Add one brand per category/domain, e.g.:
  // weddings: {
  //   slug: 'weddings',
  //   name: 'Aperture Weddings',
  //   tagline: 'Wedding photography for couples who love a good story.',
  //   email: 'weddings@example.com',
  //   dubsadoFormUrl: 'https://your-form-link-from-dubsado',
  // },
};

const active = import.meta.env.PUBLIC_BRAND ?? 'main';
export const SITE: Brand = BRANDS[active] ?? BRANDS.main;
