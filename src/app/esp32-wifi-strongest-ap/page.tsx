import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteOrigin } from '@/lib/siteOrigin';

const baseUrl = siteOrigin();
const path = '/esp32-wifi-strongest-ap';
const title = 'ESP32 Wi-Fi: joining the strongest access point on a mesh — Autoconnecto';
const description =
  'On a three-node mesh an ESP32 joined the weakest node at -79 to -84 dBm. Scanning all channels and sorting by signal joined the nearest node at -15 to -17 dBm. Wi-Fi in 6.4 s, MQTT in 12.0 s.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}${path}` },
  openGraph: {
    title,
    description,
    url: `${baseUrl}${path}`,
    type: 'article',
    siteName: 'Autoconnecto',
  },
};

export default function Esp32WifiStrongestApPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold">ESP32 Wi-Fi: joining the strongest access point on a mesh</h1>
        <p className="mt-4 text-muted-foreground">
          Measured on a real ESP32, 24 Oct 2026, three access points all on channel 2.
        </p>
        <p className="mt-4">
          The radio joined the weakest node, about -79 to -84 dBm, instead of the nearest, about -16 dBm.
          MQTT over WSS then failed with -0x7280 (MBEDTLS_ERR_SSL_CONN_EOF). Connecting took about 130 seconds.
        </p>
        <p className="mt-4">
          With a full-channel scan sorted by signal, the same board joined the node at -15 to -17 dBm.
          Wi-Fi was up in 6.4 seconds. MQTT was up in 12.0 seconds. A shared attribute was received and
          applied 12.5 seconds after a hardware reset.
        </p>
        <h2 className="mt-8 text-xl font-semibold">What the SDK does</h2>
        <p className="mt-3">
          The next AutoconnectoSDK release after 1.7.73 sets <code>config.wifiJoinStrongest</code> to true
          by default. That scans every channel and joins the strongest access point. Set it false to keep
          the first match. The connect attempt stops after <code>wifiConnectTimeoutMs</code> (default 15 seconds).
          A failed MQTT connect tries the other of WSS and MQTTS, then waits with a bounded backoff.
          Library Manager 1.7.73 does not include this yet.
        </p>
        <p className="mt-3">
          When serial logs are on, the SDK prints one line:{' '}
          <code>[WIFI] joined bssid=… ch=N rssi=-N</code>. It does not print the Wi-Fi password or the device token.
          <code>enableSerialLogs = false</code> prints nothing, including MQTT traffic.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Examples</h2>
        <ul className="mt-3 list-disc pl-5">
          <li><code>examples/WifiJoinStrongest_mqtt</code></li>
          <li>
            <code>examples/Attributes_RestoreOnBoot_mqtt</code> — read shared attributes at boot, apply them to a GPIO, and report a client attribute.
          </li>
        </ul>
        <p className="mt-6 text-sm">
          <a className="text-primary underline" href="/esp32-mqtt">ESP32 MQTT</a>
          {' · '}
          <a className="text-primary underline" href="https://docs.autoconnecto.in/guide/esp32-quickstart.html">
            ESP32 quick start
          </a>
          {' · '}
          <a className="text-primary underline" href="https://docs.autoconnecto.in/guide/esp32-wifi-strongest-ap.html">
            This note on the docs site
          </a>
        </p>
      </article>
      <Footer />
    </main>
  );
}
