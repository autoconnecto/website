import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductPageContent from '@/app/components/ProductPageContent';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
  .trim()
  .replace(/\/+$/, '');

export const metadata: Metadata = {
  title: 'Product — Autoconnecto IoT Platform',
  description:
    'Autoconnecto is a multi-tenant IoT SaaS platform for real-time monitoring, dashboards, alarms, and reboot-safe device control. India. ESP32 SDK.',
  alternates: { canonical: `${baseUrl}/product` },
  openGraph: {
    title: 'Product — Autoconnecto',
    description:
      'Cloud IoT platform with live dashboards, attribute-based control, and ESP32 SDK.',
    url: `${baseUrl}/product`,
  },
};

export default function ProductPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0D1829] to-[#0B1120]" />
        <div
          className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
          style={{
            background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)',
          }}
        />
        <div className="noise-overlay absolute inset-0 opacity-30" />
      </div>

      <Header />
      <ProductPageContent />
      <Footer />
    </main>
  );
}
