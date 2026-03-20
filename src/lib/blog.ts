import type { Locale } from "./i18n";

export interface BlogLocaleBlock {
  title: string;
  titleRuby?: string;
  excerpt: string;
  content: string[];
}

export interface BlogPost {
  slug: string;
  date: string;
  tags: string[];
  watermarkKanji: string;
  locales: {
    en: BlogLocaleBlock;
    zh?: BlogLocaleBlock;
    it?: BlogLocaleBlock;
  };
}

export interface BlogPostPreview {
  slug: string;
  date: string;
  tags: string[];
  watermarkKanji: string;
  title: string;
  titleRuby?: string;
  excerpt: string;
}

export type BlogPostResolved = Omit<BlogPost, "locales"> & BlogLocaleBlock;

export const blogPosts: BlogPost[] = [
  {
    slug: "coming-soon",
    date: "2026-03-20",
    tags: [],
    watermarkKanji: "近",
    locales: {
      en: {
        title: "Coming Soon...",
        titleRuby: "近日公開",
        excerpt:
          "The feed is live — longer essays and notes will land here when they are ready.",
        content: [
          "Coming soon...",
          "This space will hold writing on machine learning, systems, and whatever else earns a longer arc than a thread. For now, you can still subscribe via RSS so new posts show up without checking back.",
        ],
      },
      zh: {
        title: "即将到来……",
        titleRuby: "近日公開",
        excerpt:
          "订阅源已就绪——更长的文章与笔记会在准备好之后落在这里。",
        content: [
          "即将到来……",
          "这里会收录关于机器学习、系统，以及任何值得写成一篇长文的题目。眼下你可以先通过 RSS 订阅，新文章出现时不必反复回来看。",
        ],
      },
      it: {
        title: "Prossimamente…",
        titleRuby: "近日公開",
        excerpt:
          "Il feed è attivo: saggi e appunti più lunghi arriveranno quando saranno pronti.",
        content: [
          "Prossimamente…",
          "Questo spazio raccoglierà testi su machine learning, sistemi e tutto ciò che merita più spazio di un thread. Per ora puoi iscriverti al RSS così i nuovi post arrivano da te.",
        ],
      },
    },
  },
];

export function resolveLocaleBlock(
  post: BlogPost,
  locale: Locale,
): BlogLocaleBlock {
  return post.locales[locale] ?? post.locales.en;
}

export function resolvePost(post: BlogPost, locale: Locale): BlogPostResolved {
  const block = resolveLocaleBlock(post, locale);
  return {
    slug: post.slug,
    date: post.date,
    tags: post.tags,
    watermarkKanji: post.watermarkKanji,
    ...block,
  };
}

export function getSortedPostPreviews(locale: Locale): BlogPostPreview[] {
  return [...blogPosts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => {
      const b = resolveLocaleBlock(p, locale);
      return {
        slug: p.slug,
        date: p.date,
        tags: p.tags,
        watermarkKanji: p.watermarkKanji,
        title: b.title,
        titleRuby: b.titleRuby,
        excerpt: b.excerpt,
      };
    });
}

export function getPostBySlug(
  slug: string,
  locale: Locale,
): BlogPostResolved | undefined {
  const p = blogPosts.find((x) => x.slug === slug);
  if (!p) return undefined;
  return resolvePost(p, locale);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of blogPosts) {
    for (const t of p.tags) set.add(t);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}
