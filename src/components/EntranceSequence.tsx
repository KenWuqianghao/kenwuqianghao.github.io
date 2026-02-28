"use client";

import { useEffect, useState } from "react";

const CARDS = [
  { kanji: "始", bg: "#171717", color: "#fafaf9" },
  { kanji: "創", bg: "#dc2626", color: "#fafaf9" },
  { kanji: "無", bg: "#fafaf9", color: "#171717" },
  { kanji: "夢", bg: "#171717", color: "#dc2626" },
  { kanji: "命", bg: "#dc2626", color: "#171717" },
  { kanji: "魂", bg: "#fafaf9", color: "#dc2626" },
  { kanji: "幻", bg: "#171717", color: "#fafaf9" },
  { kanji: "紅", bg: "#dc2626", color: "#fafaf9" },
  { kanji: "刻", bg: "#171717", color: "#fafaf9" },
  { kanji: "光", bg: "#fafaf9", color: "#171717" },
];

const CARD_DURATION = 150; // ms per card
const TOTAL_CARDS_TIME = CARDS.length * CARD_DURATION; // 1500ms
const FADE_DURATION = 400;
const TOTAL_DURATION = TOTAL_CARDS_TIME + FADE_DURATION; // ~1900ms

export function EntranceSequence() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only play once per session
    if (sessionStorage.getItem("entrance-played")) {
      setDone(true);
      return;
    }

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("entrance-played", "1");
      setDone(true);
      return;
    }

    setShow(true);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      sessionStorage.setItem("entrance-played", "1");
      setDone(true);
    }, TOTAL_DURATION);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (done || !show) return null;

  return (
    <div className="entrance-overlay" aria-hidden="true">
      {CARDS.map((card, i) => (
        <div
          key={i}
          className="entrance-card"
          style={{
            backgroundColor: card.bg,
            color: card.color,
            animationDelay: `${i * CARD_DURATION}ms`,
          }}
        >
          {card.kanji}
        </div>
      ))}
      <div
        className="entrance-fade"
        style={{ animationDelay: `${TOTAL_CARDS_TIME}ms` }}
      />
    </div>
  );
}
