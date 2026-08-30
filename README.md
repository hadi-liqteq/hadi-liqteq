# Websites ecosystem

Multiple scroll-driven websites built and deployed together from one repository,
using the [scrollcraft](https://github.com/nateherkai/scroll-craft) design system.

```
sites/            one self-contained site per folder
  coarts/         Coarts Lighting Solutions (lighting e-commerce)
    index.html    the page
    app.css       brand theme + page classes
    app.js        page behaviour (signature move, drawers, engine mount)
    scrollcraft.css / scrollcraft.js   the engine (copied per site, never edited)
  liqteq/         Liquid Technologies (in progress)
scrollcraft/      the scrollcraft workspace (shared across every build)
  FINGERPRINTS.md   uniqueness registry — one row per site, so no two repeat
  builds/<site>/BRIEF.md   the design brief for each site
build.py          builds every sites/* into docs/ + a hub page
docs/             generated output that GitHub Pages serves (do not hand-edit)
```

Each site is **self-contained** (its own copy of the engine and theme), which
matches scrollcraft's model — the engine is a copied mechanism, themed with
tokens, never modified. Adding a site is just a new `sites/<name>/` folder.

## Build

```bash
python3 build.py     # copies every sites/* into docs/<name>/ and writes docs/index.html (the hub)
```

## Run a site locally

```bash
python3 -m http.server 8000 --directory sites/coarts   # then open http://localhost:8000
# or serve the whole built ecosystem:
python3 -m http.server 8000 --directory docs           # hub at /, sites at /coarts/, /liqteq/ …
```

## Deploy (GitHub Pages)

Pages is set to **Deploy from a branch → `main` → `/docs`**. After `python3 build.py`,
commit and push `main`; Pages redeploys automatically.

- Hub:   `https://hadi-liqteq.github.io/hadi-liqteq/`
- Coarts: `https://hadi-liqteq.github.io/hadi-liqteq/coarts/`
- Liqteq: `https://hadi-liqteq.github.io/hadi-liqteq/liqteq/`

(First-time only: an admin enables Pages in **Settings → Pages**, source
*Deploy from a branch*, branch `main`, folder `/docs`.)

## Verify a site

Each site is checked with the scrollcraft harness (headless Chromium walking
every act at several scroll positions) for dead scroll, cue opacity and contrast,
at desktop, mobile and reduced-motion. Screenshots land in `lab/` (git-ignored).

## Sites

### Coarts Lighting — `sites/coarts/`
Gallery/catalog grammar; a colour-temperature + brightness dimmer re-lights the
whole page (the signature move). Real brand, catalogue and specs from the Coarts
LED catalogue. Contact: UAN +92 21 111 509 509, info@coartslighting.com, and the
real socials. Set `CONTACT.whatsapp` in `sites/coarts/app.js` to route enquiries
to WhatsApp instead of email.

### Liqteq — `sites/liqteq/`
Redesign of liqteq.com for Liquid Technologies. In progress.
