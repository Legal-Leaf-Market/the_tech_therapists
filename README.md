# The Tech Therapists

The landing page for The Tech Therapists, Jacob Kennedy and Steven: process
fixes for small and mid-size companies, built around the people who do the
work. "We treat the process, not the people."

## What's here

| File | What it is |
| --- | --- |
| `index.html` | The landing page |
| `sample/shadow-day.html` | A sample one-page Shadow Day plan for a made-up company |
| `css/site.css` | All styles, light and dark |
| `js/site.js` | Phone menu and the time-back calculator |
| `favicon.svg` | The mark: a speech bubble holding a wrench |
| `netlify.toml` | Netlify settings (static, no build) |

## Run it locally

No build step. From this folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Put it online

Connect the repo to a new Netlify site. It needs no build command and
publishes this folder as it is. Add the domain once it's bought.

## Before it goes live

- The contact button emails jake@crossroadsweddingco.shop for now. Swap in the
  business's own address once it exists (`#contact-link` in `index.html`).
- Steven: confirm the bio wording, and add a last name or photo if you want them.
- Pricing on the page has no numbers on purpose until the Shadow Day fee and
  build prices are set.
