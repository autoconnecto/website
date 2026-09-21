import type { SolutionOffering } from './types';

export const energyFleet: SolutionOffering = {
  slug: 'energy-fleet',
  order: 20,
  title: 'EnergyFleet',
  shortDescription:
    'Industrial energy monitoring on Autoconnecto — Modbus over MQTT serial, cloud auto-poll, live power dashboards, and alarms for plant fleets.',
  eyebrow: 'Industrial energy solution',
  headline: 'EnergyFleet — meters and panels into live operator dashboards',
  support:
    'Built for cellular Modbus gateways (DR154-class MQTT serial) and Autoconnecto auto-poll. Hardware and integration scoped at quote; platform subscription separate.',
  iconName: 'BoltIcon',
  accent: 'amber',
  tags: ['Modbus', 'MQTT serial', 'Energy', 'Auto-poll'],
  industries: ['Manufacturing', 'Utilities', 'Commercial energy', 'Multi-site fleets'],
  audience: [
    'Plant and energy managers',
    'Integrators deploying USR-DR154 / Modbus gateways',
    'Enterprises standardizing multi-site energy visibility',
  ],
  includes: [
    {
      kind: 'hardware',
      title: 'Gateway & meter path (scoped at quote)',
      description:
        'Typical path: cellular Modbus RTU/TCP gateway (e.g. USR-DR154 MQTT serial) plus meters/panels already on site — exact BOM confirmed when we quote.',
    },
    {
      kind: 'platform',
      title: 'Modbus MQTT serial + cloud auto-poll',
      description:
        'Autoconnecto Nest path for devices/+/modbus — register maps, auto_poll attributes, and continuous cloud polling while the API is online.',
    },
    {
      kind: 'platform',
      title: 'Energy dashboards & gap-aware charts',
      description:
        'Live and historical power metrics with timeseries gap handling so outages do not draw false diagonals across missing samples.',
    },
    {
      kind: 'platform',
      title: 'Alarms, calculated fields, reports',
      description:
        'Threshold and inactivity alarms, profile calculated fields, scheduled CSV reports — automation stack on the same tenant.',
    },
    {
      kind: 'platform',
      title: 'Fleet tenancy & access control',
      description:
        'Multi-site devices under one tenant (or white-label per customer). RBAC for operators vs admins. Platform plan required.',
    },
    {
      kind: 'service',
      title: 'Commissioning support',
      description:
        'Register-map validation, first live poll, and dashboard handoff. Ongoing support via Autoconnecto support channels.',
    },
  ],
  howItWorks: [
    {
      title: 'Share sites and meter types',
      description:
        'We map Modbus points, poll intervals, and which gateways sit on cellular MQTT serial.',
    },
    {
      title: 'Quote hardware + integration',
      description:
        'Gateway/meter sourcing or BYO hardware — commercial terms via Request quote. Platform plan from Pricing.',
    },
    {
      title: 'Connect and auto-poll',
      description:
        'Devices register in Autoconnecto; cloud auto-poll keeps energy telemetry flowing into dashboards and alarms.',
    },
  ],
  faqs: [
    {
      question: 'Do I need Autoconnecto Nest always on?',
      answer:
        'Yes for cloud auto-poll. EnergyFleet polling runs inside the Autoconnecto backend. One Nest instance is enough; multi-replica API requires auto-poll on a single instance only.',
    },
    {
      question: 'Is checkout available?',
      answer:
        'Not for the EnergyFleet bundle yet. Contact sales for pricing and lead time. You can still start a SaaS plan independently on Pricing.',
    },
    {
      question: 'Can this white-label for my customers?',
      answer:
        'Yes on supported plans — branding, custom hostname, and tenant isolation. Ask when you request a quote if end customers need their own portal.',
    },
  ],
  ctaLabel: 'Request quote',
  contactSubject: 'Quote / demo: EnergyFleet solution',
};
