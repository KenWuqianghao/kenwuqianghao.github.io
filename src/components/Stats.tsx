"use client";

import { ScrollReveal } from "./ScrollReveal";

const stats = [
  { value: "7", kanji: "七", label: "Internships" },
  { value: "5", kanji: "五", label: "Hackathon Wins" },
  { value: "4", kanji: "四", label: "Countries" },
];

const tilts = [-2, 0, 1.5];

export function Stats() {
  return (
    <section className="py-20 md:py-28 border-t border-zinc-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start justify-center gap-12 md:gap-24">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.15} tilt={tilts[i]}>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <span className="font-display text-[4rem] md:text-[9rem] lg:text-[12rem] font-light tracking-tighter leading-none text-zinc-900">
                    {stat.kanji}
                  </span>
                  <span className="absolute -right-4 md:-right-6 top-0 font-mono text-[10px] md:text-xs text-zinc-300">
                    {stat.value}
                  </span>
                </div>
                <div className="w-8 h-[2px] bg-red-600 my-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
