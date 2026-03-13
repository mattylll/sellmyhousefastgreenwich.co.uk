'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone } from 'lucide-react';
import { getSiteConfig } from '@/lib/config';
import { formatPhoneForTel } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ValuationForm from '@/components/forms/ValuationForm';

export default function CTASection() {
  const config = getSiteConfig();
  const { location } = config;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden">
      {/* Background image */}
      <img
        src={config.images.cta}
        alt={`Sell your house fast in ${config.location.name}`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay - dramatic gradient for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-primary/85 to-black/90" />

      {/* Subtle animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Pulsing accent dot with label */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                Free Cash Offer
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Ready to Sell Your{' '}
              <span className="text-accent">House Fast?</span>
            </h2>

            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-lg">
              Get a free, no-obligation cash offer today. We buy any house in{' '}
              {config.location.name} regardless of condition.{' '}
              <span className="text-white font-medium">No fees, no chains, no stress.</span>
            </p>

            <div className="space-y-4">
              <p className="text-white/60 text-sm">
                Prefer to speak with someone directly? Call us now:
              </p>
              <Button
                size="lg"
                className="group relative text-lg px-10 py-7 bg-accent text-background font-bold rounded-xl shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-300"
                asChild
              >
                <a href={`tel:${formatPhoneForTel(config.brand.phone)}`}>
                  <Phone className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                  {config.brand.phone}
                </a>
              </Button>
            </div>

            <p className="text-sm text-white/50">
              Open Monday to Friday, 9am - 6pm. Weekend appointments available.
            </p>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glow effect behind card */}
            <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl" />

            <div className="relative bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/30 border border-border/50 p-8 md:p-10">
              {/* Form heading */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground">
                  Get Your Free Cash Offer
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Fill in the form below and we will respond within 24 hours
                </p>
              </div>

              <ValuationForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
