import type { Metadata } from "next";

/** Same origin as `metadataBase` in root layout. Crawlers need absolute image URLs. */
const SITE_ORIGIN = "https://kenwu.is-a.dev";

/** Matches `app/opengraph-image.tsx` (1200×630). */
const OG_IMAGE = {
  url: `${SITE_ORIGIN}/opengraph-image`,
  width: 1200,
  height: 630,
} as const;

type OgType = "website" | "article";

export function openGraphTwitterForBlog(
  title: string,
  description: string,
  canonicalUrl: string,
  imageAlt: string,
  type: OgType = "website",
): Pick<Metadata, "openGraph" | "twitter"> {
  const images = [{ ...OG_IMAGE, alt: imageAlt }];

  return {
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Ken Wu",
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
