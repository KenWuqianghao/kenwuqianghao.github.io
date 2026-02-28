"use client";

import { motion } from "framer-motion";
import { TextReveal } from "./TextReveal";
import { personalInfo } from "@/lib/data";

export function Hero() {
  return (
    <section className="min-h-[100dvh] relative flex items-end pb-16 md:pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-4 items-end">
          <div>
            <motion.p
              className="font-mono text-xs text-zinc-400 uppercase tracking-[0.2em] mb-8 film-jitter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Software Engineer & ML Researcher
            </motion.p>

            <div className="relative">
              <h1 className="text-[clamp(4.5rem,14vw,11rem)] font-display tracking-tighter leading-[0.85] font-light weight-flicker">
                <TextReveal delay={0.1}>
                  <motion.span
                    className="text-zinc-900 glitch-hover inline-block"
                    data-text="Ken"
                    animate={{ rotate: -2 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Ken
                  </motion.span>
                </TextReveal>
                <TextReveal delay={0.25}>
                  <motion.span
                    className="text-zinc-900 glitch-hover inline-block"
                    data-text="Wu."
                    animate={{ rotate: 1 }}
                    transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Wu<span className="text-red-600">.</span>
                  </motion.span>
                </TextReveal>
              </h1>
              <motion.span
                className="block font-display text-xl md:text-2xl text-zinc-300 tracking-[0.3em] mt-2 ml-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                吴锵皓
              </motion.span>
            </div>
          </div>

          <motion.div
            className="lg:text-right flex flex-col gap-6 lg:pb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                Based in
              </span>
              <span className="text-zinc-700 text-sm">
                {personalInfo.location}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                Education
              </span>
              <span className="text-zinc-700 text-sm">
                University of Waterloo, CS &apos;26
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                Status
              </span>
              <span className="text-zinc-700 text-sm">
                Seeking Fall 2026 / New Grad — ML, Systems, SWE
              </span>
            </div>

            <div className="flex lg:justify-end gap-6 mt-2">
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
                href={`mailto:${personalInfo.email}`}
                className="font-mono text-xs text-zinc-400 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600"
              >
                Email
              </a>
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-400 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600"
              >
                Resume
              </a>
              <a
                href={`https://x.com/${personalInfo.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-400 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600"
              >
                X
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
