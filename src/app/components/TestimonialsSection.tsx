'use client';

import React, { useEffect, useRef } from 'react';
import AppIcon from '@/components/ui/AppIcon';

interface Scenario {
  quote: string;
  persona: string;
  initials: string;
  tag: string;
}

/** Illustrative outcomes — not attributed to named customers. */
const SCENARIOS: Scenario[] = [
  {
    tag: 'Smart energy',
    quote:
      'Roll from raw MQTT streams to operator dashboards in days instead of weeks — alarms, drill-downs, and tenant isolation included.',
    persona: 'Illustrative · energy operations team',
    initials: 'SE',
  },
  {
    tag: 'Fleet & mobility',
    quote:
      'White-label login and tenant-scoped assets so your customers see your brand, not a generic middleware console.',
    persona: 'Illustrative · OEM / integrator program',
    initials: 'FL',
  },
  {
    tag: 'Industrial IoT',
    quote:
      'RBAC and multi-tenant boundaries that match how enterprise IT actually gates factories, regions, and partners.',
    persona: 'Illustrative · plant IT rollout',
    initials: 'IN',
  },
  {
    tag: 'Agri & environment',
    quote:
      'High-volume telemetry ingestion with a path to retention policies — fewer bespoke ingestion services to babysit.',
    persona: 'Illustrative · field sensor network',
    initials: 'AG',
  },
];

const INDUSTRIES = [
  'Smart energy',
  'Fleet & mobility',
  'Industrial monitoring',
  'Agriculture',
  'Smart metering',
  'Environmental',
];

function StarDecor() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400/90">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function AvatarCircle({ initials }: { initials: string }) {
  return (
    <div className="rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center font-semibold text-primary text-xs flex-shrink-0 ring-2 ring-primary/15">
      <span className="w-11 h-11 flex items-center justify-center">{initials}</span>
    </div>
  );
}

function SmallAvatar({ initials }: { initials: string }) {
  return (
    <div className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground flex-shrink-0">
      {initials}
    </div>
  );
}

const cardDelays = ['scroll-reveal-delay-1', 'scroll-reveal-delay-2', 'scroll-reveal-delay-3'] as const;

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>('.scroll-reveal').forEach((el) => {
              el.classList.remove('hidden-init');
            });
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featured = SCENARIOS[0];
  const rest = SCENARIOS.slice(1);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[140px] opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #0EA5E9 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="scroll-reveal hidden-init flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <AppIcon name="ChatBubbleLeftRightIcon" size={12} />
            Example outcomes
          </span>
        </div>

        <div className="scroll-reveal hidden-init scroll-reveal-delay-1 text-center mb-6 max-w-2xl mx-auto">
          <p className="text-xs text-muted-foreground mb-3">
            Composite scenarios for positioning — not reviews from identified customers.
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-foreground mb-4">
            What teams{' '}
            <span className="text-gradient-primary">design for on Autoconnecto</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            Typical goals we hear from OEMs, integrators, and enterprise IoT programs — before you wire your own
            devices and tenants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          <div className="scroll-reveal hidden-init lg:row-span-2 relative group">
            <div className="absolute inset-x-3 -top-2 h-full bg-secondary/20 border border-border rounded-2xl" />
            <div className="absolute inset-x-1.5 -top-1 h-full bg-secondary/40 border border-border rounded-2xl" />
            <div className="relative z-10 bg-card border border-primary/20 rounded-2xl p-7 card-glow h-full flex flex-col justify-between group-hover:border-primary/40 transition-colors duration-300">
              <div>
                <div className="flex items-start justify-between mb-5">
                  <StarDecor />
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                    {featured.tag}
                  </span>
                </div>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-primary/20 mb-4">
                  <path d="M14.017 21v-3c0-1.105.895-2 2-2h3c.552 0 1-.448 1-1V9c0-.552-.448-1-1-1h-4c-.552 0-1 .448-1 1v2c0 .552-.448 1-1 1h-1V5h10v10c0 3.314-2.686 6-6 6h-2zm-9 0v-3c0-1.105.895-2 2-2h3c.552 0 1-.448 1-1V9c0-.552-.448-1-1-1H6c-.552 0-1 .448-1 1v2c0 .552-.448 1-1 1H3V5h10v10c0 3.314-2.686 6-6 6H5z" />
                </svg>
                <p className="text-foreground text-base leading-relaxed font-light italic mb-6">
                  &ldquo;{featured.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <AvatarCircle initials={featured.initials} />
                <div>
                  <div className="text-sm font-semibold text-foreground">Scenario</div>
                  <div className="text-xs text-muted-foreground">{featured.persona}</div>
                </div>
              </div>
            </div>
          </div>

          {rest.map((t, i) => (
            <div
              key={t.tag}
              className={`scroll-reveal hidden-init ${cardDelays[i] ?? 'scroll-reveal-delay-1'} bg-card border border-border rounded-2xl p-6 card-glow card-glow-hover flex flex-col justify-between transition-colors duration-300`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <StarDecor />
                  <span className="px-2.5 py-1 rounded-full bg-secondary/60 border border-border text-xs font-medium text-muted-foreground">
                    {t.tag}
                  </span>
                </div>
                <p className="text-foreground/90 text-sm leading-relaxed font-light italic mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <SmallAvatar initials={t.initials} />
                <div>
                  <div className="text-sm font-semibold text-foreground">Scenario</div>
                  <div className="text-xs text-muted-foreground">{t.persona}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="scroll-reveal hidden-init scroll-reveal-delay-2 text-center mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Built for programs like
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {INDUSTRIES.map((label) => (
              <span
                key={label}
                className="px-3 py-1.5 rounded-full border border-border bg-secondary/30 text-xs font-medium text-muted-foreground"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
