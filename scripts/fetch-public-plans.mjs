/**
 * Fetches public plans at build time so the static site does not need
 * cross-origin browser calls to api.autoconnecto.in (CORS).
 */
import fs from "node:fs";
import path from "node:path";

const apiBase = (
  process.env.NEXT_PUBLIC_API_URL || "https://api.autoconnecto.in"
)
  .trim()
  .replace(/\/+$/, "");
const url = `${apiBase}/api/plans`;
const outFile = path.resolve(process.cwd(), "public", "plans.json");

async function main() {
  console.log(`[fetch-public-plans] GET ${url}`);
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Plans API returned ${res.status}`);
  }
  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Plans API did not return an array");
  }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(data, null, 2), "utf8");
  console.log(`[fetch-public-plans] wrote ${data.length} plans → public/plans.json`);
}

main().catch((err) => {
  if (fs.existsSync(outFile)) {
    console.warn(
      `[fetch-public-plans] API failed (${err.message}); keeping existing public/plans.json`
    );
    process.exit(0);
  }
  console.error(`[fetch-public-plans] ${err.message}`);
  process.exit(1);
});
