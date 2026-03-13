export interface LayoutRegistryEntry {
  name: string;
  description: string;
  heroVariant: 'split-image' | 'full-width' | 'video-bg' | 'parallax';
  sectionsOrder: string[];
  footerStyle: 'standard' | 'minimal' | 'expanded' | 'centered';
  navigationStyle: 'fixed-top' | 'sticky' | 'transparent-overlay' | 'side-drawer';
}

export const layoutRegistry: Record<string, LayoutRegistryEntry> = {
  'layout-a': {
    name: 'Layout A - Classic Split',
    description: 'Split image hero, standard section ordering',
    heroVariant: 'split-image',
    sectionsOrder: [
      'hero',
      'trust-badges',
      'process',
      'stats',
      'testimonials',
      'areas',
      'faq',
      'cta',
    ],
    footerStyle: 'standard',
    navigationStyle: 'fixed-top',
  },
  'layout-b': {
    name: 'Layout B - Bold Full-Width',
    description: 'Full-width hero, reversed testimonials/stats',
    heroVariant: 'full-width',
    sectionsOrder: [
      'hero',
      'trust-badges',
      'testimonials',
      'stats',
      'process',
      'areas',
      'faq',
      'cta',
    ],
    footerStyle: 'expanded',
    navigationStyle: 'sticky',
  },
  'layout-c': {
    name: 'Layout C - Video Compact',
    description: 'Video background hero, compact process section',
    heroVariant: 'video-bg',
    sectionsOrder: [
      'hero',
      'process',
      'trust-badges',
      'stats',
      'testimonials',
      'faq',
      'areas',
      'cta',
    ],
    footerStyle: 'minimal',
    navigationStyle: 'transparent-overlay',
  },
  'layout-d': {
    name: 'Layout D - Magazine',
    description: 'Parallax hero, magazine-style sections',
    heroVariant: 'parallax',
    sectionsOrder: [
      'hero',
      'stats',
      'trust-badges',
      'process',
      'testimonials',
      'areas',
      'faq',
      'cta',
    ],
    footerStyle: 'centered',
    navigationStyle: 'side-drawer',
  },
};

export function getLayoutEntry(layoutId: string): LayoutRegistryEntry {
  return layoutRegistry[layoutId] ?? layoutRegistry['layout-a'];
}
