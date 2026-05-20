/** Public API used for live plan catalog on the marketing site. */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://api.autoconnecto.in"
).trim().replace(/\/+$/, "");

export const PUBLIC_PLANS_URL = `${API_BASE_URL}/api/plans`;
