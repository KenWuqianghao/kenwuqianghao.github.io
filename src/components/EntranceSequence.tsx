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

export function EntranceSequence() {
  const [cardIdx, setCardIdx] = useState(-1); // -1 = no card showing
  const [fadeOut, setFadeOut] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem("entrance-played")) {
      setDone(true);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("entrance-played", "1");
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Show each card in sequence — one at a time via React state
    for (let i = 0; i < CARDS.length; i++) {
      timers.push(setTimeout(() => setCardIdx(i), i * CARD_DURATION));
    }

    // Hide last card + begin white fade simultaneously
    const endTime = CARDS.length * CARD_DURATION;
    timers.push(setTimeout(() => {
      setCardIdx(-1);
      setFadeOut(true);
    }, endTime));

    // Unmount everything
    timers.push(setTimeout(() => {
      document.body.style.overflow = "";
      sessionStorage.setItem("entrance-played", "1");
      setDone(true);
      window.dispatchEvent(new CustomEvent("entrance-complete"));
    }, endTime + 450));

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  const card = cardIdx >= 0 ? CARDS[cardIdx] : null;

  return (
    <div className="entrance-overlay" aria-hidden="true">
      {card && (
        <div
          key={cardIdx}
          className="entrance-card"
          style={{ backgroundColor: card.bg, color: card.color }}
        >
          {card.kanji}
        </div>
      )}
      {fadeOut && <div className="entrance-fade" />}
    </div>
  );
}
