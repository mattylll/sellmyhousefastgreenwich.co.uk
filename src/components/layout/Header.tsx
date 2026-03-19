'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSiteConfig } from '@/lib/config';
import { cn, formatPhoneForTel } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Navigation from './Navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/areas', label: 'Areas' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const config = getSiteConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
          isScrolled
            ? 'bg-[var(--color-background)]/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-lg shadow-black/5'
            : 'bg-[var(--color-background)]'
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-18 md:h-22">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <span className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                {config.brand.shortName}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] px-4 py-2.5 rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right section */}
            <div className="flex items-center gap-4">
              {/* Desktop phone pill - secondary style using primary color */}
              <a
                href={'tel:' + formatPhoneForTel(config.brand.phone)}
                className="hidden md:flex items-center gap-1.5 bg-[var(--color-primary)] text-white rounded-full px-4 py-2 text-sm font-semibold hover:opacity-90 transition-all duration-200"
              >
                <Phone className="h-3.5 w-3.5" />
                {config.brand.phone}
              </a>

              {/* Free Cash Offer button — outlined, rectangular to contrast phone pill */}
              <Button
                className="hidden sm:inline-flex border-2 border-[var(--color-accent)] text-[var(--color-accent)] bg-transparent hover:bg-[var(--color-accent)] hover:text-white text-sm font-bold px-5 py-2 h-auto rounded-lg transition-all duration-200"
                asChild
              >
                <a href="#valuation-form">Free Cash Offer</a>
              </Button>

              {/* Mobile phone icon button - always visible on small screens */}
              <a
                href={'tel:' + formatPhoneForTel(config.brand.phone)}
                className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/90 transition-all duration-200 shadow-md shadow-[var(--color-accent)]/20"
                aria-label="Call us"
              >
                <Phone className="h-5 w-5" />
              </a>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-[var(--color-foreground)]"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile navigation drawer */}
      <Navigation
        links={navLinks}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
