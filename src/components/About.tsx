"use client";

import type { ReactNode } from "react";
import { personalInfo } from "@/lib/data";
import { ScrollReveal } from "./ScrollReveal";

const route = [
  { flag: "🇮🇹", label: "Born" },
  { flag: "🇨🇳", label: "Raised" },
  { flag: "🇨🇦", label: "Studied" },
  { flag: "🇬🇧", label: "Exchanged" },
  { flag: "🇺🇸", label: "Incoming" },
];

const linkClass =
  "underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600 hover:text-red-600 transition-colors duration-300";

const facets: { kanji: string; label: string; text: ReactNode; hint?: boolean }[] = [
  {
    kanji: "球",
    label: "NBA",
    text: "Mavs fan. Favorite player is Kevin Durant.",
  },
  {
    kanji: "将",
    label: "Chess",
    text: (
      <>
        Beaten titled players. Waterloo Chess Club and Lancaster Chess Society.{" "}
        <a
          href="https://lichess.org/@/KenWuu"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Lichess
        </a>
        {" · "}
        <a
          href="https://www.chess.com/member/kenwuu"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Chess.com
        </a>
      </>
    ),
  },
  {
    kanji: "哲",
    label: "Philosophy",
    text: "Studied philosophy at Waterloo. Ancient Greek science and thought stuck. Next: Hegel, Spinoza, and Berkeley.",
  },
  {
    kanji: "余",
    label: "Off-duty",
    text: (
      <>
        Travel, new food, galleries, and museums — photos on{" "}
        <a
          href={`https://www.instagram.com/${personalInfo.instagram}/`}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Instagram
        </a>
        {" and "}
        <a
          href={`https://x.com/${personalInfo.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          X
        </a>
        . Chess, poker, basketball, anime, and manga. JoJo Part 7 is the favorite.
      </>
    ),
    hint: true,
  },
];

export function About() {
  return (
    <section className="py-32 md:py-48 relative overflow-hidden">
      {/* Section kanji watermark */}
      <div className="absolute top-0 -right-8 font-kanji text-[18rem] md:text-[28rem] text-zinc-900/[0.02] leading-none select-none pointer-events-none gate-weave parallax-watermark">
        人
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <ScrollReveal tilt={-1}>
          <div className="mb-20 md:mb-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] text-red-600 uppercase tracking-[0.3em]">
                素顔 — Beyond Code
              </span>
              <button
                className="font-mono text-[11px] text-zinc-300/25 hover:text-red-600/50 transition-colors duration-500 cursor-pointer select-none leading-none"
                onClick={() => window.dispatchEvent(new Event("item-obtained"))}
                aria-hidden="true"
                tabIndex={-1}
              >
                ♦
              </button>
            </div>
            <h2
              className="text-6xl md:text-8xl lg:text-9xl font-display font-light tracking-tighter text-zinc-900 glitch-hover"
              data-text="Beyond Code"
            >
              Beyond Code
            </h2>
          </div>
        </ScrollReveal>

        {/* Route */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap items-start gap-4 md:gap-6">
            {route.map((stop, i) => (
              <span key={stop.label} className="inline-flex items-center gap-4 md:gap-6">
                <span className="flex flex-col items-center gap-1.5">
                  <span className="text-2xl md:text-3xl">{stop.flag}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-400">
                    {stop.label}
                  </span>
                </span>
                {i < route.length - 1 && (
                  <span className="font-mono text-red-600/40 text-[10px] select-none">―</span>
                )}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Facets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-14 mt-20 md:mt-28">
          {facets.map((facet, i) => (
            <ScrollReveal key={facet.label} delay={0.15 + i * 0.1} tilt={i % 2 === 0 ? -0.5 : 0.5}>
              <div className="group relative">
                {/* Red tick */}
                <div className="absolute -left-4 top-0 w-[3px] h-6 bg-red-600" />

                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-kanji text-3xl md:text-4xl text-zinc-200 group-hover:text-red-600 transition-colors duration-300">
                    {facet.kanji}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    {facet.label}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-[46ch] cursor-default transition-colors duration-300 group-hover:text-zinc-700">
                  {facet.text}
                  {facet.hint && (
                    <a
                      href="/shrine"
                      aria-hidden="true"
                      tabIndex={-1}
                      style={{ opacity: 0.04, marginLeft: "0.3em", textDecoration: "none", color: "inherit" }}
                    >
                      ★
                    </a>
                  )}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
