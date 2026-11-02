#!/usr/bin/env python3
"""Download the site fonts from Google Fonts into this folder.

Run from the repo root after a page gets new kanji: python3 fonts/build.py
"""
import pathlib, re, shutil, tempfile, urllib.parse, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "fonts"
PAGES = ["index.html", "blog.html", "404.html"]
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
LATIN = "family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&family=Outfit:wght@300;400;500&family=JetBrains+Mono:wght@400;500"
LICENSES = ["cormorantgaramond", "outfit", "jetbrainsmono", "shipporimincho", "notoserifsc"]


def get(url, binary=False):
    body = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA})).read()
    return body if binary else body.decode()


def faces(css):
    return re.findall(r"(/\* ([\w-]+) \*/\s*)?(@font-face \{.*?\})", css, re.S)


def local(face, subset, saved, stage):
    url = re.search(r"url\((\S+?)\)", face)[1]
    if url not in saved:
        fam = re.search(r"font-family: '([^']+)'", face)[1].lower().replace(" ", "-")
        italic = "-italic" if "font-style: italic" in face else ""
        name = f"{fam}{italic}-{subset}.woff2"
        if name in saved.values():
            name = name.replace(f"-{subset}", f"-{re.search(r'font-weight: (\d+)', face)[1]}-{subset}")
        saved[url] = name
        (stage / name).write_bytes(get(url, binary=True))
    return face.replace(url, f"/fonts/{saved[url]}")


def main(stage):
    text = "".join(sorted({c for p in PAGES for c in (ROOT / p).read_text(encoding="utf-8") if c.isprintable() and c != " "}))
    blocks, saved = [], {}
    for _, subset, face in faces(get(f"https://fonts.googleapis.com/css2?{LATIN}&display=swap")):
        if subset in ("latin", "latin-ext"):
            blocks.append(local(face, subset, saved, stage))
    for family, chars in (("Shippori+Mincho:wght@400;600;800", text), ("Noto+Serif+SC:wght@400;600", "吴锵皓")):
        css = get(f"https://fonts.googleapis.com/css2?family={family}&text={urllib.parse.quote(chars)}&display=swap")
        blocks += [local(face, "site", saved, stage) for _, _, face in faces(css)]
    (stage / "fonts.css").write_text("\n".join(blocks) + "\n", encoding="utf-8")
    (stage / "OFL.txt").write_text("\n\n".join(get(f"https://raw.githubusercontent.com/google/fonts/main/ofl/{f}/OFL.txt") for f in LICENSES), encoding="utf-8")
    for old in OUT.glob("*.woff2"):
        old.unlink()
    for new in stage.iterdir():
        shutil.move(new, OUT / new.name)


with tempfile.TemporaryDirectory() as tmp:
    main(pathlib.Path(tmp))
