"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#c8a96e";
const GOLD_BRIGHT = "#e8d07a";
const GOLD_DIM = "#8a6a3a";

// Elden Ring grace ambient — warm drone + ethereal bell layers
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

    // Warm mid — E4
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

    // Bell — B5
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

          {/* Dark warm overlay */}
          <div className="absolute inset-0" style={{ background: "rgba(4, 2, 0, 0.88)" }} />

          {/* Warm amber radial glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 40% 35% at 50% 50%, rgba(200,158,80,0.12) 0%, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.5 }}
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
                  textShadow: `0 0 20px ${GOLD}99, 0 0 50px ${GOLD}33`,
                }}
              >
                Software Engineer & ML Researcher
              </p>
            </motion.div>

            <Divider delay={0.55} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
