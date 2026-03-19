import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSiteConfig } from '@/lib/config';
import { getAreaContent } from '@/lib/content';
import { generatePageMeta, generateBreadcrumbSchema } from '@/lib/seo';
import AreaHero from '@/components/areas/AreaHero';
import ValuationForm from '@/components/forms/ValuationForm';
import ProcessSteps from '@/components/sections/ProcessSteps';
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
    redirect('/areas');
  }

  const areaContent = getAreaContent(slug);
  const areaName = areaContent?.name || slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const headline = areaContent?.headline || ('Sell Your House Fast in ' + areaName);
  const intro = areaContent?.intro || ('Get a guaranteed cash offer for your ' + areaName + ' property within 24 hours. No estate agent fees, no chains, no hassle.');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://' + config.brand.domain },
    { name: 'Areas We Cover', url: 'https://' + config.brand.domain + '/areas' },
    { name: areaName, url: 'https://' + config.brand.domain + '/areas/' + slug },
  ]);

  const sections = areaContent?.sections || [];
  const testimonials = config.content.testimonials.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[var(--color-muted)] py-3 relative z-20">
        <div className="container mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-muted-foreground)]">
            <li><Link href="/" className="hover:text-[var(--color-secondary)]">Home</Link></li>
            <li>/</li>
            <li><Link href="/areas" className="hover:text-[var(--color-secondary)]">Areas</Link></li>
            <li>/</li>
            <li className="text-[var(--color-foreground)] font-medium">{areaName}</li>
          </ol>
        </div>
      </nav>

      {/* Hero — full image bg, frosted glass form, same quality as homepage */}
      <AreaHero areaName={areaName} headline={headline} intro={intro} />

      {/* Market Stats Bar */}
      <section className="py-10 md:py-14 bg-[var(--color-primary)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center items-start gap-6 md:gap-0 max-w-5xl mx-auto">
            {[
              { value: config.location.avgHousePrice, label: 'Avg. House Price' },
              { value: config.brand.averageDaysToComplete + ' Days', label: 'Avg. Completion Time' },
              { value: config.brand.housesBought + '+', label: 'Properties Purchased' },
              { value: '0%', label: 'Fees & Commissions' },
            ].map((item, index) => (
              <div key={item.label} className="flex-1 min-w-[160px] text-center px-6 md:px-10 relative">
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

      {/* Content Sections */}
      {sections.length > 0 ? (
        <>
          {/* First section — full width with accent border */}
          {sections[0] && (
            <section className="py-16 md:py-24 bg-[var(--color-background)]">
              <div className="container mx-auto px-4 max-w-5xl">
                <div className="border-l-4 border-[var(--color-accent)] pl-8 md:pl-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] mb-6">
                    {sections[0].heading}
                  </h2>
                  <div
                    className="prose prose-lg max-w-none text-[var(--color-muted-foreground)] leading-relaxed
                      [&_p]:mb-5 [&_p]:text-base [&_p]:md:text-lg [&_p]:leading-relaxed
                      [&_a]:text-[var(--color-accent)] [&_a]:underline [&_a]:underline-offset-4
                      [&_strong]:text-[var(--color-foreground)] [&_strong]:font-bold
                      [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                    dangerouslySetInnerHTML={{ __html: sections[0].body }}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Second section — centered heading with label */}
          {sections[1] && (
            <section className="py-16 md:py-24 bg-[var(--color-card)]">
              <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="inline-block text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">
                    Local Insight
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)]">
                    {sections[1].heading}
                  </h2>
                </div>
                <div
                  className="prose prose-lg max-w-none text-[var(--color-muted-foreground)] leading-relaxed
                    [&_p]:mb-5 [&_p]:text-base [&_p]:md:text-lg [&_p]:leading-relaxed
                    [&_a]:text-[var(--color-accent)] [&_a]:underline [&_a]:underline-offset-4
                    [&_strong]:text-[var(--color-foreground)] [&_strong]:font-bold
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                  dangerouslySetInnerHTML={{ __html: sections[1].body }}
                />
              </div>
            </section>
          )}

          {/* Remaining sections — alternating backgrounds with accent line */}
          {sections.slice(2).map((section, index) => (
            <section
              key={section.heading}
              className={'py-16 md:py-20 ' + (index % 2 === 0 ? 'bg-[var(--color-background)]' : 'bg-[var(--color-card)]')}
            >
              <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-1 w-12 rounded-full bg-[var(--color-accent)]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)]">
                    {section.heading}
                  </h2>
                </div>
                <div
                  className="prose prose-lg max-w-none text-[var(--color-muted-foreground)] leading-relaxed
                    [&_p]:mb-5 [&_p]:text-base [&_p]:md:text-lg [&_p]:leading-relaxed
                    [&_a]:text-[var(--color-accent)] [&_a]:underline [&_a]:underline-offset-4
                    [&_strong]:text-[var(--color-foreground)] [&_strong]:font-bold
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />
              </div>
            </section>
          ))}
        </>
      ) : (
        <section className="py-16 md:py-24 bg-[var(--color-background)]">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="border-l-4 border-[var(--color-accent)] pl-8">
              <h2 className="text-3xl font-bold text-[var(--color-foreground)] mb-4">
                Cash House Buyers in {areaName}
              </h2>
              <p className="text-lg text-[var(--color-muted-foreground)] leading-relaxed mb-4">
                We buy properties in {areaName}, {config.location.name} for cash. Whether you are facing repossession, going through a divorce, dealing with an inherited property, or simply need a quick sale, we can help. Our team has purchased {config.brand.housesBought}+ properties across {config.location.region} and can make you a fair cash offer within 24 hours.
              </p>
              <p className="text-lg text-[var(--color-muted-foreground)] leading-relaxed">
                There are no estate agent fees, no solicitor costs, and no hidden charges. The price we agree is the price you receive. We can complete in as little as {config.brand.averageDaysToComplete} days, or on a date that suits you.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-20 bg-[var(--color-muted)]/30 border-y border-[var(--color-border)]">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">
                What Our Clients Say
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)]">
                Trusted by Homeowners in {config.location.name}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-[var(--color-card)] rounded-2xl p-8 border border-[var(--color-border)]/60 relative"
                >
                  <div className="text-6xl text-[var(--color-accent)]/20 font-serif absolute top-4 right-6 leading-none">&ldquo;</div>

                  <div className="flex gap-0.5 mb-4">
                    {[...Array(t.rating || 5)].map((_, j) => (
                      <svg key={j} className="h-5 w-5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-[var(--color-muted-foreground)] text-[15px] leading-relaxed mb-6 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]/40">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-[var(--color-accent)]">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-foreground)]">{t.name}</p>
                      <p className="text-xs text-[var(--color-muted-foreground)]">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Steps */}
      <ProcessSteps />

      {/* CTA with Valuation Form */}
      <section id="valuation-form" className="py-16 md:py-24 bg-[var(--color-card)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />

        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">
                Free Valuation
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] mb-4">
                Get Your Cash Offer for {areaName}
              </h2>
              <p className="text-lg text-[var(--color-muted-foreground)] mb-8 leading-relaxed">
                Fill in the form and we will get back to you within 24 hours with a no-obligation cash offer for your {areaName} property.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'No estate agent fees — we cover all costs',
                  'Complete in as little as ' + config.brand.averageDaysToComplete + ' days',
                  'Guaranteed cash offer — no chains, no fall-throughs',
                  'Free legal fees — our solicitors handle everything',
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[var(--color-muted-foreground)] text-base">{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-[var(--color-border)]/40">
                <span className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]/60 font-semibold">Regulated by</span>
                <span className="text-sm font-semibold text-[var(--color-muted-foreground)]">NAPB</span>
                <span className="text-sm font-semibold text-[var(--color-muted-foreground)]">Property Ombudsman</span>
                <span className="text-sm font-semibold text-[var(--color-muted-foreground)]">ICO</span>
              </div>
            </div>

            <div className="bg-[var(--color-background)] rounded-2xl border border-[var(--color-border)] p-8 shadow-lg">
              <ValuationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Other Areas */}
      <section className="py-16 md:py-20 bg-[var(--color-background)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">
              Nearby Areas
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)]">
              We Also Buy Properties In
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
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
                    className="group px-5 py-3 bg-[var(--color-card)] text-[var(--color-foreground)] rounded-xl border border-[var(--color-border)]/60 hover:border-[var(--color-accent)]/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 font-medium"
                  >
                    <span className="group-hover:text-[var(--color-accent)] transition-colors">{name}</span>
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
