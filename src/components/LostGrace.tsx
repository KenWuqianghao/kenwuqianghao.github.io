"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#c8a96e";
const GOLD_BRIGHT = "#e8d07a";
const GOLD_DIM = "#8a6a3a";

// Synthesized Elden Ring grace ambient — warm drone + ethereal shimmer
function playGraceSound() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // Low foundational drone — A2
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    drone.connect(droneGain);
    droneGain.connect(ctx.destination);
    drone.type = "sine";
    drone.frequency.setValueAtTime(110, now);
    droneGain.gain.setValueAtTime(0, now);
    droneGain.gain.linearRampToValueAtTime(0.07, now + 1.0);
    droneGain.gain.setValueAtTime(0.07, now + 3.0);
    droneGain.gain.exponentialRampToValueAtTime(0.001, now + 5.0);
    drone.start(now);
    drone.stop(now + 5.1);

    // Warm mid tone — E4
    const mid = ctx.createOscillator();
    const midGain = ctx.createGain();
    mid.connect(midGain);
    midGain.connect(ctx.destination);
    mid.type = "sine";
    mid.frequency.setValueAtTime(329.63, now + 0.3);
    midGain.gain.setValueAtTime(0, now + 0.3);
    midGain.gain.linearRampToValueAtTime(0.05, now + 1.1);
    midGain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);
    mid.start(now + 0.3);
    mid.stop(now + 4.6);

    // High shimmer bell — B5 (first chime)
    const bell1 = ctx.createOscillator();
    const bell1Gain = ctx.createGain();
    bell1.connect(bell1Gain);
    bell1Gain.connect(ctx.destination);
    bell1.type = "sine";
    bell1.frequency.setValueAtTime(987.77, now + 0.6);
    bell1Gain.gain.setValueAtTime(0, now + 0.6);
    bell1Gain.gain.linearRampToValueAtTime(0.06, now + 0.65);
    bell1Gain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);
    bell1.start(now + 0.6);
    bell1.stop(now + 3.3);

    // Second bell — G#5
    const bell2 = ctx.createOscillator();
    const bell2Gain = ctx.createGain();
    bell2.connect(bell2Gain);
    bell2Gain.connect(ctx.destination);
    bell2.type = "sine";
    bell2.frequency.setValueAtTime(830.61, now + 1.1);
    bell2Gain.gain.setValueAtTime(0, now + 1.1);
    bell2Gain.gain.linearRampToValueAtTime(0.04, now + 1.15);
    bell2Gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);
    bell2.start(now + 1.1);
    bell2.stop(now + 3.9);

    // Airy overtone — E6
    const air = ctx.createOscillator();
    const airGain = ctx.createGain();
    air.connect(airGain);
    airGain.connect(ctx.destination);
    air.type = "sine";
    air.frequency.setValueAtTime(1318.51, now + 0.8);
    airGain.gain.setValueAtTime(0, now + 0.8);
    airGain.gain.linearRampToValueAtTime(0.025, now + 1.2);
    airGain.gain.exponentialRampToValueAtTime(0.001, now + 4.0);
    air.start(now + 0.8);
    air.stop(now + 4.1);

    setTimeout(() => ctx.close().catch(() => {}), 6000);
  } catch {
    // audio unavailable
  }
}

