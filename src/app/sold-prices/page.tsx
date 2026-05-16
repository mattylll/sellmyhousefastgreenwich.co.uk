import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/config';
import { getSoldData } from '@/lib/content';
import { generatePageMeta } from '@/lib/seo';
import CTASection from '@/components/sections/CTASection';

const GBP = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});
const NUM = new Intl.NumberFormat('en-GB');

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig();
  const sold = getSoldData();
  const title = `Sold House Prices in ${config.location.name} | HM Land Registry Data`;
  const description = sold
    ? `${NUM.format(sold.count)} properties sold in ${config.location.name} with a median sold price of ${GBP.format(sold.medianPrice)}. Real Land Registry data, updated ${formatLastUpdated(sold.lastUpdated)}.`
    : `Sold property prices in ${config.location.name}, sourced from HM Land Registry.`;
  return generatePageMeta({ title, description });
}

function formatLastUpdated(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return iso;
  }
}

function formatSaleDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

function formatMonth(ym: string): string {
  try {
    const [y, m] = ym.split('-').map(Number);
    return new Date(y, m - 1, 1).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  } catch {
    return ym;
  }
}

export default function SoldPricesPage() {
  const config = getSiteConfig();
  const sold = getSoldData();

  if (!sold || sold.count === 0) {
    return (
      <div className="container mx-auto px-4 py-24 max-w-3xl text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-foreground)] mb-4">
          Sold prices in {config.location.name}
        </h1>
        <p className="text-[var(--color-muted-foreground)]">
          We're preparing the latest Land Registry data for {config.location.name}. Please check back soon.
        </p>
      </div>
    );
  }

  const typeOrder = ['Detached', 'Semi-Detached', 'Terraced', 'Flat', 'Other'];
  const breakdown = typeOrder
    .map((t) => ({ type: t, ...sold.byPropertyType[t] }))
    .filter((b) => b && b.count > 0);

  const last12Months = sold.byMonth.slice(-12);
  const maxMonthCount = Math.max(1, ...last12Months.map((m) => m.count));

  return (
    <>
      <section className="py-12 md:py-20 bg-[var(--color-primary)] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative container mx-auto px-4 max-w-5xl text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">
            HM Land Registry
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Sold House Prices in {config.location.name}
          </h1>
          <p className="mt-6 text-white/70 max-w-2xl mx-auto">
            Every property sale in {config.location.name} registered with the UK government between{' '}
            {sold.dateRange.from && formatSaleDate(sold.dateRange.from)} and{' '}
            {sold.dateRange.to && formatSaleDate(sold.dateRange.to)}. Last refreshed{' '}
            {formatLastUpdated(sold.lastUpdated)}.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[var(--color-background)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <BigStat label="Sales recorded" value={NUM.format(sold.count)} />
            <BigStat label="Median sold price" value={GBP.format(sold.medianPrice)} />
            <BigStat label="Average sold price" value={GBP.format(sold.averagePrice)} />
            <BigStat label="Highest sale" value={GBP.format(sold.maxPrice)} />
          </div>
        </div>
      </section>

      {breakdown.length > 0 && (
        <section className="py-12 md:py-20 bg-[var(--color-card)]">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-foreground)] mb-8 text-center">
              By property type
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {breakdown.map((b) => (
                <div
                  key={b.type}
                  className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl p-6"
                >
                  <p className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)] font-semibold">
                    {b.type}
                  </p>
                  <p className="mt-3 text-2xl md:text-3xl font-extrabold text-[var(--color-foreground)]">
                    {GBP.format(b.medianPrice)}
                  </p>
                  <p className="text-xs text-[var(--color-muted-foreground)]">median</p>
                  <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex justify-between text-sm">
                    <span className="text-[var(--color-muted-foreground)]">{NUM.format(b.count)} sales</span>
                    <span className="text-[var(--color-muted-foreground)]">
                      avg {GBP.format(b.averagePrice)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {last12Months.length > 1 && (
        <section className="py-12 md:py-20 bg-[var(--color-background)]">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-foreground)] mb-8 text-center">
              Sales activity, last 12 months
            </h2>
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 md:p-10">
              <div className="flex items-end gap-1 md:gap-2 h-48 md:h-56">
                {last12Months.map((m) => (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-[10px] md:text-xs text-[var(--color-muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity">
                      {GBP.format(m.medianPrice)}
                    </div>
                    <div
                      className="w-full bg-[var(--color-accent)]/70 group-hover:bg-[var(--color-accent)] rounded-t transition-colors"
                      style={{ height: `${(m.count / maxMonthCount) * 100}%` }}
                      title={`${formatMonth(m.month)}: ${NUM.format(m.count)} sales · median ${GBP.format(m.medianPrice)}`}
                    />
                    <div className="text-[10px] md:text-xs text-[var(--color-muted-foreground)] whitespace-nowrap">
                      {formatMonth(m.month).split(' ')[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-20 bg-[var(--color-card)]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-foreground)] mb-8 text-center">
            Recent sold prices
          </h2>
          <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[var(--color-muted)]/30 text-[var(--color-muted-foreground)]">
                <tr>
                  <th className="text-left px-4 md:px-6 py-3 font-semibold">Date</th>
                  <th className="text-left px-4 md:px-6 py-3 font-semibold">Street</th>
                  <th className="text-left px-4 md:px-6 py-3 font-semibold hidden sm:table-cell">Area</th>
                  <th className="text-left px-4 md:px-6 py-3 font-semibold hidden md:table-cell">Type</th>
                  <th className="text-left px-4 md:px-6 py-3 font-semibold hidden md:table-cell">Tenure</th>
                  <th className="text-right px-4 md:px-6 py-3 font-semibold">Sold for</th>
                </tr>
              </thead>
              <tbody>
                {sold.recentSales.map((s, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? 'bg-[var(--color-background)]' : 'bg-[var(--color-muted)]/10'}
                  >
                    <td className="px-4 md:px-6 py-3 text-[var(--color-muted-foreground)] whitespace-nowrap">
                      {formatSaleDate(s.date)}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-[var(--color-foreground)] font-medium">
                      {s.street || '—'}
                      {s.newBuild && (
                        <span className="ml-2 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                          New
                        </span>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-[var(--color-muted-foreground)] hidden sm:table-cell">
                      {s.outwardCode}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-[var(--color-muted-foreground)] hidden md:table-cell">
                      {s.type}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-[var(--color-muted-foreground)] hidden md:table-cell">
                      {s.tenure}
                    </td>
                    <td className="px-4 md:px-6 py-3 text-right font-bold text-[var(--color-foreground)] whitespace-nowrap">
                      {GBP.format(s.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-xs text-[var(--color-muted-foreground)] text-center">
            Showing the {sold.recentSales.length} most recently registered sales. House numbers omitted to
            keep individual sellers private — the data itself is public.
          </p>
        </div>
      </section>

      <section className="py-10 bg-[var(--color-background)]">
        <div className="container mx-auto px-4 max-w-3xl text-center text-sm text-[var(--color-muted-foreground)]">
          <p>
            Data source:{' '}
            <Link href={sold.sourceUrl} className="text-[var(--color-accent)] underline">
              HM Land Registry Price Paid Data
            </Link>
            . Contains public sector information licensed under the{' '}
            <Link
              href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
              className="text-[var(--color-accent)] underline"
            >
              Open Government Licence v3.0
            </Link>
            .
          </p>
          <p className="mt-2">
            Sold prices reflect what buyers paid — not what your home is worth today. For a free,
            no-obligation cash offer on your {config.location.name} property,{' '}
            <Link href="/contact" className="text-[var(--color-accent)] underline">
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function BigStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5 md:p-8 text-center">
      <p className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-accent)] leading-tight break-words">
        {value}
      </p>
      <p className="mt-2 text-xs md:text-sm text-[var(--color-muted-foreground)] uppercase tracking-wider font-medium">
        {label}
      </p>
    </div>
  );
}
