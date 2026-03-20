"use client";

import Link from "next/link";
import { ShinboEffects } from "@/components/ShinboEffects";
import { FilmGrain } from "@/components/FilmGrain";
import { ScrollParallax } from "@/components/ScrollParallax";
import { RedThread } from "@/components/RedThread";
import { BlogCutProvider } from "@/components/BlogCutTransition";

export function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <BlogCutProvider>
      <>
        <ShinboEffects />
        <ScrollParallax />
        <FilmGrain />
        <RedThread />
        <header className="fixed top-0 left-0 right-0 z-50">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex items-start">
            <Link
              href="/"
              className="group flex flex-col items-start gap-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 rounded-sm"
            >
              <span className="font-display text-xl md:text-2xl text-zinc-900 transition-colors duration-300 group-hover:text-red-600">
                表紙
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-zinc-400 group-hover:text-red-600 transition-colors duration-300">
                Home
              </span>
            </Link>
          </div>
        </header>
        <main className="relative z-10">{children}</main>
      </>
    </BlogCutProvider>
  );
}
