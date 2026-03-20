import type { ReactNode } from "react";
import { LOCALES } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleSegmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
