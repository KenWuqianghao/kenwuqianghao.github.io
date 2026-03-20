"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export function LegacyBlogRedirect({ slug }: { slug?: string }) {
  const router = useRouter();

  useEffect(() => {
    const path = slug
      ? `/${DEFAULT_LOCALE}/blog/${slug}`
      : `/${DEFAULT_LOCALE}/blog`;
    const q = window.location.search;
    router.replace(path + q);
  }, [router, slug]);

  return (
    <div className="min-h-dvh flex items-center justify-center px-6 bg-[rgba(250,249,248,0.95)]">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
        …
      </p>
    </div>
  );
}
