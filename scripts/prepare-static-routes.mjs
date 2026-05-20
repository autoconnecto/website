/**
 * Next.js `output: 'export'` emits flat files (e.g. pricing.html).
 * S3 REST origins have no directory index — /pricing must map to an object.
 * This mirrors each route as <route>/index.html for CloudFront/S3.
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.cwd(), "out");
if (!fs.existsSync(outDir)) {
  console.error("[prepare-static-routes] missing out/ — run next build first");
  process.exit(1);
}

const skip = new Set(["index.html", "404.html", "200.html"]);

for (const name of fs.readdirSync(outDir)) {
  if (!name.endsWith(".html") || skip.has(name)) continue;
  const route = name.slice(0, -".html".length);
  const src = path.join(outDir, name);
  const destDir = path.join(outDir, route);
  const dest = path.join(destDir, "index.html");
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`[prepare-static-routes] ${route}/index.html ← ${name}`);
}
