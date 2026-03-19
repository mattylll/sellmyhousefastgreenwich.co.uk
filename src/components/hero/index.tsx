'use client';

import { getSiteConfig } from '@/lib/config';
import HeroSplitImage from './HeroSplitImage';
import HeroFullWidth from './HeroFullWidth';
import HeroVideoBg from './HeroVideoBg';
import HeroParallax from './HeroParallax';

const heroVariants = {
  'split-image': HeroSplitImage,
  'full-width': HeroFullWidth,
  'video-bg': HeroVideoBg,
  'parallax': HeroParallax,
} as const;

export default function Hero() {
  const config = getSiteConfig();
  const variant = config.layout.heroVariant;
  const HeroComponent = heroVariants[variant] ?? HeroSplitImage;
  return <HeroComponent />;
}
