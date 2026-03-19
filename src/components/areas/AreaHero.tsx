'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Search, Phone, MapPin } from 'lucide-react';
import { getSiteConfig } from '@/lib/config';
import { submitLead } from '@/lib/leads';
import { formatPhoneForTel } from '@/lib/utils';

interface AreaHeroProps {
  areaName: string;
  headline: string;
  intro: string;
}

export default function AreaHero({ areaName, headline, intro }: AreaHeroProps) {
  const config = getSiteConfig();
  const [postcode, setPostcode] = useState('');

  function handlePostcodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = postcode.trim();
    if (trimmed) {
      submitLead({ formType: 'hero-postcode', postcode: trimmed });
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('heroPostcode', trimmed);
        window.dispatchEvent(new CustomEvent('heroPostcode', { detail: trimmed }));
      }
    }
    const el = document.getElementById('valuation-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-900">
      {/* Background image */}
      <img
        src={config.images.hero}
        alt={'Properties in ' + areaName + ', ' + config.location.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />
      <div className="absolute inset-0 bg-[var(--color-primary)]/10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-28">
        <div className="max-w-2xl">
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6"
          >
            <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
            <span className="text-sm font-bold text-white">{areaName}, {config.location.name}</span>
            <span className="text-white/40">|</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-white/70">{config.brand.housesBought}+ sold</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-xl"
          >
            {intro}
          </motion.p>

          {/* Frosted glass form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-lg"
          >
            <form onSubmit={handlePostcodeSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-[var(--color-accent)] text-white font-bold text-lg rounded-xl hover:opacity-90 transition-all whitespace-nowrap shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-[var(--color-accent)]/40 hover:scale-[1.02]"
              >
                Get Cash Offer
              </button>
            </form>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-white/90 text-base font-medium">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                No fees or commissions
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Cash offer in 24 hours
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Complete in {config.brand.averageDaysToComplete} days
              </span>
            </div>
          </motion.div>

          {/* Phone CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6"
          >
            <a
              href={'tel:' + formatPhoneForTel(config.brand.phone)}
              className="inline-flex items-center gap-2 text-white/80 font-semibold hover:text-[var(--color-accent)] transition-colors"
            >
              <Phone className="h-4 w-4" />
              Or call us free: <span className="text-white text-lg font-bold">{config.brand.phone}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
