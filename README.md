# Coarts Lighting — website

A premium, scroll-driven storefront for **Coarts Lighting**, Pakistan's lighting
house. Built with the [scrollcraft](https://github.com/nateherkai/scroll-craft)
skill: scroll is the timeline, and the whole page is lit — the world is rendered
from real luminance (glows, filaments, light pools, fixture silhouettes) in
CSS/SVG rather than from stock photography, which suits a brand whose product
*is* light.

It is a static site. No build step, no framework, no backend.

**Single-file build / live preview.** `python3 build-artifact.py` inlines the CSS
and JS into one portable file at `dist/coarts-artifact.html` (host it anywhere).
A hosted preview of that file lives at
https://claude.ai/code/artifact/60c24529-87e5-4eaf-8d17-13a4b67c43c3

## Run it

```bash
# any static server from the repo root, e.g.
python3 -m http.server 4500
# then open http://localhost:4500
```

## Files

| File | What it is |
|---|---|
| `index.html` | The page. Six acts of semantic HTML marked up with `data-sc-*`. |
| `app.css` | The brand: colour tokens + every page class, on the scrollcraft taste floor. |
| `app.js` | The dimmer (signature move), the enquiry drawer, mobile nav, engine mount. |
| `scrollcraft.css` / `scrollcraft.js` | The scrollcraft engine, unmodified. Do not edit; theme with tokens. |
| `scrollcraft/builds/coarts/BRIEF.md` | The design brief: feeling curve, peak, grammar, score table. |
| `scrollcraft/FINGERPRINTS.md` | The uniqueness registry (one row per build). |

## The idea

- **Grammar: gallery / catalog.** The visitor's question is "what are the
  options", so the page is a walkable collection with museum-style spec labels
  (fact, not pitch), a pan rail as the spine, and an index of rooms for nav.
- **Signature move: the dimmer.** A colour-temperature + brightness control,
  fixed in the corner, re-lights the *entire* page at once. Warmth is an oklab
  mix between an amber and a cool-blue anchor (so it passes through neutral
  white, never green); brightness dims the cream ground toward a warm taupe
  without ever leaving the light family, so dark ink keeps its contrast across
  the whole range. The visitor's setting is remembered in `localStorage`.
- **Browse + enquire, not a cart.** Pricing is quote-based, so there are no
  prices and no invented numbers anywhere. "Enquire" adds a piece to a slide-out
  enquiry list; the form composes a message. The only numerals on the page are
  real Kelvin values (2700K/4000K/6500K), which are physics, not brand claims.

## Two things to set before launch

1. **Contact routing.** `app.js` → `CONTACT` at the top. Set `whatsapp` to the
   real WhatsApp number (digits only, with country code) and/or `email` to the
   real inbox. Until then the enquiry form composes a draft to a placeholder on
   the Coarts domain.
2. **Real catalogue.** Product names (Halo 42, Meridian Disc, …) and the
   category copy are tasteful placeholders for the redesign. Swap in the real
   range; the museum-label schema (`type · finish · Kelvin`) is the template to
   fill.

## Fonts

Display is **Fraunces**, text is **Instrument Sans**, loaded from Google Fonts
with full fallback stacks (`Georgia` for display, `system-ui` for text) so the
page degrades cleanly if the font CDN is unreachable.

## Verification

Verified with the scrollcraft harness (headless Chromium walking every act at
six scroll positions) at desktop, mobile (390×844) and reduced-motion:
**no dead scroll, all cues reach full opacity, all text clears 4.5:1 contrast at
its worst frame.** The pan rail was measured for real overflow at four widths.
Screenshots and `report.json` are written to `lab/` (git-ignored).

Accessibility: keyboard-operable dimmer (native range inputs), focus-visible on
everything (high-contrast, not the shifting accent), a focus-trapped enquiry
dialog, and a reduced-motion path that keeps every reveal as a fade and turns
the rail into a native scroll region.
