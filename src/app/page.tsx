import type { Metadata } from 'next';
import { getSiteConfig } from '@/lib/config';
import { getHomepageContent } from '@/lib/content';
import {
  generatePageMeta,
  generateHowToSchema,
  generateServiceSchema,
} from '@/lib/seo';
import HeroSection from '@/components/hero';
import UrgencyBanner from '@/components/sections/UrgencyBanner';
import ProcessSteps from '@/components/sections/ProcessSteps';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import TrustBadges from '@/components/sections/TrustBadges';
import AreaGrid from '@/components/sections/AreaGrid';
import FAQAccordion from '@/components/sections/FAQAccordion';
import StatsCounter from '@/components/sections/StatsCounter';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = generatePageMeta({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sectionComponents: Record<string, React.ComponentType<any>> = {
  'trust-badges': TrustBadges,
  process: ProcessSteps,
  stats: StatsCounter,
  testimonials: TestimonialsCarousel,
  areas: AreaGrid,
  faq: FAQAccordion,
  cta: CTASection,
};

export default function HomePage() {
  const config = getSiteConfig();
  const homepageContent = getHomepageContent();
  const howToSchema = generateHowToSchema(config);
  const serviceSchema = generateServiceSchema(config);

  const topFaqs = config.content.faqs.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <HeroSection />

      <UrgencyBanner />

      {/* Location Intro */}
      {homepageContent.locationIntro && (
        <section className="py-16 md:py-24 bg-[var(--color-background)]">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Decorative top accent */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-1 w-12 rounded-full bg-[var(--color-accent)]" />
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                Local Expertise
              </span>
            </div>

            <div
              className="prose prose-lg max-w-none leading-relaxed
                text-[var(--color-muted-foreground)]
                [&_p]:mb-5
                [&_p]:text-base
                [&_p]:md:text-lg
                [&_p]:leading-relaxed
                [&_a]:text-[var(--color-accent)]
                [&_a]:underline
                [&_a]:underline-offset-4
                [&_a:hover]:text-[var(--color-secondary)]
                [&_strong]:text-[var(--color-accent)]
                [&_strong]:font-bold
                [&_h2]:text-2xl
                [&_h2]:md:text-3xl
                [&_h2]:font-bold
                [&_h2]:text-[var(--color-foreground)]
                [&_h2]:mb-4
                [&_h3]:text-xl
                [&_h3]:font-semibold
                [&_h3]:text-[var(--color-foreground)]
                [&_h3]:mb-3
                [&_ul]:list-disc
                [&_ul]:pl-5
                [&_ul]:space-y-2
                [&_li]:text-[var(--color-muted-foreground)]"
              dangerouslySetInnerHTML={{ __html: homepageContent.locationIntro }}
            />
          </div>
        </section>
      )}

      {/* Why Sell Fast */}
      {homepageContent.whySellFast && homepageContent.whySellFast.length > 0 && (
        <section className="py-16 md:py-24 bg-[var(--color-card)]">
          <div className="container mx-auto px-4">
            {/* Section heading */}
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-foreground)] leading-tight">
                Why Sell Your House Fast in {config.location.name}?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {homepageContent.whySellFast.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-[var(--color-background)] rounded-2xl border border-[var(--color-border)] p-8 md:p-10 text-center hover:border-[var(--color-accent)]/40 hover:shadow-lg transition-all duration-300"
                >
                  {/* Numbered circle */}
                  <div className="mx-auto mb-6 flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-accent)]/10 border-2 border-[var(--color-accent)]/30 group-hover:bg-[var(--color-accent)]/20 group-hover:border-[var(--color-accent)]/50 transition-colors duration-300">
                    <span className="text-xl font-extrabold text-[var(--color-accent)]">
                      {index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-4">
                    {item.heading}
                  </h3>
                  <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Market Snapshot */}
      {homepageContent.marketSnapshot && homepageContent.marketSnapshot.length > 0 && (
        <section className="py-16 md:py-20 bg-[var(--color-primary)] relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }} />

          <div className="relative container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {config.location.name} Property Market Snapshot
              </h2>
            </div>

            <div className="flex flex-wrap justify-center items-start gap-6 md:gap-0 max-w-5xl mx-auto">
              {homepageContent.marketSnapshot.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 min-w-[160px] text-center px-6 md:px-10 relative"
                >
                  {/* Vertical separator between items (not before the first) */}
                  {index > 0 && (
                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/20" />
                  )}

                  <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-accent)] leading-none">
                    {item.value}
                  </p>
                  <p className="text-xs md:text-sm text-white/60 mt-3 uppercase tracking-wider font-medium">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {config.layout.sectionsOrder
        .filter((key) => key !== 'hero')
        .map((sectionKey) => {
          const Component = sectionComponents[sectionKey];
          if (!Component) return null;

          const props: Record<string, unknown> = {};
          if (sectionKey === 'areas') {
            props.compact = true;
          }
          if (sectionKey === 'faq') {
            props.faqs = topFaqs;
          }

          return <Component key={sectionKey} {...props} />;
        })}
    </>
  );
}
