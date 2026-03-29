"use client";

import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { GithubRepoBrief } from "@/lib/githubArchive";
import { personalInfo } from "@/lib/data";
import { ScrollReveal } from "./ScrollReveal";
import { ArrowUpRight, CaretDown, Star } from "@phosphor-icons/react";

export type SortMode = "recent" | "oldest" | "stars" | "name";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "recent", label: "Recently pushed" },
  { value: "oldest", label: "Oldest activity" },
  { value: "stars", label: "Stars (high → low)" },
  { value: "name", label: "Name (A → Z)" },
];

function matchesQuery(repo: GithubRepoBrief, q: string): boolean {
  if (!q.trim()) return true;
  const n = `${repo.name} ${repo.description ?? ""}`.toLowerCase();
  return n.includes(q.trim().toLowerCase());
}

function sortRepos(list: GithubRepoBrief[], mode: SortMode): GithubRepoBrief[] {
  const out = [...list];
  const pushTime = (p: string) => {
    const t = Date.parse(p);
    return Number.isFinite(t) ? t : 0;
  };
  switch (mode) {
    case "stars":
      out.sort((a, b) => b.stargazers_count - a.stargazers_count || a.name.localeCompare(b.name));
      break;
    case "name":
      out.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
      break;
    case "oldest":
      out.sort((a, b) => pushTime(a.pushed_at) - pushTime(b.pushed_at) || a.name.localeCompare(b.name));
      break;
    case "recent":
    default:
      out.sort((a, b) => pushTime(b.pushed_at) - pushTime(a.pushed_at) || a.name.localeCompare(b.name));
      break;
  }
  return out;
}

