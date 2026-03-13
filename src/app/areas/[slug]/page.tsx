import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSiteConfig } from '@/lib/config';
import { getAreaContent } from '@/lib/content';
import { generatePageMeta, generateBreadcrumbSchema } from '@/lib/seo';
import ValuationForm from '@/components/forms/ValuationForm';
import CTASection from '@/components/sections/CTASection';

interface AreaPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const config = getSiteConfig();
  return config.content.areaSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getSiteConfig();
  const areaContent = getAreaContent(slug);

  if (!config.content.areaSlugs.includes(slug)) {
    return {};
  }

  const areaName = areaContent?.name || slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return generatePageMeta({
    title: areaContent?.metaTitle || ('Sell Your House Fast in ' + areaName),
    description: areaContent?.metaDescription || ('We buy houses for cash in ' + areaName + ', ' + config.location.name + '. Get a free cash offer within 24 hours. No fees, no chains.'),
    path: '/areas/' + slug,
  });
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const config = getSiteConfig();

  if (!config.content.areaSlugs.includes(slug)) {
    notFound();
  }

  const areaContent = getAreaContent(slug);
  const areaName = areaContent?.name || slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://' + config.brand.domain },
    { name: 'Areas We Cover', url: 'https://' + config.brand.domain + '/areas' },
    { name: areaName, url: 'https://' + config.brand.domain + '/areas/' + slug },
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
            <li>
              <Link href="/areas" className="hover:text-[var(--color-secondary)]">
                Areas
              </Link>
            </li>
            <li>/</li>
            <li className="text-[var(--color-foreground)]">{areaName}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-primary)]/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {areaContent?.headline || ('Sell Your House Fast in ' + areaName)}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {areaContent?.intro || ('Get a guaranteed cash offer for your ' + areaName + ' property within 24 hours. No estate agent fees, no chains, no hassle.')}
          </p>
        </div>
      </section>

      {/* Area Content Sections */}
      {areaContent?.sections && areaContent.sections.length > 0 ? (
        <section className="py-16 bg-[var(--color-background)]">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                {areaContent.sections.map((section, index) => (
                  <div key={index} className={index < areaContent.sections.length - 1 ? 'mb-10' : ''}>
                    <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
                      {section.heading}
                    </h2>
                    <div
                      className="prose prose-lg max-w-none text-[var(--color-muted-foreground)] leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-[var(--color-secondary)] [&_a]:underline"
                      dangerouslySetInnerHTML={{ __html: section.body }}
                    />
                  </div>
                ))}
              </div>

              {/* Local Market Info */}
              <div className="bg-[var(--color-card)] rounded-[var(--border-radius)] p-8 h-fit">
                <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-6">
                  {areaName} Property Market
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-[var(--color-muted-foreground)]">
                      Average House Price
                    </dt>
                    <dd className="text-2xl font-bold text-[var(--color-secondary)]">
                      {config.location.avgHousePrice}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[var(--color-muted-foreground)]">
                      Area
                    </dt>
                    <dd className="text-lg text-[var(--color-foreground)]">
                      {config.location.name}, {config.location.region}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[var(--color-muted-foreground)]">
                      Postcode Area
                    </dt>
                    <dd className="text-lg text-[var(--color-foreground)]">
                      {config.location.postcode}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[var(--color-muted-foreground)]">
                      Our Average Completion Time
                    </dt>
                    <dd className="text-lg text-[var(--color-foreground)]">
                      {config.brand.averageDaysToComplete} days
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-[var(--color-background)]">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-[var(--color-muted-foreground)] text-lg">
              We buy properties in {areaName} for cash. Contact us for a free, no-obligation valuation.
            </p>
          </div>
        </section>
      )}

      {/* CTA with Form */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-foreground)] mb-4">
                Get Your Free Cash Offer for {areaName}
              </h2>
              <p className="text-[var(--color-muted-foreground)] mb-6">
                Fill in the form and we will get back to you within 24 hours
                with a no-obligation cash offer for your {areaName} property.
              </p>
              <ul className="space-y-3 text-[var(--color-muted-foreground)]">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No estate agent fees
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Complete in as little as 7 days
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guaranteed cash offer
                </li>
              </ul>
            </div>
            <div>
              <ValuationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Other Areas */}
      <section className="py-16 bg-[var(--color-background)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">
            We Also Cover These Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {config.content.areaSlugs
              .filter((s) => s !== slug)
              .map((areaSlug) => {
                const name = areaSlug
                  .split('-')
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ');
                return (
                  <Link
                    key={areaSlug}
                    href={'/areas/' + areaSlug}
                    className="px-4 py-2 bg-[var(--color-card)] text-[var(--color-foreground)] rounded-[var(--border-radius)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-background)] transition-colors"
                  >
                    {name}
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
