import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { ShinboEffects } from "@/components/ShinboEffects";
import { RedThread } from "@/components/RedThread";
import { CursorTrail } from "@/components/CursorTrail";
import { ScrollParallax } from "@/components/ScrollParallax";
import { FilmGrain } from "@/components/FilmGrain";
import { ProjectsArchive } from "@/components/ProjectsArchive";
import { fetchArchiveRepos } from "@/lib/githubArchive";
import { personalInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Repositories — Ken Wu",
  description:
    "Additional GitHub repositories and side projects by Ken Wu — coursework, tools, experiments, and more.",
  openGraph: {
    title: "Repositories — Ken Wu",
    description:
      "Curated archive of GitHub work beyond the main portfolio highlights.",
    url: "https://kenwu.is-a.dev/projects",
  },
};

export default async function ProjectsPage() {
  const repos = await fetchArchiveRepos();

  return (
    <>
      <ShinboEffects />
      <ScrollParallax />
      <FilmGrain />
      <CursorTrail />
      <RedThread />
      <Navigation />
      <main className="relative z-10 min-h-screen">
        <ProjectsArchive repos={repos} />
        <footer className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20 text-center bg-[rgba(250,249,248,0.92)]">
          <a
            href={`https://github.com/${personalInfo.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 hover:text-red-600 transition-colors duration-300"
          >
            View on GitHub →
          </a>
        </footer>
      </main>
    </>
  );
}
