"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const ALL_EGGS = ["konami", "ora", "grace", "item", "nba", "tbc"] as const;
type EggId = (typeof ALL_EGGS)[number];

const STORAGE_KEY = "eggs-found";

export function EasterEggCounter() {
  const [found, setFound] = useState<Set<EggId>>(new Set());
  const [pulse, setPulse] = useState(false);
  const pulseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFound(new Set(JSON.parse(raw) as EggId[]));
    } catch { /* ignore */ }
  }, []);

  const discover = useCallback((id: EggId) => {
    if (!ALL_EGGS.includes(id)) return;
    setFound((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set([...prev, id]);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
    setPulse(true);
    if (pulseTimer.current) clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setPulse(false), 1800);
  }, []);

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

  return (
    <div
      className="fixed bottom-4 right-4 z-[9990] pointer-events-none select-none flex flex-col items-end gap-[3px]"
      style={{
        opacity: pulse ? 0.85 : 0.35,
        transition: "opacity 0.6s ease",
      }}
      aria-hidden="true"
    >
      <span
        className="font-mono uppercase"
        style={{ fontSize: "7px", letterSpacing: "0.35em", color: "#a1a1aa" }}
      >
        secrets
      </span>
      <div className="flex gap-[3px]">
        {ALL_EGGS.map((id) => (
          <span
            key={id}
            style={{
              display: "block",
              width: 5,
              height: 5,
              borderRadius: 1,
              background: found.has(id) ? "#d4d4d8" : "transparent",
              border: "1px solid rgba(212,212,216,0.32)",
              transition: "background 0.3s ease",
            }}
          />
        ))}
      </div>
      <span
        className="font-mono tabular-nums"
        style={{ fontSize: "7px", color: "#a1a1aa" }}
      >
        {found.size} / {ALL_EGGS.length}
      </span>
    </div>
  );
}
