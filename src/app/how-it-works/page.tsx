import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/config';
import { getHowItWorksContent } from '@/lib/content';
import { generatePageMeta, generateHowToSchema, generateBreadcrumbSchema } from '@/lib/seo';
import FAQAccordion from '@/components/sections/FAQAccordion';
import CTASection from '@/components/sections/CTASection';

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig();
  return generatePageMeta({
    title: 'How to Sell Your House Fast in ' + config.location.name,
    description: 'How to sell your house fast in ' + config.location.name + '. Our simple 4-step process gets you a guaranteed cash offer within 24 hours. Complete in as little as ' + config.brand.averageDaysToComplete + ' days with no fees.',
    path: '/how-it-works',
  });
}

const stepIcons = [
  <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>,
  <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>,
  <svg key="4" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
];

export default function HowItWorksPage() {
  const config = getSiteConfig();
  const hiwContent = getHowItWorksContent();
  const howToSchema = generateHowToSchema(config);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://' + config.brand.domain },
    { name: 'How It Works', url: 'https://' + config.brand.domain + '/how-it-works' },
  ]);

  const { headline, intro, sections } = hiwContent;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[var(--color-muted)] py-3">
        <div className="container mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-muted-foreground)]">
            <li>
              <Link href="/" className="hover:text-[var(--color-secondary)]">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-[var(--color-foreground)]">How It Works</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-primary)]/20" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {headline}
              </h1>
              <p className="text-xl text-white/80 max-w-2xl">
                {intro}
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src={config.images.process}
                alt={'How selling your house fast works with ' + config.brand.name}
                className="rounded-[var(--border-radius)] w-full max-w-lg object-cover shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visual Process Steps */}
      <section className="py-16 bg-[var(--color-background)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="flex gap-6 md:gap-10">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-background)]">
                    {stepIcons[index] || (
                      <span className="text-2xl font-bold">{index + 1}</span>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-wider">
                      Step {index + 1}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-3">
                    {section.heading}
                  </h2>
                  <div
                    className="prose prose-lg max-w-none text-[var(--color-muted-foreground)] leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-[var(--color-secondary)] [&_a]:underline"
                    dangerouslySetInnerHTML={{ __html: section.body }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-foreground)] mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <FAQAccordion />
        </div>
      </section>

      <CTASection />
    </>
  );
}
