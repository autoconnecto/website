import type { Metadata } from 'next';
import Link from 'next/link';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').trim().replace(/\/+$/, '');

export const metadata: Metadata = {
  title: 'Terms of use — Autoconnecto',
  description: 'Terms of use for the Autoconnecto marketing website.',
  alternates: { canonical: `${baseUrl}/terms` },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Legal</p>
        <h1 className="font-display text-4xl font-bold mb-2">Terms of use</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: May 2026. These terms apply to browsing and using the marketing website at{' '}
          <span className="text-foreground">{baseUrl}</span>. Use of the Autoconnecto cloud product is governed by your
          separate agreement with Autoconnecto.
        </p>

        <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Use of this site</h2>
            <p className="text-muted-foreground">
              You agree not to misuse the site (including attempting to disrupt service, scrape in violation of
              applicable law, or upload malware). Autoconnecto may suspend access where reasonably necessary to protect
              security or comply with law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Content</h2>
            <p className="text-muted-foreground">
              Marketing materials are provided for information. Features and timelines may change. Nothing on this site
              is an offer where prohibited, or a binding commitment until confirmed in a written agreement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Disclaimer</h2>
            <p className="text-muted-foreground">
              The site is provided &ldquo;as is&rdquo; to the extent permitted by law. Autoconnecto disclaims implied
              warranties where allowed. Liability for use of the marketing site alone is limited to the maximum extent
              permitted by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Contact</h2>
            <p className="text-muted-foreground">
              Questions about these terms:{' '}
              <a className="text-primary hover:underline" href="mailto:founder@autoconnecto.in">
                founder@autoconnecto.in
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Legal review</h2>
            <p className="text-muted-foreground">
              Have qualified counsel adapt these terms for your jurisdiction and product packaging before treating them
              as final.
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
