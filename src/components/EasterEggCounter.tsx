"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const ALL_EGGS = ["konami", "ora", "grace", "item", "nba", "tbc"] as const;
type EggId = (typeof ALL_EGGS)[number];

const STORAGE_KEY = "eggs-found";
const COMPLETE_KEY = "eggs-complete-seen";

const FLASH_CARDS = [
  { bg: "#171717", color: "#fafaf9", text: "全" },
  { bg: "#dc2626", color: "#fafaf9", text: "SECRETS" },
  { bg: "#fafaf9", color: "#171717", text: "DISCOVERED" },
  { bg: "#dc2626", color: "#171717", text: `${ALL_EGGS.length} / ${ALL_EGGS.length}` },
  { bg: "#171717", color: "#dc2626", text: "吴锵皓" },
];
const CARD_MS = 180;
const TOTAL_MS = FLASH_CARDS.length * CARD_MS + 500;

export function EasterEggCounter() {
  const [found, setFound] = useState<Set<EggId>>(new Set());
  const [pulse, setPulse] = useState(false);
  const [complete, setComplete] = useState(false);
  const [flashing, setFlashing] = useState(false);
  const pulseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completeFired = useRef(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ids = JSON.parse(raw) as EggId[];
        setFound(new Set(ids));
        if (ids.length >= ALL_EGGS.length) setComplete(true);
      }
      if (localStorage.getItem(COMPLETE_KEY)) completeFired.current = true;
    } catch { /* ignore */ }
  }, []);

  const triggerComplete = useCallback(() => {
    if (completeFired.current) return;
    completeFired.current = true;
    try { localStorage.setItem(COMPLETE_KEY, "1"); } catch { /* ignore */ }
    setFlashing(true);
    document.documentElement.style.overflow = "hidden";
    setTimeout(() => {
      document.documentElement.style.overflow = "";
      setFlashing(false);
      setComplete(true);
    }, TOTAL_MS);
  }, []);

  const discover = useCallback((id: EggId) => {
    if (!ALL_EGGS.includes(id)) return;
    let isNewComplete = false;
    setFound((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set([...prev, id]);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch { /* ignore */ }
      if (next.size === ALL_EGGS.length) isNewComplete = true;
      return next;
    });
    setPulse(true);
    if (pulseTimer.current) clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setPulse(false), 1800);
    if (isNewComplete) triggerComplete();
  }, [triggerComplete]);

  useEffect(() => {
    const onEgg = (e: Event) => {
      const id = (e as CustomEvent<{ id: EggId }>).detail?.id;
      if (id) discover(id);
    };
    const onGrace = () => discover("grace");
    const onItem = () => discover("item");

    window.addEventListener("egg-found", onEgg);
    window.addEventListener("grace-discovered", onGrace);
    window.addEventListener("item-obtained", onItem);

    return () => {
      window.removeEventListener("egg-found", onEgg);
      window.removeEventListener("grace-discovered", onGrace);
      window.removeEventListener("item-obtained", onItem);
      if (pulseTimer.current) clearTimeout(pulseTimer.current);
    };
  }, [discover]);

  const dotColor = complete ? "#dc2626" : "#d4d4d8";

  return (
    <>
      {/* Completion flash sequence */}
      {flashing && (
        <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
          {FLASH_CARDS.map((card, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center font-kanji"
              style={{
                backgroundColor: card.bg,
                color: card.color,
                fontSize: "clamp(3rem, 15vw, 10rem)",
                letterSpacing: "0.05em",
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
              background: "#fafaf9",
              opacity: 0,
              animation: `entrance-fade-out 500ms ease-out ${FLASH_CARDS.length * CARD_MS}ms forwards`,
            }}
          />
        </div>
      )}

      {/* Counter HUD */}
      <div
        className="fixed bottom-4 right-4 z-[9990] pointer-events-none select-none flex flex-col items-end gap-[3px]"
        style={{
          opacity: pulse || complete ? 0.85 : 0.35,
          transition: "opacity 0.6s ease",
        }}
        aria-hidden="true"
      >
        <span
          className="font-mono uppercase"
          style={{ fontSize: "10px", letterSpacing: "0.3em", color: complete ? "#dc2626" : "#a1a1aa" }}
        >
          {complete ? "complete" : "secrets"}
        </span>
        <div className="flex gap-1.5">
          {ALL_EGGS.map((id) => (
            <span
              key={id}
              style={{
                display: "block",
                width: 10,
                height: 10,
                borderRadius: 2,
                background: found.has(id) ? dotColor : "transparent",
                border: `1px solid ${found.has(id) ? dotColor + "88" : "rgba(212,212,216,0.45)"}`,
                transition: "background 0.4s ease, border-color 0.4s ease",
              }}
            />
          ))}
        </div>
        <span
          className="font-mono tabular-nums"
          style={{ fontSize: "10px", color: complete ? "#dc2626" : "#a1a1aa" }}
        >
          {found.size} / {ALL_EGGS.length}
        </span>
      </div>
    </>
  );
}
