import Link from 'next/link';
import { getSiteConfig } from '@/lib/config';
import { getSoldData } from '@/lib/content';

const GBP_LARGE = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
});

const NUM = new Intl.NumberFormat('en-GB');

function formatLastUpdated(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function formatSaleDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function SoldPrices() {
  const config = getSiteConfig();
  const sold = getSoldData();

  if (!sold || sold.count === 0) return null;

  const recent = sold.recentSales.slice(0, 5);
  const dateRangeFrom = sold.dateRange.from
    ? new Date(sold.dateRange.from).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
    : '';
  const dateRangeTo = sold.dateRange.to
    ? new Date(sold.dateRange.to).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
    : '';

  return (
    <section className="py-16 md:py-24 bg-[var(--color-card)]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">
            Land Registry Data
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-foreground)] leading-tight">
            Recent Sold Prices in {config.location.name}
          </h2>
          <p className="mt-4 text-[var(--color-muted-foreground)]">
            Every sale registered with HM Land Registry between {dateRangeFrom} and {dateRangeTo}.
            We use this data to make grounded, evidence-based cash offers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto mb-10">
          <Stat label="Sales recorded" value={NUM.format(sold.count)} />
          <Stat label="Median sold price" value={GBP_LARGE.format(sold.medianPrice)} />
          <Stat label="Average sold price" value={GBP_LARGE.format(sold.averagePrice)} />
          <Stat
            label="Price range"
            value={`${GBP_LARGE.format(sold.minPrice)} – ${GBP_LARGE.format(sold.maxPrice)}`}
            small
          />
        </div>

        <div className="max-w-5xl mx-auto bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
            <h3 className="font-bold text-[var(--color-foreground)]">Latest registered sales</h3>
            <span className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)]">
              Updated {formatLastUpdated(sold.lastUpdated)}
            </span>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-muted)]/30 text-[var(--color-muted-foreground)]">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Date</th>
                <th className="text-left px-6 py-3 font-semibold">Street</th>
                <th className="text-left px-6 py-3 font-semibold hidden sm:table-cell">Area</th>
                <th className="text-left px-6 py-3 font-semibold hidden md:table-cell">Type</th>
                <th className="text-right px-6 py-3 font-semibold">Sold for</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((s, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? 'bg-[var(--color-background)]' : 'bg-[var(--color-muted)]/10'}
                >
                  <td className="px-6 py-3 text-[var(--color-muted-foreground)]">
                    {formatSaleDate(s.date)}
                  </td>
                  <td className="px-6 py-3 text-[var(--color-foreground)] font-medium">
                    {s.street || '—'}
                    {s.newBuild && (
                      <span className="ml-2 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                        New
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-[var(--color-muted-foreground)] hidden sm:table-cell">
                    {s.outwardCode}
                  </td>
                  <td className="px-6 py-3 text-[var(--color-muted-foreground)] hidden md:table-cell">
                    {s.type}
                  </td>
                  <td className="px-6 py-3 text-right font-bold text-[var(--color-foreground)]">
                    {GBP_LARGE.format(s.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/sold-prices"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-accent)] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            View all {NUM.format(sold.count)} sold prices in {config.location.name}
            <span aria-hidden>→</span>
          </Link>
          <p className="mt-4 text-xs text-[var(--color-muted-foreground)]">
            Source: HM Land Registry Price Paid Data · Contains public sector information licensed under the
            Open Government Licence v3.0
          </p>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, small = false }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl p-5 md:p-6 text-center">
      <p
        className={
          (small
            ? 'text-lg md:text-xl '
            : 'text-2xl md:text-3xl lg:text-4xl ') +
          'font-extrabold text-[var(--color-accent)] leading-tight'
        }
      >
        {value}
      </p>
      <p className="mt-2 text-xs md:text-sm text-[var(--color-muted-foreground)] uppercase tracking-wider font-medium">
        {label}
      </p>
    </div>
  );
}
