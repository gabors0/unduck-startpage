// Generates static/data/bangs.json — a trimmed, pre-lowercased subset of
// src/lib/data/bangs.ts for client-side bang searching.
// Run: npx tsx scripts/generate-bangs.ts

import { mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { bangs } from "../src/lib/data/bangs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const trimmed = bangs.map(({ t, s, d, c, r }) => ({
  t: t.toLowerCase(),
  s: s.toLowerCase(),
  d,
  c,
  r,
}));

const outDir = resolve(__dirname, "../static/data");
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "bangs.json"), JSON.stringify(trimmed));

console.log(`Generated static/data/bangs.json (${trimmed.length} entries)`);
