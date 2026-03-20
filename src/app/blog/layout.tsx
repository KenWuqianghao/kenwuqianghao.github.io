import type { Metadata } from "next";
import { BlogShell } from "@/components/BlogShell";

const SITE = "https://kenwu.is-a.dev";

export const metadata: Metadata = {
  alternates: {
    types: {
      "application/rss+xml": `${SITE}/blog/rss.xml`,
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlogShell>{children}</BlogShell>;
}
