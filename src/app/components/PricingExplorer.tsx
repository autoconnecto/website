"use client";

import React, { useMemo, useState } from "react";
import type { PublicPlan } from "@/types/plan";
import {
  type BillingPeriod,
  type DeploymentKind,
  filterPlansByKind,
  formatDeviceCap,
  formatDps,
  formatInr,
  formatMonthlyCell,
  formatRetention,
  formatYearlyCell,
  fmtLimit,
  isFreePlan,
  isQuoteOnly,
  planDisplayName,
  planSignupUrl,
  popularPlanId,
  publicPlanDescription,
  toNullableNumber,
  yearlyEffectiveMonthly,
  yearlySavingsLabel,
} from "@/lib/plans";

function Segmented<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: T;
  onChange: (next: T) => void;
  options: { id: T; label: string; hint?: string }[];
  ariaLabel: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex flex-wrap items-center justify-center gap-1 rounded-xl border border-border/80 bg-secondary/40 p-1"
    >
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={`min-w-[9.5rem] rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
              active
                ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(14,165,233,0.25)]"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            <span className="block">{opt.label}</span>
            {opt.hint ? (
              <span
                className={`mt-0.5 block text-[11px] font-normal ${
                  active ? "text-primary-foreground/80" : "text-muted-foreground/80"
                }`}
              >
                {opt.hint}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function PlanFeature({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <li className="flex items-start justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`text-right ${
          emphasis ? "font-semibold text-foreground" : "font-medium text-foreground"
        }`}
      >
        {value}
      </span>
    </li>
  );
}

function PlanCard({
  plan,
  kind,
  period,
}: {
  plan: PublicPlan;
  kind: DeploymentKind;
  period: BillingPeriod;
}) {
  const id = String(plan.plan_id).toLowerCase();
  const free = isFreePlan(plan);
  const quote = isQuoteOnly(plan);
  const popular = id === popularPlanId(kind);
  const monthly = toNullableNumber(plan.price_monthly_inr);
  const yearly = toNullableNumber(plan.price_yearly_inr);
  const onetime = toNullableNumber(plan.price_onetime_inr);
  const effMonthly = yearlyEffectiveMonthly(plan);
  const savings = yearlySavingsLabel(plan);
  const insight = toNullableNumber(plan.insight_price_inr_month);
  const blurb = publicPlanDescription(plan);

  const onpremSelfServe =
    kind === "onprem" &&
    (id === "startup_onprem" || id === "sme_onprem");
  const ctaHref = quote
    ? "/#contact"
    : planSignupUrl(
        plan.plan_id,
        period === "yearly" && yearly != null && yearly > 0 ? "yearly" : "monthly"
      );
  const ctaLabel = quote
    ? "Talk to us"
    : free
      ? "Start free"
      : onpremSelfServe
        ? "Buy licence"
        : kind === "onprem"
          ? "Request licence"
          : "Get started";

  let priceBlock: React.ReactNode;
  if (free) {
    priceBlock = (
      <p className="font-display text-4xl font-bold text-foreground tracking-tight">
        {formatInr(0)}
        <span className="ml-1 text-base font-normal text-muted-foreground">/ month</span>
      </p>
    );
  } else if (onetime != null && onetime > 0 && monthly == null) {
    priceBlock = (
      <>
        <p className="font-display text-3xl font-bold text-foreground tracking-tight">
          {formatInr(onetime)}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          one-time · 20% AMC / year from year 2
        </p>
      </>
    );
  } else if (quote && monthly == null) {
    priceBlock = (
      <p className="font-display text-3xl font-bold text-foreground tracking-tight">
        Quote
      </p>
    );
  } else if (period === "yearly" && yearly != null && yearly > 0) {
    priceBlock = (
      <>
        <p className="font-display text-4xl font-bold text-foreground tracking-tight">
          {formatInr(effMonthly)}
          <span className="ml-1 text-base font-normal text-muted-foreground">
            / month
          </span>
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {formatInr(yearly)} billed yearly
          {savings ? ` · ${savings}` : null}
        </p>
      </>
    );
  } else {
    priceBlock = (
      <>
        <p className="font-display text-4xl font-bold text-foreground tracking-tight">
          {formatInr(monthly)}
          <span className="ml-1 text-base font-normal text-muted-foreground">
            / month
          </span>
        </p>
        {yearly != null && yearly > 0 ? (
          <p className="text-sm text-muted-foreground mt-1">
            or {formatInr(yearly)} / year
            {savings ? ` (${savings})` : null}
          </p>
        ) : null}
      </>
    );
  }

  const retention = formatRetention(plan.retention_days, kind);
  const openLimits = kind === "onprem" && !free;

  return (
    <article
      id={`plan-${plan.plan_id}`}
      className={`relative flex flex-col rounded-2xl border bg-card/80 p-6 transition-all duration-300 ${
        popular
          ? "border-primary/60 shadow-[0_0_36px_rgba(14,165,233,0.18)]"
          : "border-border/80 hover:border-primary/35"
      }`}
      aria-labelledby={`plan-${plan.plan_id}-title`}
    >
      {popular ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold tracking-wide">
          Most chosen
        </span>
      ) : null}

      <div className="mb-5">
        <h2
          id={`plan-${plan.plan_id}-title`}
          className="font-display text-xl font-bold text-foreground"
        >
          {planDisplayName(plan)}
        </h2>
        {blurb ? (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {blurb}
          </p>
        ) : null}
      </div>

      <div className="mb-6 min-h-[4.5rem]">{priceBlock}</div>

      <ul className="space-y-2.5 mb-6 flex-1 border-t border-border/60 pt-5">
        <PlanFeature
          label="Data rate"
          value={formatDps(plan.dps_included)}
          emphasis
        />
        <PlanFeature label="Devices" value={formatDeviceCap(plan)} emphasis />
        <PlanFeature label="Data kept" value={retention} emphasis />
        {openLimits ? (
          <PlanFeature label="Users / boards / assets" value="Open on your servers" />
        ) : (
          <>
            <PlanFeature label="Users" value={fmtLimit(plan.max_users)} />
            <PlanFeature label="Dashboards" value={fmtLimit(plan.max_dashboards)} />
            <PlanFeature label="Assets" value={fmtLimit(plan.max_assets)} />
            <PlanFeature label="Rule chains" value={fmtLimit(plan.max_rule_chains)} />
          </>
        )}
        {kind === "onprem" && plan.licence_nodes != null ? (
          <PlanFeature label="Licence nodes" value={fmtLimit(plan.licence_nodes)} />
        ) : null}
        <PlanFeature
          label="White-label web"
          value={plan.whitelabel_enabled ? "Yes" : "No"}
        />
        <PlanFeature
          label="Insight analytics"
          value={
            insight != null && insight > 0
              ? `Add-on ${formatInr(insight)} / mo`
              : free
                ? "Not available"
                : "In the quote"
          }
        />
      </ul>

      <a
        href={ctaHref}
        className={`mt-auto inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold transition-all ${
          popular
            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(14,165,233,0.3)]"
            : "border border-border text-foreground hover:border-primary/50 hover:bg-white/5"
        }`}
      >
        {ctaLabel}
        <span aria-hidden>→</span>
      </a>
    </article>
  );
}

function ComparisonTable({
  plans,
  kind,
}: {
  plans: PublicPlan[];
  kind: DeploymentKind;
}) {
  return (
    <section className="mt-16" aria-labelledby="pricing-comparison-heading">
      <h2
        id="pricing-comparison-heading"
        className="font-display text-2xl font-bold text-foreground text-center mb-2"
      >
        Compare {kind === "hosted" ? "hosted" : "on-prem"} plans
      </h2>
      <p className="text-center text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
        Prices exclude GST. Insight is never included automatically — it is an optional
        add-on on Maker and above.
      </p>
      <div className="overflow-x-auto rounded-xl border border-border/80">
        <table className="w-full text-sm text-left border-collapse min-w-[720px]">
          <caption className="sr-only">
            Autoconnecto {kind} plan comparison in Indian Rupees
          </caption>
          <thead className="bg-secondary/60 text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                Plan
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Monthly
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Yearly
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                DP/s
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Devices
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Data kept
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Insight
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {plans.map((plan) => {
              const insight = toNullableNumber(plan.insight_price_inr_month);
              return (
                <tr key={plan.plan_id} className="text-foreground">
                  <th scope="row" className="px-4 py-3 font-medium">
                    {planDisplayName(plan)}
                  </th>
                  <td className="px-4 py-3">{formatMonthlyCell(plan)}</td>
                  <td className="px-4 py-3">{formatYearlyCell(plan)}</td>
                  <td className="px-4 py-3">{fmtLimit(plan.dps_included)}</td>
                  <td className="px-4 py-3">{formatDeviceCap(plan)}</td>
                  <td className="px-4 py-3">
                    {formatRetention(plan.retention_days, kind)}
                  </td>
                  <td className="px-4 py-3">
                    {insight != null && insight > 0
                      ? formatInr(insight)
                      : isFreePlan(plan)
                        ? "—"
                        : "Quote"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AddOns() {
  return (
    <section className="mt-16" aria-labelledby="addons-heading">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2
          id="addons-heading"
          className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3"
        >
          Add-ons
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Optional lines on the same invoice. Nothing here is bundled as free.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            title: "Insight analytics",
            price: "From ₹999 / month",
            body: "Opt-in on Maker and above. Price follows the plan. Not available on Free. Never auto-enabled.",
          },
          {
            title: "+2 DP/s top-up",
            price: "₹349 / month per pack",
            body: "Hosted Maker to Business only. Stackable up to 400 DP/s total. Above that is Enterprise by quote.",
          },
          {
            title: "White-label mobile app",
            price: "₹6,899 / month + ₹69,999 setup",
            body: "Your branded mobile app on paid plans. The standard Autoconnecto app is already available.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border/80 bg-card/60 p-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 font-display text-xl font-bold text-primary">
              {item.price}
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PricingExplorer({ plans }: { plans: PublicPlan[] }) {
  const [kind, setKind] = useState<DeploymentKind>("hosted");
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  const visible = useMemo(() => filterPlansByKind(plans, kind), [plans, kind]);

  return (
    <div className="relative pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="font-display text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-4">
            Autoconnecto
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-foreground mb-4">
            Pricing that matches how you run
          </h1>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            Hosted cloud or your own servers. Clear DP/s and device caps. INR prices,
            GST extra. Start free, upgrade in the app when you are ready.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mb-10">
          <Segmented
            ariaLabel="Deployment"
            value={kind}
            onChange={setKind}
            options={[
              {
                id: "hosted",
                label: "Hosted",
                hint: "We run the servers",
              },
              {
                id: "onprem",
                label: "On your servers",
                hint: "Offline licence file",
              },
            ]}
          />
          <Segmented
            ariaLabel="Billing period"
            value={period}
            onChange={setPeriod}
            options={[
              { id: "monthly", label: "Monthly" },
              { id: "yearly", label: "Yearly", hint: "Usually 2 months free" },
            ]}
          />
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            visible.length >= 5 ? "xl:grid-cols-3" : "xl:grid-cols-3"
          } gap-5 items-stretch`}
        >
          {visible.map((plan) => (
            <PlanCard key={plan.plan_id} plan={plan} kind={kind} period={period} />
          ))}
        </div>

        <AddOns />
        <ComparisonTable plans={visible} kind={kind} />

        <section className="mt-16 max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3 text-center">
            Worked example: 1,000 devices every 5 seconds
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto leading-relaxed">
            Sustained DP/s ≈ devices × keys per send ÷ seconds between sends. Pick the
            plan whose DP/s covers that rate — not a guess from device count alone.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border/60 bg-card/40">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border/60 text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Send pattern</th>
                  <th className="px-4 py-3 font-medium">DP/s</th>
                  <th className="px-4 py-3 font-medium">Hosted (ex-GST)</th>
                  <th className="px-4 py-3 font-medium">On your servers (ex-GST)</th>
                </tr>
              </thead>
              <tbody className="text-foreground/90">
                <tr className="border-b border-border/40">
                  <td className="px-4 py-3">1,000 × 1 key / 5 s</td>
                  <td className="px-4 py-3 font-medium">200</td>
                  <td className="px-4 py-3">SME · ₹26,999 / mo</td>
                  <td className="px-4 py-3">SME On-Prem · ₹19,999 / mo</td>
                </tr>
                <tr className="border-b border-border/40">
                  <td className="px-4 py-3">1,000 × 2 keys / 5 s</td>
                  <td className="px-4 py-3 font-medium">400</td>
                  <td className="px-4 py-3">Business · ₹49,999 / mo</td>
                  <td className="px-4 py-3">Business On-Prem · ₹33,999 / mo</td>
                </tr>
                <tr className="border-b border-border/40">
                  <td className="px-4 py-3">2 readings as one combined key / 5 s</td>
                  <td className="px-4 py-3 font-medium">200</td>
                  <td className="px-4 py-3">SME · ₹26,999 / mo</td>
                  <td className="px-4 py-3">SME On-Prem · ₹19,999 / mo</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Key A / 5 s + Key B / 15 s</td>
                  <td className="px-4 py-3 font-medium">≈267</td>
                  <td className="px-4 py-3">SME + +2 DP/s packs, or Business</td>
                  <td className="px-4 py-3">SME On-Prem or quote</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            On-prem keys:{" "}
            <a
              href="https://licences.autoconnecto.in"
              className="text-primary hover:underline"
            >
              licences.autoconnecto.in
            </a>
            {" · "}
            Full write-up:{" "}
            <a
              href="https://docs.autoconnecto.in/about/pricing-fleet-example.html"
              className="text-primary hover:underline"
            >
              Fleet size and DP/s
            </a>
          </p>
        </section>

        <div className="mt-14 max-w-3xl mx-auto space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">What is a data point?</strong> One
            telemetry key/value. A string or JSON value counts as one point per 512
            characters. Sustained rate is the 1-hour rolling average. Short reconnect
            bursts are fair use; sustained overage is throttled with a clear message —
            we never auto-bill overage.
          </p>
          <p>
            <strong className="text-foreground">Hosted data kept:</strong> live on
            disk for 30 days, then cold until the plan TTL (Free 60 days · Maker 90 ·
            Startup 9 months · SME 18 months · Business 24 months). On-prem retention
            is not capped by the licence — it follows your storage.
          </p>
          <p>
            Prices exclude GST (typically 18%). Paid subscriptions are non-refundable
            after activation. Change or cancel from Billing in the app. Machine-readable
            catalogue:{" "}
            <a href="/plans.json" className="text-primary hover:underline">
              /plans.json
            </a>
            {" · "}
            <a
              href="https://docs.autoconnecto.in/about/pricing.html"
              className="text-primary hover:underline"
            >
              Documentation
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
