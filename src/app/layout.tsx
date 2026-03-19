import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { generatePageMeta, generateLocalBusinessSchema, generateWebSiteSchema } from '@/lib/seo';
import { getSiteConfig } from '@/lib/config';
import ThemeProvider from '@/themes/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMeta({});
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = getSiteConfig();
  const localBusinessSchema = generateLocalBusinessSchema(config);
  const webSiteSchema = generateWebSiteSchema(config);

  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
