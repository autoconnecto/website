'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { PUBLIC_PLANS_URL } from '@/config/api';
import {
  type BillingPeriod,
  fmtLimit,
  formatInr,
  isFreePlan,
  isPaidPlan,
  planDisplayName,
  planPriceForPeriod,
  planSignupUrl,
} from '@/lib/plans';
import type { PublicPlan } from '@/types/plan';

function PlanFeature({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-start justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium text-right">{value}</span>
    </li>
  );
}

export default function PricingPageContent() {
  const [plans, setPlans] = useState<PublicPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<BillingPeriod>('monthly');

  const loadPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(PUBLIC_PLANS_URL, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error(`Could not load plans (${res.status})`);
      }
      const data = (await res.json()) as PublicPlan[];
      if (!Array.isArray(data)) {
        throw new Error('Unexpected plans response');
      }
      setPlans(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load pricing');
      setPlans([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPlans();
  }, [loadPlans]);

  const sortedPlans = useMemo(
    () =>
      [...plans].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
      ),
    [plans]
  );

  return (
    <div className="relative pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            <Icon name="BanknotesIcon" size={12} />
            Plans &amp; pricing
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-foreground mb-4">
            Simple pricing for every stage
          </h1>
          <p className="text-muted-foreground text-lg font-light">
            Start free, then scale to production. All prices in INR; paid plans
            bill through our secure checkout.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div
            className="inline-flex items-center rounded-full border border-border bg-card/80 p-1"
            role="group"
            aria-label="Billing period"
          >
            <button
              type="button"
              onClick={() => setPeriod('monthly')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                period === 'monthly'
                  ? 'bg-primary text-primary-foreground shadow-[0_0_16px_rgba(14,165,233,0.35)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setPeriod('yearly')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                period === 'yearly'
                  ? 'bg-primary text-primary-foreground shadow-[0_0_16px_rgba(14,165,233,0.35)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Yearly plans are billed once per year.
          </p>
        </div>

        {loading && (
          <p className="text-center text-muted-foreground py-16">Loading plans…</p>
        )}

        {!loading && error && (
          <div className="max-w-lg mx-auto text-center rounded-2xl border border-border bg-card p-8">
            <p className="text-foreground font-medium mb-2">Could not load pricing</p>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <button
              type="button"
              onClick={() => void loadPlans()}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && sortedPlans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {sortedPlans.map((plan) => {
              const id = plan.plan_id.toUpperCase();
              const free = isFreePlan(plan);
              const paid = isPaidPlan(plan);
              const price = planPriceForPeriod(plan, period);
              const popular = id === 'STARTER';
              const enterprise = id === 'ENTERPRISE';
              const inactive = plan.is_active === false && paid;

              const ctaHref = enterprise
                ? '/#contact'
                : planSignupUrl(plan.plan_id, period);

              const ctaLabel = enterprise
                ? 'Contact sales'
                : free
                  ? 'Start free'
                  : 'Get started';

              return (
                <article
                  key={plan.plan_id}
                  className={`relative flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 ${
                    popular
                      ? 'border-primary/60 shadow-[0_0_32px_rgba(14,165,233,0.15)] scale-[1.02]'
                      : 'border-border card-glow card-glow-hover'
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      Most popular
                    </span>
                  )}

                  <div className="mb-4">
                    <h2 className="font-display text-xl font-bold text-foreground">
                      {planDisplayName(plan)}
                    </h2>
                    {plan.description ? (
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {plan.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="mb-6">
                    {free ? (
                      <p className="font-display text-4xl font-bold text-foreground">
                        {formatInr(0)}
                        <span className="text-base font-normal text-muted-foreground">
                          {' '}
                          / forever
                        </span>
                      </p>
                    ) : price != null ? (
                      <>
                        <p className="font-display text-4xl font-bold text-foreground">
                          {formatInr(price)}
                          <span className="text-base font-normal text-muted-foreground">
                            {' '}
                            / {period === 'yearly' ? 'year' : 'month'}
                          </span>
                        </p>
                        {period === 'yearly' &&
                        plan.price_monthly_inr &&
                        plan.price_yearly_inr ? (
                          <p className="mt-1 text-xs text-muted-foreground">
                            ≈{' '}
                            {formatInr(
                              Math.round(Number(plan.price_yearly_inr) / 12)
                            )}
                            /mo billed yearly
                          </p>
                        ) : null}
                      </>
                    ) : (
                      <p className="text-muted-foreground text-sm">Custom pricing</p>
                    )}
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-1 border-t border-border/60 pt-5">
                    <PlanFeature label="Users" value={fmtLimit(plan.max_users)} />
                    <PlanFeature
                      label="Dashboards"
                      value={fmtLimit(plan.max_dashboards)}
                    />
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
                        plan.retention_days != null
                          ? `${plan.retention_days} days`
                          : '—'
                      }
                    />
                    <PlanFeature
                      label="White-label"
                      value={plan.whitelabel_enabled ? 'Yes' : 'No'}
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
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(14,165,233,0.3)]'
                        : 'border border-border text-foreground hover:border-primary/50 hover:bg-white/5'
                    }`}
                  >
                    {ctaLabel}
                    <Icon name="ArrowRightIcon" size={14} />
                  </a>
                </article>
              );
            })}
          </div>
        )}

        <p className="mt-12 text-center text-xs text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
          Prices exclude applicable taxes. Paid subscriptions are non-refundable
          after activation. You can change or cancel plans from the app billing
          page. Need a custom deployment?{' '}
          <a href="/#contact" className="text-primary hover:underline">
            Talk to us
          </a>
          .
        </p>
      </div>
    </div>
  );
}