function SortDropdown({
  value,
  onChange,
  id,
}: {
  value: SortMode;
  onChange: (m: SortMode) => void;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const label = SORT_OPTIONS.find((o) => o.value === value)?.label ?? value;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative min-w-[220px]">
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 font-mono text-xs text-zinc-800 bg-[rgba(250,249,248,0.98)] border border-zinc-200/90 px-4 py-3 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.04)] cursor-pointer text-left hover:border-zinc-300 focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-colors"
      >
        <span className="truncate">{label}</span>
        <CaretDown
          size={14}
          weight="bold"
          className={`shrink-0 text-zinc-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={`${id}-listbox`}
            role="listbox"
            aria-labelledby={id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 top-full left-0 right-0 mt-1.5 py-1 border border-zinc-200/90 bg-[rgba(252,251,250,0.98)] shadow-[0_12px_40px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] backdrop-blur-md rounded-sm overflow-hidden"
          >
            {SORT_OPTIONS.map((opt) => {
              const selected = opt.value === value;
              return (
                <li key={opt.value} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    className={`w-full text-left font-mono text-[11px] uppercase tracking-[0.08em] px-4 py-2.5 transition-colors ${
                      selected
                        ? "text-red-600 bg-red-600/[0.06]"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80"
                    }`}
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProjectsArchive({ repos }: { repos: GithubRepoBrief[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("recent");
  const reduceMotion = useReducedMotion();

  const visible = useMemo(() => {
    const filtered = repos.filter((r) => matchesQuery(r, query));
    return sortRepos(filtered, sort);
  }, [repos, query, sort]);

  const layoutEase = [0.16, 1, 0.3, 1] as const;

  return (
    <>
      <header className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[rgba(250,249,248,0.92)]">
        <div className="absolute -top-6 right-0 md:right-12 font-kanji text-[14rem] md:text-[22rem] text-zinc-900/[0.03] leading-none select-none pointer-events-none gate-weave parallax-watermark">
          倉庫
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
          <Link
            href="/"
            className="inline-flex font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 hover:text-red-600 transition-colors duration-300 mb-10"
          >
            ← Home
          </Link>
          <ScrollReveal tilt={-1.5}>
            <p className="font-mono text-[10px] text-red-600 uppercase tracking-[0.3em] mb-4">
              他作 — More work
            </p>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tighter text-zinc-900 glitch-hover leading-[0.95] mb-6"
              data-text="Repositories"
            >
              Repositories
            </h1>
            <p className="max-w-[52ch] text-zinc-500 text-sm leading-relaxed">
              Original repos on{" "}
              <a
                href={`https://github.com/${personalInfo.github}`}
                className="text-zinc-700 underline underline-offset-4 decoration-zinc-300 hover:text-red-600 hover:decoration-red-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{" "}
              beyond the curated highlights on the main page — search, sort, and open sources or live
              demos when a homepage is set on the repo.
            </p>
          </ScrollReveal>
        </div>
      </header>

      <section className="pb-32 md:pb-48 relative bg-[rgba(250,249,248,0.92)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-10 md:mb-12 flex flex-col gap-4 lg:flex-row gap-y-4 lg:items-end lg:justify-between border-b border-zinc-200/80 pb-8">
            <div className="w-full lg:max-w-md">
              <label htmlFor="repo-search" className="sr-only">
                Search repositories
              </label>
              <input
                id="repo-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or description…"
                autoComplete="off"
                className="w-full font-mono text-sm text-zinc-900 placeholder:text-zinc-400 bg-[rgba(250,249,248,0.98)] border border-zinc-200/90 px-4 py-3 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.04)] focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-colors"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full sm:w-auto">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 hidden sm:inline shrink-0">
                Sort
              </span>
              <SortDropdown id="repo-sort" value={sort} onChange={setSort} />
            </div>
          </div>

          <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-8">
            Showing {visible.length} of {repos.length}
          </p>

          <LayoutGroup id="repo-grid">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((repo, i) => (
                  <ArchiveCard
                    key={repo.html_url}
                    repo={repo}
                    index={i}
                    layoutEase={layoutEase}
                    reduceMotion={!!reduceMotion}
                  />
                ))}
              </AnimatePresence>
            </div>
          </LayoutGroup>

          <AnimatePresence>
            {visible.length === 0 && (
              <motion.p
                key="empty"
                initial={{ opacity: 0, y: 6, filter: reduceMotion ? "none" : "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-zinc-500 text-sm font-mono"
              >
                No repositories match your search. Clear the filter or try another keyword.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

function ArchiveCard({
  repo,
  index,
  layoutEase,
  reduceMotion,
}: {
  repo: GithubRepoBrief;
  index: number;
  layoutEase: readonly [number, number, number, number];
  reduceMotion: boolean;
}) {
  const desc =
    repo.description?.trim() || "No one-line description on GitHub — see the repo for details.";

  const enterBlur = reduceMotion ? "none" : "blur(8px)";
  const exitBlur = reduceMotion ? "none" : "blur(10px)";
  const layoutCfg = reduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: layoutEase };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98, filter: enterBlur }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        y: reduceMotion ? 0 : -14,
        scale: reduceMotion ? 1 : 0.96,
        filter: exitBlur,
      }}
      transition={{
        layout: layoutCfg,
        opacity: { duration: reduceMotion ? 0.15 : 0.32, ease: layoutEase },
        y: { duration: reduceMotion ? 0.15 : 0.35, ease: layoutEase },
        scale: { duration: reduceMotion ? 0.15 : 0.35, ease: layoutEase },
        filter: { duration: reduceMotion ? 0.1 : 0.28, ease: layoutEase },
        delay: reduceMotion ? 0 : Math.min(index * 0.03, 0.35),
      }}
      className="group relative border border-zinc-200/80 bg-[rgba(250,249,248,0.97)] p-6 md:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-red-600/35 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-[border-color,box-shadow] duration-300 flex flex-col"
    >
      <span className="absolute top-5 right-6 font-mono text-[10px] text-zinc-900/20 tracking-[0.2em]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex flex-wrap items-center gap-2 mb-3 relative">
        {repo.language && (
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-500 border border-zinc-200 px-1.5 py-0.5">
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="inline-flex items-center gap-0.5 font-mono text-[9px] text-zinc-400">
            <Star size={11} weight="fill" className="text-zinc-300" aria-hidden />
            {repo.stargazers_count}
          </span>
        )}
      </div>

      <h2 className="text-xl md:text-2xl font-display font-light tracking-tight text-zinc-900 mb-3 pr-8 head-tilt group-hover:text-red-600 transition-colors duration-300">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          {repo.name}
          <ArrowUpRight
            size={18}
            weight="bold"
            className="opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-opacity text-red-600"
            aria-hidden
          />
        </a>
      </h2>

      <p className="text-zinc-500 text-sm leading-relaxed line-clamp-4 grow">{desc}</p>

      {repo.pushed_at && (
        <p className="mt-4 font-mono text-[9px] text-zinc-400 uppercase tracking-wider">
          Pushed {formatPushed(repo.pushed_at)}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-4">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600"
        >
          Source
          <ArrowUpRight size={12} weight="bold" aria-hidden />
        </a>
        {repo.liveUrl && (
          <a
            href={repo.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600"
          >
            Live
            <ArrowUpRight size={12} weight="bold" aria-hidden />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function formatPushed(iso: string) {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
