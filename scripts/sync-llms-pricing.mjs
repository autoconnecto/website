/**
 * Regenerates the pricing section in public/llms.txt from public/plans.json
 * (which is filled by fetch-public-plans.mjs from the API).
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const plansFile = path.resolve(root, "public", "plans.json");
const llmsFile = path.resolve(root, "public", "llms.txt");
const pricingHeading = "## Pricing (INR) — Autoconnecto IoT platform";

function formatInr(value) {
  if (value == null || Number.isNaN(Number(value))) return "—";
  return String(Number(value));
}

function formatRetention(days, kind) {
  if (kind === "onprem" && (days == null || days === "")) return "Your storage";
  if (days == null) return "—";
  return `${days} days`;
}

function formatYesNo(flag) {
  return flag ? "Yes" : "No";
}

function planKind(plan) {
  const kind = String(plan.plan_kind || "").toLowerCase();
  if (kind === "onprem") return "onprem";
  const id = String(plan.plan_id || "").toLowerCase();
  if (id.includes("onprem") || id === "forever") return "onprem";
  return "hosted";
}

function buildPricingSection(plans) {
  const sorted = [...plans].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
  );

  const header = [
    pricingHeading,
    "",
    "All prices in Indian Rupees, excluding GST. Hosted or on your servers. Billed monthly or yearly (self-serve). See https://www.autoconnecto.in/plans.json for machine-readable data.",
    "Limits are sustained DP/s (1-hour rolling average) and device count. Insight analytics is an optional paid add-on on Maker and above — never included free. Free has no Insight.",
    "",
    "> This table is generated at build time from https://api.autoconnecto.in/api/plans.",
    "",
    "| Plan | Kind | Monthly INR | Yearly INR | One-time INR | DP/s | Devices | Retention | White-label | Insight / mo |",
    "|------|------|-------------|------------|--------------|------|---------|-----------|-------------|--------------|",
  ];

  const rows = sorted.map((plan) => {
    const name = plan.display_name || plan.plan_id || "Plan";
    const kind = planKind(plan);
    return `| ${name} | ${kind} | ${formatInr(plan.price_monthly_inr)} | ${formatInr(plan.price_yearly_inr)} | ${formatInr(plan.price_onetime_inr)} | ${formatInr(plan.dps_included)} | ${formatInr(plan.max_devices)} | ${formatRetention(plan.retention_days, kind)} | ${formatYesNo(plan.whitelabel_enabled)} | ${formatInr(plan.insight_price_inr_month)} |`;
  });

  const summaries = sorted
    .map((plan) => {
      const name = plan.display_name || plan.plan_id;
      const desc = (plan.description || "").trim();
      return desc ? `${name}: ${desc.replace(/\.$/, "")}.` : null;
    })
    .filter(Boolean);

  return [...header, ...rows, "", summaries.join(" "), ""].join("\n");
}

function main() {
  if (!fs.existsSync(plansFile)) {
    console.error("[sync-llms-pricing] missing public/plans.json — run fetch-public-plans first");
    process.exit(1);
  }

  const plans = JSON.parse(fs.readFileSync(plansFile, "utf8"));
  if (!Array.isArray(plans) || plans.length === 0) {
    console.error("[sync-llms-pricing] public/plans.json is empty or invalid");
    process.exit(1);
  }

  const pricingBlock = buildPricingSection(plans);

  let llms = fs.existsSync(llmsFile)
    ? fs.readFileSync(llmsFile, "utf8")
    : "";

  const markerIndex = llms.indexOf(pricingHeading);
  if (markerIndex === -1) {
    if (llms.length > 0 && !llms.endsWith("\n")) llms += "\n";
    llms += `\n${pricingBlock}`;
  } else {
    llms = llms.slice(0, markerIndex) + pricingBlock;
  }

  fs.writeFileSync(llmsFile, llms.replace(/\s*$/, "\n"), "utf8");
  console.log(
    `[sync-llms-pricing] updated pricing table (${plans.length} plans) → public/llms.txt`
  );
}

main();
