import type { Metadata } from "next";
import { BlogIndex } from "./BlogIndex";
import { getAllTags, getSortedPostPreviews } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing — Ken Wu",
  description:
    "Essays and marginalia on machine learning, search, and engineering — in a SHAFT / Shinbo-inspired layout.",
  openGraph: {
    title: "Writing — Ken Wu",
    description:
      "Essays and marginalia on machine learning, search, and engineering.",
  },
};

export default function BlogPage() {
  const posts = getSortedPostPreviews();
  const allTags = getAllTags();

  return <BlogIndex posts={posts} allTags={allTags} />;
}
