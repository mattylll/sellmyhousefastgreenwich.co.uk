'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FileText,
  PoundSterling,
  CalendarDays,
  Banknote,
  Clock,
  Shield,
  ShieldCheck,
  Home,
  Sparkles,
  Check,
  HandCoins,
  Phone,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSiteConfig } from '@/lib/config';

const iconMap: Record<string, LucideIcon> = {
  'file-text': FileText,
  'pound-sterling': PoundSterling,
  'calendar-days': CalendarDays,
  banknote: Banknote,
  banknotes: Banknote,
  clock: Clock,
  shield: Shield,
  'shield-check': ShieldCheck,
  home: Home,
  sparkles: Sparkles,
  check: Check,
  'hand-coins': HandCoins,
  phone: Phone,
};

const defaultSteps = [
  {
    icon: FileText,
    title: 'Get Free Valuation',
    description: 'Fill in our simple form or give us a call. We will assess your property and get back to you within 24 hours.',
  },
  {
    icon: PoundSterling,
    title: 'Receive Cash Offer',
    description: 'We provide a no-obligation cash offer based on current market conditions. No hidden fees or deductions.',
  },
  {
    icon: CalendarDays,
    title: 'Choose Completion Date',
    description: 'You choose a completion date that suits you - whether that is 7 days or 7 weeks. We work to your timeline.',
  },
  {
    icon: Banknote,
    title: 'Get Paid',
    description: 'On completion day, the agreed amount is transferred directly to your bank account. Simple and stress-free.',
  },
];

export default function ProcessSteps() {
  const config = getSiteConfig();
  const configSteps = config.content.processSteps;

  // Use config steps if provided, otherwise fall back to defaults
  const steps = configSteps && configSteps.length > 0
    ? configSteps.map((step) => ({
        icon: (step.icon ? iconMap[step.icon] : undefined) || FileText,
        title: step.title,
        description: step.description,
      }))
    : defaultSteps;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className='py-20 md:py-28 bg-muted/30'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className='text-center mb-14 md:mb-16'
        >
          <h2 className='text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-5'>
            How It Works
          </h2>
          <p className='text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed'>
            Selling your house has never been easier. Our simple {steps.length}-step process gets you a guaranteed cash offer fast.
          </p>
        </motion.div>

        <div className={cn(
          'relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6',
          steps.length === 3 && 'lg:grid-cols-3',
          steps.length === 4 && 'lg:grid-cols-4',
          steps.length >= 5 && 'lg:grid-cols-5',
        )}>
          {/* Dashed connecting line on desktop */}
          <div className='hidden lg:block absolute top-[3.5rem] left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-accent/30 z-0' />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className='relative z-10 text-center group'
            >
              <div className={cn(
                'flex flex-col items-center bg-card rounded-2xl p-8 md:p-10',
                'border border-border/60 shadow-sm',
                'transition-all duration-300',
                'hover:shadow-lg hover:border-accent/40 hover:-translate-y-1'
              )}>
                {/* Large numbered circle */}
                <div className='relative mb-6'>
                  <div className='w-[4.5rem] h-[4.5rem] rounded-full bg-accent flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110'>
                    <span className='text-2xl font-bold text-white'>
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Icon */}
                <div className='w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5'>
                  <step.icon className='h-6 w-6 text-accent' strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className='text-xl md:text-[1.35rem] font-bold text-foreground mb-3'>
                  {step.title}
                </h3>
                <p className='text-muted-foreground text-[15px] md:text-base leading-relaxed'>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
