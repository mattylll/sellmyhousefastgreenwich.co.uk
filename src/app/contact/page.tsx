import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/config';
import { getContactContent } from '@/lib/content';
import { generatePageMeta, generateBreadcrumbSchema } from '@/lib/seo';
import { formatPhoneForTel } from '@/lib/utils';
import ValuationForm from '@/components/forms/ValuationForm';
import { ContactForm } from '@/components/forms/ContactForm';

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig();
  return generatePageMeta({
    title: 'Contact ' + config.brand.shortName + ' in ' + config.location.name,
    description: 'Contact ' + config.brand.name + ' for a free cash offer on your ' + config.location.name + ' property. Call ' + config.brand.phone + ' or fill in our form for a response within 24 hours. No fees, no obligation.',
    path: '/contact',
  });
}

export default function ContactPage() {
  const config = getSiteConfig();
  const contactContent = getContactContent();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://' + config.brand.domain },
    { name: 'Contact', url: 'https://' + config.brand.domain + '/contact' },
  ]);

  return (
    <>
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
            <li className="text-[var(--color-foreground)]">Contact</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-primary)]/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contact {config.brand.name}: Cash House Buyers in {config.location.name}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Ready to sell your house fast in {config.location.name}? Get in
            touch today for a free, no-obligation cash offer.
          </p>
        </div>
      </section>

      {/* Contact Intro Content */}
      {contactContent.intro && (
        <section className="py-12 bg-[var(--color-background)]">
          <div className="container mx-auto px-4 max-w-4xl">
            <div
              className="prose prose-lg max-w-none text-[var(--color-muted-foreground)] leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--color-foreground)] [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[var(--color-foreground)] [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-[var(--color-secondary)] [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: contactContent.intro }}
            />
          </div>
        </section>
      )}

      {/* Contact Info + Form */}
      <section className="py-16 bg-[var(--color-background)]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">
                {contactContent.headline || 'Get In Touch'}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-wider mb-2">
                    Phone
                  </h3>
                  <a
                    href={'tel:' + formatPhoneForTel(config.brand.phone)}
                    className="text-2xl font-bold text-[var(--color-foreground)] hover:text-[var(--color-secondary)] transition-colors"
                  >
                    {config.brand.phone}
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-wider mb-2">
                    Email
                  </h3>
                  <a
                    href={'mailto:' + config.brand.email}
                    className="text-lg text-[var(--color-foreground)] hover:text-[var(--color-secondary)] transition-colors"
                  >
                    {config.brand.email}
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-wider mb-2">
                    Business Hours
                  </h3>
                  <div className="text-[var(--color-muted-foreground)] space-y-1">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-wider mb-2">
                    Coverage Area
                  </h3>
                  <p className="text-[var(--color-muted-foreground)]">
                    {contactContent.coverageArea || (config.location.name + ', ' + config.location.region + ', ' + config.location.county)}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[var(--color-card)] rounded-[var(--border-radius)] p-8">
              <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Valuation CTA */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-foreground)] mb-4">
                Want a Free Valuation?
              </h2>
              <p className="text-[var(--color-muted-foreground)]">
                Fill in our quick valuation form to receive a no-obligation cash
                offer for your {config.location.name} property within 24 hours.
              </p>
            </div>
            <div>
              <ValuationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
