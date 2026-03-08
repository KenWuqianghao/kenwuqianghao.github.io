"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function playZeldaJingle() {
  const audio = new Audio("/item_botw.mp3");
  audio.volume = 0.7;
  audio.play().catch(() => {});
}

// Sheikah-style sparkles — cyan instead of gold
const SPARKLES = [
  { id: 0, angle: 0,   r: 1.4, delay: 0.3,  size: 3 },
  { id: 1, angle: 45,  r: 1.1, delay: 0.45, size: 2 },
  { id: 2, angle: 90,  r: 1.5, delay: 0.25, size: 4 },
  { id: 3, angle: 135, r: 1.2, delay: 0.55, size: 2 },
  { id: 4, angle: 180, r: 1.3, delay: 0.35, size: 3 },
  { id: 5, angle: 225, r: 1.0, delay: 0.65, size: 2 },
  { id: 6, angle: 270, r: 1.4, delay: 0.40, size: 4 },
  { id: 7, angle: 315, r: 1.1, delay: 0.50, size: 2 },
];

const CYAN = "#38bdf8";
const CYAN_DIM = "rgba(56,189,248,0.18)";

function AutoDismiss({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 8000);
    return () => clearTimeout(t);
  }, [onDismiss]);
  return null;
}

export function ItemObtained() {
  const [visible, setVisible] = useState(false);
  const dismiss = useCallback(() => setVisible(false), []);

  useEffect(() => {
    const handler = () => {
      setVisible(true);
      playZeldaJingle();
    };
    window.addEventListener("item-obtained", handler);
    return () => window.removeEventListener("item-obtained", handler);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9997] flex flex-col items-center justify-center cursor-pointer"
          style={{
            backgroundColor: "#05080f",
            // Sheikah slate grid — very subtle
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.025) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={dismiss}
          aria-hidden="true"
        >
          <AutoDismiss onDismiss={dismiss} />

          {/* Blue-white chest-open flash */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(200,235,255,0.85)" }}
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Sheikah cyan radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 45% at 50% 38%, rgba(56,189,248,0.09) 0%, transparent 70%)",
            }}
          />

          {/* Triforce + Sheikah ring */}
          <div
            className="relative flex items-center justify-center mb-8"
            style={{ width: 180, height: 165 }}
          >
            {/* Spinning Sheikah runic ring */}
            <motion.svg
              width="164"
              height="164"
              viewBox="-82 -82 164 164"
              className="absolute"
              style={{ opacity: 0.3 }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 14, ease: "linear", repeat: Infinity }}
            >
              {Array.from({ length: 24 }, (_, i) => {
                const angle = (i * 360) / 24;
                const rad = (angle * Math.PI) / 180;
                const r1 = 68;
                const r2 = 75;
                return (
                  <line
                    key={i}
                    x1={Math.cos(rad) * r1}
                    y1={Math.sin(rad) * r1}
                    x2={Math.cos(rad) * r2}
                    y2={Math.sin(rad) * r2}
                    stroke={CYAN}
                    strokeWidth={i % 6 === 0 ? 2.5 : 1}
                  />
                );
              })}
              <circle cx="0" cy="0" r="71" fill="none" stroke={CYAN} strokeWidth="0.5" />
            </motion.svg>

            {/* Sparkles in cyan */}
            {SPARKLES.map((sp) => {
              const rad = (sp.angle * Math.PI) / 180;
              const x = Math.cos(rad) * sp.r * 48;
              const y = Math.sin(rad) * sp.r * 48;
              return (
                <motion.div
                  key={sp.id}
                  className="absolute rounded-full"
                  style={{
                    width: sp.size,
                    height: sp.size,
                    left: "50%",
                    top: "50%",
                    background: CYAN,
                    boxShadow: `0 0 ${sp.size * 2}px ${CYAN}`,
                    marginLeft: -sp.size / 2,
                    marginTop: -sp.size / 2,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: [0, x * 0.4, x],
                    y: [0, y * 0.4, y],
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0],
                  }}
                  transition={{
                    delay: sp.delay,
                    duration: 1.1,
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 1.4,
                  }}
                />
              );
            })}

            {/* Triforce — gold SVG with Sheikah cyan aura */}
            <motion.div
              className="relative select-none"
              initial={{ opacity: 0, scale: 0.3, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: [30, -6, 0] }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg
                viewBox="0 0 120 104"
                width="120"
                height="104"
                style={{ filter: "drop-shadow(0 0 14px rgba(245,200,66,0.95)) drop-shadow(0 0 32px rgba(56,189,248,0.55))" }}
              >
                <defs>
                  <filter id="tfshadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f5c842" floodOpacity="0.8" />
                  </filter>
                </defs>
                <polygon points="60,0 22,68 98,68"   fill="#f5c842" />
                <polygon points="22,68 0,104 44,104" fill="#f5c842" />
                <polygon points="98,68 76,104 120,104" fill="#f5c842" />
              </svg>
            </motion.div>
          </div>

          {/* BotW/TotK — Sheikah slate text panel */}
          <motion.div
            style={{
              position: "relative",
              width: "min(420px, 88vw)",
              padding: "1.4rem 2rem 1.2rem",
              background: "rgba(8, 12, 26, 0.97)",
              border: `1px solid ${CYAN_DIM}`,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Sheikah corner brackets — top-left */}
            <div style={{ position: "absolute", top: -1, left: -1, width: 18, height: 18 }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 18, height: 2, background: CYAN }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: 18, background: CYAN }} />
            </div>
            {/* top-right */}
            <div style={{ position: "absolute", top: -1, right: -1, width: 18, height: 18 }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 18, height: 2, background: CYAN }} />
              <div style={{ position: "absolute", top: 0, right: 0, width: 2, height: 18, background: CYAN }} />
            </div>
            {/* bottom-left */}
            <div style={{ position: "absolute", bottom: -1, left: -1, width: 18, height: 18 }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, width: 18, height: 2, background: CYAN }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, width: 2, height: 18, background: CYAN }} />
            </div>
            {/* bottom-right */}
            <div style={{ position: "absolute", bottom: -1, right: -1, width: 18, height: 18 }}>
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 18, height: 2, background: CYAN }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 2, height: 18, background: CYAN }} />
            </div>

            {/* "— You got the —" */}
            <motion.p
              className="font-mono uppercase"
              style={{
                fontSize: "9px",
                color: `${CYAN}bb`,
                letterSpacing: "0.22em",
                marginBottom: "0.35rem",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              — You got the —
            </motion.p>

            {/* Item name */}
            <motion.h3
              className="font-display font-light"
              style={{
                fontSize: "clamp(1.4rem, 4vw, 1.85rem)",
                color: "#e8f4ff",
                lineHeight: 1.1,
                letterSpacing: "0.02em",
                marginBottom: "0.7rem",
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Ken&apos;s Zelda Easter Egg<span style={{ color: CYAN }}>!</span>
            </motion.h3>

            {/* Sheikah divider */}
            <motion.div
              style={{
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${CYAN}44, transparent)`,
                marginBottom: "0.7rem",
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            />

            {/* Description */}
            <motion.p
              className="font-mono"
              style={{ fontSize: "11px", color: "rgba(180,215,255,0.6)", lineHeight: 1.55 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              A hidden treasure of the Sheikah. Wandered into a portfolio site, discovered a Software Engineer lurking among the ancient code.
            </motion.p>

            {/* Blinking ▼ prompt */}
            <motion.span
              className="absolute bottom-3 right-4 font-mono"
              style={{ fontSize: "10px", color: `${CYAN}77` }}
              animate={{ opacity: [1, 0.1, 1] }}
              transition={{ delay: 1.4, duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ▼
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
