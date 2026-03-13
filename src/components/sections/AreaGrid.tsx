'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/config';
import { slugify } from '@/lib/utils';

export default function AreaGrid() {
  const config = getSiteConfig();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const neighborhoods = config.location.neighborhoods;

  return (
    <section ref={ref} className='py-16 md:py-24 bg-background relative overflow-hidden'>
      {/* Subtle background pattern */}
      <div className='absolute inset-0 opacity-[0.015]' style={{ backgroundImage: 'radial-gradient(var(--color-accent) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className='text-center mb-14'
        >
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4'>
            Areas We Cover in {config.location.name}
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            We buy houses across {config.location.name} and the surrounding neighbourhoods. Select an area to learn more.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5'>
          {neighborhoods.map((neighborhood, index) => (
            <motion.div
              key={neighborhood}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <Link
                href={`/areas/${slugify(neighborhood)}`}
                className='group relative flex items-center gap-4 p-5 md:p-6 bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:shadow-accent/5 hover:border-accent/40 transition-all duration-300'
              >
                {/* Accent top border */}
                <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent/60 via-accent to-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                {/* Map pin in accent circle */}
                <div className='w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 group-hover:scale-105 transition-all duration-300'>
                  <MapPin className='h-5 w-5 text-accent' />
                </div>

                {/* Text content */}
                <div className='flex-1 min-w-0'>
                  <h3 className='font-semibold text-card-foreground text-[15px] group-hover:text-accent transition-colors duration-200'>
                    {neighborhood}
                  </h3>
                  <p className='text-sm text-muted-foreground mt-0.5'>
                    Sell your house fast in {neighborhood}
                  </p>
                </div>

                {/* Arrow with hover animation */}
                <ArrowRight className='h-4 w-4 text-muted-foreground/60 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 shrink-0' />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
