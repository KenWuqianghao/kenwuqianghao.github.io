import type { Metadata } from "next";

const SITE = "https://kenwu.is-a.dev";

/** Legacy /blog routes: RSS discovery only (pages redirect to /en/blog). */
export const metadata: Metadata = {
  alternates: {
    types: {
      "application/rss+xml": `${SITE}/blog/rss.xml`,
    },
  },
};

export default function LegacyBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
