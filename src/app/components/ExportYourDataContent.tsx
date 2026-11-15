import {
  APP_LOGIN_URL,
  DOCS_EXPORT_URL,
  DOCS_FAQ_URL,
  FOUNDER_EMAIL,
} from '@/config/links';

const STEPS = [
  {
    title: 'Readings as CSV',
    body: 'In the app open Reports → Readings export → set the range and devices or type → Download. Email or schedule works when tenant mail is connected.',
  },
  {
    title: 'Alarms as CSV',
    body: 'Reports → Alarms export → set filters → Download. Same Reports area as readings; the two types stay separate.',
  },
  {
    title: 'Dashboards as JSON',
    body: 'Dashboards list → Export JSON on a board. Keep the file as a backup or Import it into another Autoconnecto tenant.',
  },
  {
    title: 'Move devices',
    body: 'Firmware already uses MQTT or HTTP with documented topics and JSON. Change the broker or URL and credentials on the device or gateway — no proprietary wire protocol.',
  },
];

export default function ExportYourDataContent() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Autoconnecto
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground tracking-tight text-balance">
          Export your data
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          Leaving is straightforward. Download history as CSV, boards as JSON, and
          retarget devices on open protocols — no ticket required for the exports
          below.
        </p>

        <ol className="mt-12 space-y-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary"
                aria-hidden
              >
                {i + 1}
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            Audit log and Analytics rankings also export as CSV from those screens.
            For scripted history pulls, use the authenticated API (Swagger in the
            app).
          </p>
          <p>
            A single full-tenant archive (devices, assets, profiles, and readings
            together) is planned later. Until then, use the steps above for what you
            need to keep.
          </p>
          <p>
            Prefer to keep Autoconnecto but leave our cloud? Ask about on-prem / own
            server:{' '}
            <a
              href={`mailto:${FOUNDER_EMAIL}`}
              className="text-primary hover:underline"
            >
              {FOUNDER_EMAIL}
            </a>
            .
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <a
            href={APP_LOGIN_URL}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground hover:opacity-90"
          >
            Open the app
          </a>
          <a
            href={DOCS_EXPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2.5 font-medium text-foreground hover:border-primary/40"
          >
            Full steps in docs
          </a>
          <a
            href={DOCS_FAQ_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2.5 font-medium text-foreground hover:border-primary/40"
          >
            FAQ
          </a>
        </div>
      </div>
    </div>
  );
}
