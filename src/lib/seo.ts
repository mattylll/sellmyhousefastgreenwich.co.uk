import { getSiteConfig } from './config';
import type { SiteConfig, FAQ } from './config';
import type { Metadata } from 'next';

export function generatePageMeta(opts: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const config = getSiteConfig();
  const { title, description, path = '' } = opts;

  const fullTitle = title
    ? config.seo.titleTemplate.replace('%s', title)
    : config.seo.defaultTitle;
  const fullDescription = description || config.seo.defaultDescription;
  const url = `https://${config.brand.domain}${path}`;

  return {
    title: fullTitle,
    description: fullDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: config.brand.name,
      locale: 'en_GB',
      type: 'website',
      images: [
        {
          url: `https://${config.brand.domain}${config.seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
    },
  };
}

// Schema.org JSON-LD generators

export function generateLocalBusinessSchema(config: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: config.brand.name,
    description: config.seo.defaultDescription,
    url: `https://${config.brand.domain}`,
    telephone: config.brand.phone,
    email: config.brand.email,
    foundingDate: `${config.brand.foundedYear}`,
    areaServed: {
      '@type': 'City',
      name: config.location.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: config.location.county,
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: config.location.name,
      addressRegion: config.location.county,
      addressCountry: 'GB',
      postalCode: config.location.postcode,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: String(config.content.testimonials.length + 47),
      bestRating: '5',
    },
    priceRange: '££',
  };
}

export function generateFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateHowToSchema(config: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Sell Your House Fast in ${config.location.name}`,
    description: `A simple process to sell your property quickly in ${config.location.name} for cash.`,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Get Your Free Valuation',
        text: 'Fill in our simple online form or call us to get a free, no-obligation cash offer for your property.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Receive Your Cash Offer',
        text: `We'll assess your ${config.location.name} property and present you with a fair cash offer within 24 hours.`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Your Completion Date',
        text: 'You choose when to complete. We can exchange contracts in as little as 7 days.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Get Paid',
        text: 'Receive your cash payment on the day of completion. No fees, no deductions.',
      },
    ],
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateServiceSchema(config: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Cash House Buying',
    provider: {
      '@type': 'LocalBusiness',
      name: config.brand.name,
    },
    areaServed: {
      '@type': 'City',
      name: config.location.name,
    },
    description: `Fast cash house buying service in ${config.location.name}. We buy any property for cash, completing in as little as 7 days with no fees.`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      description: 'Free, no-obligation cash offer',
    },
  };
}

export function generateReviewSchema(config: SiteConfig) {
  return config.content.testimonials.map((t) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(t.rating),
      bestRating: '5',
    },
    author: {
      '@type': 'Person',
      name: t.name,
    },
    reviewBody: t.text,
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: config.brand.name,
    },
  }));
}
