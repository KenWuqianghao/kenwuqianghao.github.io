"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";

const navLinks = [
  { kanji: "経験", label: "Experience", href: "#experience", id: "experience" },
  { kanji: "作品", label: "Projects", href: "#projects", id: "projects" },
  { kanji: "技術", label: "Skills", href: "#skills", id: "skills" },
  { kanji: "随筆", label: "Writing", href: "/blog", id: "blog" },
  { kanji: "連絡", label: "Contact", href: "#contact", id: "contact" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const sectionActive = useActiveSection();

  const isLinkActive = (id: string) => {
    if (id === "blog") return pathname === "/blog" || pathname.startsWith("/blog/");
    return sectionActive === id;
  };

  return (
    <nav aria-label="Main navigation">
      {/* Desktop — kanji stack */}
      <motion.div
        className="hidden md:flex flex-col gap-3 fixed top-6 right-6 md:right-12 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
      >
        {navLinks.map((link) => {
          const active = isLinkActive(link.id);
          const body = (
            <>
              <span
                className={`font-display text-lg transition-colors duration-300 group-hover:text-red-600 relative ${
                  active ? "text-zinc-900" : "text-zinc-400"
                }`}
              >
                {link.kanji}
                {active && (
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-red-600" />
                )}
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-zinc-400 group-hover:text-red-600 transition-colors duration-300">
                {link.label}
              </span>
            </>
          );
          return link.href.startsWith("/") ? (
            <Link
              key={link.id}
              href={link.href}
              aria-label={link.label}
              className="group flex flex-col items-end"
            >
              {body}
            </Link>
          ) : (
            <a
              key={link.id}
              href={link.href}
              aria-label={link.label}
              className="group flex flex-col items-end"
            >
              {body}
            </a>
          );
        })}
      </motion.div>

      {/* Mobile — toggle button */}
      <motion.button
        className="md:hidden fixed top-4 right-4 z-40 font-mono text-xs text-zinc-900 uppercase tracking-widest p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-expanded={mobileOpen}
        aria-label="Toggle navigation menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {mobileOpen ? "閉" : "目次"}
      </motion.button>

      {/* Mobile — full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-30 bg-stone-50/98 backdrop-blur-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => {
                const active = isLinkActive(link.id);
                const mobileBody = (
                  <>
                    <span
                      className={`font-display text-3xl transition-colors duration-300 group-hover:text-red-600 ${
                        active ? "text-zinc-900" : "text-zinc-400"
                      }`}
                    >
                      {link.kanji}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400 group-hover:text-red-600 transition-colors duration-300 mt-1">
                      {link.label}
                    </span>
                  </>
                );
                return link.href.startsWith("/") ? (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <Link
                      href={link.href}
                      aria-label={link.label}
                      className="flex flex-col items-center group"
                      onClick={() => setMobileOpen(false)}
                    >
                      {mobileBody}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    aria-label={link.label}
                    className="flex flex-col items-center group"
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }}
                  >
                    {mobileBody}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
