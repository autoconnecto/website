import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingPlansServer from '@/app/components/PricingPlansServer';
import { getPublicPlans } from '@/lib/publicPlans';
import { buildPricingJsonLd } from '@/lib/pricingJsonLd';
import { shareMeta } from '@/lib/shareMeta';
import { siteOrigin } from '@/lib/siteOrigin';
import {
  formatInr,
  isFreePlan,
  isQuoteOnly,
  planDisplayName,
  toNullableNumber,
} from '@/lib/plans';

const baseUrl = siteOrigin();

const plans = getPublicPlans();
const priceSummary = plans
  .map((p) => {
    const name = planDisplayName(p);
    if (isFreePlan(p)) return `${name} ₹0/mo`;
    const onetime = toNullableNumber(p.price_onetime_inr);
    const monthly = toNullableNumber(p.price_monthly_inr);
    if (onetime != null && onetime > 0 && monthly == null) {
      return `${name} ${formatInr(onetime)} one-time`;
    }
    if (isQuoteOnly(p) && monthly == null) return `${name} quote`;
    if (monthly != null) return `${name} ${formatInr(monthly)}/mo`;
    return `${name} quote`;
  })
  .join('; ');

const pricingTitle = 'Pricing — Autoconnecto';
const pricingDescription = (
  priceSummary
    ? `INR plans: ${priceSummary}. Hosted and on-prem. DP/s and device caps by plan.`
    : 'Autoconnecto IoT plans in INR. Hosted Free to Business, on-prem Startup to Scale, Forever licence, Enterprise by quote.'
).slice(0, 155);

export const metadata: Metadata = {
  title: pricingTitle,
  description: pricingDescription,
  alternates: {
    canonical: `${baseUrl}/pricing`,
    types: {
      'application/json': `${baseUrl}/plans.json`,
    },
  },
  ...shareMeta(baseUrl, '/pricing', pricingTitle, pricingDescription),
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
