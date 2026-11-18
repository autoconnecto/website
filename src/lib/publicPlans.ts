import rawPlans from "../../public/plans.json";
import type { PublicPlan } from "@/types/plan";
import { publicPlanDescription } from "@/lib/plans";

/** Plans baked at build time from public/plans.json (see scripts/fetch-public-plans.mjs). */
export function getPublicPlans(): PublicPlan[] {
  const plans = rawPlans as PublicPlan[];
  return [...plans]
    .map((plan) => ({
      ...plan,
      description: publicPlanDescription(plan),
    }))
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}
