import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/BlogArticle";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { isLocale, type Locale, LOCALES } from "@/lib/i18n";
import { openGraphTwitterForBlog } from "@/lib/socialMetadata";

const SITE = "https://kenwu.is-a.dev";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return { title: "Not found" };
  const post = getPostBySlug(slug, raw as Locale);
  if (!post) return { title: "Not found" };

  const langHref = (l: Locale) => `${SITE}/${l}/blog/${slug}`;
  const canonical = langHref(raw as Locale);

  return {
    title: `${post.title} — Ken Wu`,
    description: post.excerpt,
    alternates: {
      canonical,
      languages: {
        en: langHref("en"),
        "zh-Hans": langHref("zh"),
        it: langHref("it"),
      },
    },
    ...openGraphTwitterForBlog(
      post.title,
      post.excerpt,
      canonical,
      post.title,
      "article",
    ),
  };
}

export default async function LocalizedBlogPostPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  return <BlogArticle post={post} locale={locale} />;
}
