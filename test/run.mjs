// Zero-dependency checks. Run with: npm test
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = join(ROOT, "site");
let failed = 0, passed = 0;
const ok = (c, m) => { if (c) passed++; else { failed++; console.log("FAIL", m); } };

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    if (n === ".git" || n === "node_modules") continue;
    const p = join(dir, n);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}
const TEXT = new Set([".html", ".css", ".js", ".mjs", ".md", ".svg", ".json", ".toml", ".txt"]);
const files = walk(ROOT).filter((f) => TEXT.has(extname(f)));

// House rule: no em dashes anywhere a person reads.
for (const f of files) ok(!readFileSync(f, "utf8").includes(String.fromCharCode(0x2014)), `em dash in ${relative(ROOT, f)}`);

// Netlify publishes site/ only, so repo notes are never served.
ok(/publish\s*=\s*"site"/.test(readFileSync(join(ROOT, "netlify.toml"), "utf8")), "netlify.toml publishes site/");
for (const f of ["CLAUDE.md", "README.md", "package.json"]) ok(!existsSync(join(SITE, f)), `${f} must not be inside site/`);

// Every local link and asset on every page points at a file that exists.
for (const page of walk(SITE).filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(page, "utf8");
  for (const [, ref] of html.matchAll(/(?:href|src)="([^"#?]+)/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
    const target = ref.startsWith("/") ? join(SITE, ref) : join(dirname(page), ref);
    ok(existsSync(target), `${relative(ROOT, page)} links to missing ${ref}`);
  }
}

// Fail closed: no placeholder phone ever ships.
const index = readFileSync(join(SITE, "index.html"), "utf8");
ok(!/555-01\d\d/.test(index), "555-01xx placeholder phone in index.html");

// AI is disclosed on the page.
ok(/\bAI\b/.test(index), "index.html says AI helps and people sign off");

// The sample page says it is a sample, and stays out of search.
const sample = readFileSync(join(SITE, "sample/shadow-day.html"), "utf8");
ok(sample.includes("sample-banner") && /made up/i.test(sample), "shadow-day.html reads as a sample");
ok(sample.includes('name="robots" content="noindex"'), "shadow-day.html is noindex");

console.log(`${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
