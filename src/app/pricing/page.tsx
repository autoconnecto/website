import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingPageContent from '@/app/components/PricingPageContent';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
  .trim()
  .replace(/\/+$/, '');

export const metadata: Metadata = {
  title: 'Pricing — Autoconnecto',
  description:
    'Autoconnecto IoT platform plans: Free, Hobby, Starter, Growth, and Enterprise. Transparent INR pricing for devices, dashboards, and telemetry.',
  alternates: { canonical: `${baseUrl}/pricing` },
  openGraph: {
    title: 'Pricing — Autoconnecto',
    description:
      'Compare Autoconnecto plans and limits. Start free, scale to enterprise IoT deployments.',
    url: `${baseUrl}/pricing`,
  },
};

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0D1829] to-[#0B1120]" />
        <div
          className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
          style={{
            background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)',
          }}
        />
        <div className="noise-overlay absolute inset-0 opacity-30" />
      </div>

      <Header />
      <PricingPageContent />
      <Footer />
    </main>
  );
}
