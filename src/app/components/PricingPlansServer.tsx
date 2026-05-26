import { getPublicPlans } from "@/lib/publicPlans";
import {
  fmtLimit,
  formatInr,
  isFreePlan,
  isPaidPlan,
  planDisplayName,
  planSignupUrl,
} from "@/lib/plans";
import type { PublicPlan } from "@/types/plan";

function PlanFeature({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-start justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium text-right">{value}</span>
    </li>
  );
}

function PlanCard({ plan }: { plan: PublicPlan }) {
  const id = plan.plan_id.toUpperCase();
  const free = isFreePlan(plan);
  const paid = isPaidPlan(plan);
  const popular = id === "STARTER";
  const enterprise = id === "ENTERPRISE";
  const inactive = plan.is_active === false && paid;
  const monthly = Number(plan.price_monthly_inr);
  const yearly = Number(plan.price_yearly_inr);

  const ctaHref = enterprise ? "/#contact" : planSignupUrl(plan.plan_id, "monthly");
  const ctaLabel = enterprise ? "Contact sales" : free ? "Start free" : "Get started";

  return (
    <article
      className={`relative flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 ${
        popular
          ? "border-primary/60 shadow-[0_0_32px_rgba(14,165,233,0.15)] scale-[1.02]"
          : "border-border card-glow card-glow-hover"
      }`}
      aria-labelledby={`plan-${plan.plan_id}-title`}
    >
      {popular ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
          Most popular
        </span>
      ) : null}

      <div className="mb-4">
        <h2
          id={`plan-${plan.plan_id}-title`}
          className="font-display text-xl font-bold text-foreground"
        >
          {planDisplayName(plan)}
        </h2>
        {plan.description ? (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {plan.description}
          </p>
        ) : null}
      </div>

      <div className="mb-6 space-y-1">
        {free ? (
          <p className="font-display text-4xl font-bold text-foreground">
            {formatInr(0)}
            <span className="text-base font-normal text-muted-foreground">
              {" "}
              / forever
            </span>
          </p>
        ) : (
          <>
            {Number.isFinite(monthly) && monthly > 0 ? (
              <p className="font-display text-2xl font-bold text-foreground">
                {formatInr(monthly)}
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  / month
                </span>
              </p>
            ) : null}
            {Number.isFinite(yearly) && yearly > 0 ? (
              <p className="text-lg font-semibold text-foreground/90">
                {formatInr(yearly)}
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  / year
                </span>
                {Number.isFinite(monthly) && monthly > 0 ? (
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    ≈ {formatInr(Math.round(yearly / 12))} / month billed yearly
                  </span>
                ) : null}
              </p>
            ) : null}
            {!Number.isFinite(monthly) && !Number.isFinite(yearly) ? (
              <p className="text-muted-foreground text-sm">Custom pricing</p>
            ) : null}
          </>
        )}
      </div>

      <ul className="space-y-2.5 mb-6 flex-1 border-t border-border/60 pt-5">
        <PlanFeature label="Users" value={fmtLimit(plan.max_users)} />
        <PlanFeature label="Dashboards" value={fmtLimit(plan.max_dashboards)} />
        <PlanFeature label="Devices" value={fmtLimit(plan.max_devices)} />
        <PlanFeature
          label="Telemetry / min"
          value={fmtLimit(plan.telemetry_per_minute)}
        />
        <PlanFeature
          label="Telemetry / day"
          value={fmtLimit(plan.telemetry_per_day)}
        />
        <PlanFeature
          label="Data retention"
          value={
            plan.retention_days != null ? `${plan.retention_days} days` : "—"
          }
        />
        <PlanFeature
          label="White-label"
          value={plan.whitelabel_enabled ? "Yes" : "No"}
        />
      </ul>

      {inactive ? (
        <p className="text-xs text-amber-400/90 mb-3 text-center">
          Checkout opening soon — contact us for early access.
        </p>
      ) : null}

      <a
        href={ctaHref}
        className={`mt-auto inline-flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-semibold transition-all ${
          popular
            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(14,165,233,0.3)]"
            : "border border-border text-foreground hover:border-primary/50 hover:bg-white/5"
        }`}
      >
        {ctaLabel}
        <span aria-hidden> →</span>
      </a>
    </article>
  );
}

/** HTML table for crawlers and AI tools that parse tables best. */
function PricingComparisonTable({ plans }: { plans: PublicPlan[] }) {
  return (
    <section
      className="mt-16 max-w-5xl mx-auto"
      aria-labelledby="pricing-comparison-heading"
    >
      <h2
        id="pricing-comparison-heading"
        className="font-display text-2xl font-bold text-foreground text-center mb-6"
      >
        Autoconnecto plan comparison (INR)
      </h2>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm text-left border-collapse">
          <caption className="sr-only">
            Autoconnecto IoT platform pricing in Indian Rupees
          </caption>
          <thead className="bg-secondary/60 text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                Plan
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Monthly (INR)
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Yearly (INR)
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Devices
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Retention
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                White-label
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {plans.map((plan) => (
              <tr key={plan.plan_id} className="text-foreground">
                <th scope="row" className="px-4 py-3 font-medium">
                  {planDisplayName(plan)}
                </th>
                <td className="px-4 py-3">
                  {isFreePlan(plan)
                    ? formatInr(0)
                    : formatInr(plan.price_monthly_inr)}
                </td>
                <td className="px-4 py-3">
                  {isFreePlan(plan)
                    ? formatInr(0)
                    : formatInr(plan.price_yearly_inr)}
                </td>
                <td className="px-4 py-3">{fmtLimit(plan.max_devices)}</td>
                <td className="px-4 py-3">
                  {plan.retention_days != null
                    ? `${plan.retention_days} days`
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  {plan.whitelabel_enabled ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Machine-readable catalog:{" "}
        <a href="/plans.json" className="text-primary hover:underline">
          /plans.json
        </a>
        {" · "}
        <a
          href="https://docs.autoconnecto.in/about/pricing"
          className="text-primary hover:underline"
        >
          Documentation pricing page
        </a>
      </p>
    </section>
  );
}

export default function PricingPlansServer() {
  const plans = getPublicPlans();

  return (
    <div className="relative pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Plans &amp; pricing
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-foreground mb-4">
            Simple pricing for every stage
          </h1>
          <p className="text-muted-foreground text-lg font-light">
            Start free, then scale to production. All prices in INR (₹). Plans
            include users, dashboards, devices, telemetry limits, and data
            retention as listed below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <PlanCard key={plan.plan_id} plan={plan} />
          ))}
        </div>

        <PricingComparisonTable plans={plans} />

        <p className="mt-12 text-center text-xs text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
          Prices exclude applicable taxes. Paid subscriptions are non-refundable
          after activation. You can change or cancel plans from the app billing
          page. Need a custom deployment?{" "}
          <a href="/#contact" className="text-primary hover:underline">
            Talk to us
          </a>
          .
        </p>
      </div>
    </div>
  );
}
