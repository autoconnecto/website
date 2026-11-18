import type { PublicPlan } from "@/types/plan";
import { isFreePlan, planDisplayName } from "@/lib/plans";

export function buildPricingJsonLd(
  plans: PublicPlan[],
  siteUrl: string
): Record<string, unknown> {
  const pricedAmounts = plans.map((plan) => {
    if (isFreePlan(plan)) return 0;
    const monthly = Number(plan.price_monthly_inr);
    if (Number.isFinite(monthly) && monthly > 0) return monthly;
    const onetime = Number(plan.price_onetime_inr);
    if (Number.isFinite(onetime) && onetime > 0) return onetime;
    return 0;
  });

  const offers = plans.map((plan, index) => {
    return {
      "@type": "Offer",
      name: planDisplayName(plan),
      description: plan.description ?? undefined,
      price: String(pricedAmounts[index] ?? 0),
      priceCurrency: "INR",
      url: `${siteUrl}/pricing#plan-${plan.plan_id}`,
      availability: "https://schema.org/InStock",
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Autoconnecto IoT Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: siteUrl,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "0",
      highPrice: String(Math.max(...pricedAmounts, 0)),
      offerCount: plans.length,
      offers,
    },
  };
}
