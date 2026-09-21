import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SolutionsCatalog from '@/app/components/SolutionsCatalog';
import { listSolutions } from '@/content/solutions';
import { buildSolutionsItemListJsonLd } from '@/lib/solutionsJsonLd';
import { siteOrigin } from '@/lib/siteOrigin';

const baseUrl = siteOrigin();
const solutions = listSolutions();

export const metadata: Metadata = {
  title: 'Solutions — Hardware + Autoconnecto Platform',
  description:
    'Sellable Autoconnecto solutions: Indoor Humidity & Temperature kits, EnergyFleet industrial energy monitoring, and more. Contact for bundle pricing.',
  alternates: { canonical: `${baseUrl}/solutions` },
  openGraph: {
    title: 'Solutions — Autoconnecto',
    description:
      'Hardware plus platform offerings. Climate kits, EnergyFleet Modbus energy monitoring, and growing catalog.',
    url: `${baseUrl}/solutions`,
  },
};

export default function SolutionsPage() {
  const jsonLd = buildSolutionsItemListJsonLd(solutions, baseUrl);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0D1829] to-[#0B1120]" />
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
          style={{
            background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)',
          }}
        />
        <div className="noise-overlay absolute inset-0 opacity-30" />
      </div>

      <Header />
      <SolutionsCatalog solutions={solutions} />
      <Footer />
    </main>
  );
}
