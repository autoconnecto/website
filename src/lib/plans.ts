import type { PublicPlan } from "@/types/plan";
import { APP_SIGNUP_URL } from "@/config/links";

export type BillingPeriod = "monthly" | "yearly";

export function normalizePlanId(planId: string): string {
  return String(planId || "FREE").trim().toUpperCase();
}

export function isFreePlan(plan: PublicPlan): boolean {
  return normalizePlanId(plan.plan_id) === "FREE";
}

export function isPaidPlan(plan: PublicPlan): boolean {
  if (isFreePlan(plan)) return false;
  const monthly = Number(plan.price_monthly_inr);
  const yearly = Number(plan.price_yearly_inr);
  return (Number.isFinite(monthly) && monthly > 0) || (Number.isFinite(yearly) && yearly > 0);
}

export function planDisplayName(plan: PublicPlan): string {
  return plan.display_name?.trim() || plan.plan_id;
}

export function formatInr(amount: number | null | undefined): string {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "—";
  return `₹${n.toLocaleString("en-IN")}`;
}

export function planPriceForPeriod(
  plan: PublicPlan,
  period: BillingPeriod
): number | null {
  if (isFreePlan(plan)) return 0;
  const raw =
    period === "yearly" ? plan.price_yearly_inr : plan.price_monthly_inr;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

export function planSignupUrl(planId: string, period: BillingPeriod): string {
  const url = new URL(APP_SIGNUP_URL);
  url.searchParams.set("planId", normalizePlanId(planId));
  url.searchParams.set("period", period);
  return url.toString();
}

export function fmtLimit(value: number | null | undefined): string {
  if (value == null) return "—";
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-IN");
}
