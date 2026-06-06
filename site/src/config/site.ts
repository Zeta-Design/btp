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
  /**
   * Dubsado lead-capture form share/embed link for THIS brand.
   * Get it in Dubsado → Forms → your lead-capture form → Share.
   * Leave empty until you have it; the Inquire page shows a placeholder.
   */
  dubsadoFormUrl: string;
}

export const BRANDS: Record<string, Brand> = {
  main: {
    slug: 'main',
    name: 'Your Studio Name',
    tagline: 'Timeless photography, thoughtfully made.',
    email: 'hello@example.com',
    dubsadoFormUrl: 'https://hello.dubsado.com/public/form/view/6a2489c3971b89d2159a3901',
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
