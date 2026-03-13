import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/config';
import { getFAQContent } from '@/lib/content';
import { generatePageMeta, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import FAQAccordion from '@/components/sections/FAQAccordion';
import CTASection from '@/components/sections/CTASection';

const _faqConfig = getSiteConfig();
export const metadata: Metadata = generatePageMeta({
  title: 'FAQ: Selling Your House Fast in ' + _faqConfig.location.name,
  description: 'Frequently asked questions about selling your house fast in ' + _faqConfig.location.name + ' for cash. Answers about our process, fees, timelines and how we buy properties across ' + _faqConfig.location.region + '.',
  path: '/faq',
});

const generalFaqs = [
  {
    question: 'Is selling to a cash house buyer safe?',
    answer:
      'Yes. We are a reputable cash buying company with years of experience and hundreds of successful purchases. We are fully transparent about our process, and you are free to seek independent legal advice at any time.',
  },
  {
    question: 'Will I get market value for my property?',
    answer:
      'Our cash offers are typically below full market value, which reflects the speed, certainty, and convenience we provide. You avoid months of waiting, estate agent fees, and the risk of chains collapsing.',
  },
  {
    question: 'Can I change my mind after accepting an offer?',
    answer:
      'Yes. You are under no obligation until contracts are exchanged. You can withdraw at any point before exchange with no penalties or costs.',
  },
  {
    question: 'Do I need to do any repairs before selling?',
    answer:
      'No. We buy properties in any condition -- whether they need minor cosmetic work or major structural repairs. You do not need to spend any money preparing your home for sale.',
  },
  {
    question: 'What types of property do you buy?',
    answer:
      'We buy all types of residential property including houses, flats, bungalows, and maisonettes. We also consider properties with short leases, sitting tenants, or those in need of refurbishment.',
  },
];

export default function FAQPage() {
  const config = getSiteConfig();
  const faqContent = getFAQContent();
  const locationFaqs = faqContent.faqs.length > 0 ? faqContent.faqs : config.content.faqs;
  const allFaqs = [...locationFaqs, ...generalFaqs];
  const faqSchema = generateFAQSchema(allFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://' + config.brand.domain },
    { name: 'FAQ', url: 'https://' + config.brand.domain + '/faq' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
            <li className="text-[var(--color-foreground)]">FAQ</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-primary)]/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions: Selling Your House Fast in {config.location.name}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Everything you need to know about selling your house fast in{' '}
            {config.location.name} for cash. If you cannot find the answer you
            are looking for, please do not hesitate to{' '}
            <Link href="/contact" className="text-white underline hover:no-underline">
              get in touch
            </Link>.
          </p>
        </div>
      </section>

      {/* Location-specific FAQs */}
      <section className="py-16 bg-[var(--color-background)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-8">
            About Selling in {config.location.name}
          </h2>
          <FAQAccordion faqs={locationFaqs} />
        </div>
      </section>

      {/* General FAQs */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-8">
            General Questions About Cash House Buying
          </h2>
          <FAQAccordion faqs={generalFaqs} />
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 bg-[var(--color-background)]">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
            Still Have Questions?
          </h2>
          <p className="text-[var(--color-muted-foreground)] mb-6">
            Our friendly team is here to help. Get in touch and we will answer
            any questions you have about selling your property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-secondary)] text-[var(--color-background)] font-semibold rounded-[var(--border-radius)] hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
            <a
              href={'tel:' + config.brand.phone.replace(/\s+/g, '')}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] font-semibold rounded-[var(--border-radius)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-background)] transition-colors"
            >
              Call {config.brand.phone}
            </a>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
