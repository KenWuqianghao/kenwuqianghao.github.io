"use client";

import { useState } from "react";
import { AmbientKanji } from "./FlashFrames";
import { KANJI_CHARS } from "@/lib/shinbo";

const COLUMN_CONFIGS = [
  // left edge
  { left: "1.5vw",  dur: 38, delay: 0,    opacity: 0.055, fontSize: "1.15rem", hideOnMobile: false },
  { left: "5vw",    dur: 44, delay: -12,   opacity: 0.045, fontSize: "1.1rem",  hideOnMobile: false },
  { left: "9vw",    dur: 31, delay: -6,    opacity: 0.06,  fontSize: "1.25rem", hideOnMobile: true  },
  // center-ish
  { left: "44vw",   dur: 42, delay: -20,   opacity: 0.042, fontSize: "1.1rem",  hideOnMobile: true  },
  // right edge
  { left: "88vw",   dur: 35, delay: -8,    opacity: 0.055, fontSize: "1.2rem",  hideOnMobile: true  },
  { left: "93vw",   dur: 45, delay: -18,   opacity: 0.048, fontSize: "1.1rem",  hideOnMobile: false },
  { left: "97vw",   dur: 29, delay: -3,    opacity: 0.065, fontSize: "1.3rem",  hideOnMobile: false },
];

function KanjiColumn({
  left, dur, delay, opacity, fontSize, hideOnMobile,
}: typeof COLUMN_CONFIGS[number]) {
  const [chars] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return Array.from({ length: 32 }, () =>
      KANJI_CHARS[Math.floor(Math.random() * KANJI_CHARS.length)]
    );
  });

  return (
    <div
      className={hideOnMobile ? "hidden md:block" : undefined}
      style={{
        position: "fixed",
        top: 0,
        left,
        width: "1.6rem",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 1,
      }}
      aria-hidden="true"
      suppressHydrationWarning
    >
      <div
        className="kanji-col-inner"
        style={{
          display: "flex",
          flexDirection: "column",
          animation: `kanji-fall ${dur}s linear ${delay}s infinite`,
          fontFamily: "var(--font-kanji)",
          fontSize,
          color: "#171717",
          opacity,
          lineHeight: 1.4,
          writingMode: "vertical-rl",
        }}
      >
        {/* doubled for seamless loop */}
        {[...chars, ...chars].map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </div>
    </div>
  );
}

export function ShinboEffects() {
  return (
    <>
      <style>{`
        @keyframes kanji-fall {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kanji-col-inner { animation: none !important; }
        }
      `}</style>
      {COLUMN_CONFIGS.map((cfg, i) => (
        <KanjiColumn key={i} {...cfg} />
      ))}
      <AmbientKanji />
    </>
  );
}
