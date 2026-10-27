import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UseCasePageContent from '@/app/components/UseCasePageContent';
import { getUseCase } from '@/content/useCases';
import { shareMeta } from '@/lib/shareMeta';
import { siteOrigin } from '@/lib/siteOrigin';

export function useCaseMetadata(slug: string): Metadata {
  const page = getUseCase(slug);
  if (!page) {
    return { title: 'Use case — Autoconnecto' };
  }
  const baseUrl = siteOrigin();
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: `${baseUrl}${page.path}` },
    ...shareMeta(baseUrl, page.path, page.title, page.description),
  };
}

export default function UseCaseRoutePage({ slug }: { slug: string }) {
  const page = getUseCase(slug);
  const baseUrl = siteOrigin();
  if (!page) {
    return (
      <main className="min-h-screen bg-background text-foreground p-8">
        <p>Use case not found.</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: page.title,
            description: page.description,
            url: `${baseUrl}${page.path}`,
            isPartOf: { '@type': 'WebSite', name: 'Autoconnecto', url: baseUrl },
            about: {
              '@type': 'SoftwareApplication',
              name: 'Autoconnecto',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
            },
          }),
        }}
      />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0D1829] to-[#0B1120]" />
        <div className="noise-overlay absolute inset-0 opacity-30" />
      </div>
      <Header />
      <UseCasePageContent page={page} />
      <Footer />
    </main>
  );
}
