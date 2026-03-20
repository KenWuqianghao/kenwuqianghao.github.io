import type { NextConfig } from "next";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { buildBlogRss } from "./src/lib/blogRss";

const rssPath = join(process.cwd(), "public", "blog", "rss.xml");
mkdirSync(dirname(rssPath), { recursive: true });
writeFileSync(rssPath, buildBlogRss(), "utf8");

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
