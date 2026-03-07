"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AutoDismiss({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5500);
    return () => clearTimeout(t);
  }, [onDismiss]);
  return null;
}

export function ItemObtained() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener("item-obtained", handler);
    return () => window.removeEventListener("item-obtained", handler);
  }, []);

  const dismiss = useCallback(() => setVisible(false), []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9997] flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={dismiss}
          aria-hidden="true"
        >
          <AutoDismiss onDismiss={dismiss} />

          <motion.div
            className="relative flex flex-col items-center gap-5 px-10 py-9 text-center"
            style={{
              border: "2px solid #c8900a",
              boxShadow:
                "0 0 0 5px #111, 0 0 0 7px #c8900a, 0 0 60px rgba(200,144,10,0.25)",
              background: "#111",
              minWidth: "300px",
              maxWidth: "460px",
              width: "90vw",
            }}
            initial={{ scale: 0.8, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Header label */}
            <motion.p
              className="font-mono text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "#c8900a" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              ★ &nbsp;Item Obtained&nbsp; ★
            </motion.p>

            {/* Diamond icon */}
            <motion.div
              className="font-display leading-none select-none"
              style={{ fontSize: "clamp(3rem, 10vw, 4.5rem)", color: "#c8900a" }}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.45,
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              ♦
            </motion.div>

            {/* Divider */}
            <motion.div
              className="w-full h-px origin-center"
              style={{ background: "#c8900a", opacity: 0.4 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />

            {/* Item name */}
            <motion.h3
              className="font-display font-light tracking-tight leading-tight"
              style={{
                color: "#fafaf9",
                fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Software Engineer
            </motion.h3>

            {/* Description */}
            <motion.p
              className="font-mono text-xs leading-relaxed"
              style={{ color: "#71717a", maxWidth: "32ch" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              A rare craftsman who ships ML pipelines by day and chess bots by
              night. Pairs well with TypeScript and dark roast coffee.
            </motion.p>

            {/* Dismiss hint */}
            <motion.p
              className="font-mono text-[9px] uppercase tracking-widest"
              style={{ color: "#3f3f46" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
            >
              Click to close
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
