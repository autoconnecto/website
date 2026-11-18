/** Canonical marketing-site origin (no trailing slash). */
export function siteOrigin(): string {
  const raw = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.autoconnecto.in"
  )
    .trim()
    .replace(/\/+$/, "");
  // Guard against accidental localhost leaking into static export meta/JSON-LD.
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(raw)) {
    return "https://www.autoconnecto.in";
  }
  return raw;
}
