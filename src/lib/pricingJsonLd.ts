import type { PublicPlan } from "@/types/plan";
import {
  isFreePlan,
  isQuoteOnly,
  planDisplayName,
  publicPlanDescription,
  toNullableNumber,
} from "@/lib/plans";

export function buildPricingJsonLd(
  plans: PublicPlan[],
  siteUrl: string
): Record<string, unknown> {
  const offers = plans.map((plan) => {
    const monthly = toNullableNumber(plan.price_monthly_inr);
    const onetime = toNullableNumber(plan.price_onetime_inr);
    const base = {
      "@type": "Offer",
      name: planDisplayName(plan),
      description: publicPlanDescription(plan) ?? undefined,
      priceCurrency: "INR",
      url: `${siteUrl}/pricing#plan-${plan.plan_id}`,
      availability: "https://schema.org/InStock",
    };

    if (isFreePlan(plan)) {
      return { ...base, price: "0" };
    }
    if (onetime != null && onetime > 0 && monthly == null) {
      return { ...base, price: String(onetime) };
    }
    if (isQuoteOnly(plan) && monthly == null) {
      // Quote-only: omit numeric price so crawlers do not invent ₹0.
      return {
        ...base,
        description:
          publicPlanDescription(plan) ||
          "Custom quote — contact Autoconnecto sales.",
      };
    }
    if (monthly != null && monthly > 0) {
      return { ...base, price: String(monthly) };
    }
    return {
      ...base,
      description:
        publicPlanDescription(plan) ||
        "Custom quote — contact Autoconnecto sales.",
    };
  });

  const numericPrices = plans
    .map((plan) => {
      if (isFreePlan(plan)) return 0;
      const monthly = toNullableNumber(plan.price_monthly_inr);
      if (monthly != null && monthly > 0) return monthly;
      const onetime = toNullableNumber(plan.price_onetime_inr);
      if (onetime != null && onetime > 0) return onetime;
      return null;
    })
    .filter((n): n is number => n != null);

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
      highPrice: String(Math.max(...numericPrices, 0)),
      offerCount: plans.length,
      offers,
    },
  };
}
