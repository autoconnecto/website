'use client';

import React from 'react';
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

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8">
      <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-4">
        {title}
      </h2>
      <div className="text-muted-foreground space-y-3 text-sm sm:text-base leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function ProductPageContent() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">
            Platform overview
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
            What is Autoconnecto?
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            A production-grade IoT platform as a service from India—connect devices,
            stream real-time telemetry, build operational dashboards, and control
            equipment with dashboards that stay trustworthy after every reboot.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={APP_SIGNUP_URL}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Start free
              <Icon name="ArrowRightIcon" size={16} />
            </a>
            <a
              href={DOCS_ABOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-white/5 transition-colors"
            >
              Full documentation
            </a>
          </div>
        </header>

        <Block title="The problem we solve">
          <p>
            Teams need visibility, remote control, and confidence that operator
            screens reflect real hardware—not stale UI state left over from before
            a power outage or firmware restart.
          </p>
        </Block>

        <Block title="Reboot-safe control (our differentiator)">
          <ol className="list-decimal list-inside space-y-2">
            <li>Operators change a control on the dashboard (shared attribute).</li>
            <li>The device applies the value and confirms via client attribute.</li>
            <li>After reboot, the device reloads retained shared attributes and re-confirms.</li>
            <li>The dashboard resynchronizes without someone clicking again.</li>
          </ol>
        </Block>

        <Block title="Capabilities">
          <ul className="grid sm:grid-cols-2 gap-2">
            {[
              'Real-time dashboards (60+ widgets)',
              'MQTT WSS, HTTP, device WebSocket',
              'LoRa / ChirpStack integrations',
              'Alarms, rule chains, assets',
              'Multi-tenant SaaS & white-label',
              'ESP32 Arduino SDK',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Icon name="CheckCircleIcon" size={18} className="text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Who it is for">
          <p>
            Industrial IoT, energy &amp; utilities, logistics, OEMs, integrators, and
            product teams shipping connected devices—especially when INR pricing and
            fast time-to-value matter.
          </p>
        </Block>

        <Block title="Learn more">
          <ul className="space-y-2">
            <li>
              <a href="/pricing" className="text-primary hover:underline font-medium">
                Pricing (INR)
              </a>
            </li>
            <li>
              <a
                href={DOCS_VS_THINGSBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Autoconnecto vs ThingsBoard
              </a>
            </li>
            <li>
              <a
                href={DOCS_FAQ_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Open application
              </a>
            </li>
          </ul>
        </Block>

        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center space-y-4">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Enterprise &amp; pilots
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Custom limits, white-label, and rollout support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a
              href={`mailto:${FOUNDER_EMAIL}`}
              className="text-primary font-medium hover:underline"
            >
              {FOUNDER_EMAIL}
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-muted-foreground hover:text-foreground"
            >
              {SUPPORT_EMAIL}
            </a>
            <a href={`tel:${SUPPORT_PHONE}`} className="text-muted-foreground hover:text-foreground">
              +91 92121 00555
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