// Elden Ring grace symbol — radial rays + rings, matching game's starburst icon
function GraceSymbol() {
  const LONG_RAYS = 8;
  const SHORT_RAYS = 8;
  return (
    <svg
      width="100"
      height="100"
      viewBox="-50 -50 100 100"
      style={{ overflow: "visible" }}
    >
      {/* Long cardinal/diagonal rays */}
      {Array.from({ length: LONG_RAYS }, (_, i) => {
        const angle = (i * 360) / LONG_RAYS;
        const rad = (angle * Math.PI) / 180;
        const x1 = Math.cos(rad) * 14;
        const y1 = Math.sin(rad) * 14;
        const x2 = Math.cos(rad) * 44;
        const y2 = Math.sin(rad) * 44;
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={GOLD}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        );
      })}
      {/* Short interstitial rays */}
      {Array.from({ length: SHORT_RAYS }, (_, i) => {
        const angle = (i * 360) / SHORT_RAYS + 22.5;
        const rad = (angle * Math.PI) / 180;
        const x1 = Math.cos(rad) * 14;
        const y1 = Math.sin(rad) * 14;
        const x2 = Math.cos(rad) * 28;
        const y2 = Math.sin(rad) * 28;
        return (
          <line
            key={`s${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={GOLD}
            strokeWidth={0.7}
            strokeLinecap="round"
            opacity={0.55}
          />
        );
      })}
      {/* Outer ring */}
      <circle cx="0" cy="0" r="44" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.35" />
      {/* Inner ring */}
      <circle cx="0" cy="0" r="14" fill="none" stroke={GOLD} strokeWidth="0.9" opacity="0.75" />
      {/* Core */}
      <circle cx="0" cy="0" r="5" fill={GOLD_BRIGHT} />
      <circle cx="0" cy="0" r="2" fill="white" opacity="0.9" />
    </svg>
  );
}

// Rising motes — particles that float upward
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

function AutoDismiss({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 6000);
    return () => clearTimeout(t);
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

          {/* Dark warm overlay — Elden Ring's dark amber ambience */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(6, 4, 1, 0.90)",
            }}
          />

          {/* Warm amber radial glow from center */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 55% 45% at 50% 55%, rgba(200,158,80,0.14) 0%, rgba(180,130,50,0.06) 50%, transparent 80%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.5 }}
          />

          {/* Narrow golden beam from top */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: "1px",
              height: "52vh",
              background: `linear-gradient(to bottom, ${GOLD_BRIGHT} 0%, ${GOLD}bb 30%, ${GOLD}55 65%, transparent 100%)`,
              boxShadow: `0 0 6px ${GOLD}99, 0 0 18px ${GOLD}44`,
              transformOrigin: "top center",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Wider soft column glow */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: "180px",
              height: "55vh",
              background: `linear-gradient(to bottom, ${GOLD}22 0%, ${GOLD}0a 50%, transparent 100%)`,
              transformOrigin: "top center",
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.9 }}
          />

          {/* Rising golden motes from lower center */}
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
              animate={{
                y: -280,
                opacity: [0, 0.9, 0.6, 0],
                scale: [0, 1, 0.8, 0],
              }}
              transition={{
                delay: m.delay,
                duration: m.dur,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Central UI — grace icon + Elden Ring-style notification */}
          <div className="relative flex flex-col items-center gap-0">

            {/* Grace symbol with slow rotation */}
            <motion.div
              style={{
                filter: `drop-shadow(0 0 16px ${GOLD}cc) drop-shadow(0 0 40px ${GOLD}55)`,
                marginBottom: "1.2rem",
              }}
              initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <GraceSymbol />
            </motion.div>

            {/* Elden Ring style notification box */}
            <motion.div
              style={{
                position: "relative",
                width: "min(360px, 86vw)",
                padding: "1rem 1.6rem 1.1rem",
                background: "rgba(8, 5, 2, 0.82)",
                borderTop: `1px solid ${GOLD}88`,
                borderBottom: `1px solid ${GOLD}88`,
              }}
              initial={{ opacity: 0, scaleX: 0.85 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Corner accents */}
              <span
                style={{
                  position: "absolute",
                  top: -1,
                  left: 0,
                  width: "18px",
                  height: "1px",
                  background: GOLD_BRIGHT,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: -1,
                  right: 0,
                  width: "18px",
                  height: "1px",
                  background: GOLD_BRIGHT,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: -1,
                  left: 0,
                  width: "18px",
                  height: "1px",
                  background: GOLD_BRIGHT,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: -1,
                  right: 0,
                  width: "18px",
                  height: "1px",
                  background: GOLD_BRIGHT,
                }}
              />

              {/* "SITE OF GRACE" label */}
              <motion.p
                style={{
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                  fontSize: "8px",
                  color: `${GOLD_DIM}dd`,
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  textAlign: "center",
                  marginBottom: "0.55rem",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Site of Grace
              </motion.p>

              {/* Thin divider */}
              <motion.div
                style={{
                  height: "1px",
                  background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)`,
                  marginBottom: "0.6rem",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />

              {/* Grace name */}
              <motion.p
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "clamp(1rem, 2.8vw, 1.35rem)",
                  fontWeight: 300,
                  color: GOLD_BRIGHT,
                  textAlign: "center",
                  letterSpacing: "0.08em",
                  lineHeight: 1.2,
                  textShadow: `0 0 12px ${GOLD}88, 0 0 28px ${GOLD}44`,
                }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Software Engineer & ML Researcher
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
