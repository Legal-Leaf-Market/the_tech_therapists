# Tech Therapy

Landing page for Tech Therapy: we sit with a small business's people, find
what's slowing them down, and fix it once, at a fixed price.

- `site/index.html`: the landing page (process, what we fix, principles,
  a cost-of-the-slow-way calculator, team, contact)
- `site/shadow-day.html`: a sample one-page diagnosis for a made-up company
- `site/assets/`: styles, the calculator script, the logo

Plain HTML, CSS and JS. No build step, no dependencies.

## Run it

```bash
cd site && python3 -m http.server
```

Then open http://localhost:8000.

## Host it

Netlify: connect this repo. `netlify.toml` publishes only `site/`, so notes
and tests at the repo root are never served.

## Before launch

1. Put the real phone, email and booking link in `CONTACT` at the top of
   `site/assets/site.js`. Until then the contact box says they are coming soon.
2. Pick the final name (Tech Therapy Co., Tech Therapy Works or The Tech
   Therapists) after the USPTO and Indiana business entity searches.
3. Remove `<meta name="robots" content="noindex">` from `site/index.html`
   once the name and domain are settled. Keep it on the sample page.

## Check your work

```bash
npm test
```
