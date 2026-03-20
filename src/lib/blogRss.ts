import { blogPosts } from "./blog";

const SITE = "https://kenwu.is-a.dev";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00Z`).toUTCString();
}

/** Plain text for description — no HTML in RSS excerpt/description. */
function itemDescription(post: (typeof blogPosts)[number]): string {
  return [post.excerpt, ...post.content].join("\n\n");
}

export function buildBlogRss(): string {
  const sorted = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const lastBuild =
    sorted[0] != null
      ? rfc822(sorted[0].date)
      : new Date().toUTCString();

  const items = sorted
    .map((post) => {
      const url = `${SITE}/blog/${post.slug}`;
      const desc = escapeXml(itemDescription(post));
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${desc}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml("Ken Wu — Writing")}</title>
    <link>${escapeXml(`${SITE}/blog`)}</link>
    <description>${escapeXml(
      "Essays and marginalia — ML, systems, and craft.",
    )}</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${escapeXml(
      `${SITE}/blog/rss.xml`,
    )}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}
