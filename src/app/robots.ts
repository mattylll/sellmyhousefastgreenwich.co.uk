import type { MetadataRoute } from 'next';
import { getSiteConfig } from '@/lib/config';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const config = getSiteConfig();
  const baseUrl = `https://${config.brand.domain}`;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
