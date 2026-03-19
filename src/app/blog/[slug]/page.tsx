import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSiteConfig } from '@/lib/config';
import { getBlogPost, getAllBlogPosts } from '@/lib/content';
import { generatePageMeta, generateBreadcrumbSchema } from '@/lib/seo';
import CTASection from '@/components/sections/CTASection';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  return generatePageMeta({
    title: post.title,
    description: post.metaDescription || post.excerpt,
    path: '/blog/' + slug,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const config = getSiteConfig();
  const post = getBlogPost(slug);

  if (!post) {
    redirect('/blog');
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: config.brand.name,
    },
    publisher: {
      '@type': 'Organization',
      name: config.brand.name,
      url: 'https://' + config.brand.domain,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://' + config.brand.domain + '/blog/' + slug,
    },
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://' + config.brand.domain },
    { name: 'Blog', url: 'https://' + config.brand.domain + '/blog' },
    { name: post.title, url: 'https://' + config.brand.domain + '/blog/' + slug },
  ]);

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
            <li>
              <Link href="/blog" className="hover:text-[var(--color-secondary)]">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-[var(--color-foreground)] truncate max-w-[200px]">
              {post.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Article */}
      <article className="py-16 bg-[var(--color-background)]">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <header className="mb-10">
            <time className="text-sm text-[var(--color-muted-foreground)]">
              {new Date(post.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mt-3 mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-[var(--color-muted-foreground)]">
              By {config.brand.name}
            </p>
          </header>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-[var(--color-muted-foreground)] leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--color-foreground)] [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[var(--color-foreground)] [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-[var(--color-secondary)] [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[var(--color-card)]">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.slice(0, 2).map((related) => (
                <article
                  key={related.slug}
                  className="bg-[var(--color-background)] rounded-[var(--border-radius)] p-6"
                >
                  <time className="text-sm text-[var(--color-muted-foreground)]">
                    {new Date(related.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                  <h3 className="text-lg font-bold text-[var(--color-foreground)] mt-2 mb-2">
                    <Link
                      href={'/blog/' + related.slug}
                      className="hover:text-[var(--color-secondary)] transition-colors"
                    >
                      {related.title}
                    </Link>
                  </h3>
                  <p className="text-[var(--color-muted-foreground)] text-sm">
                    {related.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
