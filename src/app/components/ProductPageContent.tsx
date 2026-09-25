'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import {
  APP_SIGNUP_URL,
  APP_URL,
  DOCS_ABOUT_URL,
  DOCS_FAQ_URL,
  DOCS_VS_THINGSBOARD_URL,
  FOUNDER_EMAIL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
} from '@/config/links';

const FLOW_STEPS = [
  {
    icon: 'WifiIcon',
    title: 'Connect',
    desc: 'MQTT, HTTPS, WebSocket, gateways, LoRa webhooks',
  },
  {
    icon: 'FunnelIcon',
    title: 'Process',
    desc: 'Visual Rule Engine per device profile (transform, notify, webhooks)',
  },
  {
    icon: 'CircleStackIcon',
    title: 'Store',
    desc: 'Telemetry, attributes, alarms — tenant-isolated Postgres',
  },
  {
    icon: 'PresentationChartLineIcon',
    title: 'Visualize',
    desc: 'Live dashboards, 60+ widgets, mobile app',
  },
  {
    icon: 'BellAlertIcon',
    title: 'Act',
    desc: 'Alarms, rule engine, scheduler, shared attributes, remote control',
  },
];

const PILLARS = [
  {
    icon: 'WifiIcon',
    color: 'primary',
    title: 'Universal connectivity',
    desc: 'ESP32 SDK, REST/MQTT ingest, device WebSocket, gateway child relay, ChirpStack & generic webhooks.',
    tags: ['MQTT TLS', 'HTTPS', 'WebSocket', 'LoRa'],
  },
  {
    icon: 'PresentationChartLineIcon',
    color: 'accent',
    title: 'Live dashboards',
    desc: 'Drag-and-drop builder, realtime Socket.IO, 60+ widget types — charts, maps, gauges, tables, controls.',
    tags: ['60+ widgets', 'Realtime', 'Share & embed'],
  },
  {
    icon: 'Squares2X2Icon',
    color: 'violet',
    title: 'Visual Rule Engine',
    desc: 'Graph automation on ingest: filter, transform, notify (Telegram/email), webhooks, attributes, commands, LoRa downlink — bound per device profile or tenant default.',
    tags: ['React Flow', 'Dry-run', 'Templates'],
  },
  {
    icon: 'BellAlertIcon',
    color: 'orange',
    title: 'Alarms & notifications',
    desc: 'Profile Alarm Rules plus Rule Engine create_alarm. Escalation, acknowledge, inactivity, email digests, and a one-time Telegram ops group for the whole team.',
    tags: ['Alarms', 'Telegram', 'Email'],
  },
  {
    icon: 'LockClosedIcon',
    color: 'emerald',
    title: 'Enterprise ready',
    desc: 'Multi-tenant isolation, RBAC, white-label branding, custom domains, scheduler, Integration Hub, CSV reports, and INR plans from free tier to enterprise.',
    tags: ['RBAC', 'White-label', 'Scheduler'],
  },
];

const RULE_ENGINE_NODES = [
  'Filter / switch',
  'Enrich / math',
  'Notify',
  'Webhook',
  'Delay / dedupe',
  'Create alarm',
  'Set attribute',
  'Command',
  'Downlink',
];

const AUDIENCE = [
  'Industrial IoT OEMs',
  'System integrators',
  'Energy & utilities',
  'Smart buildings',
  'Fleet & logistics',
  'Product engineering teams',
];

function colorClasses(color: string) {
  const map: Record<string, { bg: string; border: string; text: string }> = {
    primary: {
      bg: 'bg-primary/15',
      border: 'border-primary/20',
      text: 'text-primary',
    },
    accent: {
      bg: 'bg-accent/15',
      border: 'border-accent/20',
      text: 'text-accent',
    },
    violet: {
      bg: 'bg-violet-500/15',
      border: 'border-violet-500/20',
      text: 'text-violet-400',
    },
    sky: {
      bg: 'bg-sky-500/15',
      border: 'border-sky-500/20',
      text: 'text-sky-400',
    },
    orange: {
      bg: 'bg-orange-500/15',
      border: 'border-orange-500/20',
      text: 'text-orange-400',
    },
    emerald: {
      bg: 'bg-emerald-500/15',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
    },
  };
  return map[color] || map.primary;
}

