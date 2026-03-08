"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const ORA_CARDS = [
  { text: "ORA", bg: "#c8900a", color: "#1a1a1a" },
  { text: "ORA", bg: "#1a1a1a", color: "#c8900a" },
  { text: "ORA", bg: "#fafaf9", color: "#1a1a1a" },
  { text: "ORA!", bg: "#dc2626", color: "#fafaf9" },
  { text: "ORA", bg: "#c8900a", color: "#1a1a1a" },
  { text: "ORA ORA", bg: "#1a1a1a", color: "#fafaf9" },
  { text: "ORA ORA ORA", bg: "#dc2626", color: "#c8900a" },
  { text: "ORA ORA ORA", bg: "#1a1a1a", color: "#c8900a" },
  { text: "ORA!!!", bg: "#c8900a", color: "#1a1a1a" },
  { text: "ORA ORA ORA ORA", bg: "#fafaf9", color: "#dc2626" },
  { text: "ORA ORA ORA ORA ORA", bg: "#1a1a1a", color: "#fafaf9" },
  { text: "やれやれだぜ", bg: "#dc2626", color: "#c8900a" },
];

const CARD_MS = 110;
const TOTAL_MS = ORA_CARDS.length * CARD_MS + 400;

export function OraOra() {
  const [active, setActive] = useState(false);
  const clickTimesRef = useRef<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dispatched = useRef(false);

  const trigger = useCallback(() => {
    if (active) return;
    setActive(true);
    if (!dispatched.current) {
      dispatched.current = true;
      window.dispatchEvent(new CustomEvent("egg-found", { detail: { id: "ora" } }));
    }
    document.body.style.overflow = "hidden";
    timerRef.current = setTimeout(() => {
      document.body.style.overflow = "";
      setActive(false);
    }, TOTAL_MS);
  }, [active]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onHeroClick = () => {
      const now = Date.now();
      clickTimesRef.current = [...clickTimesRef.current, now].filter(
        (t) => now - t < 2000
      );
      if (clickTimesRef.current.length >= 7) {
        clickTimesRef.current = [];
        trigger();
      }
    };

    window.addEventListener("hero-name-click", onHeroClick);
    return () => window.removeEventListener("hero-name-click", onHeroClick);
  }, [trigger]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] pointer-events-none"
      aria-hidden="true"
    >
      {ORA_CARDS.map((card, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center font-display font-light"
          style={{
            backgroundColor: card.bg,
            color: card.color,
            fontSize: "clamp(3.5rem, 14vw, 11rem)",
            letterSpacing: "-0.02em",
            opacity: 0,
            animation: `entrance-flash ${CARD_MS}ms steps(1) ${i * CARD_MS}ms forwards`,
          }}
        >
          {card.text}
        </div>
      ))}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#fafaf9",
          opacity: 0,
          animation: `entrance-fade-out 400ms ease-out ${ORA_CARDS.length * CARD_MS}ms forwards`,
        }}
      />
    </div>
  );
}
