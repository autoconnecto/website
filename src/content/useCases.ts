/**
 * Public SEO / intent pages. Keep claims aligned with the live product.
 * No competitor product names.
 */

export type UseCaseLink = { label: string; href: string; external?: boolean };

export type UseCasePage = {
  slug: string;
  /** Path on the marketing site, e.g. /esp32-mqtt */
  path: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  keywords: string[];
  /** Real product screenshot (under /public). */
  image?: { src: string; alt: string };
  sections: Array<{ heading: string; body: string }>;
  steps?: Array<{ title: string; body: string }>;
  links: UseCaseLink[];
};

export const USE_CASES: UseCasePage[] = [
  {
    slug: 'esp32-mqtt',
    path: '/esp32-mqtt',
    title: 'ESP32 MQTT IoT dashboard — Autoconnecto',
    description:
      'Connect ESP32 over MQTT or HTTPS in India. Telemetry, attributes, RPC, OTA, and live dashboards. Arduino SDK with secrets.h.',
    h1: 'ESP32 MQTT IoT dashboard, hosted in India',
    lead:
      'Flash the Autoconnecto Arduino SDK, put your device token in secrets.h, and see live readings on a dashboard. MQTT on TLS for ESP32.',
    image: {
      src: '/images/devices.png',
      alt: 'Autoconnecto Devices page showing connected ESP32 devices',
    },
    keywords: [
      'ESP32 MQTT',
      'ESP32 IoT dashboard',
      'IoT platform India',
      'Arduino MQTT cloud',
      'ESP32 telemetry',
    ],
    sections: [
      {
        heading: 'What you get',
        body:
          'Device tokens, MQTT (port 8883) and MQTT over WebSocket (8084), HTTPS ingest, live Socket.IO dashboards, alarms by email or Telegram, OTA firmware, and a visual rule engine. Readings and attributes are stored by the platform — you do not add a “save” step.',
      },
      {
        heading: 'Who this is for',
        body:
          'Plant engineers, OEMs, and makers who need an ESP32 on a real cloud without running their own broker and time-series stack. INR plans; self-serve signup.',
      },
      {
        heading: 'Board path that works',
        body:
          'Create a device in the app → copy the token into secrets.h → flash Telemetry_mqtt or Attributes_mqtt → open a dashboard widget on the same keys. Shared attributes keep switches and setpoints aligned after a power cycle.',
      },
    ],
    steps: [
      {
        title: 'Install the library',
        body: 'Arduino Library Manager: search AutoconnectoSDK. PlatformIO: lib_deps = autoconnecto/AutoconnectoSDK.',
      },
      {
        title: 'Create a device',
        body: 'Sign up at app.autoconnecto.in, create a device, reveal the access token once.',
      },
      {
        title: 'Flash and watch',
        body: 'Copy an example, fill secrets.h (Wi‑Fi + token), upload. Open Devices and a dashboard.',
      },
    ],
    links: [
      { label: 'Arduino SDK on GitHub', href: 'https://github.com/autoconnecto/autoconnecto-sdk', external: true },
      { label: 'Device connectivity docs', href: 'https://docs.autoconnecto.in/devices/device-connectivity.html', external: true },
      { label: 'ESP32 quick start (docs)', href: 'https://docs.autoconnecto.in/guide/esp32-quickstart.html', external: true },
      { label: 'Strongest access point on a mesh', href: '/esp32-wifi-strongest-ap' },
      { label: 'Product overview', href: '/product' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Start free', href: 'https://app.autoconnecto.in/signup', external: true },
    ],
  },
  {
    slug: 'shared-attributes',
    path: '/shared-attributes',
    title: 'Shared attributes — reboot-safe control',
    description:
      'Dashboard writes shared attributes; the device confirms with client attributes. State restores after power loss.',
    h1: 'Reboot-safe control with shared and client attributes',
    lead:
      'Operators change a switch or setpoint on the dashboard. The device applies it and confirms. After power loss, the board restores shared attributes and the dashboard stays aligned with the hardware.',
    image: {
      src: '/images/devices.png',
      alt: 'Autoconnecto Devices page for attribute-backed control',
    },
    keywords: [
      'device attributes IoT',
      'shared attributes MQTT',
      'client attributes',
      'IoT switch dashboard',
      'power cycle device state',
    ],
    sections: [
      {
        heading: 'How the loop works',
        body:
          'The platform stores shared attributes (desired state) and publishes them to the device. The firmware applies the value and posts a matching client attribute. Widgets that care about confirmed state read the client side. Telemetry keeps flowing the same way — stored without a rule-engine save node.',
      },
      {
        heading: 'After a power cycle',
        body:
          'On connect, the device requests shared attributes, reapplies them, and sends client confirmations. Operators do not re-send the last command by hand.',
      },
      {
        heading: 'When to use RPC instead',
        body:
          'One-shot actions (reboot, run once, diagnostics) use RPC. Sticky setpoints and relays use attributes.',
      },
    ],
    links: [
      { label: 'Telemetry and attributes (guide)', href: 'https://docs.autoconnecto.in/guide/telemetry-and-attributes.html', external: true },
      { label: 'What is Autoconnecto', href: 'https://docs.autoconnecto.in/about/what-is-autoconnecto.html', external: true },
      { label: 'ESP32 MQTT path', href: '/esp32-mqtt' },
      { label: 'Product overview', href: '/product' },
      { label: 'Start free', href: 'https://app.autoconnecto.in/signup', external: true },
    ],
  },
  {
    slug: 'ota-firmware',
    path: '/ota-firmware',
    title: 'OTA firmware updates for ESP32 — Autoconnecto',
    description:
      'Upload firmware packages, roll out to devices, and track VERIFIED → UPDATING → UPDATED from the Autoconnecto app. ESP32 SDK OTA with HTTPS chunk download.',
    h1: 'OTA firmware updates from the same platform',
    lead:
      'Ship a new binary from the app. Devices pull over HTTPS, report status, and you see the rollout move from verified through updating to updated — without a separate OTA cloud.',
    keywords: [
      'ESP32 OTA',
      'IoT firmware update',
      'OTA rollout',
      'remote firmware India',
      'device OTA MQTT',
    ],
    sections: [
      {
        heading: 'In the app',
        body:
          'Upload a firmware package, assign a target, start a rollout. Device detail shows OTA status. The ESP32 SDK downloads chunks and reports progress.',
      },
      {
        heading: 'With MQTT control',
        body:
          'Telemetry, attributes, RPC, and OTA live on one tenant. Same device token model; same India-hosted stack.',
      },
    ],
    links: [
      { label: 'OTA updates (docs)', href: 'https://docs.autoconnecto.in/devices/ota-updates.html', external: true },
      { label: 'Arduino SDK', href: 'https://github.com/autoconnecto/autoconnecto-sdk', external: true },
      { label: 'ESP32 MQTT path', href: '/esp32-mqtt' },
      { label: 'Start free', href: 'https://app.autoconnecto.in/signup', external: true },
    ],
  },
  {
    slug: 'for-system-integrators',
    path: '/for-system-integrators',
    title: 'IoT for system integrators and EPCs',
    description:
      'Hosted IoT for integrators and EPCs in India: multi-site assets, profiles, dashboards, alarms, white-label on Growth and Enterprise.',
    h1: 'Built for system integrators and EPCs',
    lead:
      'One platform for the sites you commission: devices, profiles, dashboards, alarms, and optional white-label under your brand. INR plans. The API runs in Mumbai. Scale when a project needs more devices.',
    keywords: [
      'IoT platform system integrator',
      'EPC IoT India',
      'white-label IoT',
      'multi-site IoT dashboard',
      'OEM IoT platform India',
    ],
    sections: [
      {
        heading: 'How integrators use it',
        body:
          'Create a tenant (or use white-label on Growth / Enterprise), model SITE → AREA → ZONE assets, attach devices, drop in solution or custom dashboards, and hand operators the app URL. Email and Telegram for plant alarms. INR plans are on the pricing page.',
      },
      {
        heading: 'Hardware you already ship',
        body:
          'ESP32 SDK, HTTPS for lighter boards, Modbus / OPC UA gateway examples, and documented connectivity for meters and gateways. EnergyFleet and climate solutions are listed on the solutions catalog when you want a packaged start.',
      },
      {
        heading: 'What stays your work',
        body:
          'Field wiring, panel design, and customer process. Autoconnecto is the cloud, dashboards, storage, and control path — not a replacement for your engineering.',
      },
    ],
    links: [
      { label: 'Solutions catalog', href: '/solutions' },
      { label: 'Product overview', href: '/product' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Talk to founder', href: 'mailto:founder@autoconnecto.in', external: true },
      { label: 'Start free', href: 'https://app.autoconnecto.in/signup', external: true },
    ],
  },
  {
    slug: 'fuel-theft-detection',
    path: '/fuel-theft-detection',
    title: 'Fuel theft detection IoT — Autoconnecto',
    description:
      'Monitor tank level and sudden drops. Store readings, raise alarms by email or Telegram, and open a live dashboard. Hosted in India.',
    h1: 'Fuel theft detection on a live dashboard',
    lead:
      'Connect a level or volume sensor over MQTT or HTTPS. Autoconnecto stores every reading, keeps the last value on the dashboard, and can open an alarm when the level falls faster than your rule allows.',
    image: {
      src: '/images/alarmspage.png',
      alt: 'Autoconnecto Alarms page for fuel and tank events',
    },
    keywords: [
      'fuel theft detection IoT',
      'fuel tank monitoring India',
      'diesel theft alarm',
      'IoT fuel level MQTT',
    ],
    sections: [
      {
        heading: 'What the platform does',
        body:
          'Telemetry is stored without a save node in the rule engine. Profile alarm rules and an optional rule-engine alarm node can both run. Operators see Active alarms, acknowledge them, and open the device that raised the event.',
      },
      {
        heading: 'What you configure',
        body:
          'Device profile keys for level or volume, a threshold or rate rule, email or Telegram notification settings, and a dashboard with gauges or an alarm table. Scope the table to the tank fleet you care about.',
      },
      {
        heading: 'What stays your work',
        body:
          'Sensor choice, wiring, and site process. Autoconnecto is the cloud path: ingest, storage, alarms, and dashboards.',
      },
    ],
    links: [
      { label: 'FuelFleet solution', href: '/solutions/fuel-fleet' },
      { label: 'Alarms guide', href: 'https://docs.autoconnecto.in/guide/alarms.html', external: true },
      { label: 'Try the platform', href: 'https://app.autoconnecto.in/signup', external: true },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    slug: 'cold-chain-monitoring',
    path: '/cold-chain-monitoring',
    title: 'Cold chain monitoring IoT — Autoconnecto',
    description:
      'Track temperature on cold rooms and vehicles. Store readings, chart history, and alarm when a line is crossed. Hosted IoT in India.',
    h1: 'Cold chain temperature monitoring',
    lead:
      'Publish temperature (and optional humidity or door state) from gateways or ESP32 boards. The platform stores the series, shows live values, and can alarm when the reading leaves the band you set.',
    image: {
      src: '/images/dashboard1.png',
      alt: 'Autoconnecto dashboard with live temperature widgets',
    },
    keywords: [
      'cold chain monitoring IoT',
      'cold room temperature alarm',
      'refrigerated vehicle IoT India',
      'MQTT temperature dashboard',
    ],
    sections: [
      {
        heading: 'Fleet and vehicle paths',
        body:
          'Use device types and assets (SITE → AREA → ZONE) to group rooms or vans. Solution packs such as ColdChainFleet give a starting dashboard layout you can copy and edit.',
      },
      {
        heading: 'Alarms and history',
        body:
          'Profile rules watch live values. Forecast rules can warn before a limit if you configure them. Analytics answers from stored readings — which probe is highest, when a line will be crossed.',
      },
    ],
    links: [
      { label: 'ColdChainFleet solution', href: '/solutions/cold-chain-fleet' },
      { label: 'Dashboards guide', href: 'https://docs.autoconnecto.in/guide/dashboards.html', external: true },
      { label: 'Try the platform', href: 'https://app.autoconnecto.in/signup', external: true },
    ],
  },
  {
    slug: 'geofenced-equipment-lockout',
    path: '/geofenced-equipment-lockout',
    title: 'Geofenced equipment lockout — Autoconnecto',
    description:
      'Use location and attributes to keep machines inside a work zone. Shared attributes and RPC drive lockout; dashboards show state. India-hosted IoT.',
    h1: 'Geofenced equipment lockout',
    lead:
      'When a tracker or gateway reports position, rules and shared attributes can hold a machine in a safe state outside the work zone. The dashboard shows confirmed state after the device replies with client attributes.',
    image: {
      src: '/images/assets.png',
      alt: 'Autoconnecto Assets hierarchy for sites and equipment',
    },
    keywords: [
      'geofence equipment lockout',
      'IoT machine geofence India',
      'shared attributes lockout',
      'GPS equipment control MQTT',
    ],
    sections: [
      {
        heading: 'Control path',
        body:
          'Sticky setpoints use shared attributes with client confirmation so state survives a power cycle. One-shot lock or unlock can use RPC. Location widgets and attributes belong on the same device token.',
      },
      {
        heading: 'Site model',
        body:
          'Assets and device profiles keep fleets tidy. Operators open the asset or device detail, not a separate map product.',
      },
    ],
    links: [
      { label: 'Shared attributes use case', href: '/shared-attributes' },
      { label: 'Site tracking solution', href: '/solutions/site-tracking-fleet' },
      { label: 'Try the platform', href: 'https://app.autoconnecto.in/signup', external: true },
    ],
  },
  {
    slug: 'factory-energy-monitoring',
    path: '/factory-energy-monitoring',
    title: 'Factory energy monitoring — Autoconnecto',
    description:
      'Ingest meter readings over MQTT or Modbus gateways. Live power widgets, alarms, and Analytics from stored kWh. Hosted in India.',
    h1: 'Factory energy monitoring',
    lead:
      'Connect energy meters through a gateway or MQTT bridge. Autoconnecto stores power and energy keys, shows them on plant dashboards, and can alarm on overload or missing data.',
    image: {
      src: '/images/dashboard2.png',
      alt: 'Autoconnecto energy and plant dashboard widgets',
    },
    keywords: [
      'factory energy monitoring IoT',
      'industrial energy dashboard India',
      'Modbus MQTT energy meter',
      'plant kWh monitoring',
    ],
    sections: [
      {
        heading: 'Connectivity',
        body:
          'ESP32 SDK, HTTPS ingest, and Modbus / MQTT gateway examples are documented. EnergyFleet packages a trial path with gateway and meter when you want a site start.',
      },
      {
        heading: 'Operations view',
        body:
          'Dashboards hold gauges, tables, and alarm summaries. Analytics answers from stored readings. Quiet hours and Monday energy mail stay off unless you turn them on.',
      },
    ],
    links: [
      { label: 'EnergyFleet solution', href: '/solutions/energy-fleet' },
      { label: 'Compatible hardware', href: '/compatible-hardware' },
      { label: 'Book EnergyFleet trial', href: '/solutions/energy-fleet' },
      { label: 'Try the platform', href: 'https://app.autoconnecto.in/signup', external: true },
    ],
  },
  {
    slug: 'water-tank-monitoring',
    path: '/water-tank-monitoring',
    title: 'Water tank monitoring IoT — Autoconnecto',
    description:
      'Level and pump status on a hosted dashboard. Store readings, alarm on empty or overflow, control setpoints with shared attributes. India.',
    h1: 'Water tank level monitoring',
    lead:
      'Publish tank level (and optional pump or valve state). See the live value, chart history, and open alarms when the level crosses the band you set on the device profile or rule engine.',
    image: {
      src: '/images/datasimulation.png',
      alt: 'Autoconnecto telemetry and simulation views for tank data',
    },
    keywords: [
      'water tank monitoring IoT',
      'tank level MQTT India',
      'pump control shared attributes',
      'overflow empty alarm IoT',
    ],
    sections: [
      {
        heading: 'Dashboards and control',
        body:
          'Gauges and tables show level. Shared attributes can carry setpoints; the device confirms with client attributes. WaterFleet is a catalog starting point you can copy.',
      },
      {
        heading: 'Alarms',
        body:
          'Profile threshold rules and optional chain alarm nodes both run. Do not copy the same limit into both unless you intend two different conditions.',
      },
    ],
    links: [
      { label: 'WaterFleet solution', href: '/solutions/water-fleet' },
      { label: 'Telemetry guide', href: 'https://docs.autoconnecto.in/guide/telemetry-and-attributes.html', external: true },
      { label: 'Try the platform', href: 'https://app.autoconnecto.in/signup', external: true },
    ],
  },
  {
    slug: 'oem-white-label',
    path: '/oem-white-label',
    title: 'OEM white-label IoT platform — Autoconnecto',
    description:
      'White-label Autoconnecto on Growth and Enterprise: your logo, colours, and app name for the tenants you run. Hosted in India.',
    h1: 'OEM and white-label IoT platform',
    lead:
      'Ship connected products under your brand. Growth and Enterprise plans support tenant branding — logo, colours, and sidebar title — while Autoconnecto runs the hosted stack in India.',
    image: {
      src: '/images/whitelabeling.png',
      alt: 'Autoconnecto tenant branding and white-label settings',
    },
    keywords: [
      'white-label IoT platform',
      'OEM IoT cloud India',
      'branded IoT dashboard',
      'multi-tenant IoT OEM',
    ],
    sections: [
      {
        heading: 'What you brand',
        body:
          'Tenant settings cover logo, header and sidebar colours, and display names shown to your operators. The same MQTT, dashboards, alarms, and SDK path stay underneath.',
      },
      {
        heading: 'Who this fits',
        body:
          'OEMs and system integrators who need a multi-tenant cloud without building brokers, storage, and widget editors. INR plans; talk to the founder for Growth and Enterprise rollout.',
      },
    ],
    links: [
      { label: 'For system integrators', href: '/for-system-integrators' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Product overview', href: '/product' },
      { label: 'Talk to founder', href: 'mailto:founder@autoconnecto.in', external: true },
      { label: 'Try the platform', href: 'https://app.autoconnecto.in/signup', external: true },
    ],
  },
];

export function listUseCases(): UseCasePage[] {
  return USE_CASES;
}

export function getUseCase(slug: string): UseCasePage | undefined {
  return USE_CASES.find((u) => u.slug === slug);
}

export function listUseCaseSlugs(): string[] {
  return USE_CASES.map((u) => u.slug);
}
