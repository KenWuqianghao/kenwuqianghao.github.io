"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experience, type ExperienceEntry } from "@/lib/data";
import { ScrollReveal } from "./ScrollReveal";

const JP_NUMBERS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

export function Experience() {
  return (
    <section id="experience" className="py-32 md:py-48 relative overflow-hidden">
      {/* Section kanji watermark */}
      <div className="absolute -top-10 -right-12 font-display text-[18rem] md:text-[28rem] text-zinc-900/[0.02] leading-none select-none pointer-events-none gate-weave parallax-watermark">
        経験
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <ScrollReveal tilt={-1.5}>
          <div className="mb-24 md:mb-36">
            <span className="font-mono text-[10px] text-red-600 uppercase tracking-[0.3em] block mb-4">
              経験 — Experience
            </span>
            <h2
              className="text-6xl md:text-8xl lg:text-9xl font-display font-light tracking-tighter text-zinc-900 glitch-hover"
              data-text="Experience"
            >
              Experience
            </h2>
          </div>
        </ScrollReveal>

        {experience.map((exp, i) => (
          <ExperienceCard key={exp.company} entry={exp} index={i} />
        ))}
      </div>
    </section>
  );
}

function ExperienceCard({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      className="relative py-16 md:py-24 border-t border-zinc-200/60"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Large Japanese numeral as watermark */}
      <div className="absolute top-8 right-4 md:right-0 font-display text-[8rem] md:text-[14rem] text-zinc-900/[0.03] leading-none select-none pointer-events-none gate-weave parallax-watermark">
        {JP_NUMBERS[index]}
      </div>

      {/* Red accent tick */}
      <div className="absolute left-0 top-16 md:top-24 w-[3px] h-10 bg-red-600" />

      <div className="relative pl-4 md:pl-0">
        {/* Company name — MASSIVE */}
        <motion.h3
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tighter text-zinc-900 leading-[0.9] mb-3 head-tilt"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0, rotate: index % 2 === 0 ? -1.5 : 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {entry.company}
        </motion.h3>

        {/* Meta badge */}
        {entry.meta && (
          <span className="inline-block font-mono text-[10px] text-red-600 border border-red-600/30 px-2 py-0.5 uppercase tracking-widest mb-4">
            {entry.meta}
          </span>
        )}

        {/* Role / type / dates — elegant bar */}
        <motion.div
          className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-10 md:mb-14"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-zinc-600 text-sm md:text-base">{entry.role}</span>
          <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">{entry.type}</span>
          <span className="font-mono text-[10px] text-zinc-400">{entry.dates}</span>
          <span className="font-mono text-[10px] text-zinc-400">{entry.location}</span>
        </motion.div>

        {/* Bullets — narrow column, dramatically offset to the right */}
        <motion.div
          className="md:ml-[30%] lg:ml-[40%] max-w-[52ch]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ul className="space-y-3">
            {entry.bullets.map((bullet, j) => (
              <li
                key={j}
                className="group/bullet text-zinc-500 text-sm leading-relaxed flex gap-3 cursor-default transition-all duration-300 hover:translate-x-1 hover:text-zinc-700"
              >
                <span className="text-red-600/40 mt-0.5 shrink-0 select-none transition-colors duration-300 group-hover/bullet:text-red-600">
                  &#8212;
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Stack */}
          <div className="mt-8 flex flex-wrap gap-x-2 gap-y-1">
            {entry.stack.map((tech, k) => (
              <span key={tech} className="font-mono text-[11px] text-zinc-400 cursor-default transition-colors duration-300 hover:text-red-600">
                {tech}
                {k < entry.stack.length - 1 && (
                  <span className="text-red-600/30 ml-2">·</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
