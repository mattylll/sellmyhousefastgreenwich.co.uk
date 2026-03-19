import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/config';
import { getAreasIndexContent } from '@/lib/content';
import { generatePageMeta, generateBreadcrumbSchema } from '@/lib/seo';
import AreaGrid from '@/components/sections/AreaGrid';
import CTASection from '@/components/sections/CTASection';

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig();
  return generatePageMeta({
    title: 'Areas We Buy Houses in ' + config.location.name,
    description: 'We buy houses for cash across ' + config.location.name + ' and ' + config.location.region + ' including ' + config.location.neighborhoods.slice(0, 3).join(', ') + ' and more. Get a free cash offer on your property today.',
    path: '/areas',
  });
}

export default function AreasPage() {
  const config = getSiteConfig();
  const areasContent = getAreasIndexContent();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://' + config.brand.domain },
    { name: 'Areas We Cover', url: 'https://' + config.brand.domain + '/areas' },
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
            <li className="text-[var(--color-foreground)]">Areas We Cover</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-primary)]/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {areasContent.headline || ('Areas We Cover in ' + config.location.name)}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {areasContent.intro || ('We buy houses for cash across ' + config.location.name + ' and the surrounding ' + config.location.region + ' area. Select your neighbourhood below to learn more.')}
          </p>
        </div>
      </section>

      {/* Rich Intro Content */}
      {areasContent.body && (
        <section className="py-12 bg-[var(--color-background)]">
          <div className="container mx-auto px-4 max-w-4xl">
            <div
              className="prose prose-lg max-w-none text-[var(--color-muted-foreground)] leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--color-foreground)] [&_h2]:mb-4 [&_h2]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[var(--color-foreground)] [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-[var(--color-secondary)] [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: areasContent.body }}
            />
          </div>
        </section>
      )}

      {/* Area Grid */}
      <section className="py-16 bg-[var(--color-background)]">
        <div className="container mx-auto px-4">
          <AreaGrid />
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-foreground)] mb-6">
            Our Coverage Area
          </h2>
          <p className="text-[var(--color-muted-foreground)] mb-8 max-w-2xl mx-auto">
            We operate across all of {config.location.name} and nearby areas
            including {config.location.neighborhoods.join(', ')}. If you are
            unsure whether we cover your area,{' '}
            <Link
              href="/contact"
              className="text-[var(--color-secondary)] hover:underline"
            >
              get in touch
            </Link>{' '}
            and we will let you know.
          </p>
          <div className="bg-[var(--color-muted)] rounded-[var(--border-radius)] h-64 md:h-96 flex items-center justify-center">
            <p className="text-[var(--color-muted-foreground)]">
              Interactive map coming soon
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
