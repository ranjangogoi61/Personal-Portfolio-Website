import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] w-full flex items-center justify-center px-6 bg-background text-foreground relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative text-center max-w-md">
        <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
          [ 404 ]
        </span>
        <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight tracking-tight mb-4">
          Page <span className="text-gradient">not found</span>.
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-8">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-7 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
