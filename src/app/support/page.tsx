import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SupportPageContent from '@/app/components/SupportPageContent';
import { shareMeta } from '@/lib/shareMeta';
import { siteOrigin } from '@/lib/siteOrigin';

const baseUrl = siteOrigin();
const title = 'Support — Autoconnecto';
const description =
  'Autoconnecto customer support by email (support@autoconnecto.in) and Telegram (@autoconnecto_community). India phone +91 92121 00555.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}/support` },
  ...shareMeta(baseUrl, '/support', title, description),
};

export default function SupportPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: title,
            description,
            url: `${baseUrl}/support`,
            isPartOf: { '@type': 'WebSite', name: 'Autoconnecto', url: baseUrl },
            mainEntity: {
              '@type': 'Organization',
              name: 'Purple Chilly Pvt Ltd',
              alternateName: 'Autoconnecto',
              url: baseUrl,
              email: 'support@autoconnecto.in',
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  contactType: 'customer support',
                  email: 'support@autoconnecto.in',
                  telephone: '+91-92121-00555',
                  availableLanguage: ['en', 'hi'],
                  areaServed: 'IN',
                  url: `${baseUrl}/support`,
                },
                {
                  '@type': 'ContactPoint',
                  contactType: 'customer support',
                  name: 'Telegram',
                  url: 'https://t.me/autoconnecto_community',
                  availableLanguage: ['en', 'hi'],
                  areaServed: 'IN',
                },
              ],
            },
          }),
        }}
      />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0D1829] to-[#0B1120]" />
        <div className="noise-overlay absolute inset-0 opacity-30" />
      </div>
      <Header />
      <SupportPageContent />
      <Footer />
    </main>
  );
}
