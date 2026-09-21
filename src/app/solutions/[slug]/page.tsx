import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SolutionDetailContent from '@/app/components/SolutionDetailContent';
import {
  getSolutionBySlug,
  listSolutionSlugs,
} from '@/content/solutions';
import { buildSolutionProductJsonLd } from '@/lib/solutionsJsonLd';
import { siteOrigin } from '@/lib/siteOrigin';

const baseUrl = siteOrigin();

export function generateStaticParams() {
  return listSolutionSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const solution = getSolutionBySlug(params.slug);
  if (!solution) {
    return { title: 'Solution not found — Autoconnecto' };
  }
  return {
    title: `${solution.title} — Autoconnecto Solutions`,
    description: solution.shortDescription,
    alternates: { canonical: `${baseUrl}/solutions/${solution.slug}` },
    openGraph: {
      title: `${solution.title} — Autoconnecto`,
      description: solution.shortDescription,
      url: `${baseUrl}/solutions/${solution.slug}`,
    },
  };
}

export default function SolutionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const solution = getSolutionBySlug(params.slug);
  if (!solution) notFound();

  const jsonLd = buildSolutionProductJsonLd(solution, baseUrl);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0D1829] to-[#0B1120]" />
        <div
          className="absolute top-0 right-1/3 w-[480px] h-[480px] rounded-full blur-[120px] opacity-15"
          style={{
            background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)',
          }}
        />
        <div className="noise-overlay absolute inset-0 opacity-30" />
      </div>

      <Header />
      <SolutionDetailContent solution={solution} />
      <Footer />
    </main>
  );
}
