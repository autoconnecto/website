import type { SolutionOffering } from './types';

export const climateFleet: SolutionOffering = {
  slug: 'climate-fleet',
  order: 2,
  title: 'ClimateFleet',
  shortDescription:
    'Gateway + climate sensors for one site: live humidity/temperature dashboard, threshold alarms to Telegram, and operator mobile checks.',
  eyebrow: 'Indoor climate monitoring',
  headline: 'Rooms, stores, and warehouses — climate that operators can trust.',
  support:
    'ClimateFleet sits next to EnergyFleet for plants that need indoor environment visibility. Same Autoconnecto tenant model, dashboards, and Telegram ops path. Kit and pilot scope confirmed at quote.',
  iconName: 'HomeModernIcon',
  accent: 'sky',
  tags: ['Humidity', 'Temperature', 'Dashboards', 'Telegram'],
  industries: ['Smart buildings', 'Warehousing', 'Manufacturing', 'Cold chain spots'],
  audience: [
    'Facility and EHS managers',
    'Integrators packaging climate kits',
    'OEMs who need a branded operator portal',
  ],
  includes: [
    {
      kind: 'platform',
      title: 'Live climate dashboard',
      description:
        'Humidity, temperature, and related timeseries on one operator view — Sample or production devices on Autoconnecto.',
    },
    {
      kind: 'platform',
      title: 'Thresholds and Telegram ops',
      description:
        'Profile Alarm Rules plus L1 Telegram when a reading trips. Escalation groups available after the pilot.',
    },
    {
      kind: 'platform',
      title: 'Gateway or direct sensors',
      description:
        'Modbus gateway children or HTTPS/MQTT sensors into the same tenant — same connectivity contracts as EnergyFleet.',
    },
    {
      kind: 'service',
      title: 'Pilot or kit quote',
      description:
        'Request a scoped pilot or hardware kit quote. SaaS stays on Autoconnecto INR plans.',
    },
  ],
  howItWorks: [
    {
      title: 'Confirm spaces and points',
      description: 'Which rooms or zones, which sensors, and which thresholds matter.',
    },
    {
      title: 'Go live on Autoconnecto',
      description:
        'Devices online, dashboard shared with operators, Telegram L1 tested with a controlled trip.',
    },
    {
      title: 'Operate and expand',
      description:
        'Keep on a paid plan, add zones, or white-label on Growth / Enterprise when you are ready.',
    },
  ],
  faqs: [
    {
      question: 'How is this different from Indoor Humidity & Temperature?',
      answer:
        'Indoor Humidity & Temperature is the sensor-kit SKU. ClimateFleet is the fleet/plant offer — gateway topology, multi-point dashboards, and the same ops path as EnergyFleet.',
    },
    {
      question: 'Can we run ClimateFleet and EnergyFleet together?',
      answer:
        'Yes. Both use Autoconnecto tenancy, dashboards, alarms, and Telegram. Many plants start with energy, then add climate zones.',
    },
    {
      question: 'Does white-label apply?',
      answer: 'Yes on Growth and Enterprise after you are past the pilot.',
    },
  ],
  ctaLabel: 'Ask about ClimateFleet',
  contactSubject: 'ClimateFleet — quote / pilot',
};
