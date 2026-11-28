import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { shareMeta } from '@/lib/shareMeta';
import { siteOrigin } from '@/lib/siteOrigin';
import { MOBILE_APP_DOWNLOAD_URL, MOBILE_APP_VERSION } from '@/config/links';

const baseUrl = siteOrigin();
const title = "What's new — Autoconnecto";
const description =
  'Platform release notes for Autoconnecto: what changed in each version for hosted and on-prem customers.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseUrl}/whats-new` },
  ...shareMeta(baseUrl, '/whats-new', title, description),
};

export default function WhatsNewPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Header />
      <article className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <p className="text-sm text-muted-foreground mb-3">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          {' · '}
          What&apos;s new
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground tracking-tight mb-4">
          What&apos;s new
        </h1>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Plain-language notes for each Platform release. In the app, click{' '}
          <strong className="text-foreground">Platform vX.Y.Z</strong> in the
          sidebar for the same page. Full docs:{' '}
          <a
            className="text-sky-400 underline"
            href="https://docs.autoconnecto.in/about/whats-new.html"
            target="_blank"
            rel="noreferrer"
          >
            docs.autoconnecto.in/about/whats-new
          </a>
          .
        </p>

        <section className="mb-12 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Platform 2.0.0 — 28 Nov 2026
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Commercial milestone: hosted and on-prem share one Platform version.
            From here, every customer-visible change updates this page and the
            in-app docs What&apos;s new in the same ship.
          </p>
          <h3 className="text-base font-medium text-foreground">Pricing</h3>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
            <li>
              Hosted: Free, Maker, Startup, SME, Business, Enterprise (INR).
            </li>
            <li>
              On-prem: Startup / SME / Business / Scale / Enterprise On-Prem and
              Forever licence — buy at{' '}
              <a
                className="text-sky-400 underline"
                href="https://licences.autoconnecto.in"
                target="_blank"
                rel="noreferrer"
              >
                licences.autoconnecto.in
              </a>
              .
            </li>
          </ul>
          <h3 className="text-base font-medium text-foreground">
            On-prem packages
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
            <li>
              <strong className="text-foreground">Latest</strong> while the
              update year is open;{' '}
              <strong className="text-foreground">My version</strong> (entitled
              GitHub Release) after it ends for reinstall or a move.
            </li>
            <li>
              Right to run continues after the update year; newer packages need
              AMC.
            </li>
          </ul>
          <h3 className="text-base font-medium text-foreground">
            Tablet, sign-in, mobile
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
            <li>
              Tablet dashboards: compact widgets share a row; phone stays one
              column.
            </li>
            <li>
              Remember me on web and Android. Android APK v{MOBILE_APP_VERSION}:{' '}
              <a
                className="text-sky-400 underline"
                href={MOBILE_APP_DOWNLOAD_URL}
                target="_blank"
                rel="noreferrer"
              >
                download
              </a>
              .
            </li>
          </ul>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Platform 1.9.22 — 28 Nov 2026
          </h2>
          <h3 className="text-base font-medium text-foreground">
            Tablet dashboards
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
            <li>
              On a tablet, compact widgets (gauges, LEDs, counts, switches)
              share a row when there is room.
            </li>
            <li>
              Charts, maps, tables, alarm lists, and SCADA stay full width.
            </li>
            <li>
              Wider tablets get more columns automatically. Phone stays one
              column — use Visible on mobile and Position on mobile for a short
              ops strip.
            </li>
          </ul>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Platform 1.9.21 — 28 Nov 2026
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
            <li>
              <strong className="text-foreground">Remember me</strong> on web
              and Android — stay signed in until Sign out.
            </li>
            <li>
              Push tap on Android opens that alarm. Users escalation All steps /
              Critical only.
            </li>
            <li>
              Android APK v{MOBILE_APP_VERSION}:{' '}
              <a
                className="text-sky-400 underline"
                href={MOBILE_APP_DOWNLOAD_URL}
                target="_blank"
                rel="noreferrer"
              >
                download
              </a>
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-secondary/30 p-5 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            On-prem packages
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Licence buyers install from{' '}
            <a
              className="text-sky-400 underline"
              href="https://licences.autoconnecto.in"
              target="_blank"
              rel="noreferrer"
            >
              licences.autoconnecto.in
            </a>{' '}
            → Install. The portal offers{' '}
            <strong className="text-foreground">Latest</strong> (updates open)
            and <strong className="text-foreground">My version</strong>{' '}
            (entitled GitHub Release). Install steps ship inside the package (
            <code className="text-foreground">GUIDE.md</code> +{' '}
            <code className="text-foreground">scripts/install.sh</code>).
            Customer path:{' '}
            <a
              className="text-sky-400 underline"
              href="https://docs.autoconnecto.in/guide/on-prem-licence.html"
              target="_blank"
              rel="noreferrer"
            >
              On-prem licence guide
            </a>
            .
          </p>
        </section>
      </article>
      <Footer />
    </main>
  );
}
