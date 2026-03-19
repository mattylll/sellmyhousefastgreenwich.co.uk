'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Home, CalendarDays, Award, ThumbsUp } from 'lucide-react';
import { getSiteConfig } from '@/lib/config';

function useCounter(target: number, isInView: boolean, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return count;
}

export default function StatsCounter() {
  const config = getSiteConfig();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    {
      icon: Home,
      value: config.brand.housesBought,
      suffix: '+',
      label: 'Houses Bought',
    },
    {
      icon: Award,
      value: config.brand.yearsExperience,
      suffix: '+',
      label: 'Years Experience',
    },
    {
      icon: CalendarDays,
      value: config.brand.averageDaysToComplete,
      suffix: '',
      label: 'Avg. Days to Complete',
    },
    {
      icon: ThumbsUp,
      value: 98,
      suffix: '%',
      label: 'Customer Satisfaction',
    },
  ];

  const housesBought = useCounter(stats[0].value, isInView);
  const yearsExp = useCounter(stats[1].value, isInView);
  const avgDays = useCounter(stats[2].value, isInView);
  const satisfaction = useCounter(stats[3].value, isInView);
  const counters = [housesBought, yearsExp, avgDays, satisfaction];

  return (
    <section ref={ref} className='py-16 md:py-24 bg-primary relative overflow-hidden'>
      {/* Subtle pattern overlay */}
      <div className='absolute inset-0 opacity-[0.04]' style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className='container mx-auto px-4 relative z-10'>
        <div className='grid grid-cols-2 lg:grid-cols-4'>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='text-center py-8 md:py-10 px-4 md:px-6 relative'
            >
              {/* Vertical divider between stats on desktop */}
              {index > 0 && (
                <div className='hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px bg-white/15' />
              )}

              {/* Icon */}
              <div className='flex justify-center mb-4 md:mb-5'>
                <div className='w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center'>
                  <stat.icon className='h-7 w-7 md:h-8 md:w-8 text-accent' strokeWidth={1.75} />
                </div>
              </div>

              {/* Number */}
              <div className='text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-2 md:mb-3 tracking-tight leading-none'>
                {counters[index]}
                {stat.suffix && (
                  <span className='text-3xl md:text-4xl lg:text-5xl text-accent font-bold align-top ml-0.5'>
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <p className='text-white/70 text-sm md:text-base lg:text-lg font-medium tracking-wide'>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
