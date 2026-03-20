"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IDLE_MS = 45_000;

// Warriors gold / KD palette
const GOLD = "#FFC72C";
const BLUE = "#1D428A";

const ATTRIBUTES = [
  { label: "MID",  value: 99,   color: GOLD },
  { label: "3PT",  value: 95,   color: GOLD },
  { label: "PHY",  value: 88,   color: "#4a8fe8" },
  { label: "IQ",   value: 96,   color: GOLD },
  { label: "HND",  value: 87,   color: "#4a8fe8" },
  { label: "ALGN", value: null, color: "#3a3a4a" },
];

function AttributeBar({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: number | null;
  color: string;
  delay: number;
}) {
  const pct = value !== null ? (value / 99) * 100 : 0;
  const shown = value !== null ? String(value) : "??";;

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className="font-mono text-[9px] uppercase tracking-[0.15em] shrink-0 w-10 text-right"
        style={{ color: "#44445a" }}
      >
        {label}
      </span>
      <span
        className="font-mono text-[11px] font-bold shrink-0 w-6 text-right"
        style={{ color: value !== null ? color : "#2a2a3a" }}
      >
        {shown}
      </span>
      <div
        className="flex-1 h-[3px] rounded-full overflow-hidden"
        style={{ background: "#1a1a2e" }}
      >
        {value !== null && (
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{
              delay: delay + 0.15,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

function AutoDismiss({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 6500);
    return () => clearTimeout(t);
  }, [onDismiss]);
  return null;
}

export function ProfileCard() {
  const [visible, setVisible] = useState(false);
  const dispatched = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setVisible(true);
        if (!dispatched.current) {
          dispatched.current = true;
          window.dispatchEvent(new CustomEvent("egg-found", { detail: { id: "nba" } }));
        }
      }, IDLE_MS);
    };

    const events = [
      "mousemove",
      "keydown",
      "touchstart",
      "scroll",
      "click",
    ] as const;
    events.forEach((e) => window.addEventListener(e, schedule, { passive: true }));
    schedule();

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, schedule));
    };
  }, []);

  const dismiss = () => setVisible(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9997] flex items-center justify-center cursor-pointer px-6"
          style={{ backgroundColor: "rgba(0,0,0,0.93)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={dismiss}
          aria-hidden="true"
        >
          <AutoDismiss onDismiss={dismiss} />

          {/* KD Warriors Card */}
          <motion.div
            className="relative overflow-hidden select-none"
            style={{
              width: "min(340px, 90vw)",
              borderRadius: "12px",
              border: `1px solid ${BLUE}55`,
              boxShadow: `0 0 0 1px #0a0f1e, 0 32px 80px rgba(0,0,0,0.85), 0 0 60px ${BLUE}22`,
              background: "#090d18",
            }}
            initial={{ scale: 0.85, opacity: 0, y: 30, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header — Warriors blue */}
            <div
              className="relative px-6 pt-5 pb-8 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #00091e 0%, ${BLUE} 45%, #0d1525 78%, #090d18 100%)`,
              }}
            >
              {/* Top bar */}
              <motion.div
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <span
                  className="font-mono text-[8px] uppercase tracking-[0.35em]"
                  style={{ color: `${GOLD}88` }}
                >
                  2K CARD
                </span>
                <span
                  className="font-mono text-[8px] uppercase tracking-[0.25em]"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  CS &apos;26
                </span>
              </motion.div>

              {/* OVR + Name */}
              <div className="flex items-end gap-5">
                {/* OVR block */}
                <motion.div
                  className="flex flex-col items-center leading-none shrink-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className="font-display font-light"
                    style={{
                      fontSize: "clamp(3.5rem, 15vw, 5rem)",
                      color: GOLD,
                      letterSpacing: "-0.04em",
                      lineHeight: 0.88,
                    }}
                  >
                    99
                  </span>
                  <span
                    className="font-mono text-[7px] uppercase tracking-[0.3em] mt-1"
                    style={{ color: `${GOLD}60` }}
                  >
                    OVR
                  </span>
                </motion.div>

                {/* Name block */}
                <motion.div
                  className="flex flex-col gap-1 pb-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Position badge */}
                  <span
                    className="font-mono text-[7px] uppercase tracking-[0.3em]"
                    style={{ color: `${GOLD}80` }}
                  >
                    SF · SCORER
                  </span>
                  <span
                    className="font-display font-light tracking-tight leading-none"
                    style={{
                      fontSize: "clamp(1.7rem, 7vw, 2.4rem)",
                      color: "#fafaf9",
                    }}
                  >
                    KEN WU
                  </span>
                  <span
                    className="font-kanji leading-none"
                    style={{
                      fontSize: "1.1rem",
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    吴锵皓
                  </span>
                  {/* Slim Reaper badge */}
                  <motion.span
                    className="font-mono text-[8px] uppercase tracking-[0.2em] mt-1"
                    style={{ color: GOLD }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    THE SLIM REAPER
                  </motion.span>
                </motion.div>
              </div>

              {/* #35 watermark */}
              <div
                className="absolute right-3 top-0 font-display font-light leading-none pointer-events-none"
                style={{
                  fontSize: "8.5rem",
                  color: `${GOLD}09`,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                35
              </div>

              {/* Bottom gold shimmer line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              />
            </div>

            {/* Stats panel */}
            <div className="px-6 py-5" style={{ background: "#090d18" }}>
              {/* Warriors gold divider */}
              <motion.div
                className="h-px mb-4"
                style={{
                  background: `linear-gradient(90deg, ${GOLD}80, ${BLUE}60, transparent)`,
                }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.65, duration: 0.55 }}
              />

              <div className="flex flex-col gap-2.5">
                {ATTRIBUTES.map((attr, i) => (
                  <AttributeBar
                    key={attr.label}
                    label={attr.label}
                    value={attr.value}
                    color={attr.color}
                    delay={0.7 + i * 0.07}
                  />
                ))}
              </div>

              {/* Footer */}
              <motion.div
                className="h-px mt-4 mb-4"
                style={{ background: `linear-gradient(90deg, transparent, ${BLUE}40)` }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.15, duration: 0.5 }}
              />

              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.4 }}
              >
                <span
                  className="font-mono text-[8px] uppercase tracking-[0.2em]"
                  style={{ color: "#2a2a3a" }}
                >
                  <a
                    href="https://uwaterloo.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0d0d1a] underline underline-offset-2"
                  >
                    UW
                  </a>{" "}
                  ·{" "}
                  <a
                    href="https://en.wikipedia.org/wiki/Waterloo,_Ontario?useskin=vector"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0d0d1a] underline underline-offset-2"
                  >
                    Waterloo
                  </a>
                  , ON
                </span>
                <span
                  className="font-mono text-[8px] uppercase tracking-[0.2em]"
                  style={{ color: "#2a2a3a" }}
                >
                  Click to dismiss
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
