// Gallery items are injected per-page (computed at build from the real photos +
// their sampled mood colors). See src/pages/gallery-lab.astro.
// Engine: Codrops "Atmospheric Depth Gallery" by Houmahani Kane (MIT).
const injected =
  typeof window !== 'undefined' && Array.isArray(window.__GALLERY_DATA__)
    ? window.__GALLERY_DATA__
    : [];

const galleryPlaneData = injected;

export { galleryPlaneData };
