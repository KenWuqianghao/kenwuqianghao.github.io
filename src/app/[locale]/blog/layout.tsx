import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogShell } from "@/components/BlogShell";
import { getBlogIndexPlainDeck, isLocale, type Locale } from "@/lib/i18n";
import { openGraphTwitterForBlog } from "@/lib/socialMetadata";

const SITE = "https://kenwu.is-a.dev";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

function blogTitle(locale: Locale): string {
  if (locale === "zh") return "写作 — Ken Wu";
  if (locale === "it") return "Scritti — Ken Wu";
  return "Writing — Ken Wu";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;

  const title = blogTitle(locale);
  const description = getBlogIndexPlainDeck(locale);
  const langKeys = {
    en: `${SITE}/en/blog`,
    "zh-Hans": `${SITE}/zh/blog`,
    it: `${SITE}/it/blog`,
  } as const;

  const canonical = `${SITE}/${locale}/blog`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: langKeys,
      types: {
        "application/rss+xml": `${SITE}/blog/rss.xml`,
      },
    },
    ...openGraphTwitterForBlog(title, description, canonical, title, "website"),
  };
}

export default async function LocalizedBlogLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return <BlogShell locale={raw}>{children}</BlogShell>;
}
