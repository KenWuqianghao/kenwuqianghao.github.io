"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { personalInfo } from "@/lib/data";
import { ScrollReveal } from "./ScrollReveal";

export function Contact() {
  return (
    <section id="contact" className="py-32 md:py-48 border-t border-zinc-200/60 relative overflow-hidden">
      {/* Section kanji watermark */}
      <div className="absolute bottom-0 -left-8 font-display text-[18rem] md:text-[28rem] text-zinc-900/[0.02] leading-none select-none pointer-events-none gate-weave parallax-watermark">
        繋
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <span className="font-mono text-[10px] text-red-600 uppercase tracking-[0.3em] block mb-4">
            連絡 — Contact
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1} tilt={1.5}>
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tighter leading-[0.9] max-w-[16ch] text-zinc-900 glitch-hover"
            data-text="Let's build something together."
          >
            Let&apos;s build something together
            <span className="text-red-600">.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <a
            href={`mailto:${personalInfo.email}`}
            className="group inline-flex items-center gap-2 mt-14 font-mono text-sm text-zinc-400 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600"
          >
            <span>{personalInfo.email}</span>
            <ArrowUpRight
              size={14}
              weight="bold"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 flex gap-6">
            <a
              href={`https://github.com/${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-zinc-400 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600"
            >
              GitHub
            </a>
            <a
              href={`https://linkedin.com/in/${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-zinc-400 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600"
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-zinc-400 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600"
            >
              Resume
            </a>
          </div>
        </ScrollReveal>

        <div className="mt-36 pt-8 border-t border-zinc-200/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
            Ken Wu
          </p>
          <p className="font-mono text-[10px] text-zinc-400">
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}
