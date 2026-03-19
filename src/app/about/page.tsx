import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/config';
import { getAboutContent } from '@/lib/content';
import { generatePageMeta, generateBreadcrumbSchema } from '@/lib/seo';
import CTASection from '@/components/sections/CTASection';

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig();
  return generatePageMeta({
    title: 'About ' + config.brand.shortName,
    description: 'About ' + config.brand.name + ' - trusted cash house buyers in ' + config.location.name + '. Over ' + config.brand.yearsExperience + ' years helping ' + config.location.region + ' homeowners sell fast for cash. No fees, no chains.',
    path: '/about',
  });
}

export default function AboutPage() {
  const config = getSiteConfig();
  const aboutContent = getAboutContent();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://' + config.brand.domain },
    { name: 'About Us', url: 'https://' + config.brand.domain + '/about' },
  ]);

  const { headline, intro, sections } = aboutContent;

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
            <li className="text-[var(--color-foreground)]">About Us</li>
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
                src={config.images.about}
                alt={'About ' + config.brand.name}
                className="rounded-[var(--border-radius)] w-full max-w-lg object-cover shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content Sections */}
      <section className="py-16 bg-[var(--color-background)]">
        <div className="container mx-auto px-4 max-w-4xl">
          {sections.map((section, index) => (
            <div key={index} className={index < sections.length - 1 ? 'mb-12' : ''}>
              <h2 className="text-3xl font-bold text-[var(--color-foreground)] mb-6">
                {section.heading}
              </h2>
              <div
                className="prose prose-lg max-w-none text-[var(--color-muted-foreground)] leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-[var(--color-secondary)] [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-foreground)] mb-10 text-center">
            Our Mission &amp; Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-secondary)] flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[var(--color-background)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
                Transparency
              </h3>
              <p className="text-[var(--color-muted-foreground)]">
                No hidden fees, no last-minute changes. The price we offer is
                the price you receive.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-secondary)] flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[var(--color-background)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
                Speed
              </h3>
              <p className="text-[var(--color-muted-foreground)]">
                We complete purchases in as little as{' '}
                {config.brand.averageDaysToComplete} days, giving you certainty
                when you need it most.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-secondary)] flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[var(--color-background)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
                Empathy
              </h3>
              <p className="text-[var(--color-muted-foreground)]">
                We treat every homeowner with respect and understand that
                selling a home can be stressful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[var(--color-background)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[var(--color-secondary)]">
                {config.brand.yearsExperience}+
              </p>
              <p className="text-[var(--color-muted-foreground)] mt-2">
                Years Experience
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--color-secondary)]">
                {config.brand.housesBought}+
              </p>
              <p className="text-[var(--color-muted-foreground)] mt-2">
                Houses Bought
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--color-secondary)]">
                {config.brand.averageDaysToComplete}
              </p>
              <p className="text-[var(--color-muted-foreground)] mt-2">
                Avg. Days to Complete
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[var(--color-secondary)]">
                4.9/5
              </p>
              <p className="text-[var(--color-muted-foreground)] mt-2">
                Customer Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
