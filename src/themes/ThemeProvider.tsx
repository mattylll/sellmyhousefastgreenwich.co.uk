'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/lib/config';
import type { ThemeColors } from '@/lib/config';

const colorVarMap: Record<keyof ThemeColors, string> = {
  primary: '--color-primary',
  secondary: '--color-secondary',
  accent: '--color-accent',
  background: '--color-background',
  foreground: '--color-foreground',
  muted: '--color-muted',
  mutedForeground: '--color-muted-foreground',
  card: '--color-card',
  cardForeground: '--color-card-foreground',
  border: '--color-border',
  destructive: '--color-destructive',
};

function buildGoogleFontsUrl(fonts: { heading: string; body: string }): string | null {
  const uniqueFonts = new Set([fonts.heading, fonts.body]);
  const families = Array.from(uniqueFonts)
    .map((font) => `family=${font.replace(/\s+/g, '+')}:wght@400;500;600;700`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = siteConfig;

  useEffect(() => {
    const root = document.documentElement;

    // Apply color CSS variables
    for (const [key, varName] of Object.entries(colorVarMap)) {
      const value = theme.colors[key as keyof ThemeColors];
      if (value) {
        root.style.setProperty(varName, value);
      }
    }

    // Apply font CSS variables
    root.style.setProperty('--font-heading', `'${theme.fonts.heading}', sans-serif`);
    root.style.setProperty('--font-body', `'${theme.fonts.body}', sans-serif`);

    // Apply border radius
    root.style.setProperty('--border-radius', theme.borderRadius);

    // Load Google Fonts
    const fontsUrl = buildGoogleFontsUrl(theme.fonts);
    if (fontsUrl) {
      const existingLink = document.querySelector('link[data-theme-fonts]');
      if (existingLink) {
        existingLink.setAttribute('href', fontsUrl);
      } else {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = fontsUrl;
        link.setAttribute('data-theme-fonts', 'true');
        document.head.appendChild(link);
      }
    }
  }, [theme]);

  return <>{children}</>;
}
