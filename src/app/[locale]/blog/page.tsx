import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/BlogIndex";
import { getAllTags, getSortedPostPreviews } from "@/lib/blog";
import { isLocale, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function LocalizedBlogIndexPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const posts = getSortedPostPreviews(locale);
  const allTags = getAllTags();

  return <BlogIndex locale={locale} posts={posts} allTags={allTags} />;
}
