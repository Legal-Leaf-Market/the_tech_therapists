# CLAUDE.md: Tech Therapy (the_tech_theraprists)

Landing page for Tech Therapy, Jacob and Steven's process-fixing business for
small businesses in Indiana. See README.md.

This repo is **public**. The business plan, pricing notes, client names and
anything said in confidence stay out of it, in the private plan doc.

## Standing rules

- **No em dashes anywhere a person reads.** Restructure with a period, comma,
  colon or parentheses. `npm test` fails on one. (House rule across the
  sister sites.)
- **Never invent facts.** No made-up clients, testimonials, results, ratings,
  years in business or prices. Real numbers come from the owners.
- **No client or prospect names on the site.** Confidentiality is one of the
  principles the page sells.
- **Samples read as samples.** `shadow-day.html` is a made-up company with a
  Sample flag and stays noindex.
- **Fail closed.** `CONTACT` in `site/assets/site.js` is empty until a real
  phone, email or booking link exists, and the page says "coming soon"
  instead of showing a dead button. A 555-01xx number fails the tests.
- **AI is disclosed.** The page says Claude helps and a person reviews
  everything. Keep that line.
- **Dependency-free and build-free.** Plain HTML, CSS, JS. Netlify publishes
  only `site/`.

## Checking work

1. `npm test` must pass.
2. Serve `site/` and load every page at 390px and 1280px, light and dark: no
   horizontal scroll, no console errors. Chromium for Playwright is
   preinstalled.
