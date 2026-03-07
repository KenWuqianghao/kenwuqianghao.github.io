"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#d4a83a";
const PALE = "#f2e6b8";
const BEAM = "#e8c060";

// Deterministic particles around screen center
const PARTICLES = [
  { id: 0,  x: 43, size: 2, delay: 0.40, dur: 2.8 },
  { id: 1,  x: 46, size: 1, delay: 0.65, dur: 3.0 },
  { id: 2,  x: 50, size: 3, delay: 0.30, dur: 2.5 },
  { id: 3,  x: 53, size: 2, delay: 0.85, dur: 2.7 },
  { id: 4,  x: 57, size: 1, delay: 0.50, dur: 3.1 },
  { id: 5,  x: 44, size: 2, delay: 1.05, dur: 2.6 },
  { id: 6,  x: 48, size: 1, delay: 0.75, dur: 2.9 },
  { id: 7,  x: 52, size: 3, delay: 0.45, dur: 3.2 },
  { id: 8,  x: 55, size: 2, delay: 0.95, dur: 2.4 },
  { id: 9,  x: 40, size: 1, delay: 1.15, dur: 2.7 },
  { id: 10, x: 59, size: 2, delay: 0.35, dur: 3.0 },
  { id: 11, x: 49, size: 1, delay: 1.25, dur: 2.8 },
  { id: 12, x: 51, size: 2, delay: 0.55, dur: 3.3 },
  { id: 13, x: 45, size: 3, delay: 0.78, dur: 2.6 },
  { id: 14, x: 56, size: 1, delay: 0.92, dur: 2.9 },
  { id: 15, x: 47, size: 2, delay: 1.18, dur: 2.5 },
];

function AutoDismiss({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5500);
    return () => clearTimeout(t);
  }, [onDismiss]);
  return null;
}

export function LostGrace() {
  const [visible, setVisible] = useState(false);
  const dismiss = useCallback(() => setVisible(false), []);

  useEffect(() => {
    const handler = () => setVisible(true);
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
          transition={{ duration: 0.7 }}
          aria-hidden="true"
        >
          <AutoDismiss onDismiss={dismiss} />

          {/* Dark vignette overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(2,4,14,0.86)" }}
          />

          {/* Divine light shaft from top-center */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: "2px",
              height: "55vh",
              transformOrigin: "top center",
              background: `linear-gradient(to bottom, ${BEAM} 0%, ${BEAM}bb 35%, ${BEAM}44 70%, transparent 100%)`,
              boxShadow: `0 0 10px ${BEAM}99, 0 0 28px ${BEAM}44`,
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Wide radial halo */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: "280px",
              height: "50vh",
              background: `radial-gradient(ellipse 50% 80% at 50% 0%, ${GOLD}18 0%, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.0 }}
          />

          {/* Floating golden particles */}
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: "55%",
                background: GOLD,
                boxShadow: `0 0 ${p.size + 2}px ${GOLD}`,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -220, opacity: [0, 0.85, 0] }}
              transition={{ delay: p.delay, duration: p.dur, ease: "easeOut" }}
            />
          ))}

          {/* Central text */}
          <div className="relative flex flex-col items-center gap-3 text-center px-8">
            {/* Grace ✦ symbol */}
            <motion.span
              style={{
                fontSize: "1.5rem",
                color: BEAM,
                filter: `drop-shadow(0 0 14px ${BEAM}) drop-shadow(0 0 32px ${GOLD}88)`,
                lineHeight: 1,
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              ✦
            </motion.span>

            {/* "LOST GRACE" label */}
            <motion.span
              className="font-mono uppercase"
              style={{ fontSize: "8px", color: `${GOLD}cc`, letterSpacing: "0.6em" }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Lost Grace
            </motion.span>

            {/* Gold divider */}
            <motion.div
              className="origin-center"
              style={{
                width: "80px",
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${GOLD}77, transparent)`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />

            {/* Grace name */}
            <motion.p
              className="font-display font-light"
              style={{
                fontSize: "clamp(1.1rem, 2.8vw, 1.55rem)",
                color: PALE,
                letterSpacing: "0.06em",
                lineHeight: 1.25,
                textShadow: `0 0 18px ${GOLD}55, 0 0 40px ${GOLD}22`,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Software Engineer & ML Researcher
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
