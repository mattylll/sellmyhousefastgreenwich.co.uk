export interface ThemeRegistryEntry {
  name: string;
  heroStyle: 'gradient-overlay' | 'clean-split' | 'bold-centered' | 'minimal-text' | 'image-collage' | 'angled-split' | 'floating-card' | 'video-overlay';
  buttonStyle: 'solid' | 'outline' | 'rounded-full' | 'sharp' | 'gradient' | 'soft';
  cardStyle: 'elevated' | 'flat' | 'bordered' | 'glass';
  badgeStyle: 'pill' | 'square' | 'rounded';
  sectionSpacing: 'compact' | 'standard' | 'spacious';
}

export const themeRegistry: Record<string, ThemeRegistryEntry> = {
  'modern-dark': {
    name: 'Modern Dark',
    heroStyle: 'gradient-overlay',
    buttonStyle: 'solid',
    cardStyle: 'elevated',
    badgeStyle: 'pill',
    sectionSpacing: 'standard',
  },
  'clean-white': {
    name: 'Clean White',
    heroStyle: 'clean-split',
    buttonStyle: 'outline',
    cardStyle: 'bordered',
    badgeStyle: 'rounded',
    sectionSpacing: 'spacious',
  },
  'trust-blue': {
    name: 'Trust Blue',
    heroStyle: 'bold-centered',
    buttonStyle: 'solid',
    cardStyle: 'elevated',
    badgeStyle: 'pill',
    sectionSpacing: 'standard',
  },
  'warm-earth': {
    name: 'Warm Earth',
    heroStyle: 'image-collage',
    buttonStyle: 'rounded-full',
    cardStyle: 'flat',
    badgeStyle: 'rounded',
    sectionSpacing: 'spacious',
  },
  'slate-pro': {
    name: 'Slate Professional',
    heroStyle: 'minimal-text',
    buttonStyle: 'sharp',
    cardStyle: 'bordered',
    badgeStyle: 'square',
    sectionSpacing: 'compact',
  },
  'green-fresh': {
    name: 'Green Fresh',
    heroStyle: 'angled-split',
    buttonStyle: 'gradient',
    cardStyle: 'glass',
    badgeStyle: 'pill',
    sectionSpacing: 'standard',
  },
  'royal-gold': {
    name: 'Royal Gold',
    heroStyle: 'floating-card',
    buttonStyle: 'solid',
    cardStyle: 'elevated',
    badgeStyle: 'square',
    sectionSpacing: 'spacious',
  },
  'urban-edge': {
    name: 'Urban Edge',
    heroStyle: 'video-overlay',
    buttonStyle: 'soft',
    cardStyle: 'glass',
    badgeStyle: 'pill',
    sectionSpacing: 'compact',
  },
};

export function getThemeEntry(themeId: string): ThemeRegistryEntry {
  return themeRegistry[themeId] ?? themeRegistry['modern-dark'];
}
