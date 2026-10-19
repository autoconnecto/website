import type { Metadata } from 'next';
import LegalDocument from '@/app/components/LegalDocument';
import { shareMeta } from '@/lib/shareMeta';
import { siteOrigin } from '@/lib/siteOrigin';

const baseUrl = siteOrigin();

const termsTitle = 'Terms of Service — Autoconnecto';
const termsDescription =
  'Terms of use for the Autoconnecto cloud IoT platform, including accounts, acceptable use, paid plans, and liability.';

export const metadata: Metadata = {
  title: termsTitle,
  description: termsDescription,
  alternates: { canonical: `${baseUrl}/terms` },
  robots: { index: true, follow: true },
  ...shareMeta(baseUrl, '/terms', termsTitle, termsDescription),
};

export default function TermsPage() {
  return <LegalDocument docId="terms" />;
}
