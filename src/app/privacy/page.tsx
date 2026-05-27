import type { Metadata } from 'next';
import LegalDocument from '@/app/components/LegalDocument';
import { siteOrigin } from '@/lib/siteOrigin';

const baseUrl = siteOrigin();

export const metadata: Metadata = {
  title: 'Privacy Policy — Autoconnecto',
  description:
    'How Autoconnecto collects, processes, and retains account, device, and telemetry data. Contact founder@autoconnecto.in for privacy requests.',
  alternates: { canonical: `${baseUrl}/privacy` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Privacy Policy — Autoconnecto',
    url: `${baseUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return <LegalDocument docId="privacy" />;
}
