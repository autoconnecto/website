import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompatibleHardwareContent from '@/app/components/CompatibleHardwareContent';
import { shareMeta } from '@/lib/shareMeta';
import { siteOrigin } from '@/lib/siteOrigin';

const baseUrl = siteOrigin();
const title = 'Compatible hardware — Autoconnecto';
const description =
  'ESP32, STM32, Raspberry Pi 5/4/Zero 2 W, Orange Pi, Radxa ROCK, BeagleBone, PUSR DR154, XY-MD02, Multispan AVH-14-M1, and Modbus meters on Autoconnecto.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}/compatible-hardware` },
  ...shareMeta(baseUrl, '/compatible-hardware', title, description),
};

export default function CompatibleHardwarePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            description,
            url: `${baseUrl}/compatible-hardware`,
            isPartOf: { '@type': 'WebSite', name: 'Autoconnecto', url: baseUrl },
          }),
        }}
      />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0D1829] to-[#0B1120]" />
        <div className="noise-overlay absolute inset-0 opacity-30" />
      </div>
      <Header />
      <CompatibleHardwareContent />
      <Footer />
    </main>
  );
}
