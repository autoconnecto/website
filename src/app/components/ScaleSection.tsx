'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const FACTS = [
  {
    value: 'Hosted',
    label: 'Public app. Plans run from Free (2 devices) to Enterprise (500). If you need more, it can be scaled.',
    icon: 'CloudIcon',
  },
  {
    value: 'On-premises',
    label: 'Install on your server. One server installation is ready.',
    icon: 'ServerIcon',
  },
  {
    value: 'One database',
    label: 'Each tenant’s devices, readings, and users stay with that tenant.',
    icon: 'CircleStackIcon',
  },
  {
    value: 'Analytics',
    label: 'A question in ordinary words. The number is calculated from stored readings.',
    icon: 'ChartBarIcon',
  },
];

const INDUSTRIES = [
  'Smart Energy',
  'Fleet Tracking',
  'Smart Agriculture',
  'Industrial Monitoring',
  'Smart Metering',
  'Environmental Sensing',
];


export default function ScaleSection() {
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

  return (
    <section id="scale" ref={sectionRef} className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section label */}
        <div className="scroll-reveal hidden-init flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <Icon name="ServerStackIcon" size={12} />
            Hosted or on your server
          </span>
        </div>

        {/* Heading */}
        <div className="scroll-reveal hidden-init scroll-reveal-delay-1 text-center mb-14 max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-foreground mb-4">
            The public service,{' '}
            <span className="text-gradient-primary">or your server</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            The app at app.autoconnecto.in is hosted. An on-premises installation is available. One server installation is ready. Write to us to arrange it.
          </p>
        </div>

        {/* Asymmetric 60/40 split */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
          {/* Left: metrics (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Metrics grid */}
            <div className="scroll-reveal hidden-init grid grid-cols-2 gap-4">
              {FACTS.map((m) =>
              <div key={m.value} className="bg-card border border-border rounded-2xl p-5 card-glow flex flex-col gap-2">
                  <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                    <Icon name={m.icon as 'CloudIcon'} size={18} className="text-primary" />
                  </div>
                  <div className="font-display font-bold text-xl text-foreground">
                    {m.value}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{m.label}</div>
                </div>
              )}
            </div>

            {/* Industry tags */}
            <div className="scroll-reveal hidden-init scroll-reveal-delay-2 bg-card border border-border rounded-2xl p-5 card-glow">
              <p className="text-sm font-medium text-foreground mb-3">Built for</p>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.map((ind) =>
                <span key={ind}
                className="px-3 py-1 rounded-full border border-border bg-secondary/40 text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors cursor-default">
                    {ind}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="scroll-reveal hidden-init scroll-reveal-delay-2 relative flex-1">
              <div className="relative z-10 bg-card border border-border rounded-2xl p-6 card-glow h-full flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Analytics with AI</p>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-3">Ask the readings you already stored</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Type a question. Analytics ranks the fleet, forecasts when a value will cross a line, checks vibration, and can watch a reading against the band it learned. Every number is calculated from stored telemetry.
                  </p>
                  <p className="text-sm text-foreground/90 bg-secondary/40 border border-border rounded-xl px-4 py-3">
                    Which machines have the highest temperature in the last 24 hours?
                  </p>
                </div>
                <a href="/product#analytics" className="inline-flex items-center gap-2 text-sm font-medium text-primary mt-6 hover:underline">
                  How Analytics answers
                  <Icon name="ArrowRightIcon" size={14} />
                </a>
              </div>
            </div>

            <div className="scroll-reveal hidden-init scroll-reveal-delay-3 bg-card border border-border rounded-2xl p-5 card-glow">
              <p className="text-sm font-medium text-foreground mb-3">Where it runs</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: 'CloudIcon', label: 'Hosted', desc: 'The public app, plans in rupees' },
                  { icon: 'ServerIcon', label: 'On-premises', desc: 'Your server. One install ready' },
                ].map((d) =>
                <div key={d.label} className="bg-secondary/40 rounded-xl p-3 border border-border">
                    <Icon name={d.icon as 'CloudIcon'} size={16} className="text-primary mb-1.5" />
                    <div className="text-xs font-semibold text-foreground">{d.label}</div>
                    <div className="text-xs text-muted-foreground">{d.desc}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}