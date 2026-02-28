"use client";

import { ScrollReveal } from "./ScrollReveal";

const accolades = [
  "Neo Scholar Finalist",
  "5x Hackathon Winner",
  "Stanford Code in Place Instructor",
  "Undergraduate Research Assistant",
  "Research Exchange — Lancaster University",
];

export function Accolades() {
  return (
    <section className="py-10 md:py-14 border-t border-zinc-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {accolades.map((item, i) => (
              <span key={item} className="inline-flex items-center gap-3">
                <span className="font-mono text-[10px] md:text-[11px] text-zinc-400 uppercase tracking-[0.12em] hover:text-red-600 transition-colors duration-300 cursor-default">
                  {item}
                </span>
                {i < accolades.length - 1 && (
                  <span className="text-red-600/40 text-[8px] select-none">&#9670;</span>
                )}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
