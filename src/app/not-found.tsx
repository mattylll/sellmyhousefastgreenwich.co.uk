import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
