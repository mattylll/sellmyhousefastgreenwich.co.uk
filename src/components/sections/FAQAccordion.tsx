'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getSiteConfig } from '@/lib/config';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQAccordion({ faqs: faqsProp }: { faqs?: { question: string; answer: string }[] } = {}) {
  const config = getSiteConfig();
  const faqs = faqsProp || config.content.faqs;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section ref={ref} className='py-16 md:py-24 bg-muted/20'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className='container mx-auto px-4 max-w-3xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className='text-center mb-14'
        >
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4'>
            Frequently Asked Questions
          </h2>
          <p className='text-muted-foreground text-lg max-w-xl mx-auto'>
            Everything you need to know about selling your house fast in {config.location.name}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type='single' collapsible className='space-y-3'>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              >
                <AccordionItem
                  value={`faq-${index}`}
                  className='bg-card border border-border rounded-xl px-6 md:px-7 shadow-sm hover:shadow-md transition-shadow duration-300 data-[state=open]:border-accent/40 data-[state=open]:shadow-md data-[state=open]:shadow-accent/5 data-[state=open]:border-l-[3px] data-[state=open]:border-l-accent'
                >
                  <AccordionTrigger className='text-card-foreground text-left font-semibold text-[15px] md:text-base py-5 md:py-6 hover:no-underline hover:text-accent [&>svg]:text-accent [&>svg]:h-5 [&>svg]:w-5'>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className='text-muted-foreground text-[15px] pb-6 leading-[1.75] pr-8'>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
