import type { PublicPlan } from "@/types/plan";
import { APP_SIGNUP_URL } from "@/config/links";

export type BillingPeriod = "monthly" | "yearly";
export type DeploymentKind = "hosted" | "onprem";

export function normalizePlanId(planId: string): string {
  return String(planId || "free").trim().toLowerCase();
}

export function isFreePlan(plan: PublicPlan): boolean {
  return normalizePlanId(plan.plan_id) === "free";
}

export function isQuoteOnly(plan: PublicPlan): boolean {
  if (plan.is_quote_only === true) return true;
  const id = normalizePlanId(plan.plan_id);
  return id === "enterprise" || id === "enterprise_onprem" || id === "forever";
}

export function isPaidPlan(plan: PublicPlan): boolean {
  if (isFreePlan(plan)) return false;
  if (isQuoteOnly(plan)) return true;
  const monthly = Number(plan.price_monthly_inr);
  const yearly = Number(plan.price_yearly_inr);
  const onetime = Number(plan.price_onetime_inr);
  return (
    (Number.isFinite(monthly) && monthly > 0) ||
    (Number.isFinite(yearly) && yearly > 0) ||
    (Number.isFinite(onetime) && onetime > 0)
  );
}

export function planDisplayName(plan: PublicPlan): string {
  return plan.display_name?.trim() || plan.plan_id;
}

export function formatInr(amount: number | null | undefined): string {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "—";
  return `₹${n.toLocaleString("en-IN")}`;
}

export function planKindOf(plan: PublicPlan): DeploymentKind {
  const kind = String(plan.plan_kind || "").toLowerCase();
  if (kind === "onprem") return "onprem";
  const id = normalizePlanId(plan.plan_id);
  if (id.includes("onprem") || id === "forever") return "onprem";
  return "hosted";
}

export function planPriceForPeriod(
  plan: PublicPlan,
  period: BillingPeriod
): number | null {
  if (isFreePlan(plan)) return 0;
  const onetime = Number(plan.price_onetime_inr);
  if (Number.isFinite(onetime) && onetime > 0 && !Number(plan.price_monthly_inr)) {
    return onetime;
  }
  const raw =
    period === "yearly" ? plan.price_yearly_inr : plan.price_monthly_inr;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

export function yearlyEffectiveMonthly(plan: PublicPlan): number | null {
  const yearly = Number(plan.price_yearly_inr);
  if (!Number.isFinite(yearly) || yearly <= 0) return null;
  return Math.round(yearly / 12);
}

export function yearlySavingsLabel(plan: PublicPlan): string | null {
  const monthly = Number(plan.price_monthly_inr);
  const yearly = Number(plan.price_yearly_inr);
  if (!Number.isFinite(monthly) || !Number.isFinite(yearly) || monthly <= 0 || yearly <= 0) {
    return null;
  }
  const monthsPaid = yearly / monthly;
  if (monthsPaid <= 10.2) return "2 months free";
  const saved = monthly * 12 - yearly;
  if (saved <= 0) return null;
  return `Save ${formatInr(saved)} / year`;
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

export function formatRetention(days: number | null | undefined, kind: DeploymentKind): string {
  if (kind === "onprem") {
    if (days == null) return "Your storage";
  }
  if (days == null) return "—";
  const n = Number(days);
  if (!Number.isFinite(n)) return "—";
  if (n === 60) return "60 days";
  if (n === 90) return "90 days";
  if (n === 274) return "9 months";
  if (n === 548) return "18 months";
  if (n === 731) return "24 months";
  if (n % 30 === 0 && n >= 60) {
    const months = Math.round(n / 30.44);
    if (months >= 2) return `${months} months`;
  }
  return `${n.toLocaleString("en-IN")} days`;
}

export function formatDps(value: number | null | undefined): string {
  if (value == null) return "—";
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return `${n.toLocaleString("en-IN")} DP/s`;
}

export function popularPlanId(kind: DeploymentKind): string {
  return kind === "hosted" ? "startup" : "sme_onprem";
}

export function sortPlans(plans: PublicPlan[]): PublicPlan[] {
  return [...plans].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

export function filterPlansByKind(
  plans: PublicPlan[],
  kind: DeploymentKind
): PublicPlan[] {
  return sortPlans(plans.filter((p) => planKindOf(p) === kind));
}
