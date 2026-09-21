import type { SolutionOffering } from './types';

export const humidityTemperature: SolutionOffering = {
  slug: 'humidity-temperature',
  order: 10,
  title: 'Indoor Humidity & Temperature',
  shortDescription:
    'Sensor kit plus Autoconnecto cloud — live climate dashboards, thresholds, and alarms for rooms, warehouses, and cold chain spots.',
  eyebrow: 'Ready-to-run climate kit',
  headline: 'Humidity and temperature, monitored like a product — not a science project',
  support:
    'Hardware in the box, platform already wired. Request a quote for kit pricing; SaaS plans stay on /pricing.',
  iconName: 'BeakerIcon',
  accent: 'sky',
  tags: ['Sensors', 'Indoor climate', 'Dashboards', 'Alarms'],
  industries: ['Smart buildings', 'Warehousing', 'Pharma storage', 'Agriculture indoor'],
  audience: [
    'Facility and building operators',
    'System integrators packaging climate monitoring',
    'OEMs who need a branded portal for end customers',
  ],
  includes: [
    {
      kind: 'hardware',
      title: 'Humidity & temperature sensor kit',
      description:
        'Field-ready sensing for indoor spaces (kit contents confirmed at quote — probe, enclosure, and connectivity options as needed).',
    },
    {
      kind: 'hardware',
      title: 'Connectivity path to Autoconnecto',
      description:
        'HTTPS or MQTT path into your tenant — same contracts as the Autoconnecto device SDK and Check connectivity guides.',
    },
    {
      kind: 'platform',
      title: 'Live climate dashboards',
      description:
        'Indoor environment and timeseries widgets, shared dashboards for operators, mobile companion for field checks.',
    },
    {
      kind: 'platform',
      title: 'Thresholds, alarms, and notifications',
      description:
        'Profile rules on humidity and temperature, inactivity awareness, email alerts. SMS delivery remains parked on the platform.',
    },
    {
      kind: 'platform',
      title: 'Multi-tenant Autoconnecto tenancy',
      description:
        'Isolated tenant, users/RBAC, optional white-label branding. Platform subscription required (see Pricing).',
    },
    {
      kind: 'service',
      title: 'Onboarding help',
      description:
        'Quote includes guided setup path — connect the kit, verify live telemetry, and hand operators a working dashboard.',
    },
  ],
  howItWorks: [
    {
      title: 'Tell us the sites',
      description:
        'Rooms, racks, or zones — we size sensors and connectivity for your environment.',
    },
    {
      title: 'We quote the kit + platform',
      description:
        'Hardware bundle pricing on request. Platform plan matches your device and telemetry needs.',
    },
    {
      title: 'Ship, connect, go live',
      description:
        'Devices appear in your Autoconnecto tenant; dashboards and alarms are ready to operate.',
    },
  ],
  faqs: [
    {
      question: 'Is this only software?',
      answer:
        'No. This offering is hardware plus the Autoconnecto platform. Software-only IoT is covered under Product and Pricing; this page is for a climate monitoring kit packaged with the cloud.',
    },
    {
      question: 'Can I buy online today?',
      answer:
        'Not yet. Use Request quote — we confirm BOM, lead time, and commercial terms. Platform plans can still be started from Pricing.',
    },
    {
      question: 'Does it work with white-label?',
      answer:
        'Yes. Your tenant can use custom branding and hostname where your plan allows. Cognito Hosted UI branding may still show Autoconnecto until custom auth domains are configured.',
    },
  ],
  ctaLabel: 'Request quote',
  contactSubject: 'Quote: Indoor Humidity & Temperature kit',
};
