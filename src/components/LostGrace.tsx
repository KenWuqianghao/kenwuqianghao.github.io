"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#c8a96e";
const GOLD_BRIGHT = "#e8d07a";
const GOLD_DIM = "#8a6a3a";

function playGraceSound() {
  const audio = new Audio("/lost_grace_discovered.mp3");
  audio.volume = 0.8;
  audio.play().catch(() => {});
}

// Rising motes
const MOTES = [
  { id: 0,  x: 42, size: 1.5, delay: 0.25, dur: 3.1 },
  { id: 1,  x: 46, size: 2,   delay: 0.55, dur: 2.8 },
  { id: 2,  x: 50, size: 1,   delay: 0.35, dur: 3.3 },
  { id: 3,  x: 54, size: 2.5, delay: 0.70, dur: 2.6 },
  { id: 4,  x: 58, size: 1.5, delay: 0.45, dur: 3.0 },
  { id: 5,  x: 44, size: 1,   delay: 0.90, dur: 2.7 },
  { id: 6,  x: 48, size: 2,   delay: 0.60, dur: 3.2 },
  { id: 7,  x: 52, size: 1,   delay: 0.80, dur: 2.9 },
  { id: 8,  x: 56, size: 1.5, delay: 1.00, dur: 2.5 },
  { id: 9,  x: 40, size: 2,   delay: 0.30, dur: 3.1 },
  { id: 10, x: 60, size: 1,   delay: 0.50, dur: 2.8 },
  { id: 11, x: 49, size: 2.5, delay: 1.20, dur: 3.0 },
  { id: 12, x: 51, size: 1.5, delay: 1.35, dur: 2.7 },
  { id: 13, x: 45, size: 1,   delay: 0.75, dur: 3.3 },
  { id: 14, x: 55, size: 2,   delay: 0.95, dur: 2.6 },
  { id: 15, x: 47, size: 1.5, delay: 1.15, dur: 2.9 },
];

// Thin Elden Ring divider — lines converging on a central ◈
function Divider({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex items-center"
      style={{ width: "min(340px, 82vw)", gap: "10px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(to right, transparent, ${GOLD}99)`,
          transformOrigin: "right",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + 0.1, duration: 0.5 }}
      />
      <span style={{ color: GOLD, fontSize: "9px", lineHeight: 1, flexShrink: 0 }}>◈</span>
      <motion.div
        style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(to left, transparent, ${GOLD}99)`,
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + 0.1, duration: 0.5 }}
      />
    </motion.div>
  );
}

function AutoDismiss({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(onDismiss, 6000);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, [onDismiss]);
  return null;
}

export function LostGrace() {
  const [visible, setVisible] = useState(false);
  const dismiss = useCallback(() => setVisible(false), []);

  useEffect(() => {
    const handler = () => {
      setVisible(true);
      playGraceSound();
    };
    window.addEventListener("grace-discovered", handler);
    return () => window.removeEventListener("grace-discovered", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9995] flex items-center justify-center overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          aria-hidden="true"
        >
          <AutoDismiss onDismiss={dismiss} />

          {/* Dark warm overlay */}
          <div className="absolute inset-0" style={{ background: "rgba(2, 1, 0, 0.93)" }} />

          {/* Warm amber radial glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 40% 35% at 50% 50%, rgba(200,158,80,0.22) 0%, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.5 }}
          />

          {/* Second pulsing glow layer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 30% 25% at 50% 50%, rgba(200,158,80,0.15) 0%, transparent 60%)`,
            }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ delay: 0.5, duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Narrow golden beam from top */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: "1px",
              height: "48vh",
              background: `linear-gradient(to bottom, ${GOLD_BRIGHT} 0%, ${GOLD}bb 30%, ${GOLD}55 65%, transparent 100%)`,
              boxShadow: `0 0 6px ${GOLD}99, 0 0 18px ${GOLD}44`,
              transformOrigin: "top center",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: "160px",
              height: "50vh",
              background: `linear-gradient(to bottom, ${GOLD}18 0%, transparent 100%)`,
              transformOrigin: "top center",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.9 }}
          />

          {/* Rising golden motes */}
          {MOTES.map((m) => (
            <motion.div
              key={m.id}
              className="absolute pointer-events-none"
              style={{
                width: m.size,
                height: m.size,
                borderRadius: "50%",
                left: `${m.x}%`,
                top: "68%",
                background: GOLD_BRIGHT,
                boxShadow: `0 0 ${m.size * 3}px ${GOLD}cc`,
              }}
              initial={{ y: 0, opacity: 0, scale: 0 }}
              animate={{ y: -280, opacity: [0, 0.9, 0.6, 0], scale: [0, 1, 0.8, 0] }}
              transition={{ delay: m.delay, duration: m.dur, ease: "easeOut" }}
            />
          ))}

          {/* Central text — pure Elden Ring typography, no panel/box */}
          <div className="relative flex flex-col items-center gap-5 px-8 text-center">
            <Divider delay={0.35} />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* "LOST GRACE DISCOVERED" — Elden Ring's exact phrasing */}
              <p
                className="font-mono uppercase"
                style={{
                  fontSize: "9px",
                  color: `${GOLD_DIM}cc`,
                  letterSpacing: "0.5em",
                  marginBottom: "0.65rem",
                }}
              >
                Lost Grace Discovered
              </p>

              {/* Grace name — main text, elegant serif */}
              <p
                className="font-display font-light"
                style={{
                  fontSize: "clamp(1.2rem, 3.5vw, 1.75rem)",
                  color: GOLD_BRIGHT,
                  letterSpacing: "0.12em",
                  lineHeight: 1.2,
                  textShadow: `0 0 30px ${GOLD}cc, 0 0 70px ${GOLD}55, 0 0 100px ${GOLD}22`,
                }}
              >
                Ken&apos;s Elden Ring Easter Egg
              </p>
            </motion.div>

            <Divider delay={0.55} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
