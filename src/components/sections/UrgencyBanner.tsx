'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { getSiteConfig } from '@/lib/config';
import { formatPhoneForTel } from '@/lib/utils';

export default function UrgencyBanner() {
  const config = getSiteConfig();
  const urgencyConfig = config.content.urgency;
  const urgencyMessage = urgencyConfig?.message || config.content.urgencyMessage;

  // If urgency config exists and showTimer is false, don't render the banner
  if (urgencyConfig && urgencyConfig.showTimer === false) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/95 to-[var(--color-accent)] py-3.5 px-4"
    >
      {/* Subtle pattern overlay for visual texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container mx-auto relative z-10 flex items-center justify-center gap-3 text-center">
        {/* Pulsing live dot */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>

        <span className="text-sm md:text-base font-bold text-white tracking-wide">
          {urgencyMessage || 'We have cash ready to buy your property TODAY'}
        </span>

        <span className="hidden sm:inline text-white/50 font-light">|</span>

        {/* Clickable phone CTA */}
        <a
          href={'tel:' + formatPhoneForTel(config.brand.phone)}
          className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-full px-4 py-1.5 transition-all duration-200 hover:scale-[1.03] group"
        >
          <Phone className="h-3.5 w-3.5 text-white group-hover:animate-pulse" />
          <span className="text-sm md:text-base font-extrabold text-white tracking-wide">
            {config.brand.phone}
          </span>
        </a>
      </div>
    </motion.div>
  );
}
