"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { projects, type Project } from "@/lib/data";
import { ScrollReveal } from "./ScrollReveal";
import { ArrowUpRight } from "@phosphor-icons/react";

const JP_NUMBERS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

export function Projects() {
  return (
    <section id="projects" className="py-32 md:py-48 relative overflow-hidden">
      {/* Section kanji watermark */}
      <div className="absolute -top-10 -left-8 font-kanji text-[18rem] md:text-[28rem] text-zinc-900/[0.02] leading-none select-none pointer-events-none gate-weave parallax-watermark">
        作品
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <ScrollReveal tilt={2}>
          <div className="mb-24 md:mb-36">
            <span className="font-mono text-[10px] text-red-600 uppercase tracking-[0.3em] block mb-4">
              作品 — Projects
            </span>
            <h2
              className="text-6xl md:text-8xl lg:text-9xl font-display font-light tracking-tighter text-zinc-900 glitch-hover"
              data-text="Projects"
            >
              Projects
            </h2>
          </div>
        </ScrollReveal>

        {projects.map((project, i) => (
          <ProjectPanel key={project.name} project={project} index={i} />
        ))}

        <ScrollReveal tilt={1}>
          <div className="pt-20 md:pt-28 border-t border-zinc-200/60 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.25em] max-w-[40ch]">
              他作 — Coursework, tools, and other public repos live on a separate shelf.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600 w-fit"
            >
              All repositories
              <ArrowUpRight size={14} weight="bold" aria-hidden />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ProjectPanel({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      className="relative py-16 md:py-24 border-t border-zinc-200/60"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Japanese numeral watermark — alternates sides */}
      <div
        className={`absolute top-6 font-kanji text-[8rem] md:text-[12rem] text-zinc-900/[0.03] leading-none select-none pointer-events-none gate-weave parallax-watermark ${
          isEven ? "right-4 md:right-0" : "left-4 md:left-0"
        }`}
      >
        {JP_NUMBERS[index]}
      </div>

      <div
        className={`relative flex flex-col ${
          isEven ? "items-start" : "md:items-end"
        }`}
      >
        {/* Red tick — alternates sides */}
        <div
          className={`absolute top-0 w-[3px] h-8 bg-red-600 ${
            isEven ? "left-0" : "md:right-0 left-0 md:left-auto"
          }`}
        />

        {/* Project name — dramatic scale */}
        <motion.h3
          className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-tighter text-zinc-900 leading-[0.95] mb-2 head-tilt glitch-hover transition-colors duration-300 cursor-default ${
            isEven ? "" : "md:text-right"
          }`}
          data-text={project.name}
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          animate={isInView ? { opacity: 1, x: 0, rotate: index % 2 === 0 ? -1.5 : 1 } : {}}
          whileHover={{ color: "#dc2626" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.name}
        </motion.h3>

        {/* Highlight badge */}
        {project.highlight && (
          <span
            className={`inline-block font-mono text-[10px] text-red-600 border border-red-600/30 px-2 py-0.5 uppercase tracking-widest mb-6 ${
              isEven ? "" : "md:self-end"
            }`}
          >
            {project.highlight}
          </span>
        )}

        {/* Description + stack + links — offset column */}
        <motion.div
          className={`max-w-[48ch] mt-6 ${
            isEven
              ? "md:ml-[25%] lg:ml-[35%]"
              : "md:mr-[25%] lg:mr-[35%] md:text-right"
          }`}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-zinc-500 text-sm leading-relaxed mb-6 cursor-default transition-all duration-300 hover:translate-x-1 hover:text-zinc-700">
            {project.description}
          </p>

          <div
            className={`flex flex-wrap gap-2 mb-6 ${
              isEven ? "" : "md:justify-end"
            }`}
          >
            {project.stack.map((tech, k) => (
              <div key={tech} style={{ perspective: "700px" }}>
                <motion.div
                  className="relative cursor-default select-none"
                  style={{
                    background: "#fafaf9",
                    border: "1px solid #e4e4e7",
                    borderRadius: "3px",
                    padding: "0.35rem 0.7rem 0.4rem",
                    boxShadow:
                      "0 2px 6px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)",
                    minWidth: "52px",
                  }}
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={isInView ? { rotateY: 0, opacity: 1 } : {}}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 12px 24px rgba(0,0,0,0.11)",
                    borderColor: "#dc2626",
                    transition: {
                      type: "spring",
                      stiffness: 320,
                      damping: 28,
                    },
                  }}
                  transition={{
                    rotateY: {
                      type: "spring",
                      stiffness: 200,
                      damping: 24,
                      delay: 0.35 + k * 0.08,
                    },
                    opacity: { duration: 0.15, delay: 0.35 + k * 0.08 },
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: "5px",
                      fontSize: "7px",
                      lineHeight: 1,
                      color: "rgba(220,38,38,0.28)",
                      fontFamily: "monospace",
                    }}
                  >
                    ♠
                  </span>
                  <span
                    style={{
                      display: "block",
                      textAlign: "center",
                      fontSize: "0.72rem",
                      color: "#3f3f46",
                      fontWeight: 300,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {tech}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      bottom: "3px",
                      right: "5px",
                      fontSize: "7px",
                      lineHeight: 1,
                      color: "rgba(220,38,38,0.28)",
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

          <div
            className={`flex gap-5 ${isEven ? "" : "md:justify-end"}`}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600"
              >
                Source
                <ArrowUpRight size={12} weight="bold" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600"
              >
                Live
                <ArrowUpRight size={12} weight="bold" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
