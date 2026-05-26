import type { PublicPlan } from "@/types/plan";
import { isFreePlan, planDisplayName } from "@/lib/plans";

export function buildPricingJsonLd(
  plans: PublicPlan[],
  siteUrl: string
): Record<string, unknown> {
  const offers = plans.map((plan) => {
    const monthly = Number(plan.price_monthly_inr);
    const price = isFreePlan(plan)
      ? 0
      : Number.isFinite(monthly)
        ? monthly
        : 0;
    return {
      "@type": "Offer",
      name: planDisplayName(plan),
      description: plan.description ?? undefined,
      price: String(price),
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
      highPrice: String(
        Math.max(
          ...plans.map((p) => Number(p.price_monthly_inr) || 0),
          0
        )
      ),
      offerCount: plans.length,
      offers,
    },
  };
}
