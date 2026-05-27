import type { Metadata } from 'next';
import LegalDocument from '@/app/components/LegalDocument';
import { siteOrigin } from '@/lib/siteOrigin';

const baseUrl = siteOrigin();

export const metadata: Metadata = {
  title: 'Terms of Service — Autoconnecto',
  description:
    'Terms of use for the Autoconnecto cloud IoT platform, including accounts, acceptable use, paid plans, and liability.',
  alternates: { canonical: `${baseUrl}/terms` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Terms of Service — Autoconnecto',
    url: `${baseUrl}/terms`,
  },
};

export default function TermsPage() {
  return <LegalDocument docId="terms" />;
}
