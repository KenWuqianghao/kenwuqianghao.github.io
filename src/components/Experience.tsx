"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  experience,
  researchExperience,
  type ExperienceEntry,
} from "@/lib/data";
import { ScrollReveal } from "./ScrollReveal";
import { ArrowUpRight } from "@phosphor-icons/react";

const JP_NUMBERS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

function EntryLinks({
  website,
  advisorUrl,
  advisorLabel = "Advisor",
  compact = false,
}: {
  website?: string;
  advisorUrl?: string;
  advisorLabel?: string;
  compact?: boolean;
}) {
  if (!website && !advisorUrl) return null;

  const baseClass = compact
    ? "inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600"
    : "inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600";

  return (
    <div className="mt-5 flex items-center gap-4">
      {website && (
        <a href={website} target="_blank" rel="noopener noreferrer" className={baseClass}>
          Visit
          <ArrowUpRight size={compact ? 11 : 12} weight="bold" />
        </a>
      )}
      {advisorUrl && (
        <a href={advisorUrl} target="_blank" rel="noopener noreferrer" className={baseClass}>
          {advisorLabel}
          <ArrowUpRight size={compact ? 11 : 12} weight="bold" />
        </a>
      )}
    </div>
  );
}

function StackPokerCards({
  stack,
  isInView,
  delayBase = 0.35,
}: {
  stack: string[];
  isInView: boolean;
  /** Extra stagger when nested (e.g. research cluster) */
  delayBase?: number;
}) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {stack.map((tech, k) => (
        <div key={tech} style={{ perspective: "700px" }}>
          <motion.div
            className="relative cursor-default select-none"
            style={{
              background: "#fafaf9",
              border: "1px solid #e4e4e7",
              borderRadius: "3px",
              padding: "0.35rem 0.75rem 0.4rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
            }}
            initial={{ rotateY: 180, opacity: 0 }}
            animate={isInView ? { rotateY: 0, opacity: 1 } : {}}
            whileHover={{
              y: -8,
              boxShadow: "0 12px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)",
              borderColor: "#dc2626",
              transition: { type: "spring", stiffness: 320, damping: 28 },
            }}
            transition={{
              rotateY: {
                type: "spring",
                stiffness: 200,
                damping: 24,
                delay: delayBase + k * 0.06,
              },
              opacity: { duration: 0.15, delay: delayBase + k * 0.06 },
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "2px",
                left: "4px",
                fontSize: "6px",
                lineHeight: 1,
                color: "rgba(220,38,38,0.32)",
                fontFamily: "monospace",
              }}
            >
              ♠
            </span>
            <span
              style={{
                display: "block",
                fontSize: "11px",
                color: "#3f3f46",
                fontWeight: 300,
                letterSpacing: "0.01em",
                fontFamily: "monospace",
              }}
            >
              {tech}
            </span>
            <span
              style={{
                position: "absolute",
                bottom: "2px",
                right: "4px",
                fontSize: "6px",
                lineHeight: 1,
                color: "rgba(220,38,38,0.32)",
                fontFamily: "monospace",
                transform: "rotate(180deg)",
              }}
            >
              ♠
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-32 md:py-48 relative overflow-hidden">
      {/* Section kanji watermark */}
      <div className="absolute -top-10 -right-12 font-kanji text-[18rem] md:text-[28rem] text-zinc-900/[0.02] leading-none select-none pointer-events-none gate-weave parallax-watermark">
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

        <ResearchCluster entries={researchExperience} />

        {experience.map((exp, i) => (
          <ExperienceCard key={exp.company} entry={exp} index={i} />
        ))}
      </div>
    </section>
  );
}

function ResearchCluster({ entries }: { entries: ExperienceEntry[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative mb-20 md:mb-28 border-t border-zinc-200/60 pt-14 md:pt-20"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute top-10 right-0 font-kanji text-[6rem] md:text-[9rem] text-zinc-900/[0.025] leading-none select-none pointer-events-none gate-weave">
        研
      </div>

      <div className="relative mb-8 md:mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <span
          className="font-mono text-[10px] text-red-600 uppercase tracking-[0.35em] glitch-hover cursor-default inline-block"
          data-text="研究 — Research"
        >
          研究 — Research
        </span>
        <div
          className="hidden md:block h-px flex-1 max-w-[min(320px,28vw)] mb-1 ml-8 origin-left"
          style={{
            background: "linear-gradient(90deg, rgba(220,38,38,0.35), transparent)",
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 md:rounded-sm md:border md:border-zinc-200/80 md:bg-zinc-50/40 md:overflow-hidden">
        {entries.map((entry, idx) => (
          <motion.article
            key={entry.company}
            className={`relative pl-4 md:pl-0 ${
              idx === 1 ? "md:border-l md:border-zinc-200/80" : ""
            }`}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.65,
              delay: 0.08 + idx * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="absolute left-0 top-1 md:top-2 w-[3px] h-8 bg-red-600/85" />

            <div className="md:p-8 md:pt-9">
              <motion.h3
                className="text-2xl sm:text-3xl md:text-[1.65rem] lg:text-4xl font-display font-light tracking-tighter text-zinc-900 leading-[1.05] mb-2 head-tilt glitch-hover transition-colors duration-300 cursor-default"
                data-text={entry.company}
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0, rotate: idx % 2 === 0 ? -0.8 : 0.8 } : {}}
                whileHover={{ color: "#dc2626" }}
                transition={{ duration: 0.65, delay: 0.05 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {entry.company}
              </motion.h3>

              {entry.meta && (
                <span className="inline-block font-mono text-[10px] text-red-600 border border-red-600/30 px-2 py-0.5 uppercase tracking-widest mb-3">
                  {entry.meta}
                </span>
              )}

              <motion.div
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-6 text-[13px] md:text-sm"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.12 + idx * 0.08 }}
              >
                <span className="text-zinc-600">{entry.role}</span>
                <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">
                  {entry.type}
                </span>
                <span className="font-mono text-[9px] text-zinc-400">{entry.dates}</span>
                <span className="font-mono text-[9px] text-zinc-400 w-full md:w-auto">
                  {entry.location}
                </span>
              </motion.div>

              <motion.ul
                className="space-y-3 mb-2"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.18 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {entry.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="group/bullet text-zinc-500 text-[13px] md:text-sm leading-relaxed flex gap-3 cursor-default transition-all duration-300 hover:translate-x-1 hover:text-zinc-700"
                  >
                    <span className="text-red-600/40 mt-0.5 shrink-0 select-none transition-colors duration-300 group-hover/bullet:text-red-600">
                      &#8212;
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.22 + idx * 0.08 }}
              >
                <StackPokerCards stack={entry.stack} isInView={isInView} delayBase={0.28 + idx * 0.06} />
              </motion.div>

              <EntryLinks
                website={entry.website}
                advisorUrl={entry.advisorUrl}
                advisorLabel={entry.advisorLabel}
                compact
              />
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
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
      <div className="absolute top-8 right-4 md:right-0 font-kanji text-[8rem] md:text-[14rem] text-zinc-900/[0.03] leading-none select-none pointer-events-none gate-weave parallax-watermark">
        {JP_NUMBERS[index]}
      </div>

      {/* Red accent tick */}
      <div className="absolute left-0 top-16 md:top-24 w-[3px] h-10 bg-red-600" />

      <div className="relative pl-4 md:pl-0">
        {/* Company name — MASSIVE */}
        <motion.h3
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tighter text-zinc-900 leading-[0.9] mb-3 head-tilt glitch-hover transition-colors duration-300 cursor-default"
          data-text={entry.company}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0, rotate: index % 2 === 0 ? -1.5 : 1 } : {}}
          whileHover={{ color: "#dc2626" }}
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

          <StackPokerCards stack={entry.stack} isInView={isInView} />

          <EntryLinks
            website={entry.website}
            advisorUrl={entry.advisorUrl}
            advisorLabel={entry.advisorLabel}
          />
        </motion.div>
      </div>
    </motion.article>
  );
}
