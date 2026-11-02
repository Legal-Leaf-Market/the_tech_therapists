// Zero-dependency checks. Run with: npm test
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
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
for (const f of files) ok(!readFileSync(f, "utf8").includes(String.fromCharCode(0x2014)), `em dash in ${f.slice(ROOT.length + 1)}`);

// Calculator math.
const window = {};
new Function("window", readFileSync(join(ROOT, "site/assets/site.js"), "utf8"))(window);
const T = window.TechTherapy;
const r = T.cost(2, 3, 25);
ok(r.hours === 300 && r.dollars === 7500, "2 people x 3 h/week x 50 weeks x $25");
ok(T.cost("", "x", -4).dollars === 0, "bad input counts as zero, never NaN");

// Fail closed: no placeholder phone ever ships.
for (const v of Object.values(T.CONTACT)) ok(!/555-01\d\d/.test(v), "555-01xx placeholder in CONTACT");

// The sample page must say it is a sample.
const sample = readFileSync(join(ROOT, "site/shadow-day.html"), "utf8");
ok(sample.includes("sample-flag") && /made-up/i.test(sample), "shadow-day.html reads as a sample");

// Pages stay noindex until launch is decided.
for (const p of ["site/index.html", "site/shadow-day.html"]) ok(readFileSync(join(ROOT, p), "utf8").includes('name="robots" content="noindex"'), `${p} is noindex`);

console.log(`${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
