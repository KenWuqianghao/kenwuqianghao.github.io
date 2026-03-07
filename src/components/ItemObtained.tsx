"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Zelda "item get" jingle — G4 C5 E5 G5 arpeggio, square wave retro synth
function playZeldaJingle() {
  try {
    const ctx = new AudioContext();

    const notes = [
      { freq: 392.0,  start: 0.00, dur: 0.11 }, // G4
      { freq: 523.25, start: 0.11, dur: 0.11 }, // C5
      { freq: 659.25, start: 0.22, dur: 0.11 }, // E5
      { freq: 783.99, start: 0.33, dur: 0.90 }, // G5 (held)
    ];

    notes.forEach(({ freq, start, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "square";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + start + 0.012);
      gain.gain.setValueAtTime(0.18, ctx.currentTime + start + dur * 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);

      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur + 0.05);
    });

    // Faint harmony on the held G5 — B5 a third above
    const harmony = ctx.createOscillator();
    const harmonyGain = ctx.createGain();
    harmony.connect(harmonyGain);
    harmonyGain.connect(ctx.destination);
    harmony.type = "square";
    harmony.frequency.setValueAtTime(987.77, ctx.currentTime + 0.33);
    harmonyGain.gain.setValueAtTime(0, ctx.currentTime + 0.33);
    harmonyGain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.40);
    harmonyGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.25);
    harmony.start(ctx.currentTime + 0.33);
    harmony.stop(ctx.currentTime + 1.30);

    setTimeout(() => ctx.close().catch(() => {}), 2000);
  } catch {
    // audio unavailable
  }
}

function AutoDismiss({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 7000);
    return () => clearTimeout(t);
  }, [onDismiss]);
  return null;
}

export function ItemObtained() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      setVisible(true);
      playZeldaJingle(); // called directly in event handler — within user activation
    };
    window.addEventListener("item-obtained", handler);
    return () => window.removeEventListener("item-obtained", handler);
  }, []);

  const dismiss = useCallback(() => setVisible(false), []);

  // Keyboard dismiss
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
          className="fixed inset-0 z-[9997] flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: "rgba(0,4,20,0.94)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={dismiss}
          aria-hidden="true"
        >
          <AutoDismiss onDismiss={dismiss} />

          {/* White flash — OoT chest open effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "white" }}
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />

          {/* OoT-style nested border box */}
          <motion.div
            className="relative flex flex-col items-center gap-4 text-center"
            style={{
              // Outer dark ring → gold ring → inner dark ring → gold ring → content
              border: "2px solid #c8a800",
              outline: "4px solid #05041a",
              outlineOffset: "-6px",
              boxShadow:
                "0 0 0 6px #05041a, 0 0 0 8px #c8a800, 0 0 80px rgba(200,168,0,0.2), inset 0 0 60px rgba(200,168,0,0.04)",
              background:
                "linear-gradient(180deg, #060618 0%, #020412 100%)",
              padding: "2.5rem 2.5rem 2rem",
              minWidth: "260px",
              maxWidth: "380px",
              width: "80vw",
            }}
            initial={{ scale: 0.55, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Spinning item — 3D perspective rotateY */}
            <div style={{ perspective: "280px", height: "5rem" }}>
              <motion.div
                className="select-none leading-none"
                style={{
                  fontSize: "clamp(2.8rem, 8vw, 3.8rem)",
                  color: "#c8a800",
                  filter: "drop-shadow(0 0 16px rgba(200,168,0,0.85))",
                  transformStyle: "preserve-3d",
                }}
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              >
                ♦
              </motion.div>
            </div>

            {/* "You obtained" */}
            <motion.p
              className="font-mono text-[8px] uppercase tracking-[0.5em]"
              style={{ color: "#9a8030" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.4 }}
            >
              You obtained
            </motion.p>

            {/* Item name */}
            <motion.h3
              className="font-display font-light tracking-tight leading-tight"
              style={{
                color: "#f5e8b0",
                fontSize: "clamp(1.5rem, 5vw, 2rem)",
                lineHeight: 1.1,
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              Software Engineer
            </motion.h3>

            {/* Gold divider */}
            <motion.div
              className="w-2/3 h-px origin-center"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #c8a800, transparent)",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
            />

            {/* Description */}
            <motion.p
              className="font-mono text-[11px] leading-relaxed"
              style={{ color: "#666688", maxWidth: "28ch" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.78, duration: 0.5 }}
            >
              <span style={{ color: "#7a7a9a" }}>
                A rare craftsman. Ships ML pipelines by day, chess bots by
                night. Pairs well with TypeScript.
              </span>
            </motion.p>

            {/* Blinking "Press any key" — OoT ▼ style */}
            <motion.p
              className="font-mono text-[8px] uppercase tracking-[0.35em]"
              style={{ color: "#4a4a6a", marginTop: "0.25rem" }}
              animate={{ opacity: [1, 0.15, 1] }}
              transition={{
                delay: 1.4,
                duration: 1.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ▼ Press any key
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
