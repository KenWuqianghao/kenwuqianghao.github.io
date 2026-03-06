"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IDLE_MS = 45_000;

const STATS = [
  { label: "Class",       value: "Software Engineer · ML Researcher" },
  { label: "Affiliation", value: "University of Waterloo · CS '26" },
  { label: "Region",      value: "Canada" },
  { label: "Internships", value: "VII" },
  { label: "Philosophy",  value: "AI Alignment" },
  { label: "Alignment",   value: "Unknown" },
];

function AutoDismiss({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5500);
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
          className="fixed inset-0 z-[9997] bg-zinc-900 flex items-center justify-start px-10 md:px-24 cursor-pointer select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={dismiss}
          aria-hidden="true"
        >
          <AutoDismiss onDismiss={dismiss} />

          {/* Left red bar */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-600 origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Large background kanji watermark */}
          <div className="absolute right-8 bottom-0 font-display text-[22rem] md:text-[36rem] text-zinc-800/20 leading-none pointer-events-none select-none">
            人
          </div>

          <div className="relative">
            {/* Section label */}
            <motion.span
              className="font-mono text-[10px] text-red-600 uppercase tracking-[0.3em] block mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Character Profile — 素顔
            </motion.span>

            {/* Name */}
            <motion.h2
              className="font-display font-light tracking-tighter leading-[0.85] text-stone-50"
              style={{ fontSize: "clamp(5rem, 15vw, 11rem)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Ken<br />
              Wu<span className="text-red-600">.</span>
            </motion.h2>

            {/* Chinese name */}
            <motion.span
              className="font-display text-xl md:text-2xl text-zinc-500 tracking-[0.3em] block mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              吴锵皓
            </motion.span>

            {/* Divider */}
            <motion.div
              className="h-px bg-zinc-700 mt-10 mb-8 origin-left"
              style={{ maxWidth: "44ch" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Stats */}
            <div className="flex flex-col gap-3">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex gap-5 items-baseline"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.05 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 w-28 shrink-0">
                    {stat.label}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-300">
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Dismiss hint */}
            <motion.p
              className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.4 }}
            >
              Click anywhere to dismiss
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
