'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Search } from 'lucide-react';
import { getSiteConfig } from '@/lib/config';
import { submitLead } from '@/lib/leads';
import { formatPhoneForTel } from '@/lib/utils';

export default function HeroParallax() {
  const config = getSiteConfig();
  const [postcode, setPostcode] = useState('');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <img
          src={config.images.hero}
          alt={`Properties in ${config.location.name}`}
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />

      {/* Content with parallax text */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-20 lg:py-32"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-2xl">
          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <span className="text-sm font-bold text-white">Excellent</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-emerald-400 text-emerald-400" />
              ))}
            </div>
            <span className="text-sm text-white/70">{config.brand.housesBought}+ reviews</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          >
            {config.content.heroHeadline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-xl"
          >
            {config.content.heroSubheadline}
          </motion.p>

          {/* Postcode form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={(e: React.FormEvent) => {
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
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-lg"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent shadow-lg"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-accent text-white font-bold text-lg rounded-xl hover:bg-accent/90 transition-colors whitespace-nowrap shadow-lg"
              >
                Get Cash Offer
              </button>
            </form>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-white/80 text-sm"
          >
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
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-white/60 text-sm"
          >
            Or call us free:{' '}
            <a
              href={`tel:${formatPhoneForTel(config.brand.phone)}`}
              className="text-white font-semibold hover:text-accent transition-colors"
            >
              {config.brand.phone}
            </a>
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
