import { LegacyBlogRedirect } from "@/components/LegacyBlogRedirect";
import { getAllSlugs } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function LegacyBlogPostPage({ params }: Props) {
  const { slug } = await params;
  return <LegacyBlogRedirect slug={slug} />;
}
