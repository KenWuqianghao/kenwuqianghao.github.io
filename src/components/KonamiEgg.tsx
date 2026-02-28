"use client";

import { useEffect, useState, useCallback } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const FLASH_CARDS = [
  { text: "7 INTERNSHIPS", bg: "#171717", color: "#fafaf9" },
  { text: "NEO SCHOLAR", bg: "#dc2626", color: "#fafaf9" },
  { text: "5X HACKATHON WINNER", bg: "#fafaf9", color: "#171717" },
  { text: "STANFORD INSTRUCTOR", bg: "#171717", color: "#dc2626" },
  { text: "WATERLOO CS '26", bg: "#dc2626", color: "#171717" },
  { text: "NOKIA · TD · AUGUST", bg: "#fafaf9", color: "#dc2626" },
  { text: "HEALTH CANADA · INTAPP", bg: "#171717", color: "#fafaf9" },
  { text: "ML · SYSTEMS · SWE", bg: "#dc2626", color: "#fafaf9" },
  { text: "4 COUNTRIES", bg: "#fafaf9", color: "#171717" },
  { text: "吴锵皓", bg: "#171717", color: "#dc2626" },
  { text: "LET'S BUILD.", bg: "#dc2626", color: "#fafaf9" },
];

const CARD_MS = 180;
const TOTAL_MS = FLASH_CARDS.length * CARD_MS + 500;

export function KonamiEgg() {
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);

  const trigger = useCallback(() => {
    if (active) return;
    setActive(true);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      document.body.style.overflow = "";
      setActive(false);
      setDone(false);
    }, TOTAL_MS);
  }, [active]);

  useEffect(() => {
    let buffer: string[] = [];

    const onKey = (e: KeyboardEvent) => {
      buffer.push(e.key);
      buffer = buffer.slice(-KONAMI.length);

      if (buffer.length === KONAMI.length && buffer.every((k, i) => k === KONAMI[i])) {
        buffer = [];
        trigger();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [trigger]);

  if (!active && done) return null;
  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] pointer-events-none"
      aria-hidden="true"
    >
      {FLASH_CARDS.map((card, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center font-mono text-sm md:text-xl lg:text-2xl uppercase tracking-[0.3em] font-bold"
          style={{
            backgroundColor: card.bg,
            color: card.color,
            opacity: 0,
            animation: `entrance-flash ${CARD_MS}ms steps(1) ${i * CARD_MS}ms forwards`,
          }}
        >
          {card.text}
        </div>
      ))}
      <div
        className="absolute inset-0 bg-stone-50"
        style={{
          opacity: 0,
          animation: `entrance-fade-out 500ms ease-out ${FLASH_CARDS.length * CARD_MS}ms forwards`,
        }}
      />
    </div>
  );
}
