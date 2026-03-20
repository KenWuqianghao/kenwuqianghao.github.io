"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BlogCutLink } from "@/components/BlogCutTransition";
import type { BlogPostPreview } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import {
  getBlogIndexMessages,
  dateLocaleForUi,
  formatBlogIndexCount,
  formatReadAria,
} from "@/lib/i18n";

function formatDate(iso: string, locale: Locale) {
  return new Date(iso + "T12:00:00").toLocaleDateString(dateLocaleForUi(locale), {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogIndex({
  locale,
  posts,
  allTags,
}: {
  locale: Locale;
  posts: BlogPostPreview[];
  allTags: string[];
}) {
  const router = useRouter();
  const messages = getBlogIndexMessages(locale);
  const blogBase = `/${locale}/blog`;
  const [urlReady, setUrlReady] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");

  useLayoutEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setQuery(p.get("q") ?? "");
    setActiveTag(p.get("tag") ?? "");
    setUrlReady(true);
  }, []);

  useEffect(() => {
    const onPop = () => {
      const p = new URLSearchParams(window.location.search);
      setQuery(p.get("q") ?? "");
      setActiveTag(p.get("tag") ?? "");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (!urlReady) return;
    const id = window.setTimeout(() => {
      const p = new URLSearchParams();
      if (query.trim()) p.set("q", query.trim());
      if (activeTag) p.set("tag", activeTag);
      const nextPath = p.toString() ? `${blogBase}?${p.toString()}` : blogBase;
      const cur = `${window.location.pathname}${window.location.search}`;
      if (cur === nextPath) return;
      router.replace(nextPath, { scroll: false });
    }, 280);
    return () => window.clearTimeout(id);
  }, [query, activeTag, router, urlReady, blogBase]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (activeTag && !p.tags.includes(activeTag)) return false;
      if (!q) return true;
      const hay = [p.title, p.excerpt, p.titleRuby ?? "", ...p.tags]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [posts, query, activeTag]);

  const hasFilters = Boolean(query.trim() || activeTag);

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute top-[12%] -right-[8%] md:right-[4%] font-kanji text-[clamp(14rem,40vw,28rem)] text-zinc-900/[0.035] leading-none select-none pointer-events-none parallax-watermark gate-weave"
        aria-hidden
      >
        {messages.watermark}
      </div>

      <section className="min-h-dvh pt-28 md:pt-36 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 max-w-3xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.14em] md:tracking-[0.2em] text-zinc-400 mb-6">
            {messages.kicker}
          </p>
          <h1 className="font-display text-[clamp(3rem,10vw,6.5rem)] font-light tracking-tight leading-[0.92] text-zinc-900">
            <span className="weight-flicker">{messages.titleWord}</span>
            <span className="text-red-600">.</span>
            <br />
            <span className="text-zinc-400 text-[0.42em] md:text-[0.38em] tracking-tight font-normal italic">
              {messages.titleSuffixNote}
            </span>
          </h1>
          <p className="mt-8 font-mono text-[11px] md:text-xs text-zinc-500 leading-relaxed max-w-xl border-l-2 border-red-600/70 pl-4">
            {messages.deckBefore}
            {messages.deckEmphasis ? (
              <em className="italic text-zinc-600">{messages.deckEmphasis}</em>
            ) : null}
            {messages.deckAfter}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-12 md:mb-16">
          <div className="lg:w-[min(100%,280px)] shrink-0 space-y-6">
            <div>
              <label
                htmlFor="blog-search"
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 block mb-2"
              >
                {messages.searchLabel}
              </label>
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={messages.searchPlaceholder}
                autoComplete="off"
                className="w-full font-mono text-sm text-zinc-900 bg-[rgba(250,249,248,0.95)] border border-zinc-200 rounded-sm px-3 py-2.5 placeholder:text-zinc-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40 focus-visible:border-red-600/50"
              />
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 mb-2">
                {messages.tagsLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTag("")}
                  className={`font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-sm border transition-colors duration-200 ${
                    !activeTag
                      ? "border-red-600 text-red-600 bg-red-600/[0.06]"
                      : "border-zinc-200 text-zinc-500 hover:border-zinc-300"
                  }`}
                >
                  {messages.tagAll}
                </button>
                {allTags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setActiveTag((prev) => (prev === t ? "" : t))
                    }
                    className={`font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-sm border transition-colors duration-200 ${
                      activeTag === t
                        ? "border-red-600 text-red-600 bg-red-600/[0.06]"
                        : "border-zinc-200 text-zinc-500 hover:border-zinc-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {hasFilters ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveTag("");
                  }}
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400 hover:text-red-600 transition-colors underline underline-offset-4 decoration-zinc-300 text-left"
                >
                  {messages.clearFilters}
                </button>
              ) : null}
              <a
                href="/blog/rss.xml"
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 hover:text-red-600 transition-colors inline-flex items-center gap-2 w-fit"
              >
                <span className="w-6 h-px bg-current shrink-0" />
                {messages.rss}
              </a>
            </div>
          </div>

          <p
            className="lg:ml-auto lg:text-right font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 tabular-nums self-end"
            aria-live="polite"
          >
            {formatBlogIndexCount(locale, filtered.length, posts.length, messages)}
          </p>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="font-mono text-sm text-zinc-500 border-l-2 border-red-600/40 pl-4 max-w-md"
            >
              {messages.emptyState}
            </motion.p>
          ) : (
            <motion.ul
              key="list"
              layout
              className="flex flex-col gap-6 md:gap-8 list-none p-0 m-0"
            >
              {filtered.map((post, i) => (
                <motion.li
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                    layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  }}
                >
                  <article
                    className={[
                      "group relative rounded-sm border border-zinc-200/80 bg-[rgba(250,249,248,0.88)] backdrop-blur-[2px]",
                      "p-6 md:p-8 transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(220,38,38,0.25),0_24px_48px_-24px_rgba(0,0,0,0.12)]",
                      "head-tilt",
                      i % 2 === 0
                        ? "-rotate-[0.35deg] md:-rotate-[0.65deg]"
                        : "rotate-[0.45deg] md:rotate-[0.55deg]",
                    ].join(" ")}
                  >
                    <div className="absolute top-4 right-5 font-kanji text-4xl md:text-5xl text-zinc-900/[0.07] pointer-events-none select-none">
                      {post.watermarkKanji}
                    </div>
                    <div className="relative flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8">
                      <time
                        dateTime={post.date}
                        className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 shrink-0 tabular-nums"
                      >
                        {formatDate(post.date, locale)}
                      </time>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {post.tags.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setActiveTag(t)}
                            className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm border transition-colors duration-200 ${
                              activeTag === t
                                ? "text-red-600 border-red-600/60 bg-red-600/[0.06]"
                                : "text-zinc-400 border-zinc-200 hover:border-red-600/35 hover:text-zinc-600"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <h2 className="mt-5 font-display text-2xl md:text-3xl font-medium text-zinc-900 leading-snug">
                      <BlogCutLink
                        href={`${blogBase}/${post.slug}`}
                        className="glitch-hover inline-block text-inherit no-underline"
                        data-text={post.title}
                      >
                        {post.title}
                        <span className="text-red-600">.</span>
                      </BlogCutLink>
                    </h2>

                    {post.titleRuby ? (
                      <p className="mt-1 font-mono text-[10px] text-zinc-400 tracking-wide">
                        {post.titleRuby}
                      </p>
                    ) : null}

                    <p className="mt-4 text-zinc-600 text-sm md:text-base leading-relaxed max-w-2xl">
                      {post.excerpt}
                    </p>

                    <BlogCutLink
                      href={`${blogBase}/${post.slug}`}
                      className="inline-flex items-center gap-2 mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 hover:text-red-600 transition-colors duration-300"
                      aria-label={formatReadAria(locale, post.title)}
                    >
                      <span className="w-8 h-px bg-current" />
                      {messages.read}
                    </BlogCutLink>
                  </article>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
