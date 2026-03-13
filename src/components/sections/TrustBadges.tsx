'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  PoundSterling,
  Ban,
  Clock,
  Link2Off,
  FileCheck,
  ShieldCheck,
  HandCoins,
  HeartHandshake,
  Award,
  Scale,
  Lock,
  Shield,
} from 'lucide-react';

const badges = [
  { icon: PoundSterling, label: 'Cash Buyers' },
  { icon: Ban, label: 'No Fees' },
  { icon: Clock, label: 'Complete in 7 Days' },
  { icon: Link2Off, label: 'No Chain' },
  { icon: FileCheck, label: 'Free Valuation' },
];

const guarantees = [
  {
    icon: HandCoins,
    title: 'No Fees Guarantee',
    description:
      'We cover ALL costs including legal fees. The cash offer you accept is the exact amount you receive.',
  },
  {
    icon: ShieldCheck,
    title: 'Price Guarantee',
    description:
      'The offer we make is the price you get. No last-minute reductions, no hidden deductions, no surprises.',
  },
  {
    icon: HeartHandshake,
    title: 'No Obligation',
    description:
      'Get your free valuation with zero pressure. You are under no obligation to accept our offer.',
  },
];

const accreditations = [
  { icon: Award, label: 'NAPB Member' },
  { icon: Scale, label: 'Property Ombudsman Registered' },
  { icon: Lock, label: 'ICO Registered' },
  { icon: Shield, label: 'GDPR Compliant' },
];

export default function TrustBadges() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className='py-14 md:py-20 bg-muted/20 border-y border-border'>
      <div className='container mx-auto px-4'>

        {/* Badge pills - horizontal scroll on mobile, centered row on desktop */}
        <div className='flex md:justify-center gap-3 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap'>
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className='flex items-center gap-2.5 px-5 py-2.5 rounded-full border-2 border-accent bg-accent/5 whitespace-nowrap shrink-0'
            >
              <badge.icon className='h-5 w-5 text-accent' strokeWidth={2.25} />
              <span className='text-sm md:text-base font-semibold text-foreground'>
                {badge.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Our Promise to You */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='mt-16 md:mt-20'
        >
          <h3 className='text-2xl md:text-3xl font-bold text-foreground text-center mb-10 md:mb-12'>
            Our Promise to You
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.15 }}
                className='bg-card rounded-xl p-7 md:p-8 border border-border/60 border-l-[4px] border-l-accent'
              >
                <div className='mb-5'>
                  <div className='w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center'>
                    <guarantee.icon className='h-7 w-7 text-accent' strokeWidth={2} />
                  </div>
                </div>
                <h4 className='text-lg md:text-xl font-bold text-foreground mb-3'>
                  {guarantee.title}
                </h4>
                <p className='text-muted-foreground text-[15px] leading-relaxed'>
                  {guarantee.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Accreditation badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className='mt-16 md:mt-20 pt-10 border-t border-border/50'
        >
          <p className='text-center text-xs uppercase tracking-widest text-muted-foreground/70 font-semibold mb-8'>
            Accredited &amp; Regulated
          </p>
          <div className='flex flex-wrap justify-center gap-6 md:gap-12'>
            {accreditations.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.1 + index * 0.1 }}
                className='flex flex-col items-center gap-3'
              >
                <div className='w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-card border-2 border-border flex items-center justify-center shadow-sm'>
                  <item.icon className='h-8 w-8 md:h-10 md:w-10 text-accent' strokeWidth={1.5} />
                </div>
                <span className='text-xs md:text-sm font-semibold text-muted-foreground text-center max-w-[120px]'>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
