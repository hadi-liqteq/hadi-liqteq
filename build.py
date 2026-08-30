#!/usr/bin/env python3
"""Build every site in sites/ into docs/ for GitHub Pages.

Each site under sites/<name>/ is self-contained (its own copy of the scrollcraft
engine, theme and markup). This script copies each into docs/<name>/, writes a
small hub at docs/index.html linking to them all, and drops docs/.nojekyll so
Pages serves the files verbatim.

    python3 build.py

GitHub Pages: deploy from a branch, /docs.
    hub     -> https://<user>.github.io/<repo>/
    a site  -> https://<user>.github.io/<repo>/<name>/
"""
import os, shutil, html

HERE = os.path.dirname(os.path.abspath(__file__))
SITES_DIR = os.path.join(HERE, "sites")
DOCS = os.path.join(HERE, "docs")

# Hub metadata per site. Add an entry when you add a site; a site with no entry
# still builds and appears with sensible defaults.
META = {
    "coarts": {
        "title": "Coarts Lighting",
        "tag": "Lighting · e-commerce",
        "desc": "A premium, scroll-driven storefront for Coarts Lighting Solutions, with a live colour-temperature dimmer that re-lights the whole page.",
    },
    "liqteq": {
        "title": "Liqteq",
        "tag": "Software · services",
        "desc": "A redesign of liqteq.com for Liquid Technologies.",
    },
}


def discover():
    if not os.path.isdir(SITES_DIR):
        return []
    return [
        d for d in sorted(os.listdir(SITES_DIR))
        if os.path.isdir(os.path.join(SITES_DIR, d))
        and os.path.exists(os.path.join(SITES_DIR, d, "index.html"))
    ]


def hub_html(names):
    cards = "\n".join(
        f'''      <a class="card" href="./{n}/">
        <span class="card__tag">{html.escape(META.get(n, {}).get("tag", "Website"))}</span>
        <span class="card__name">{html.escape(META.get(n, {}).get("title", n.title()))}</span>
        <span class="card__desc">{html.escape(META.get(n, {}).get("desc", ""))}</span>
        <span class="card__go">Open<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </a>'''
        for n in names
    )
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Studio · websites</title>
<meta name="description" content="An ecosystem of websites built and deployed together.">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%230c0e12'/><circle cx='16' cy='16' r='7' fill='none' stroke='%237fd3ff' stroke-width='2.4'/></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root {{
    --bg:#0b0d11; --surface:#12151b; --ink:#eef2f7; --soft:#9aa4b2;
    --line:color-mix(in oklab, var(--ink) 12%, transparent);
    --accent:#7fd3ff; --sans:"Instrument Sans",system-ui,sans-serif; --serif:"Fraunces",Georgia,serif;
    color-scheme:dark;
  }}
  * {{ box-sizing:border-box; }}
  body {{ margin:0; background:var(--bg); color:var(--ink); font-family:var(--sans); line-height:1.6;
    -webkit-font-smoothing:antialiased; }}
  ::selection {{ background:var(--accent); color:#06131c; }}
  a {{ color:inherit; }}
  .wrap {{ max-width:64rem; margin-inline:auto; padding:clamp(3.5rem,9vw,8rem) clamp(1.25rem,5vw,3rem); }}
  .kicker {{ font-size:.8rem; letter-spacing:.28em; text-transform:uppercase; color:var(--soft); margin:0 0 1.5rem; }}
  h1 {{ font-family:var(--serif); font-weight:400; font-size:clamp(2.4rem,6vw,4.5rem); line-height:1.02;
    letter-spacing:-.02em; margin:0 0 1rem; text-wrap:balance; }}
  .lede {{ color:var(--soft); max-width:52ch; margin:0 0 clamp(2.5rem,6vw,4rem); font-size:1.1rem; }}
  .grid {{ display:grid; gap:1rem; grid-template-columns:repeat(auto-fill,minmax(min(100%,20rem),1fr)); }}
  .card {{ display:flex; flex-direction:column; gap:.5rem; padding:1.6rem; text-decoration:none;
    background:linear-gradient(180deg,color-mix(in oklab,var(--surface) 80%,transparent),transparent);
    border:1px solid var(--line); border-radius:16px;
    transition:transform .18s cubic-bezier(.23,1,.32,1), border-color .18s, background .18s; }}
  .card:hover {{ transform:translateY(-3px); border-color:color-mix(in oklab,var(--accent) 40%,transparent);
    background:linear-gradient(180deg,color-mix(in oklab,var(--surface) 96%,transparent),transparent); }}
  .card__tag {{ font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; color:var(--accent); }}
  .card__name {{ font-family:var(--serif); font-size:1.6rem; line-height:1.1; }}
  .card__desc {{ color:var(--soft); font-size:.95rem; text-wrap:pretty; }}
  .card__go {{ margin-top:.4rem; display:inline-flex; align-items:center; gap:.4ch; font-weight:600;
    font-size:.9rem; }}
  .card__go svg {{ transition:transform .18s; }}
  .card:hover .card__go svg {{ transform:translateX(3px); }}
  footer {{ margin-top:clamp(3rem,8vw,5rem); color:var(--soft); font-size:.85rem; border-top:1px solid var(--line);
    padding-top:1.5rem; }}
</style>
</head>
<body>
  <main class="wrap">
    <p class="kicker">The studio</p>
    <h1>Websites, built and shipped together.</h1>
    <p class="lede">One repository, one deploy. Each site below is self-contained and lives at its own path. Open any of them.</p>
    <div class="grid">
{cards}
    </div>
    <footer>Built with the scrollcraft design system. {len(names)} site{"s" if len(names) != 1 else ""} in this ecosystem.</footer>
  </main>
</body>
</html>
'''


def main():
    names = discover()
    if os.path.isdir(DOCS):
        shutil.rmtree(DOCS)
    os.makedirs(DOCS)
    open(os.path.join(DOCS, ".nojekyll"), "w").close()
    for n in names:
        shutil.copytree(os.path.join(SITES_DIR, n), os.path.join(DOCS, n))
    with open(os.path.join(DOCS, "index.html"), "w", encoding="utf-8") as f:
        f.write(hub_html(names))
    print("built docs/ with hub +", len(names), "site(s):", ", ".join(names) or "(none)")


if __name__ == "__main__":
    main()
