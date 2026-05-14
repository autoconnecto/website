/**
 * Marketing-site lead capture. Static export has no API routes — submissions go to
 * an optional HTTPS webhook (Zapier, Make, Slack incoming webhook, etc.) or open mailto.
 */

const WEBHOOK = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL?.trim();
const DEFAULT_TO = process.env.NEXT_PUBLIC_LEADS_EMAIL?.trim() || 'founder@autoconnecto.in';

export type DemoLeadPayload = {
  kind: 'demo';
  name: string;
  email: string;
  company: string;
  role: string;
  devices: string;
  useCase: string;
};

export type ContactLeadPayload = {
  kind: 'contact';
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type LeadPayload = DemoLeadPayload | ContactLeadPayload;

function buildMailto(to: string, subject: string, body: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function mailtoForLead(payload: LeadPayload): string {
  if (payload.kind === 'demo') {
    const body = [
      'Autoconnecto — demo request (marketing site)',
      '',
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company}`,
      `Role: ${payload.role || '(not provided)'}`,
      `Device count: ${payload.devices || '(not provided)'}`,
      `Use case: ${payload.useCase || '(not provided)'}`,
    ].join('\n');
    return buildMailto(DEFAULT_TO, `Autoconnecto demo request — ${payload.company}`, body);
  }
  const body = [
    'Autoconnecto — contact form (marketing site)',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject || '(none)'}`,
    '',
    payload.message,
  ].join('\n');
  return buildMailto(
    DEFAULT_TO,
    payload.subject?.trim() ? `Autoconnecto: ${payload.subject.trim()}` : `Message from ${payload.name}`,
    body
  );
}

/**
 * POST JSON to NEXT_PUBLIC_LEAD_WEBHOOK_URL if set. Returns whether the webhook accepted the request.
 */
export async function postLeadWebhook(payload: LeadPayload): Promise<{ ok: boolean; status?: number }> {
  if (!WEBHOOK) return { ok: false };

  try {
    const res = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, source: 'autoconnecto-marketing', at: new Date().toISOString() }),
    });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false };
  }
}
