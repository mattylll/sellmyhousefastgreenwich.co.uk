'use client';

import { useRef, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle, MapPin } from 'lucide-react';
import { getSiteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function TestimonialsCarousel() {
  const config = getSiteConfig();
  const testimonials = config.content.testimonials;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section ref={sectionRef} className='py-16 md:py-24 bg-muted/30'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className='text-center mb-14'
        >
          {/* Aggregate rating summary */}
          <div className='inline-flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 shadow-sm mb-6'>
            <div className='flex items-center gap-1'>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className='h-7 w-7 text-accent fill-accent'
                />
              ))}
            </div>
            <span className='text-lg md:text-xl font-bold text-foreground'>
              4.9 out of 5
            </span>
            <span className='text-sm text-muted-foreground'>
              from {config.brand.housesBought}+ reviews
            </span>
          </div>

          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4'>
            What Our Customers Say
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            Do not just take our word for it. Here is what people in {config.location.name} have to say about our service.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='relative'
        >
          <div ref={emblaRef} className='overflow-hidden'>
            <div className='flex'>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className='flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-5'
                >
                  <div className='group bg-card border border-border rounded-2xl p-7 md:p-8 h-full flex flex-col shadow-sm hover:shadow-lg hover:shadow-accent/5 hover:border-accent/30 transition-all duration-300'>
                    {/* Quote icon with accent background */}
                    <div className='flex items-start justify-between mb-5'>
                      <div className='w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center'>
                        <Quote className='h-6 w-6 text-accent' />
                      </div>
                      {/* Verified Seller pill */}
                      <span className='inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/20'>
                        <CheckCircle className='h-3.5 w-3.5' />
                        Verified Seller
                      </span>
                    </div>

                    {/* Testimonial text */}
                    <p className='text-card-foreground text-[15px] leading-relaxed flex-1 mb-5'>
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    {/* Star rating */}
                    <div className='flex items-center gap-1 mb-4'>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-5 w-5',
                            i < testimonial.rating
                              ? 'text-accent fill-accent'
                              : 'text-muted fill-muted'
                          )}
                        />
                      ))}
                    </div>

                    {/* Customer info */}
                    <div className='pt-4 border-t border-border/60'>
                      <p className='font-bold text-card-foreground text-base'>{testimonial.name}</p>
                      <p className='text-muted-foreground text-sm flex items-center gap-1.5 mt-1'>
                        <MapPin className='h-3.5 w-3.5 text-accent/60' />
                        Sold property in {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className='flex justify-center gap-4 mt-10'>
            <Button
              variant='outline'
              size='icon'
              onClick={scrollPrev}
              aria-label='Previous testimonial'
              className='rounded-full h-12 w-12 border-border/80 hover:bg-accent/10 hover:border-accent/40 hover:text-accent transition-all duration-200'
            >
              <ChevronLeft className='h-5 w-5' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={scrollNext}
              aria-label='Next testimonial'
              className='rounded-full h-12 w-12 border-border/80 hover:bg-accent/10 hover:border-accent/40 hover:text-accent transition-all duration-200'
            >
              <ChevronRight className='h-5 w-5' />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
