import { getSiteConfig } from '@/lib/config';
import { getNetworkConfig } from '@/lib/content';

export default function NearbyLocations() {
  const config = getSiteConfig();
  const network = getNetworkConfig();

  if (!network) return null;

  const allLinks = [...network.nearbyLocations, ...network.regionalLocations];
  if (allLinks.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-[var(--color-card)]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">
            National Coverage
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-foreground)] leading-tight">
            We Also Buy Houses Across the UK
          </h2>
          <p className="mt-4 text-[var(--color-muted-foreground)]">
            Beyond {config.location.name}, we help homeowners sell fast in
            these nearby locations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {allLinks.map((link) => (
            <a
              key={link.domain}
              href={`https://www.${link.domain}`}
              rel="noopener"
              className="group relative bg-[var(--color-background)] rounded-[var(--border-radius)] border border-[var(--color-border)] p-5 text-center hover:border-[var(--color-accent)]/40 hover:shadow-md transition-all duration-300"
            >
              <p className="text-base font-semibold text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors">
                {link.name}
              </p>
              <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
                {link.region}
              </p>
              <p className="text-xs text-[var(--color-accent)] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {link.anchor} &rarr;
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
