"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IDLE_MS = 45_000;

const ATTRIBUTES = [
  { label: "ML", value: 97, color: "#dc2626" },
  { label: "SWE", value: 93, color: "#c8900a" },
  { label: "SYS", value: 88, color: "#c8900a" },
  { label: "IQ", value: 95, color: "#dc2626" },
  { label: "HND", value: 85, color: "#c8900a" },
  { label: "ALGN", value: null, color: "#52525b" },
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

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className="font-mono text-[9px] uppercase tracking-[0.15em] shrink-0 w-10 text-right"
        style={{ color: "#52525b" }}
      >
        {label}
      </span>
      <span
        className="font-mono text-[11px] font-bold shrink-0 w-6 text-right"
        style={{ color: value !== null ? color : "#3f3f46" }}
      >
        {value !== null ? value : "??"}
      </span>
      <div
        className="flex-1 h-[3px] rounded-full overflow-hidden"
        style={{ background: "#27272a" }}
      >
        {value !== null && (
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: delay + 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </div>
    </motion.div>
  );
}

function AutoDismiss({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 6000);
    return () => clearTimeout(t);
  }, [onDismiss]);
  return null;
}

export function ProfileCard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(true), IDLE_MS);
    };

    const events = ["mousemove", "keydown", "touchstart", "scroll", "click"] as const;
    events.forEach((e) => window.addEventListener(e, schedule, { passive: true }));
    schedule();

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, schedule));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const dismiss = () => setVisible(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9997] flex items-center justify-center cursor-pointer px-6"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={dismiss}
          aria-hidden="true"
        >
          <AutoDismiss onDismiss={dismiss} />

          {/* NBA 2K Card */}
          <motion.div
            className="relative overflow-hidden select-none"
            style={{
              width: "min(340px, 90vw)",
              borderRadius: "12px",
              border: "1px solid #3f3f46",
              boxShadow: "0 0 0 1px #27272a, 0 32px 80px rgba(0,0,0,0.8)",
              background: "#111",
            }}
            initial={{ scale: 0.85, opacity: 0, y: 30, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header gradient */}
            <div
              className="relative px-6 pt-5 pb-8"
              style={{
                background:
                  "linear-gradient(135deg, #7f1d1d 0%, #991b1b 30%, #1a1a1a 70%, #111 100%)",
              }}
            >
              {/* Team label */}
              <motion.div
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.3em]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  PLAYER CARD
                </span>
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.2em]"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  CS &apos;26
                </span>
              </motion.div>

              {/* OVR + Name row */}
              <div className="flex items-end gap-5">
                {/* OVR */}
                <motion.div
                  className="flex flex-col items-center leading-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className="font-display font-light"
                    style={{
                      fontSize: "clamp(3.5rem, 15vw, 5rem)",
                      color: "#c8900a",
                      letterSpacing: "-0.04em",
                      lineHeight: 0.9,
                    }}
                  >
                    94
                  </span>
                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.25em] mt-1"
                    style={{ color: "#71717a" }}
                  >
                    OVR
                  </span>
                </motion.div>

                {/* Name + position */}
                <motion.div
                  className="flex flex-col gap-1 pb-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
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
                    className="font-kanji text-lg tracking-[0.2em] leading-none"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    吴锵皓
                  </span>
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.15em] mt-1"
                    style={{ color: "#c8900a" }}
                  >
                    SWE · ML RESEARCHER
                  </span>
                </motion.div>
              </div>

              {/* Watermark kanji */}
              <div
                className="absolute right-4 bottom-0 font-kanji leading-none pointer-events-none"
                style={{
                  fontSize: "7rem",
                  color: "rgba(255,255,255,0.04)",
                  lineHeight: 1,
                }}
              >
                皓
              </div>
            </div>

            {/* Stats panel */}
            <div className="px-6 py-5" style={{ background: "#111" }}>
              <motion.div
                className="h-px mb-4"
                style={{ background: "linear-gradient(90deg, #dc2626, transparent)" }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.65, duration: 0.5 }}
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

              <motion.div
                className="h-px mt-4 mb-4"
                style={{ background: "linear-gradient(90deg, transparent, #27272a)" }}
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
                  style={{ color: "#3f3f46" }}
                >
                  UW · Waterloo, ON
                </span>
                <span
                  className="font-mono text-[8px] uppercase tracking-[0.2em]"
                  style={{ color: "#3f3f46" }}
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
