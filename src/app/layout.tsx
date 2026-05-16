import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { generatePageMeta, generateLocalBusinessSchema } from '@/lib/seo';
import { getSiteConfig } from '@/lib/config';
import ThemeProvider from '@/themes/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = generatePageMeta({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = getSiteConfig();
  const localBusinessSchema = generateLocalBusinessSchema(config);

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {config.analytics?.ga4MeasurementId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.ga4MeasurementId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${config.analytics.ga4MeasurementId}');`,
              }}
            />
          </>
        )}
        {config.analytics?.gscVerificationCode && (
          <meta
            name="google-site-verification"
            content={config.analytics.gscVerificationCode}
          />
        )}
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
