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
const SHOW_MS = 5_000;

// Hades game palette
const BORDER_GOLD = "#b8922a";
const INNER_GOLD = "#d4a83a";
const BG_DARK = "#0e0812";
const BG_PANEL = "#1a0d24";

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
          className="fixed bottom-6 left-4 md:left-8 z-[9993] pointer-events-none"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          style={{ maxWidth: "min(400px, 90vw)" }}
        >
          {/* Outer gold frame */}
          <div
            style={{
              background: BG_DARK,
              border: `2px solid ${BORDER_GOLD}`,
              boxShadow: `0 0 0 1px #3a2010, 0 0 0 3px ${BORDER_GOLD}33, 0 12px 48px rgba(0,0,0,0.85), 0 0 32px rgba(184,146,42,0.12)`,
              padding: "2px",
            }}
          >
            {/* Inner panel */}
            <div
              style={{
                background: `linear-gradient(160deg, ${BG_PANEL} 0%, #120a1c 100%)`,
                border: `1px solid ${INNER_GOLD}44`,
              }}
            >
              {/* Portrait + dialogue row */}
              <div className="flex items-stretch">
                {/* Portrait frame */}
                <div
                  className="relative shrink-0 overflow-hidden"
                  style={{
                    width: "72px",
                    borderRight: `1px solid ${BORDER_GOLD}55`,
                    background: "linear-gradient(180deg, #1e0d2e 0%, #0c0618 100%)",
                  }}
                >
                  {/* Corner ornaments */}
                  <div
                    className="absolute top-0 left-0 w-3 h-3"
                    style={{
                      borderTop: `1px solid ${INNER_GOLD}`,
                      borderLeft: `1px solid ${INNER_GOLD}`,
                    }}
                  />
                  <div
                    className="absolute top-0 right-0 w-3 h-3"
                    style={{
                      borderTop: `1px solid ${INNER_GOLD}`,
                      borderRight: `1px solid ${INNER_GOLD}`,
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-3 h-3"
                    style={{
                      borderBottom: `1px solid ${INNER_GOLD}`,
                      borderLeft: `1px solid ${INNER_GOLD}`,
                    }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3"
                    style={{
                      borderBottom: `1px solid ${INNER_GOLD}`,
                      borderRight: `1px solid ${INNER_GOLD}`,
                    }}
                  />
                  {/* Zagreus portrait — cropped to face */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://static.wikia.nocookie.net/hades_gamepedia_en/images/2/29/Zagreus.png/revision/latest?cb=20181210044005"
                    alt="Zagreus"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      opacity: 0.92,
                      filter: "saturate(1.1) contrast(1.05)",
                      display: "block",
                    }}
                  />
                  {/* Red eye glow overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 38%, rgba(180,20,20,0.12) 0%, transparent 65%)",
                    }}
                  />
                </div>

                {/* Dialogue content */}
                <div className="flex flex-col flex-1 min-w-0">
                  {/* Name bar */}
                  <div
                    className="px-3 py-1.5 flex items-center gap-2"
                    style={{
                      background: `linear-gradient(90deg, ${BORDER_GOLD}28 0%, transparent 100%)`,
                      borderBottom: `1px solid ${BORDER_GOLD}44`,
                    }}
                  >
                    {/* Blood-red diamond */}
                    <span style={{ color: "#c0282e", fontSize: "7px", lineHeight: 1 }}>◆</span>
                    <span
                      className="font-mono uppercase tracking-[0.22em]"
                      style={{ fontSize: "9px", color: INNER_GOLD, letterSpacing: "0.22em" }}
                    >
                      Zagreus
                    </span>
                  </div>

                  {/* Quote text */}
                  <div className="px-3 py-2.5 flex-1">
                    <motion.p
                      key={quote}
                      className="font-display italic leading-snug"
                      style={{
                        fontSize: "clamp(0.75rem, 1.8vw, 0.85rem)",
                        color: "#e8d8b8",
                        lineHeight: 1.45,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                    >
                      &ldquo;{quote}&rdquo;
                    </motion.p>
                  </div>

                  {/* Blinking continue indicator */}
                  <div
                    className="px-3 pb-1.5 flex justify-end"
                    style={{ borderTop: `1px solid ${BORDER_GOLD}22` }}
                  >
                    <motion.span
                      className="font-mono"
                      style={{ fontSize: "8px", color: `${INNER_GOLD}88` }}
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ▼
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
