import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/config';
import { getAllBlogPosts } from '@/lib/content';
import { generatePageMeta, generateBreadcrumbSchema } from '@/lib/seo';
import CTASection from '@/components/sections/CTASection';

const _blogConfig = getSiteConfig();
export const metadata: Metadata = generatePageMeta({
  title: _blogConfig.location.name + ' Property Blog',
  description: 'Property selling tips, ' + _blogConfig.location.name + ' market updates, and expert advice on selling your house fast in ' + _blogConfig.location.region + '. Read our latest articles.',
  path: '/blog',
});

export default function BlogPage() {
  const config = getSiteConfig();
  const blogPosts = getAllBlogPosts();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://' + config.brand.domain },
    { name: 'Blog', url: 'https://' + config.brand.domain + '/blog' },
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
            <li className="text-[var(--color-foreground)]">Blog</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-primary)]/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Blog
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Tips, advice, and market updates for homeowners in{' '}
            {config.location.name}.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-[var(--color-background)]">
        <div className="container mx-auto px-4 max-w-5xl">
          {blogPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-[var(--color-card)] rounded-[var(--border-radius)] overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-[var(--color-muted)] flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-[var(--color-muted-foreground)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                  <div className="p-6">
                    <time className="text-sm text-[var(--color-muted-foreground)]">
                      {new Date(post.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                    <h2 className="text-xl font-bold text-[var(--color-foreground)] mt-2 mb-3">
                      <Link
                        href={'/blog/' + post.slug}
                        className="hover:text-[var(--color-secondary)] transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-[var(--color-muted-foreground)] mb-4">
                      {post.excerpt}
                    </p>
                    <Link
                      href={'/blog/' + post.slug}
                      className="inline-flex items-center text-[var(--color-secondary)] font-semibold hover:underline"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-[var(--color-muted-foreground)]">
              Blog posts coming soon.
            </p>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
