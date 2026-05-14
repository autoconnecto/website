import type { Metadata } from 'next';
import Link from 'next/link';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').trim().replace(/\/+$/, '');

export const metadata: Metadata = {
  title: 'Privacy — Autoconnecto',
  description: 'How Autoconnecto handles information collected through the marketing website.',
  alternates: { canonical: `${baseUrl}/privacy` },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Legal</p>
        <h1 className="font-display text-4xl font-bold mb-2">Privacy</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: May 2026. This page describes the marketing site at{' '}
          <span className="text-foreground">{baseUrl}</span>. The Autoconnecto cloud product has its own terms and
          data handling; see your agreement or tenant admin for product-specific policies.
        </p>

        <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">What we collect (marketing site)</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>
                Information you send when you request a demo or contact us (for example name, email, company, and
                message). This may be delivered by email or to an integration URL configured by Autoconnecto.
              </li>
              <li>
                Standard server and analytics data that your browser sends automatically (for example IP address,
                approximate location, and device type) if you use hosting or analytics tools that record it.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">How we use it</h2>
            <p className="text-muted-foreground">
              We use contact and demo requests to respond to you, improve our product, and follow up on legitimate
              business interest. We do not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Retention</h2>
            <p className="text-muted-foreground">
              Emails and integration logs are kept only as long as needed for sales and support, unless a longer period
              is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Your choices</h2>
            <p className="text-muted-foreground">
              You may ask to access, correct, or delete information we hold about you by writing to{' '}
              <a className="text-primary hover:underline" href="mailto:founder@autoconnecto.in">
                founder@autoconnecto.in
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Disclaimer</h2>
            <p className="text-muted-foreground">
              This text is provided for transparency on the public marketing site. It is not a substitute for legal
              advice; have counsel review before relying on it in regulated contexts.
            </p>
          </section>
        </div>

        <p className="mt-12 text-sm">
          <Link href="/" className="text-primary hover:underline">
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
