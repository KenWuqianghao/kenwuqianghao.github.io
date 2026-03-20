import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogShell } from "@/components/BlogShell";
import { isLocale, type Locale } from "@/lib/i18n";
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

function blogDescription(locale: Locale): string {
  if (locale === "zh")
    return "关于机器学习、检索与工程的随笔与边注——SHAFT 式排印与神道留白。";
  if (locale === "it")
    return "Saggi e note su ML, ricerca e ingegneria — impaginazione da cut SHAFT e respiro shinto.";
  return "Essays and marginalia on machine learning, search, and engineering — in a SHAFT / Shinbo-inspired layout.";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;

  const title = blogTitle(locale);
  const description = blogDescription(locale);
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
