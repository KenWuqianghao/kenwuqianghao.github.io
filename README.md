# kenwu.is-a.dev

Personal portfolio built as a love letter to SHAFT and Akiyuki Shinbo's visual directing style. Every interaction, transition, and idle state is designed to feel like navigating a scene from *Bakemonogatari* or *Sayonara Zetsubou-Sensei* rather than scrolling a conventional developer portfolio.

## SHAFT / Shinbo Design Language

The site translates Shinbo's cinematic vocabulary into web interactions:

**Entrance Sequence** — On first load, a Three.js particle animation plays: thousands of particles converge from a scattered cloud into glowing text, then dissolve. Plays once per session, gated by sessionStorage.

**Kanji Name Stroke Animation** — The Chinese name 吴锵皓 beneath the hero title traces out stroke-by-stroke on load using `hanzi-writer`, pulling per-character SVG path data from the Make Me A Hanzi dataset. Each character animates sequentially in correct calligraphic stroke order against a faint ghost outline, then holds. Falls back to static text if the CDN request fails.

**Kanji Column Rain** — Seven CSS-animated columns of falling kanji/katakana/hiragana characters are fixed at the viewport edges (left, center, right). Each column scrolls downward at a different speed (29–45 seconds per cycle) with staggered offsets for a seamless loop. Opacity 0.042–0.065 — barely visible, SHAFT watermark aesthetic. Pure CSS/DOM, no canvas.

**Ambient Kanji Watermarks** — Large, nearly-invisible kanji (opacity 0.02–0.04) float at section edges and drift with a slow organic gate-weave animation, mimicking the incidental typography SHAFT places in negative space.

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

**ORA ORA ORA** — Click the hero name (Ken / Wu) 7 times within 2 seconds. Rapid-fire flash cards erupt in JoJo gold/black/red palette. Ends with やれやれだぜ.

**Menacing ゴゴゴゴ** — While the hero section is in view, ゴ characters continuously float upward and fade in the classic JoJo menacing style.

**To Be Continued →** — Scroll all the way to the bottom and pause. After 0.6 seconds a sepia wash falls over the screen and the iconic JoJo arrow PNG fades in at the lower left, rendered with `mix-blend-mode: multiply` over the warm overlay.

**Item Obtained** — Find the nearly-invisible ♦ symbol next to "素顔 — Beyond Code" in the About section and click it. A Zelda BotW/TotK–style Sheikah item screen appears: dark slate background with a subtle cyan grid, SVG Triforce in gold with a spinning Sheikah runic ring and cyan sparkles, Sheikah corner-bracket panel, and the actual BotW item jingle from `/item_botw.mp3`. Press any key or click to dismiss.

**Lost Grace Discovered** — Click the "Software Engineer & ML Researcher" subtitle in the hero. A full-screen Elden Ring overlay fades in: near-black warm atmosphere, a narrow golden beam descending from the top, rising golden motes, and the grace name rendered in Elden Ring typography with a deep gold glow. Plays the actual Lost Grace discovered sound from `/lost_grace_discovered.mp3`. The text turns gold permanently after the first click and re-triggers the overlay on every subsequent click.

**NBA Player Card** — Leave the site idle for 45 seconds. A Warriors-era KD 2K card appears: OVR ??, MID 69 (nice), 3PT KD35, PHY KD7, IQ ∞, HND 42, ALGN ??, with THE SLIM REAPER badge and #35 watermark.

**Easter Egg Counter** — A small HUD in the bottom-right corner tracks all 6 discoverable easter eggs as a row of squares (`secrets · □□□□□□ · 0/6`). Always visible at low opacity; pulses brighter when a new egg fills in. Persists across sessions via localStorage. When all 6 are collected, a rapid SHAFT-style flash sequence fires — `全` → `SECRETS` → `DISCOVERED` → `6/6` → `吴锵皓` — and the counter dots turn red permanently.

**Secret Shrine** — Navigate to `/shrine` to find a hidden alternate version of the portfolio styled as a JoJo × Persona 5 fusion: near-black background with halftone dot texture and diagonal speed-line hatching, ゴゴゴゴ ambient text on both edges, and the full site content reimagined through a dark game-UI lens. The hero section presents a stand user card (Stand: DEEP PURPLE, Arcana: THE MAGICIAN) with JoJo-style stat bars. Experience becomes Battle History in chapter cards, projects become Operations, skills become Stand Abilities. A barely-visible `★` in the About section's Off-duty facet links here for those paying close attention.

**Post-Processing Stack** — Three.js EffectComposer applies chromatic aberration, additive noise, bloom (threshold 0.9), and custom scanlines over the entire canvas layer. Every pixel goes through the SHAFT filter.

## Skills Constellation

The Skills section renders a live 3D graph using React Three Fiber. Three category hub nodes — Languages (red), Tech & Cloud (charcoal), Libraries & Frameworks (zinc) — each pulse with a spinning torus ring and a colored point light. Skill nodes orbit each hub and connect to it via translucent edge lines; the three hubs are connected to each other with slightly more visible hub–hub edges. A sidebar lists all skills by category; clicking any skill smoothly pans the camera (via OrbitControls target lerp) to focus on that node in the constellation. Auto-rotation pauses while a node is selected.

## Color Palette

Three colors only, matching SHAFT's high-contrast aesthetic:

| Role    | Hex       |
|---------|-----------|
| Red     | `#dc2626` |
| Black   | `#171717` |
| White   | `#fafaf9` |

Zinc grays (`#e4e4e7`, `#a1a1aa`) appear only in secondary text. The red `::selection` highlight and red scrollbar accent reinforce the palette everywhere.

## Typography

- **Cormorant Garamond** (display) — Elegant serif for the hero name and Latin display typography. Light weight (300).
- **Shippori Mincho** (kanji) — Traditional Japanese Mincho typeface for all kanji watermarks and the Chinese name 吴锵皓. Thin strokes and classical serifs match the SHAFT aesthetic.
- **Outfit** (body) — Clean geometric sans-serif for readability in content sections.
- **JetBrains Mono** (mono) — Monospace for labels, tags, and technical metadata.

## Tech Stack

- **Next.js 16** — App Router, server components, `next/font` optimization
- **React 19** + **TypeScript**
- **Tailwind CSS 4** — Utility-first styling with `@theme` token system
- **Three.js** via **React Three Fiber** + **Drei** — Particle text entrance, skill constellation, wireframe grid
- **hanzi-writer** — SVG stroke-order animation for Chinese characters
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
