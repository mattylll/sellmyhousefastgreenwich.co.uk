'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { XCircle, CheckCircle, Link2, PoundSterling, Clock, AlertTriangle, Shield, Zap, Ban, HandCoins } from 'lucide-react';
import { cn } from '@/lib/utils';

const problems = [
  { icon: Link2, text: 'Chains that collapse at the last minute' },
  { icon: PoundSterling, text: 'Expensive estate agent fees' },
  { icon: Clock, text: 'Months of waiting and uncertainty' },
  { icon: AlertTriangle, text: 'Endless viewings and disruption' },
];

const solutions = [
  { icon: Shield, text: 'No chain - guaranteed sale' },
  { icon: Ban, text: 'Zero fees - we cover everything' },
  { icon: Zap, text: 'Complete in as little as 7 days' },
  { icon: HandCoins, text: 'One simple cash offer, no hassle' },
];

export default function BeforeAfter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Sell to Us?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Compare the traditional way of selling with our hassle-free approach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Problems - Traditional */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-destructive/20 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="h-6 w-6 text-destructive" />
              <h3 className="text-xl font-bold text-card-foreground">Traditional Sale</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((problem) => (
                <li key={problem.text} className="flex items-start gap-3">
                  <problem.icon className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{problem.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions - Our Way */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card border border-accent/30 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="h-6 w-6 text-accent" />
              <h3 className="text-xl font-bold text-card-foreground">Our Way</h3>
            </div>
            <ul className="space-y-4">
              {solutions.map((solution) => (
                <li key={solution.text} className="flex items-start gap-3">
                  <solution.icon className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{solution.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
