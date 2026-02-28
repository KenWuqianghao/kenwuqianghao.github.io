# kenwu.is-a.dev

Personal portfolio built as a love letter to SHAFT and Akiyuki Shinbo's visual directing style. Every interaction, transition, and idle state is designed to feel like navigating a scene from *Bakemonogatari* or *Sayonara Zetsubou-Sensei* rather than scrolling a conventional developer portfolio.

## SHAFT / Shinbo Design Language

The site translates Shinbo's cinematic vocabulary into web interactions:

**Entrance Sequence** — On first load, rapid-fire kanji title cards (始, 創, 無, 夢, 命, 魂, 幻, 紅, 刻, 光) flash in alternating red/black/white frames at 150ms intervals. Directly inspired by the eyecatch cards in *Monogatari* series. Plays once per session.

**Kanji Particle Rain** — A full-viewport Three.js layer renders 300 falling katakana/hiragana/kanji characters as instanced quads from a texture atlas. Characters drift, flash red probabilistically, and repel from the cursor. Think the background text in any SHAFT dialogue scene.

**Ambient Kanji Watermarks** — Large, nearly-invisible kanji (opacity 0.04–0.09) float at viewport edges and cycle every 6 seconds, mimicking the incidental typography SHAFT places in negative space.

**Film Grain & Scanlines** — SVG fractal noise overlay at 3.5% opacity plus CRT scanlines via a custom post-processing shader. Gives the clean digital layout a tactile, cel-animation quality.

**Red Thread** — A scroll-linked SVG line on the left edge that reveals angular segments as you scroll, referencing the red string of fate motif and SHAFT's love of geometric linework.

**Section Cuts** — Between content sections, a horizontal line animates from scaleX(0) to full width and then fades to zero—replicating the hard white-flash scene transitions Shinbo uses between acts.

**Glitch-on-Hover** — Text elements split into red and blue chromatic layers with stepped offset animations on hover, inspired by the chromatic aberration artifacts in *Madoka Magica*'s witch labyrinths.

**Head Tilt** — Elements rotate -2° on hover via a cubic-bezier spring. The iconic Shinbo head tilt, translated to UI.

**CRT Weight Flicker** — The hero title's font-weight rapidly cycles between 300/600/700 on load, simulating the instability of old CRT displays.

**Gate Weave** — Kanji watermarks drift with a slow, organic transform cycle (translate + rotate), mimicking the gate weave artifact in projected film.

**Cursor Trail** — 8 red dots follow the mouse with spring-based easing, each trailing the one ahead. Evokes a calligraphy brush stroke.

**Flash Frames** — Randomized full-viewport color flashes (red, black, white) triggered at intervals. Pure Shinbo.

**Konami Code Easter Egg** — `↑↑↓↓←→←→BA` triggers a rapid-fire highlight reel of achievements displayed as Monogatari-style title cards.

**Post-Processing Stack** — Three.js EffectComposer applies chromatic aberration, additive noise, bloom (threshold 0.9), and custom scanlines over the entire canvas layer. Every pixel goes through the SHAFT filter.

## Color Palette

Three colors only, matching SHAFT's high-contrast aesthetic:

| Role    | Hex       |
|---------|-----------|
| Red     | `#dc2626` |
| Black   | `#171717` |
| White   | `#fafaf9` |

Zinc grays (`#e4e4e7`, `#a1a1aa`) appear only in secondary text. The red `::selection` highlight and red scrollbar accent reinforce the palette everywhere.

## Typography

- **Cormorant Garamond** (display) — Elegant serif for the hero name and kanji-adjacent typography. Light weight (300) gives it the delicate quality of Japanese typesetting.
- **Outfit** (body) — Clean geometric sans-serif for readability in content sections.
- **JetBrains Mono** (mono) — Monospace for labels, tags, and technical metadata.

## Tech Stack

- **Next.js 16** — App Router, server components, `next/font` optimization
- **React 19** + **TypeScript**
- **Tailwind CSS 4** — Utility-first styling with `@theme` token system
- **Three.js** via **React Three Fiber** + **Drei** — Instanced particle system, wireframe grid, orthographic canvas
- **React Three Postprocessing** — Chromatic aberration, bloom, noise, custom scanline shader
- **Framer Motion** — Scroll-triggered reveals, spring animations, viewport-aware transitions
- **Phosphor Icons** — Icon system

## Accessibility

All visual effects respect `prefers-reduced-motion`. Entrance sequence, film jitter, gate weave, cursor trail, and flash frames are suppressed entirely when the user's OS requests reduced motion. Decorative elements are marked `aria-hidden="true"`.

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
