import { projects, personalInfo } from "./data";

export type GithubRepoBrief = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
  /** Normalized https URL from GitHub `homepage`, when the repo lists a deployed site. */
  liveUrl: string | null;
};

/** Profile / this site — not listed in archive */
const ARCHIVE_EXCLUDED_SLUGS = new Set([
  personalInfo.github.toLowerCase(),
  "kenwuqianghao.github.io",
]);

export function featuredRepoSlugs(): Set<string> {
  const s = new Set<string>();
  for (const p of projects) {
    if (p.github) {
      const slug = p.github
        .replace(/\/$/, "")
        .split("/")
        .pop()
        ?.toLowerCase();
      if (slug) s.add(slug);
    }
  }
  s.add("leaseease");
  s.add("directu");
  return s;
}

export function normalizeLiveUrl(homepage: string | null | undefined): string | null {
  if (homepage == null || typeof homepage !== "string") return null;
  const t = homepage.trim();
  if (!t) return null;
  if (/^https?:\/\//i.test(t)) return t;
  if (/^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}(\/\S*)?$/i.test(t)) return `https://${t}`;
  return null;
}

/** Forks, archived repos, empty shells, and common coursework / homework repo names. */
function isArchiveWorthy(r: {
  name: string;
  fork: boolean;
  archived?: boolean;
  stargazers_count: number;
  description: string | null;
}): boolean {
  if (r.fork) return false;
  if (r.archived) return false;
  const desc = r.description?.trim() ?? "";
  if (r.stargazers_count === 0 && !desc) return false;
  if (isLikelyCourseOrHomeworkRepo(r.name)) return false;
  return true;
}

function isLikelyCourseOrHomeworkRepo(name: string): boolean {
  const n = name.toLowerCase();
  if (n.includes("zoomcamp")) return true;
  if (n.includes("bootcamp")) return true;
  if (/^cs\d+$/.test(n)) return true;
  if (n.endsWith("-wa")) return true;
  if (n.includes("graduation-20")) return true;
  if (/^math\d+-/.test(n)) return true;
  if (n.includes("qxq-intro")) return true;
  if (n === "super-physics") return true;
  if (n.startsWith("c4ai-")) return true;
  if (/-datathon-\d{4}$/.test(n)) return true;
  if (n === "iitb-deep-learning-bootcamp" || n === "iitb-data-science-bootcamp")
    return true;
  return false;
}

/** Snapshot when GitHub is unreachable at build time (e.g. rate limit). */
const ARCHIVE_FALLBACK: GithubRepoBrief[] = [
  {
    name: "Kedit",
    html_url: "https://github.com/KenWuqianghao/Kedit",
    description: "Kedit is an AI keyframe editor for fast scene iteration.",
    stargazers_count: 1,
    language: "TypeScript",
    pushed_at: "",
    liveUrl: null,
  },
  {
    name: "OpenComposer",
    html_url: "https://github.com/KenWuqianghao/OpenComposer",
    description:
      "A miniature end-to-end reproduction of the Composer 2 training pipeline on a single NVIDIA GH200 480GB, using GLM-4-9B as the base model.",
    stargazers_count: 15,
    language: "Python",
    pushed_at: "",
    liveUrl: null,
  },
  {
    name: "Anaximander",
    html_url: "https://github.com/KenWuqianghao/Anaximander",
    description:
      "CLI + Ink TUI philosophy research agent (SEP, PhilArchive, PhilPapers, etc.)",
    stargazers_count: 1,
    language: "TypeScript",
    pushed_at: "",
    liveUrl: null,
  },
  {
    name: "Algoherence",
    html_url: "https://github.com/KenWuqianghao/Algoherence",
    description:
      "Empowering Financial Literacy for ALL using LLM Agents for Algorithmic Trading and Learning",
    stargazers_count: 18,
    language: "Python",
    pushed_at: "",
    liveUrl: null,
  },
  {
    name: "LeLM",
    html_url: "https://github.com/KenWuqianghao/LeLM",
    description:
      "Fine-tuned LLM for NBA hot takes. Built on Qwen3-8B with LoRA, trained on Reddit r/nba posts and synthetic data.",
    stargazers_count: 1,
    language: "Python",
    pushed_at: "",
    liveUrl: null,
  },
  {
    name: "Plaude-Code",
    html_url: "https://github.com/KenWuqianghao/Plaude-Code",
    description:
      "A macOS background daemon that connects a PS5 DualSense controller to Claude Code CLI.",
    stargazers_count: 1,
    language: "TypeScript",
    pushed_at: "",
    liveUrl: null,
  },
  {
    name: "Curtroller",
    html_url: "https://github.com/KenWuqianghao/Curtroller",
    description: "Control Cursor with a PlayStation controller",
    stargazers_count: 1,
    language: "TypeScript",
    pushed_at: "",
    liveUrl: null,
  },
  {
    name: "LinkedOut",
    html_url: "https://github.com/KenWuqianghao/LinkedOut",
    description:
      "Blur LinkedIn feed posts that match configurable phrases (Chrome MV3)",
    stargazers_count: 1,
    language: "JavaScript",
    pushed_at: "",
    liveUrl: null,
  },
];

export async function fetchArchiveRepos(): Promise<GithubRepoBrief[]> {
  const featured = featuredRepoSlugs();
  try {
    const res = await fetch(
      `https://api.github.com/users/${personalInfo.github}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    if (!res.ok) {
      return filterFallback(featured);
    }
    const raw = (await res.json()) as Array<{
      name: string;
      html_url: string;
      description: string | null;
      fork: boolean;
      archived?: boolean;
      stargazers_count: number;
      language: string | null;
      pushed_at: string;
      homepage: string | null;
    }>;
    if (!Array.isArray(raw)) {
      return filterFallback(featured);
    }
    return raw
      .filter((r) => !featured.has(r.name.toLowerCase()))
      .filter((r) => !ARCHIVE_EXCLUDED_SLUGS.has(r.name.toLowerCase()))
      .filter((r) => isArchiveWorthy(r))
      .map((r) => ({
        name: r.name,
        html_url: r.html_url,
        description: r.description,
        stargazers_count: r.stargazers_count,
        language: r.language,
        pushed_at: r.pushed_at,
        liveUrl: normalizeLiveUrl(r.homepage),
      }));
  } catch {
    return filterFallback(featured);
  }
}

function filterFallback(featured: Set<string>): GithubRepoBrief[] {
  return ARCHIVE_FALLBACK.filter(
    (r) =>
      !featured.has(r.name.toLowerCase()) &&
      !ARCHIVE_EXCLUDED_SLUGS.has(r.name.toLowerCase())
  );
}
