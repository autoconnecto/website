import {
  APP_SIGNUP_URL,
  ARDUINO_SDK_GITHUB_URL,
  AVH14_DOCS_URL,
  COMPATIBLE_HARDWARE_DOCS_URL,
  DR154_DOCS_URL,
  ESP32_MODBUS_EDGE_DOCS_URL,
  ESP32_MQTT_URL,
  ESP32_QUICKSTART_DOCS_URL,
  FOUNDER_EMAIL,
  LINUX_SBC_DOCS_URL,
  SDK_LINUX_SBC_EXAMPLES_URL,
  SDK_STM32_ARDUINO_GUIDE_URL,
} from '@/config/links';
import Icon from '@/components/ui/AppIcon';

const multispanMeters = [
  {
    model: 'AVH-14-M1',
    note: 'Bench tested. Float CDAB map published.',
    tested: true,
  },
  {
    model: 'AVH-14N-M1',
    note: 'Modbus RTU. Different register layout from M1 — use that PDF.',
    tested: false,
  },
  {
    model: 'AVH-16 / AVH-16-M1',
    note: 'Modbus RTU · THD · import/export. Map from that PDF.',
    tested: false,
  },
  {
    model: 'AVH-16+-M1',
    note: 'Modbus RTU · THD · import/export. Map from that PDF.',
    tested: false,
  },
];

const otherMeters = [
  { maker: 'Selec', models: 'MFM384, MFM384-R-C' },
  { maker: 'Secure Meters', models: 'Elite 500 and Elite with RS-485' },
  { maker: 'Elmeasure', models: 'LG / multifunction series with RS-485' },
  { maker: 'Schneider Electric', models: 'iEM3255 and similar iEM Modbus meters' },
  { maker: 'Siemens', models: 'SENTRON PAC3200 / PAC with Modbus' },
  { maker: 'ABB', models: 'B24 and similar Modbus energy meters' },
  { maker: 'Eastron', models: 'SDM630, SDM72D-M and SDM Modbus family' },
  { maker: 'Carlo Gavazzi', models: 'EM340, EM540' },
  { maker: 'Janitza', models: 'UMG 96 and Modbus UMG meters' },
  { maker: 'L&T and other panel MFMs', models: 'Any RS-485 Modbus RTU multifunction meter' },
];

