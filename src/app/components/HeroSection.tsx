'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import Image from 'next/image';
import { MOBILE_APP_DOWNLOAD_URL } from '@/config/links';

const trustStats = [
  { value: 'India', label: 'INR plans, API in Mumbai' },
  { value: 'Free', label: 'Open the app, no site visit' },
  { value: 'Analytics', label: 'Answers from stored readings' },
  { value: 'INR', label: 'Plans in Indian rupees' },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPct = (clientX / innerWidth - 0.5) * 20;
      const yPct = (clientY / innerHeight - 0.5) * 20;

      const orbitWrap = el.querySelector<HTMLElement>('.orbit-parallax');
      if (orbitWrap) {
        orbitWrap.style.transform = `translate(${xPct}px, ${yPct}px)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const images = [
    { src: '/images/dashboard1.png', alt: 'Autoconnecto live IoT dashboard with widgets' },
    { src: '/images/devices.png', alt: 'Autoconnecto Devices list with online status' },
    { src: '/images/assets.png', alt: 'Autoconnecto asset hierarchy for sites and zones' },
    { src: '/images/alarmspage.png', alt: 'Autoconnecto alarms list with severity and status' },
    { src: '/images/datasimulation.png', alt: 'Autoconnecto telemetry and data simulation view' },
    { src: '/images/documentation.png', alt: 'Autoconnecto in-app documentation menu' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-16 pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-24">

        {/* HERO TEXT */}
        <div className="max-w-3xl mx-auto text-center">

          <div className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Full-Stack IoT Platform
            </span>
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight mb-6">
            <span className="text-gradient-soft block">Connect the plant.</span>
            <span className="text-gradient-primary block">See it live.</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-3">
            Autoconnecto is a hosted IoT platform for plant teams and OEMs in India. Connect a device over MQTT or HTTPS. The reading is stored. A profile alarm and a rule engine can both act. The dashboard shows the last value the device reported.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-3">
            Analytics answers a question from those stored readings: which device is highest, when a value will cross a line, a vibration check, and a watch that learns the normal band.
          </p>
          <p className="text-sm text-primary/90 font-medium max-w-2xl mx-auto mb-10">
            Two ways to start. Open the app on the Free plan and connect a device yourself. Or book EnergyFleet: one site, gateway and meter included, 14 days, you pay only travel at cost.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <a
              href="https://app.autoconnecto.in/login"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition"
            >
              Try the live app
              <Icon name="ArrowRightIcon" size={16} />
            </a>
            <a
              href="/solutions/energy-fleet"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-border text-foreground font-semibold text-sm hover:bg-white/5 hover:border-primary/30 transition"
            >
              Book the EnergyFleet trial
            </a>
            <a
              href="https://docs.autoconnecto.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-border text-foreground font-semibold text-sm hover:bg-white/5 hover:border-primary/30 transition"
            >
              Read docs
            </a>
            <a
              href={MOBILE_APP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-primary/40 bg-primary/10 text-foreground font-semibold text-sm hover:bg-primary/20 transition"
            >
              <Icon name="DevicePhoneMobileIcon" size={16} className="text-primary" />
              Download mobile app
            </a>
          </div>

        </div>

        {/* SCREENSHOT GRID */}
        <div className="mt-20 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {images.map((img, i) => (
            <div key={img.src} className="relative group">
              <div className="absolute -inset-3 bg-blue-500/10 blur-xl opacity-50 group-hover:opacity-80 transition"></div>

              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={500}
                loading={i < 2 ? 'eager' : 'lazy'}
                className="relative rounded-xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* STATS */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {trustStats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-bold text-2xl sm:text-3xl">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* PROTOCOLS */}
        <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
          {['MQTT', 'HTTPS', 'MQTT WSS 8084', 'Device WebSocket', 'LoRaWAN', 'Modbus gateway'].map((p) => (
            <span key={p} className="px-3 py-1 rounded-full border text-xs">
              {p}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}