import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExportYourDataContent from '@/app/components/ExportYourDataContent';
import { shareMeta } from '@/lib/shareMeta';
import { siteOrigin } from '@/lib/siteOrigin';

const baseUrl = siteOrigin();
const title = 'Export your data — Autoconnecto';
const description =
  'Download readings and alarms as CSV, dashboards as JSON, and move devices on standard MQTT or HTTP. Steps for leaving Autoconnecto without a support ticket.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}/export-your-data` },
  ...shareMeta(baseUrl, '/export-your-data', title, description),
};

export default function ExportYourDataPage() {
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
            url: `${baseUrl}/export-your-data`,
            isPartOf: { '@type': 'WebSite', name: 'Autoconnecto', url: baseUrl },
          }),
        }}
      />
      <Header />
      <ExportYourDataContent />
      <Footer />
    </main>
  );
}
