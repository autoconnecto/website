import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingPlansServer from '@/app/components/PricingPlansServer';
import { getPublicPlans } from '@/lib/publicPlans';
import { buildPricingJsonLd } from '@/lib/pricingJsonLd';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
  .trim()
  .replace(/\/+$/, '');

const plans = getPublicPlans();
const priceSummary = plans
  .map((p) => {
    const m = Number(p.price_monthly_inr);
    const name = p.display_name || p.plan_id;
    return Number.isFinite(m) ? `${name} ₹${m}/mo` : name;
  })
  .join('; ');

export const metadata: Metadata = {
  title: 'Pricing — Autoconnecto',
  description: `Autoconnecto IoT platform plans (INR): ${priceSummary}. Free tier and paid Hobby, Starter, Growth, Enterprise with device and telemetry limits.`,
  alternates: {
    canonical: `${baseUrl}/pricing`,
    types: {
      'application/json': `${baseUrl}/plans.json`,
    },
  },
  openGraph: {
    title: 'Pricing — Autoconnecto',
    description:
      'Compare Autoconnecto plans and limits. Start free, scale to enterprise IoT deployments.',
    url: `${baseUrl}/pricing`,
  },
};

export default function PricingPage() {
  const pricingJsonLd = buildPricingJsonLd(plans, baseUrl);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
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
      <PricingPlansServer />
      <Footer />
    </main>
  );
}
