"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = [
  "The work never ends.",
  "Back again.",
  "Still here.",
  "I'll find a way.",
  "One more attempt.",
  "Not done yet.",
  "Almost.",
  "Keep going.",
  "The darkness is... familiar.",
  "I keep coming back.",
  "Dead but not discouraged.",
  "Blood price paid.",
  "Let's see what else you've built.",
  "Father would not approve of this.",
];

const MIN_IDLE_MS = 13_000;
const RAND_EXTRA_MS = 10_000;
const SHOW_MS = 4_000;

export function HadesDialogue() {
  const [quote, setQuote] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let dismissTimer: ReturnType<typeof setTimeout> | null = null;
    let lastIdx = -1;

    const show = () => {
      let idx: number;
      do {
        idx = Math.floor(Math.random() * QUOTES.length);
      } while (idx === lastIdx && QUOTES.length > 1);
      lastIdx = idx;
      setQuote(QUOTES[idx]);

      if (dismissTimer) clearTimeout(dismissTimer);
      dismissTimer = setTimeout(() => {
        setQuote(null);
        schedule();
      }, SHOW_MS);
    };

    const schedule = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(show, MIN_IDLE_MS + Math.random() * RAND_EXTRA_MS);
    };

    const onActivity = () => schedule();

    const events = [
      "mousemove",
      "keydown",
      "touchstart",
      "scroll",
      "click",
    ] as const;
    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));
    schedule();

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      if (dismissTimer) clearTimeout(dismissTimer);
      events.forEach((e) => window.removeEventListener(e, onActivity));
    };
  }, []);

  return (
    <AnimatePresence>
      {quote && (
        <motion.div
          className="fixed bottom-8 left-8 z-[9993] pointer-events-none"
          initial={{ opacity: 0, x: -14, y: 6 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -10, y: 4 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <div
            className="flex items-start gap-2.5 px-4 py-3"
            style={{
              background: "rgba(7,3,13,0.94)",
              border: "1px solid rgba(140,16,16,0.35)",
              borderLeft: "2px solid #961414",
              boxShadow:
                "0 4px 28px rgba(0,0,0,0.65), 0 0 20px rgba(120,8,8,0.08)",
              maxWidth: "215px",
            }}
          >
            <span className="shrink-0 mt-0.5 text-[8px]" style={{ color: "#961414" }}>
              ◆
            </span>
            <div className="flex flex-col gap-0.5">
              <span
                className="font-mono text-[7px] uppercase tracking-[0.3em]"
                style={{ color: "#4d1010" }}
              >
                Zagreus
              </span>
              <span
                className="font-display italic text-sm leading-snug"
                style={{ color: "#dfc9a0" }}
              >
                &ldquo;{quote}&rdquo;
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
