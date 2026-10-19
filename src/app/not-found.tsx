import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-primary opacity-20">404</h1>
        <h2 className="text-2xl font-medium text-foreground mt-2 mb-2">Page not found</h2>
        <p className="text-muted-foreground mb-8">
          That address is not a page on this site.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
