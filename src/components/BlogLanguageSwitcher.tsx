"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { BlogCutLink } from "@/components/BlogCutTransition";
import {
  LOCALES,
  type Locale,
  isLocale,
  getBlogShellMessages,
} from "@/lib/i18n";

const localeLabel: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  it: "IT",
};

function blogPathForLocale(pathname: string, nextLocale: Locale): string | null {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  if (!isLocale(parts[0] ?? "")) return null;
  if (parts[1] !== "blog") return null;
  const rest = parts.slice(2);
  const base = `/${nextLocale}/blog`;
  return rest.length ? `${base}/${rest.join("/")}` : base;
}

export function BlogLanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.toString();
  const suffix = q ? `?${q}` : "";
  const shell = getBlogShellMessages(locale);

  return (
    <div
      className="ml-auto flex flex-col items-end gap-1.5"
      role="navigation"
      aria-label={shell.langLabel}
    >
      <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-400">
        {shell.langLabel}
      </span>
      <div className="flex rounded-sm border border-zinc-200/90 bg-[rgba(250,249,248,0.75)] p-0.5 shadow-[inset_0_0_0_1px_rgba(220,38,38,0.06)]">
        {LOCALES.map((code) => {
          const href = blogPathForLocale(pathname, code);
          if (!href) return null;
          const active = code === locale;
          return (
            <BlogCutLink
              key={code}
              href={`${href}${suffix}`}
              className={[
                "font-mono text-[9px] uppercase tracking-[0.12em] px-2 py-1 rounded-sm min-w-[2.25rem] text-center transition-colors duration-200",
                active
                  ? "bg-red-600 text-stone-50 shadow-sm"
                  : "text-zinc-500 hover:text-red-600 hover:bg-red-600/[0.06]",
              ].join(" ")}
              aria-current={active ? "true" : undefined}
            >
              {localeLabel[code]}
            </BlogCutLink>
          );
        })}
      </div>
    </div>
  );
}
