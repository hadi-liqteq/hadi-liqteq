#!/usr/bin/env python3
"""Inline scrollcraft.css/js + app.css/js into index.html to produce a single
self-contained file (dist/coarts-artifact.html) suitable for hosting anywhere,
including as a claude.ai Artifact. Run: python3 build-artifact.py"""
import os

here = os.path.dirname(os.path.abspath(__file__))
read = lambda n: open(os.path.join(here, n), encoding="utf-8").read()

html = read("index.html")
body = html.split("<body>", 1)[1].split("</body>", 1)[0]
body = body.replace('<script src="scrollcraft.js"></script>', "")
body = body.replace('<script src="app.js"></script>', "").strip()

fonts = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    '<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,380;'
    '9..144,460;9..144,560&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">'
)

out = "\n".join([
    "<title>Coarts Lighting</title>",
    fonts,
    "<style>\n/* scrollcraft.css (engine, unmodified) */\n" + read("scrollcraft.css")
    + "\n/* app.css (theme + page) */\n" + read("app.css") + "\n</style>",
    body,
    "<script>\n" + read("scrollcraft.js") + "\n</script>",
    "<script>\n" + read("app.js") + "\n</script>",
])

os.makedirs(os.path.join(here, "dist"), exist_ok=True)
dest = os.path.join(here, "dist", "coarts-artifact.html")
open(dest, "w", encoding="utf-8").write(out)
print("wrote", dest, len(out.encode()), "bytes")

# Also refresh the /docs copy that GitHub Pages serves (deploy-from-branch, /docs).
import shutil
docs = os.path.join(here, "docs")
os.makedirs(docs, exist_ok=True)
for f in ("index.html", "scrollcraft.css", "app.css", "scrollcraft.js", "app.js"):
    shutil.copyfile(os.path.join(here, f), os.path.join(docs, f))
open(os.path.join(docs, ".nojekyll"), "w").close()
print("refreshed docs/ for GitHub Pages")
