// Site navigation, shared by the header and the home hero's see-through bar.
export const navLinks: { href: string; label: string; newTab?: boolean; cta?: boolean }[] = [
  { href: '/about/', label: 'About' },
  { href: '/portfolio/', label: 'Portfolio' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/contact/', label: 'Contact' },
  { href: '/book/', label: 'Book now', cta: true },
];
// Client portal hidden until fully built out
// if (SITE.clientPortalUrl) {
//   navLinks.push({ href: SITE.clientPortalUrl, label: 'Client Portal', newTab: true });
// }

export const isActive = (path: string, href: string) => path === href || path.startsWith(href);
