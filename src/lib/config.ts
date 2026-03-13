// Type definitions for site configuration

export interface LocationConfig {
  slug: string;
  name: string;
  region: string;
  county: string;
  borough?: string;
  neighborhoods: string[];
  landmarks: string[];
  avgHousePrice: string;
  postcode: string;
  lat?: number;
  lng?: number;
}

export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  phone: string;
  email: string;
  domain: string;
  foundedYear: number;
  yearsExperience: number;
  housesBought: number;
  averageDaysToComplete: number;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  card: string;
  cardForeground: string;
  border: string;
  destructive: string;
}

export interface ThemeConfig {
  id: string;
  colors: ThemeColors;
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: string;
  animationStyle: 'subtle' | 'moderate' | 'bold';
}

export interface LayoutConfig {
  id: string;
  heroVariant: 'split-image' | 'full-width' | 'video-bg' | 'parallax';
  sectionsOrder: string[];
}

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
}

export interface ContentSection {
  heading: string;
  body: string;
}

export interface PageContent {
  headline: string;
  intro: string;
  sections: ContentSection[];
}

export interface ContentConfig {
  heroHeadline: string;
  heroSubheadline: string;
  aboutStory: string;
  testimonials: Testimonial[];
  faqs: FAQ[];
  areaSlugs: string[];
}

export interface ImageConfig {
  hero: string;
  about: string;
  process: string;
  cta: string;
  ogDefault: string;
}

export interface SEOConfig {
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  ogImage: string;
}

export interface LeadConfig {
  /** GoHighLevel webhook URL for lead capture */
  ghlWebhookUrl: string;
  /** Fallback email if webhook fails */
  fallbackEmail: string;
}

export interface SiteConfig {
  location: LocationConfig;
  brand: BrandConfig;
  theme: ThemeConfig;
  layout: LayoutConfig;
  content: ContentConfig;
  images: ImageConfig;
  seo: SEOConfig;
  leads: LeadConfig;
}

// Re-export the site config
import siteConfig from '../../site.config';
export { siteConfig };

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}
