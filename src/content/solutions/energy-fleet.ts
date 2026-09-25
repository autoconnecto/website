import type { SolutionOffering } from './types';

export const energyFleet: SolutionOffering = {
  slug: 'energy-fleet',
  order: 1,
  title: 'EnergyFleet',
  shortDescription:
    '14-day pilot for one site: one gateway, live power dashboard, L1 Telegram alarms, and one weekly report. ₹25,000.',
  eyebrow: 'The offer we sell first',
  headline: 'One site. One gateway. Alarms to the right people in 14 days.',
  support:
    'EnergyFleet is the product. The pilot is one plant, one Modbus gateway, a live dashboard, L1 Telegram when a threshold trips, and one weekly CSV. Meters and the gateway are quoted separately. Climate kits are a later call.',
  iconName: 'BoltIcon',
  accent: 'amber',
  tags: ['One site', '14 days', 'L1 Telegram', 'Weekly CSV'],
  industries: ['Manufacturing', 'Utilities', 'Commercial energy'],
  audience: ['Plant and energy managers', 'Integrators with a DR154-class gateway'],
  includes: [
    {
      kind: 'platform',
      title: 'One site, one gateway',
      description:
        'A single plant and one cellular Modbus gateway (DR154-class MQTT serial) or a gateway you already have. Not a multi-site rollout.',
    },
    {
      kind: 'platform',
      title: 'Live power dashboard',
      description:
        'Cloud auto-poll into one operator dashboard with gap-aware charts so an outage does not draw a false line.',
    },
    {
      kind: 'platform',
      title: 'L1 Telegram alarms',
      description:
        'When a threshold trips, the L1 group gets one message: device, value, and what tripped. L2 and L3 groups are optional after the pilot.',
    },
    {
      kind: 'service',
      title: 'One weekly CSV',
      description: 'One scheduled report email for that site during the pilot.',
    },
    {
      kind: 'hardware',
      title: 'Meter and gateway (quoted separately)',
      description:
        'We do not hide hardware inside the pilot fee. Bring your meter, or we quote the gateway and panel path.',
    },
  ],
  howItWorks: [
    {
      title: 'Day 0 — confirm the site',
      description: 'One plant, one gateway, the points you care about (power, voltage).',
    },
    {
      title: 'Days 1–3 — first live poll and L1 group',
      description:
        'Gateway online, dashboard showing the meter, bot in the L1 Telegram group, test alarm delivered.',
    },
    {
      title: 'Day 14 — keep or stop',
      description:
        'You have a live dashboard, at least one alarm in Telegram, and one weekly CSV. Continue on a platform plan, or stop.',
    },
  ],
  faqs: [
    {
      question: 'What does ₹25,000 cover?',
      answer:
        'The 14-day EnergyFleet pilot: platform setup for one site, one gateway connection, one dashboard, L1 Telegram, and one weekly report. It does not include meters, a cellular gateway, or installation labour.',
    },
    {
      question: 'Why not start with the climate kit?',
      answer:
        'The first sales conversation is EnergyFleet. Indoor climate remains available, but it is not the offer we lead with.',
    },
    {
      question: 'Can this white-label later?',
      answer:
        'Yes on Growth and Enterprise after the pilot. The pilot itself is one Autoconnecto tenant.',
    },
  ],
  ctaLabel: 'Book the 14-day pilot',
  contactSubject: 'EnergyFleet 14-day pilot — ₹25,000',
  pilot: {
    priceInr: 25000,
    days: 14,
    title: 'One-site pilot',
    scope: [
      'One plant, one gateway',
      'Live power dashboard',
      'L1 Telegram alarms',
      'One weekly CSV',
    ],
    note: 'Meters, gateway hardware, and site labour are quoted separately.',
    proof: {
      label: 'Reference setup (Autoconnecto lab, not a customer plant)',
      site: 'PurpleChilly tenant — lab gateway path',
      dashboard:
        'A live dashboard for device http3 with voltage telemetry. An out-of-range voltage raises HighVoltage.',
      alarm:
        'Telegram group autoconnecto_alarms received HighVoltage CRITICAL for device http3, value voltage1=288 (>= 260).',
    },
  },
};
