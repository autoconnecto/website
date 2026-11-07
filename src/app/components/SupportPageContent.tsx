import {
  COMMUNITY_TELEGRAM_HANDLE,
  COMMUNITY_TELEGRAM_URL,
  DOCS_FAQ_URL,
  DOCS_URL,
  FOUNDER_EMAIL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
} from '@/config/links';
import Icon from '@/components/ui/AppIcon';

const phoneDisplay = '+91 92121 00555';

export default function SupportPageContent() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Autoconnecto
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-foreground tracking-tight text-balance">
          Support
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          Autoconnecto provides customer support by email and Telegram. We help with
          account access, device connect, dashboards, alarms, and the ESP32 SDK.
        </p>

        <div className="mt-10 space-y-4">
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Icon name="EnvelopeIcon" size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Email support</p>
              <p className="text-sm text-primary mt-1">{SUPPORT_EMAIL}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Primary channel for product issues. Include your tenant name or login
                email, what you expected, what you saw, and the time in IST.
              </p>
            </div>
          </a>

          <a
            href={COMMUNITY_TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Icon name="ChatBubbleLeftRightIcon" size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Telegram support</p>
              <p className="text-sm text-primary mt-1">{COMMUNITY_TELEGRAM_HANDLE}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Public group for setup help, SDK questions, and product issues. Plant
                alarm Telegram groups under Users are separate — use this community for
                support chat.
              </p>
            </div>
          </a>

          <a
            href={`tel:${SUPPORT_PHONE}`}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Icon name="PhoneIcon" size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Phone</p>
              <p className="text-sm text-primary mt-1">{phoneDisplay}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                India. For urgent account or deployment questions during business hours.
              </p>
            </div>
          </a>

          <a
            href={`mailto:${FOUNDER_EMAIL}`}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Icon name="BuildingOffice2Icon" size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Enterprise and sales</p>
              <p className="text-sm text-primary mt-1">{FOUNDER_EMAIL}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Custom limits, white-label, and larger fleets beyond the published plans.
              </p>
            </div>
          </a>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-secondary/30 p-6">
          <h2 className="font-display text-xl font-semibold text-foreground">
            What support covers
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
            <li>Login, invites, and tenant access</li>
            <li>Device connect (MQTT / HTTPS / ESP32 SDK)</li>
            <li>Dashboards, alarms, rule engine, and Analytics</li>
            <li>Billing plan questions on the public catalog</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Full written guide:{' '}
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              docs.autoconnecto.in
            </a>
            {' · '}
            <a
              href={DOCS_FAQ_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              FAQ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
