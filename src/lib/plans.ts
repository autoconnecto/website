import type { PublicPlan } from "@/types/plan";
import { APP_SIGNUP_URL } from "@/config/links";

export type BillingPeriod = "monthly" | "yearly";
export type DeploymentKind = "hosted" | "onprem";

export function normalizePlanId(planId: string): string {
  return String(planId || "free").trim().toLowerCase();
}

/** Null-safe number: `Number(null)` is 0 in JS — never treat API null as ₹0. */
export function toNullableNumber(
  value: number | string | null | undefined
): number | null {
  if (value == null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
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
  const monthly = toNullableNumber(plan.price_monthly_inr);
  const yearly = toNullableNumber(plan.price_yearly_inr);
  const onetime = toNullableNumber(plan.price_onetime_inr);
  return (
    (monthly != null && monthly > 0) ||
    (yearly != null && yearly > 0) ||
    (onetime != null && onetime > 0)
  );
}

export function planDisplayName(plan: PublicPlan): string {
  return plan.display_name?.trim() || plan.plan_id;
}

export function fmtLimit(value: number | null | undefined): string {
  if (value == null) return "—";
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-IN");
}

export function formatInr(amount: number | null | undefined): string {
  const n = toNullableNumber(amount);
  if (n == null) return "—";
  return `₹${n.toLocaleString("en-IN")}`;
}

/** Strip internal licence notes from public plan blurbs. */
export function publicPlanDescription(plan: PublicPlan): string | null {
  const raw = (plan.description || "").trim();
  if (!raw) return null;
  return raw
    .replace(
      /\s*;?\s*HA layout issued as nodes=\d+ in the licence file\.?/gi,
      ""
    )
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.;])/g, "$1")
    .trim() || null;
}

export function formatDeviceCap(plan: PublicPlan): string {
  const id = normalizePlanId(plan.plan_id);
  const n = toNullableNumber(plan.max_devices);
  if (id === "enterprise") return "5,000+";
  if (id === "enterprise_onprem") return "50,000+";
  if (n == null) return "By quote";
  return fmtLimit(n);
}

export function formatMonthlyCell(plan: PublicPlan): string {
  if (isFreePlan(plan)) return formatInr(0);
  const onetime = toNullableNumber(plan.price_onetime_inr);
  const monthly = toNullableNumber(plan.price_monthly_inr);
  if (onetime != null && onetime > 0 && monthly == null) {
    return `${formatInr(onetime)} one-time`;
  }
  if (isQuoteOnly(plan) && monthly == null) return "Quote";
  if (monthly != null) return formatInr(monthly);
  return "Quote";
}

export function formatYearlyCell(plan: PublicPlan): string {
  if (isFreePlan(plan)) return formatInr(0);
  const yearly = toNullableNumber(plan.price_yearly_inr);
  if (yearly != null && yearly > 0) return formatInr(yearly);
  if (isQuoteOnly(plan)) return "—";
  return "—";
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
  const onetime = toNullableNumber(plan.price_onetime_inr);
  const monthly = toNullableNumber(plan.price_monthly_inr);
  if (onetime != null && onetime > 0 && monthly == null) {
    return onetime;
  }
  return toNullableNumber(
    period === "yearly" ? plan.price_yearly_inr : plan.price_monthly_inr
  );
}

export function yearlyEffectiveMonthly(plan: PublicPlan): number | null {
  const yearly = toNullableNumber(plan.price_yearly_inr);
  if (yearly == null || yearly <= 0) return null;
  return Math.round(yearly / 12);
}

export function yearlySavingsLabel(plan: PublicPlan): string | null {
  const monthly = toNullableNumber(plan.price_monthly_inr);
  const yearly = toNullableNumber(plan.price_yearly_inr);
  if (monthly == null || yearly == null || monthly <= 0 || yearly <= 0) {
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
