"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = ["吴", "锵", "皓"] as const;
const CHAR_PX = 30;

export function KanjiStrokeReveal() {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const HanziWriter = (await import("hanzi-writer")).default;
        if (cancelled) return;

        const container = containerRef.current;
        if (!container) return;

        const divs = container.querySelectorAll<HTMLDivElement>("[data-kanji]");

        const writers = Array.from(divs).map((el, i) =>
          HanziWriter.create(el, CHARS[i], {
            width: CHAR_PX,
            height: CHAR_PX,
            padding: 4,
            strokeColor: "#d4d4d8",
            outlineColor: "rgba(212,212,216,0.1)",
            drawingFadeDuration: 0,
            delayBetweenStrokes: 50,
            strokeAnimationSpeed: 1.1,
            showCharacter: false,
            showOutline: true,
          })
        );

        const alreadyPlayed = sessionStorage.getItem("entrance-played");
        const startDelay = alreadyPlayed ? 400 : 1400;

        const animate = (idx: number) => {
          if (cancelled || idx >= writers.length) return;
          writers[idx].animateCharacter({ onComplete: () => animate(idx + 1) });
        };

        setTimeout(() => {
          if (!cancelled) animate(0);
        }, startDelay);
      } catch {
        if (!cancelled) setError(true);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <span className="block font-kanji text-xl md:text-2xl text-zinc-300 tracking-[0.3em] mt-2 ml-1">
        吴锵皓
      </span>
    );
  }

  return (
    <span
      ref={containerRef}
      className="flex items-center mt-2 ml-1"
      style={{ gap: "0.35em" }}
      aria-label="吴锵皓"
    >
      {CHARS.map((char) => (
        <div
          key={char}
          data-kanji={char}
          style={{ width: CHAR_PX, height: CHAR_PX, flexShrink: 0 }}
        />
      ))}
    </span>
  );
}
