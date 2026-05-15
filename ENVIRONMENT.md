# Website Environment

## Required (used in code today)

| Variable | Purpose |
|----------|---------|
| **`NEXT_PUBLIC_SITE_URL`** | Canonical site origin (no trailing slash), e.g. `https://www.autoconnecto.in`. Baked into `layout.tsx`, `page.tsx`, `sitemap.ts`, and `robots.ts` at **build** time. |
| **`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`** *(optional)* | Google Search Console **HTML tag** verification token only (the string inside `content="..."`). Adds `<meta name="google-site-verification" …>` via Next `metadata.verification` at **build** time. |

Copy **`website/.env.example`** to **`website/.env`** for local builds, or set the same variable in CI before `npm run build`.

## Google Search Console (must be done in your browser)

No server or repo change can log into Google for you. After you have a verification token in Search Console:

1. Open [Google Search Console](https://search.google.com/search-console), add a **URL-prefix** property for your canonical marketing URL (e.g. `https://www.autoconnecto.in/`).
2. Choose verification **HTML tag**; copy only the **content** value (not the full tag).
3. Set **`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`** to that value in CI or `website/.env`, run **`npm run build`**, redeploy **`out/`** to the same host Google will fetch.
4. In Search Console, click **Verify**, then **Sitemaps** → submit `https://www.autoconnecto.in/sitemap.xml` (and repeat for `https://docs.autoconnecto.in/sitemap.xml` on a second property if you want the docs hostname indexed separately).
5. Use **URL inspection** on the homepage → **Request indexing** (quota applies).

If you use **DNS TXT** verification instead, you do not need this env var; add the TXT record at your DNS host and verify in Search Console.

## Lead forms (demo + contact)

`ContactSection` POSTs JSON to an optional webhook, or guides the visitor to **mailto** with a pre-filled message.

| Variable | Purpose |
|----------|---------|
| **`NEXT_PUBLIC_LEAD_WEBHOOK_URL`** *(optional)* | HTTPS endpoint that accepts **POST** `Content-Type: application/json` with `{ kind: 'demo' \| 'contact', ...fields, source, at }`. Use Zapier, Make, Slack incoming webhook wrapper, or your own API. If unset, the UI uses **mailto** only. |
| **`NEXT_PUBLIC_LEADS_EMAIL`** *(optional)* | Default **mailto** recipient for demo/contact when no webhook is used. Defaults to **`founder@autoconnecto.in`** if unset. |

## Not used by this marketing site

Older templates sometimes listed **Supabase, OpenAI, Gemini, Anthropic, GA, AdSense, Perplexity, Stripe** keys. The current **`website/src`** code does **not** read any of those. If you add analytics, payments, or auth to this Next app later, introduce variables then and document them here.

## GitHub Actions deploy (`deploy-s3.yml`)

Production (confirmed):

| Setting | Value |
|---------|--------|
| S3 bucket | `autoconnecto-www-site` |
| CloudFront distribution | `E3UPPLM5N2GQ5Z` |
| Region | `ap-south-1` |

On **https://github.com/autoconnecto/website** → **Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|--------|--------|
| `AWS_ACCESS_KEY_ID` | IAM user access key (e.g. `autoconnecto-backend`) |
| `AWS_SECRET_ACCESS_KEY` | Matching secret |
| `WEBSITE_S3_BUCKET` | `autoconnecto-www-site` |
| `WEBSITE_CLOUDFRONT_DISTRIBUTION_ID` | `E3UPPLM5N2GQ5Z` |

Attach IAM policy **`scripts/iam/website-deploy-s3-cloudfront.policy.json`** to that user (inline or customer-managed). **`ListDistributions` is not required** — only `CreateInvalidation` on the distribution ARN above.

## Security

- Do **not** commit real API keys or payment keys to git.
- Prefer CI/hosting secrets for anything sensitive when you do add integrations.
