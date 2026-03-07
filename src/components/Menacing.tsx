"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface GoParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  xOffset: number;
  rotate: number;
}

let nextId = 0;

export function Menacing() {
  const [particles, setParticles] = useState<GoParticle[]>([]);
  const heroVisible = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        heroVisible.current = entry.isIntersecting;
      },
      { threshold: 0.15 }
    );

    const heroSection = document.querySelector("section");
    if (heroSection) observer.observe(heroSection);

    const cleanupTimers: ReturnType<typeof setTimeout>[] = [];
    let mounted = true;

    const interval = setInterval(() => {
      if (!heroVisible.current) return;

      const id = ++nextId;
      const particle: GoParticle = {
        id,
        x: 8 + Math.random() * 80,
        y: 5 + Math.random() * 80,
        size: 1.1 + Math.random() * 1.6,
        baseOpacity: 0.1 + Math.random() * 0.22,
        xOffset: (Math.random() - 0.5) * 40,
        rotate: (Math.random() - 0.5) * 20,
      };

      setParticles((prev) => [...prev.slice(-24), particle]);

      const t = setTimeout(() => {
        if (mounted) setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 3400);
      cleanupTimers.push(t);
    }, 450);

    return () => {
      mounted = false;
      clearInterval(interval);
      cleanupTimers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 15 }}
      aria-hidden="true"
    >
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute font-kanji select-none text-zinc-800"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}rem`,
              lineHeight: 1,
            }}
            initial={{ opacity: 0, y: 0, x: 0, rotate: p.rotate * -1 }}
            animate={{
              opacity: [0, p.baseOpacity, p.baseOpacity, 0],
              y: -55,
              x: p.xOffset,
              rotate: p.rotate,
            }}
            transition={{ duration: 3.2, ease: "easeOut" }}
          >
            ゴ
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
