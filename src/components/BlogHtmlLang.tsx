"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

const htmlLang: Record<Locale, string> = {
  en: "en",
  zh: "zh-Hans",
  it: "it",
};

export function BlogHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = htmlLang[locale];
    return () => {
      document.documentElement.lang = prev;
    };
  }, [locale]);

  return null;
}
