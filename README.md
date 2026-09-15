# Commercial Cleaning Monterey — Website

A complete redesign of **commercialcleaningmonterey.com**: a modern, responsive,
single-page marketing site for a commercial cleaning and janitorial company
serving the Monterey Peninsula, California.

## Stack

Vanilla HTML, CSS and JavaScript — no build step, no dependencies, no external
APIs. Open `index.html` in a browser, or serve the directory statically.

```bash
python3 -m http.server 8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Entry point — all page sections and structured data |
| `styles.css` | Design system, layout and responsive rules |
| `script.js` | Mobile nav, sticky header, scroll reveal, quote-form validation |
| `favicon.svg` | Site icon |
| `robots.txt` / `sitemap.xml` | Basic SEO files |

## Sections

Hero · Services · Industries Served · How It Works · Why Us · Service Area ·
Call to action · Contact / quote request · Footer

## Notes on content

The source site was behind a bot-check interstitial, so no marketing copy,
phone number, or street address could be extracted from it. The site is built
around the facts that are verifiable — the business name, its industry, and its
Monterey Peninsula location — plus standard commercial-cleaning service
descriptions.

**Before going live, replace or confirm:**

- `info@commercialcleaningmonterey.com` — derived from the domain, not verified
- A real business phone number (intentionally omitted rather than invented;
  the quote form and email address are the current contact paths)
- Street address, license/insurance details, and any years-in-business or
  client-count claims

## Images

All photography is sourced from Pexels and is free to use under the
[Pexels license](https://www.pexels.com/license/). The two assets on the
original URL (`robot-suspicion.svg`, `loader.svg`) were CDN bot-check graphics,
not business photography, so they were not carried over.
