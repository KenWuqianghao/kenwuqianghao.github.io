# kenwu.is-a.dev

Personal site of Ken Wu. Static HTML, served by GitHub Pages from `main`.

| Path | Content |
|---|---|
| `index.html` | Home page: experience, research, honours, projects |
| `blog.html` | Writing index |
| `blog/rss.xml` | RSS feed for `blog.html` |
| `404.html` | Sends old Next.js routes to `/` or `/blog.html` |
| `fonts/` | Web fonts (SIL OFL 1.1, see `fonts/OFL.txt`) |
| `sfx/` | Sound effects |

## Run locally

```bash
python3 -m http.server 8765
```

Open `http://localhost:8765/`.

## Fonts

The kanji fonts contain only the characters that the pages use. If you add a new kanji to a page, run this command from the repo root:

```bash
python3 fonts/build.py
```

The script downloads the fonts from Google Fonts again and writes `fonts/fonts.css`.