export default function ProductPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target
            .querySelectorAll<HTMLElement>('.scroll-reveal')
            .forEach((el) => el.classList.remove('hidden-init'));
        });
      },
      { rootMargin: '0px 0px -48px 0px', threshold: 0.06 }
    );

    const root = rootRef.current;
    if (!root) return undefined;

    root.querySelectorAll<HTMLElement>('[data-reveal-root]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="pt-24 pb-24">
      {/* Hero */}
      <section data-reveal-root className="px-4 sm:px-6 mb-24">
        <div className="max-w-5xl mx-auto text-center">
          <div className="scroll-reveal hidden-init flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <Icon name="CpuChipIcon" size={12} />
              Product overview
            </span>
          </div>

          <h1 className="scroll-reveal hidden-init scroll-reveal-delay-1 font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground mb-6 leading-[1.05]">
            The IoT platform that{' '}
            <span className="text-gradient-primary">ships with you</span>
          </h1>

          <p className="scroll-reveal hidden-init scroll-reveal-delay-2 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
            Autoconnecto is multi-tenant SaaS for connecting devices, automating with a visual
            Rule Engine, building live dashboards, and controlling equipment — with dashboards
            that stay correct after every reboot.
          </p>
          <p className="scroll-reveal hidden-init scroll-reveal-delay-2 text-sm text-primary/90 font-medium mb-10">
            Built in India · INR pricing · No ThingsBoard-style rule-engine maze on day one
          </p>

          <div className="scroll-reveal hidden-init scroll-reveal-delay-3 flex flex-wrap items-center justify-center gap-3 mb-14">
            <a
              href={APP_SIGNUP_URL}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              Start free
              <Icon name="ArrowRightIcon" size={16} />
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border bg-secondary/40 text-foreground font-medium text-sm hover:bg-white/5 transition-colors"
            >
              View pricing
            </a>
            <a
              href={DOCS_ABOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-muted-foreground font-medium text-sm hover:text-foreground hover:bg-white/5 transition-colors"
            >
              Documentation
              <Icon name="ArrowTopRightOnSquareIcon" size={14} />
            </a>
          </div>

          <div className="scroll-reveal hidden-init scroll-reveal-delay-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { v: '60+', l: 'Dashboard widgets' },
              { v: '14+', l: 'Pipeline step types' },
              { v: '2', l: 'Pipeline kinds' },
              { v: '99.9%', l: 'Uptime target' },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-border bg-secondary/30 px-4 py-4 text-center"
              >
                <div className="font-display font-bold text-2xl text-primary">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section data-reveal-root className="px-4 sm:px-6 mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal hidden-init text-center mb-12 max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
              From device to decision
            </h2>
            <p className="text-muted-foreground">
              One coherent path — not a bag of disconnected microservices you stitch together.
            </p>
          </div>

          <div className="scroll-reveal hidden-init scroll-reveal-delay-1 relative">
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {FLOW_STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-border bg-card/60 p-5 text-center card-glow card-glow-hover transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                    <Icon name={step.icon} size={20} className="text-primary" />
                  </div>
                  <div className="text-[10px] font-bold text-primary/70 mb-1">STEP {i + 1}</div>
                  <div className="font-semibold text-foreground text-sm mb-1">{step.title}</div>
                  <div className="text-xs text-muted-foreground leading-snug">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section data-reveal-root className="px-4 sm:px-6 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-reveal hidden-init text-center mb-12 max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Everything in one platform
            </h2>
            <p className="text-muted-foreground">
              Pick what you need. Skip the Rule Engine and behavior stays simple —
              raw ingest plus profile Alarm Rules when you add them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PILLARS.map((p, i) => {
              const c = colorClasses(p.color);
              const delayClass =
                i % 3 === 1
                  ? 'scroll-reveal-delay-1'
                  : i % 3 === 2
                    ? 'scroll-reveal-delay-2'
                    : '';
              return (
                <div
                  key={p.title}
                  className={`scroll-reveal hidden-init ${delayClass} rounded-2xl border border-border bg-card p-6 card-glow card-glow-hover transition-all duration-300 flex flex-col`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-4`}
                  >
                    <Icon name={p.icon} size={20} className={c.text} />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className={`text-[10px] px-2 py-0.5 rounded-full border ${c.border} ${c.bg} ${c.text} font-medium`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rule Engine deep dive */}
      <section
        id="rule-engine"
        data-reveal-root
        className="px-4 sm:px-6 mb-24 scroll-mt-28"
      >
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal hidden-init rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-card to-sky-500/5 p-8 sm:p-12 overflow-hidden relative">
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }}
            />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-violet-300 mb-4">
                <Icon name="Squares2X2Icon" size={12} />
                Automation layer
              </span>

              <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4 max-w-2xl">
                Visual Rule Engine
              </h2>
              <p className="text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                One graph on the ingest path — transform, branch, notify, forward, and control.
                Bind a <strong className="text-foreground font-medium">Started</strong> engine on
                the device profile (or a tenant default). Simple thresholds stay on profile Alarm
                Rules. Legacy pipeline URLs redirect here.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-10">
                {RULE_ENGINE_NODES.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-200"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <ul className="grid sm:grid-cols-3 gap-4 text-sm">
                {[
                  {
                    icon: 'EyeIcon',
                    title: 'Dry-run preview',
                    desc: 'Sample JSON in → path highlight on the canvas',
                  },
                  {
                    icon: 'ShieldCheckIcon',
                    title: 'Fail-open',
                    desc: 'Unexpected errors never block ingest unless you drop',
                  },
                  {
                    icon: 'BellAlertIcon',
                    title: 'Telegram ops group',
                    desc: 'One group chat id for tenant-wide alarm posts',
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="flex gap-3 rounded-xl border border-border/80 bg-secondary/30 p-4"
                  >
                    <Icon name={item.icon} size={20} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{item.title}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reboot-safe */}
      <section data-reveal-root className="px-4 sm:px-6 mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="scroll-reveal hidden-init grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4">
                Differentiator
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
                Reboot-safe remote control
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Operator dashboards often lie after a device reboot — toggles show the wrong state
                until someone clicks again. Autoconnecto ties shared attributes, client
                confirmation, and UI resync into one flow.
              </p>
              <a
                href={DOCS_ABOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
              >
                Read how it works in docs
                <Icon name="ArrowTopRightOnSquareIcon" size={14} />
              </a>
            </div>

            <ol className="space-y-3">
              {[
                'Operator sets a value on the dashboard (shared attribute).',
                'Device applies it and confirms via client attribute.',
                'After reboot, device reloads retained shared attributes and re-confirms.',
                'Dashboard resynchronizes — no duplicate clicks.',
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-xl border border-border bg-card/80 p-4 card-glow"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-sm text-emerald-400">
                    {i + 1}
                  </div>
                  <p className="text-sm text-muted-foreground self-center">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Audience + resources */}
      <section data-reveal-root className="px-4 sm:px-6 mb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="scroll-reveal hidden-init rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Who it&apos;s for
            </h2>
            <div className="flex flex-wrap gap-2">
              {AUDIENCE.map((a) => (
                <span
                  key={a}
                  className="text-sm px-3 py-1.5 rounded-full border border-border bg-secondary/40 text-muted-foreground"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="scroll-reveal hidden-init scroll-reveal-delay-1 rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Go deeper
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/pricing" className="text-primary font-medium hover:underline">
                  Pricing (INR plans)
                </a>
              </li>
              <li>
                <a
                  href={DOCS_VS_THINGSBOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                >
                  Autoconnecto vs ThingsBoard
                  <Icon name="ArrowTopRightOnSquareIcon" size={12} />
                </a>
              </li>
              <li>
                <a
                  href={DOCS_FAQ_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                >
                  FAQ
                  <Icon name="ArrowTopRightOnSquareIcon" size={12} />
                </a>
              </li>
              <li>
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                >
                  Open application
                  <Icon name="ArrowTopRightOnSquareIcon" size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-reveal-root className="px-4 sm:px-6">
        <div className="scroll-reveal hidden-init max-w-4xl mx-auto rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-transparent p-10 sm:p-14 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-3">
            Ready to connect your fleet?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start on the free tier, attach a Rule Engine when you need automation, and scale to
            white-label enterprise when you&apos;re production-ready.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <a
              href={APP_SIGNUP_URL}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm"
            >
              Create account
            </a>
            <a
              href={`mailto:${FOUNDER_EMAIL}`}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-border font-medium text-sm hover:bg-white/5"
            >
              Talk to us
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-foreground">
              {SUPPORT_EMAIL}
            </a>
            <a href={`tel:${SUPPORT_PHONE}`} className="hover:text-foreground">
              +91 92121 00555
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
