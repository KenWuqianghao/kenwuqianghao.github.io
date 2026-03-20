export interface BlogPost {
  slug: string;
  title: string;
  titleRuby?: string;
  date: string;
  excerpt: string;
  tags: string[];
  /** Large background glyph — list + article hero */
  watermarkKanji: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "coming-soon",
    title: "Coming Soon...",
    titleRuby: "近日公開",
    date: "2026-03-20",
    excerpt:
      "The feed is live — longer essays and notes will land here when they are ready.",
    tags: [],
    watermarkKanji: "近",
    content: [
      "Coming soon...",
      "This space will hold writing on machine learning, systems, and whatever else earns a longer arc than a thread. For now, you can still subscribe via RSS so new posts show up without checking back.",
    ],
  },
];

export type BlogPostPreview = Omit<BlogPost, "content">;

export function getSortedPostPreviews(): BlogPostPreview[] {
  return [...blogPosts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content: _c, ...rest }) => rest);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
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
