import type { Metadata } from 'next';
import LegalDocument from '@/app/components/LegalDocument';
import { shareMeta } from '@/lib/shareMeta';
import { siteOrigin } from '@/lib/siteOrigin';

const baseUrl = siteOrigin();

const privacyTitle = 'Privacy Policy — Autoconnecto';
const privacyDescription =
  'How Autoconnecto collects, processes, and retains account, device, and telemetry data. Contact founder@autoconnecto.in for privacy requests.';

export const metadata: Metadata = {
  title: privacyTitle,
  description: privacyDescription,
  alternates: { canonical: `${baseUrl}/privacy` },
  robots: { index: true, follow: true },
  ...shareMeta(baseUrl, '/privacy', privacyTitle, privacyDescription),
};

export default function PrivacyPage() {
  return <LegalDocument docId="privacy" />;
}
