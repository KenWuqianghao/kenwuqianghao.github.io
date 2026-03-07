"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/lib/data";
import { ScrollReveal } from "./ScrollReveal";

const CATEGORY_KANJI: Record<string, string> = {
  Languages: "言語",
  "Technologies & Cloud": "技術",
  "Libraries & Frameworks": "枠組",
};

export function Skills() {
  const categories = Object.entries(skills);

  return (
    <section id="skills" className="py-32 md:py-48 relative overflow-hidden">
      {/* Section kanji watermark */}
      <div className="absolute top-0 right-0 font-kanji text-[18rem] md:text-[28rem] text-zinc-900/[0.02] leading-none select-none pointer-events-none gate-weave parallax-watermark">
        技術
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <ScrollReveal tilt={-1}>
          <div className="mb-24 md:mb-36">
            <span className="font-mono text-[10px] text-red-600 uppercase tracking-[0.3em] block mb-4">
              技術 — Skills
            </span>
            <h2
              className="text-6xl md:text-8xl lg:text-9xl font-display font-light tracking-tighter text-zinc-900 glitch-hover"
              data-text="Skills"
            >
              Skills
            </h2>
          </div>
        </ScrollReveal>

        {categories.map(([category, items], i) => (
          <SkillPanel
            key={category}
            category={category}
            items={items}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

function SkillPanel({
  category,
  items,
  index,
}: {
  category: string;
  items: string[];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;
  const kanji = CATEGORY_KANJI[category] || "技";

  return (
    <motion.div
      ref={ref}
      className="relative py-16 md:py-24 border-t border-zinc-200/60 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Category name as massive background watermark */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 font-display text-[6rem] md:text-[10rem] lg:text-[13rem] text-zinc-900/[0.025] leading-none select-none pointer-events-none whitespace-nowrap uppercase tracking-wider gate-weave parallax-watermark ${
          isEven ? "-left-4" : "-right-4 text-right"
        }`}
      >
        {category}
      </div>

      {/* Red tick */}
      <div
        className={`absolute top-16 md:top-24 w-[3px] h-8 bg-red-600 ${
          isEven ? "left-0" : "md:right-0 left-0 md:left-auto"
        }`}
      />

      <div className="relative">
        {/* Category label with kanji */}
        <motion.div
          className={`mb-10 md:mb-14 ${isEven ? "" : "md:text-right"}`}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="font-kanji text-3xl md:text-4xl text-zinc-300 mr-3 tracking-tight">
            {kanji}
          </span>
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-[0.2em]">
            {category}
          </span>
        </motion.div>

        {/* Skills as dealt playing cards */}
        <div
          className={`${
            isEven
              ? "md:pl-[15%] lg:pl-[25%]"
              : "md:pr-[15%] lg:pr-[25%]"
          }`}
        >
          <div
            className={`flex flex-wrap gap-3 ${
              isEven ? "" : "md:justify-end"
            }`}
          >
            {items.map((item, k) => (
              <div key={item} style={{ perspective: "700px" }}>
                <motion.div
                  className="relative cursor-default select-none"
                  style={{
                    background: "#fafaf9",
                    border: "1px solid #e4e4e7",
                    borderRadius: "3px",
                    padding: "0.5rem 1rem 0.55rem",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
                    minWidth: "64px",
                  }}
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={isInView ? { rotateY: 0, opacity: 1 } : {}}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 16px 32px rgba(0,0,0,0.12), 0 6px 12px rgba(0,0,0,0.08)",
                    borderColor: "#dc2626",
                    transition: { type: "spring", stiffness: 320, damping: 28 },
                  }}
                  transition={{
                    rotateY: {
                      type: "spring",
                      stiffness: 200,
                      damping: 24,
                      delay: 0.06 + k * 0.08,
                    },
                    opacity: { duration: 0.15, delay: 0.06 + k * 0.08 },
                  }}
                >
                  {/* Top-left suit mark */}
                  <span
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: "5px",
                      fontSize: "7px",
                      lineHeight: 1,
                      color: "rgba(220,38,38,0.32)",
                      fontFamily: "monospace",
                    }}
                  >
                    ♦
                  </span>
                  {/* Skill name */}
                  <span
                    style={{
                      display: "block",
                      textAlign: "center",
                      fontSize: `clamp(0.78rem, ${0.8 + (items.length - k) * 0.022}rem, 1.05rem)`,
                      color: "#3f3f46",
                      fontWeight: 300,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {item}
                  </span>
                  {/* Bottom-right suit mark (inverted) */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "3px",
                      right: "5px",
                      fontSize: "7px",
                      lineHeight: 1,
                      color: "rgba(220,38,38,0.32)",
                      fontFamily: "monospace",
                      transform: "rotate(180deg)",
                    }}
                  >
                    ♦
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
