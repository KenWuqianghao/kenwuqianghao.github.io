"use client";

import { motion } from "framer-motion";
import { BlogCutLink } from "@/components/BlogCutTransition";
import type { BlogPostResolved } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import { getBlogArticleMessages, dateLocaleForUi } from "@/lib/i18n";

function formatDate(iso: string, locale: Locale) {
  return new Date(iso + "T12:00:00").toLocaleDateString(
    dateLocaleForUi(locale),
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
}

export function BlogArticle({
  post,
  locale,
}: {
  post: BlogPostResolved;
  locale: Locale;
}) {
  const messages = getBlogArticleMessages(locale);
  const blogBase = `/${locale}/blog`;

  return (
    <article className="relative overflow-hidden min-h-dvh bg-[rgba(250,249,248,0.92)]">
      <div
        className="absolute bottom-[-10%] left-[-12%] md:left-[2%] font-kanji text-[clamp(16rem,48vw,36rem)] text-zinc-900/[0.04] leading-none select-none pointer-events-none parallax-watermark gate-weave"
        aria-hidden
      >
        {post.watermarkKanji}
      </div>

      <div className="max-w-[720px] mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-28">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 mb-6">
            <BlogCutLink
              href={blogBase}
              className="hover:text-red-600 transition-colors duration-300"
            >
              {messages.backToIndex}
            </BlogCutLink>
          </p>

          <time
            dateTime={post.date}
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 tabular-nums"
          >
            {formatDate(post.date, locale)}
          </time>

          <h1 className="mt-4 font-display text-[clamp(2.25rem,7vw,3.75rem)] font-light tracking-tight leading-[1.05] text-zinc-900">
            <span className="glitch-hover inline-block" data-text={post.title}>
              {post.title}
            </span>
            <span className="text-red-600">.</span>
          </h1>

          {post.titleRuby ? (
            <p className="mt-2 font-mono text-xs text-zinc-400 tracking-wide">
              {post.titleRuby}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 border border-zinc-200 bg-[rgba(250,249,248,0.85)] px-2 py-0.5 rounded-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.header>

        <div
          className="mt-14 space-y-6 text-zinc-700 text-base md:text-lg leading-[1.75] [&_p]:m-0"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {post.content.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15 + idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={
                idx === 0
                  ? "first-letter:font-display first-letter:text-[2.85rem] first-letter:leading-[0.85] first-letter:mr-1 first-letter:float-left first-letter:text-zinc-900"
                  : undefined
              }
            >
              {para}
            </motion.p>
          ))}
        </div>

        <motion.footer
          className="mt-20 pt-10 border-t border-zinc-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <BlogCutLink
            href={blogBase}
            className="group inline-flex flex-col gap-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 rounded-sm"
          >
            <span className="font-display text-lg text-zinc-900 group-hover:text-red-600 transition-colors">
              {messages.footerBackKanji}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-zinc-400 group-hover:text-red-600 transition-colors">
              {messages.footerBackSub}
            </span>
          </BlogCutLink>
        </motion.footer>
      </div>
    </article>
  );
}
