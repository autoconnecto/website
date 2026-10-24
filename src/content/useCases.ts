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
  sections: Array<{ heading: string; body: string }>;
  steps?: Array<{ title: string; body: string }>;
  links: UseCaseLink[];
};

export const USE_CASES: UseCasePage[] = [
  {
    slug: 'esp32-mqtt',
    path: '/esp32-mqtt',
    title: 'ESP32 MQTT IoT dashboard — Autoconnecto India',
    description:
      'Connect ESP32 over MQTT or HTTPS to a hosted IoT platform in India. Telemetry, shared attributes, RPC, OTA, and live dashboards. Arduino SDK with secrets.h examples.',
    h1: 'ESP32 MQTT IoT dashboard, hosted in India',
    lead:
      'Flash the Autoconnecto Arduino SDK, put your device token in secrets.h, and see live readings on a dashboard. MQTT on TLS for ESP32.',
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
    title: 'Shared and client attributes — reboot-safe device control',
    description:
      'Dashboard writes shared attributes; the device confirms with client attributes. After a power cycle, state restores without re-clicking switches. Autoconnecto IoT platform.',
    h1: 'Reboot-safe control with shared and client attributes',
    lead:
      'Operators change a switch or setpoint on the dashboard. The device applies it and confirms. After power loss, the board restores shared attributes and the dashboard stays aligned with the hardware.',
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
    title: 'IoT platform for system integrators and EPCs — Autoconnecto',
    description:
      'Hosted IoT for system integrators and EPCs in India: multi-site assets, device profiles, dashboards, alarms, white-label on Growth and Enterprise, INR plans.',
    h1: 'Built for system integrators and EPCs',
    lead:
      'One platform for the sites you commission: devices, profiles, dashboards, alarms, and optional white-label under your brand. Hosted in India with INR pricing — scale when a project needs more devices.',
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
