# CLAUDE.md: The Tech Therapists

The public landing page for The Tech Therapists, Jacob Kennedy and Steven's
process-fix business. The business plan lives in a private claude.ai doc
("The Tech Therapists: Master Plan"), not here.

## Standing rules

- **This repo is public.** Never commit client names, client data, Shadow Day
  notes, pricing internals, contracts or the business plan. Only what the
  public page says belongs here.
- **No em dashes anywhere a person reads** (owner directive across every sister
  site). Use a period, comma, colon or parentheses. An en dash is fine inside a
  numeric range.
- **Never invent proof.** No made-up clients, logos, testimonials, ratings or
  statistics. Samples say they are samples and use obviously fake names
  (Sampleton Supply Co.). The only hard claim is Jacob's: as a corporate process
  improvement analyst he cut 3-to-4-hour manual processes to 20 or 30 minutes.
- **No prices until the owners set them.** The page describes how pricing works
  (pay once, own it) without numbers.
- **Stay dependency-free.** Plain HTML, CSS and JS, no framework, no build step,
  deployed on Netlify like the sister sites.
- **The voice:** plain, warm, blue collar. "Betty" is the person who keeps the
  office running; she is never the problem.

## Checking work

- Serve the folder (`python3 -m http.server`) and load every page at 390px and
  1280px: no horizontal scroll, no console errors.
- Check light and dark mode.