export default function CompatibleHardwareContent() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Autoconnecto
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground tracking-tight text-balance">
          Compatible hardware
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          ESP32 and STM32 over MQTT; Raspberry Pi 5/4/Zero 2 W, Orange Pi,
          Radxa ROCK, and BeagleBone with the Python SDK (MQTT, HTTPS, GPIO);
          PUSR DR154; XY-MD02; Multispan AVH-14-M1. Other Modbus meters use
          that model’s register map.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={APP_SIGNUP_URL}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Open the app
            <Icon name="ArrowRightIcon" size={14} />
          </a>
          <a
            href={COMPATIBLE_HARDWARE_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            Full guide in docs
          </a>
        </div>

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Controllers
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Native MQTT (or HTTPS on Linux). Device clients — not a local
            platform edge.
          </p>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border/80 bg-[#0D1829]/60 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/90 mb-3">
                Board tested · Arduino SDK
              </p>
              <h3 className="text-lg font-semibold text-foreground">ESP32</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Telemetry, shared attributes, RPC, and OTA over MQTT. Flash the
                SDK, set the device token in secrets.h.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a
                  href={ESP32_QUICKSTART_DOCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  ESP32 quick start →
                </a>
                <a
                  href={ESP32_MQTT_URL}
                  className="font-medium text-primary hover:underline"
                >
                  ESP32 MQTT use case →
                </a>
                <a
                  href={ESP32_MODBUS_EDGE_DOCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  ESP32 as Modbus edge →
                </a>
                <a
                  href={ARDUINO_SDK_GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  Arduino SDK →
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-[#0D1829]/60 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                Arduino core · same MQTT contract
              </p>
              <h3 className="text-lg font-semibold text-foreground">STM32</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Use an STM32 Arduino core with enough RAM for TLS. Same topics
                as ESP32 — not a separate binary SDK.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a
                  href={SDK_STM32_ARDUINO_GUIDE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  STM32 quick start →
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-[#0D1829]/60 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/90 mb-3">
                Installable Python · MQTT + HTTPS + GPIO
              </p>
              <h3 className="text-lg font-semibold text-foreground">
                Raspberry Pi / Linux SBC
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Package autoconnecto. Full install includes gpiozero: digital
                out/in and Switch relay channels. Named boards: Raspberry Pi
                5, 4, 3, Zero 2 W; Orange Pi 5; Radxa ROCK 5; BeagleBone;
                industrial Debian gateways.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a
                  href={LINUX_SBC_DOCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  Linux SBC quick start →
                </a>
                <a
                  href={SDK_LINUX_SBC_EXAMPLES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  Examples in SDK →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Cellular Modbus DTUs
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Cloud Autoconnecto is the Modbus master. Use MQTT work mode — not
            Transparent TCP.
          </p>
          <div className="rounded-2xl border border-border/80 bg-[#0D1829]/60 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/90 mb-3">
              Bench tested
            </p>
            <h3 className="text-lg font-semibold text-foreground">
              PUSR / USR-DR154
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              4G MQTT ↔ RS-485 serial bridge. Other MQTT-serial Modbus DTUs fit
              the same role when you can map their tunnel topics.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a
                href={DR154_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                DR154 setup →
              </a>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Climate stack
          </h2>
          <div className="rounded-2xl border border-border/80 bg-[#0D1829]/60 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/90 mb-3">
              Bench tested · ClimateFleet
            </p>
            <h3 className="text-lg font-semibold text-foreground">
              XY-MD02 + PUSR DR154
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              RS-485 Modbus temperature and humidity probe through the same
              cellular DTU path as energy meters.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a
                href={DR154_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                DR154 + XY-MD02 guide →
              </a>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Proven energy Modbus stack
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Use MQTT work mode on the DTU with the gateway topics from Check
            connectivity.
          </p>

          <div className="rounded-2xl border border-border/80 bg-[#0D1829]/60 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400/90 mb-3">
              Bench tested · EnergyFleet
            </p>
            <h3 className="text-lg font-semibold text-foreground">
              Multispan AVH-14-M1 + PUSR DR154
            </h3>
            <dl className="mt-5 grid gap-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="sm:w-28 shrink-0 text-muted-foreground">Meter</dt>
                <dd className="text-foreground">
                  Multispan AVH-14-M1 · RS-485 Modbus RTU · float CDAB
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="sm:w-28 shrink-0 text-muted-foreground">Gateway</dt>
                <dd className="text-foreground">
                  PUSR / USR-DR154 · 4G · MQTT serial to RS-485
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a
                href={AVH14_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                AVH-14-M1 connect guide →
              </a>
              <a
                href={DR154_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                DR154 setup →
              </a>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Multispan Modbus meters
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Confirm RS-485 Modbus is on the order code. Some Multispan variants
            list Modbus as optional.
          </p>
          <ul className="space-y-4">
            {multispanMeters.map((row) => (
              <li
                key={row.model}
                className="border-b border-border/60 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-medium text-foreground">{row.model}</span>
                  {row.tested ? (
                    <span className="text-xs font-semibold uppercase tracking-wide text-amber-400/90">
                      Bench tested
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Map from PDF
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{row.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Other Modbus RTU energy meters
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Same DR154 or ESP32 / Linux Modbus-edge path. Enter slave ID, baud,
            and registers from that model’s Modbus manual.
          </p>
          <ul className="space-y-3">
            {otherMeters.map((row) => (
              <li
                key={row.maker}
                className="flex flex-col sm:flex-row sm:gap-4 text-sm border-b border-border/40 pb-3 last:border-0"
              >
                <span className="sm:w-40 shrink-0 font-medium text-foreground">
                  {row.maker}
                </span>
                <span className="text-muted-foreground">{row.models}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            List your meter
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Send the Modbus PDF to{' '}
            <a
              href={`mailto:${FOUNDER_EMAIL}`}
              className="text-primary hover:underline"
            >
              {FOUNDER_EMAIL}
            </a>
            . We publish a named guide when the map is proven.
          </p>
        </section>
      </div>
    </div>
  );
}
