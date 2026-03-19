'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { getSiteConfig } from '@/lib/config';
import { formatPhoneForTel, slugify } from '@/lib/utils';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/areas', label: 'Areas We Cover' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
];

export default function Footer() {
  const config = getSiteConfig();

  return (
    <footer className="relative bg-[color-mix(in_srgb,var(--color-card)_92%,black)] border-t-[3px] border-transparent"
      style={{
        borderImage: 'linear-gradient(to right, var(--color-accent), var(--color-primary), var(--color-accent)) 1',
      }}
    >
      <div className="container mx-auto px-4 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {/* Company info */}
          <div className="space-y-5">
            <span className="text-2xl font-extrabold text-[var(--color-foreground)] tracking-tight block">
              {config.brand.shortName}
            </span>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              {config.brand.tagline}. We have been buying houses in{' '}
              {config.location.name} since {config.brand.foundedYear}.
            </p>
            <div className="space-y-3 pt-2">
              <a
                href={`tel:${formatPhoneForTel(config.brand.phone)}`}
                className="group flex items-center gap-3 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-accent)]/10 group-hover:bg-[var(--color-accent)]/20 transition-colors duration-200">
                  <Phone className="h-4 w-4 text-[var(--color-accent)]" />
                </span>
                <span className="font-medium">{config.brand.phone}</span>
              </a>
              <a
                href={`mailto:${config.brand.email}`}
                className="group flex items-center gap-3 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-accent)]/10 group-hover:bg-[var(--color-accent)]/20 transition-colors duration-200">
                  <Mail className="h-4 w-4 text-[var(--color-accent)]" />
                </span>
                <span className="font-medium">{config.brand.email}</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-accent)]/10">
                  <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                </span>
                <span>{config.location.name}, {config.location.region}</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <span className="text-sm font-bold text-[var(--color-foreground)] uppercase tracking-wider mb-5 block">
              Quick Links
            </span>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas covered */}
          <div>
            <span className="text-sm font-bold text-[var(--color-foreground)] uppercase tracking-wider mb-5 block">
              Areas We Cover
            </span>
            <ul className="space-y-3">
              {config.location.neighborhoods.map((neighborhood) => (
                <li key={neighborhood}>
                  <Link
                    href={`/areas/${slugify(neighborhood)}`}
                    className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {neighborhood}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <span className="text-sm font-bold text-[var(--color-foreground)] uppercase tracking-wider mb-5 block">
              Legal
            </span>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Network sites — cross-links */}
        {config.networkSites && config.networkSites.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[var(--color-border)]/30">
            <p className="text-sm font-semibold text-[var(--color-foreground)] mb-4">
              We also buy houses across the UK
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {config.networkSites.map((site) => (
                <a
                  key={site.domain}
                  href={'https://' + site.domain}
                  className="text-xs text-[var(--color-muted-foreground)]/70 hover:text-[var(--color-accent)] transition-colors duration-200"
                  rel="noopener"
                >
                  {site.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="mt-14 pt-8 border-t border-[var(--color-border)]/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--color-muted-foreground)]/70">
              &copy; {new Date().getFullYear()} {config.brand.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-[var(--color-muted-foreground)]/50 hover:text-[var(--color-accent)] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
