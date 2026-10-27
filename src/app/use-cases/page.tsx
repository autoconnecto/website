import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { listUseCases } from '@/content/useCases';
import { shareMeta } from '@/lib/shareMeta';
import { siteOrigin } from '@/lib/siteOrigin';

const baseUrl = siteOrigin();
const useCases = listUseCases();

const title = 'Use cases — Autoconnecto IoT';
const description =
  'Fuel theft, cold chain, energy, water tanks, geofence lockout, OEM white-label, ESP32 MQTT — hosted in India.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}/use-cases` },
  ...shareMeta(baseUrl, '/use-cases', title, description),
};

export default function UseCasesHubPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: title,
            description,
            url: `${baseUrl}/use-cases`,
            hasPart: useCases.map((u) => ({
              '@type': 'WebPage',
              name: u.h1,
              url: `${baseUrl}${u.path}`,
              description: u.description,
            })),
          }),
        }}
      />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0D1829] to-[#0B1120]" />
        <div className="noise-overlay absolute inset-0 opacity-30" />
      </div>
      <Header />
      <div className="pt-24 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Autoconnecto
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
          Use cases
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{description}</p>
        <ul className="mt-12 space-y-6">
          {useCases.map((u) => (
            <li key={u.slug} className="border-b border-border pb-6 last:border-0">
              <Link
                href={u.path}
                className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
              >
                {u.h1}
              </Link>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{u.lead}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </main>
  );
}
