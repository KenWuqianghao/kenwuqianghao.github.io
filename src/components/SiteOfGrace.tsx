"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "experience", name: "Experience" },
  { id: "projects", name: "Projects" },
  { id: "skills", name: "Skills" },
  { id: "contact", name: "Contact" },
];

const STORAGE_KEY = "grace-discovered";

export function SiteOfGrace() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    let seen: Set<string>;
    try {
      seen = new Set<string>(JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]"));
    } catch {
      seen = new Set<string>();
    }

    let dismissTimer: ReturnType<typeof setTimeout> | null = null;
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id, name }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !seen.has(id)) {
            seen.add(id);
            try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...seen])); } catch { /* storage blocked */ }
            setCurrent(name);
            if (dismissTimer) clearTimeout(dismissTimer);
            dismissTimer = setTimeout(() => setCurrent(null), 2800);
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      if (dismissTimer) clearTimeout(dismissTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          className="fixed inset-x-0 top-16 z-[9995] pointer-events-none flex justify-center"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <div
            className="flex flex-col items-center gap-1.5 px-8 py-3.5"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,6,2,0.97) 0%, rgba(14,11,3,0.95) 100%)",
              border: "1px solid rgba(200,144,10,0.4)",
              boxShadow:
                "0 0 40px rgba(200,144,10,0.12), 0 0 0 1px rgba(200,144,10,0.07), 0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            {/* ✦ label ✦ */}
            <motion.div
              className="flex items-center gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.7, 1] }}
              transition={{ delay: 0.15, duration: 0.8 }}
            >
              <span style={{ color: "#c8900a", fontSize: "6px" }}>✦</span>
              <span
                className="font-mono text-[8px] uppercase tracking-[0.5em]"
                style={{ color: "#c8900a" }}
              >
                Site of Grace
              </span>
              <span style={{ color: "#c8900a", fontSize: "6px" }}>✦</span>
            </motion.div>

            {/* Section name */}
            <motion.span
              className="font-display font-light tracking-[0.1em]"
              style={{
                color: "#f2e0b0",
                fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {current}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
