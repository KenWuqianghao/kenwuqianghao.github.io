export const LOCALES = ["en", "zh", "it"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(s: string): s is Locale {
  return (LOCALES as readonly string[]).includes(s);
}

/** Default blog path for main-site navigation & RSS canonical links */
export const BLOG_INDEX_PATH = `/${DEFAULT_LOCALE}/blog` as const;

export type BlogIndexMessages = {
  kicker: string;
  titleWord: string;
  titleSuffixNote: string;
  deck: string;
  searchLabel: string;
  searchPlaceholder: string;
  tagsLabel: string;
  tagAll: string;
  clearFilters: string;
  rss: string;
  countOne: string;
  countMany: string;
  emptyState: string;
  read: string;
  watermark: string;
};

export type BlogArticleMessages = {
  backToIndex: string;
  backToIndexSub: string;
  footerBackKanji: string;
  footerBackSub: string;
};

export type BlogShellMessages = {
  coverLabel: string;
  homeSub: string;
  langLabel: string;
};

const blogIndex: Record<Locale, BlogIndexMessages> = {
  en: {
    kicker: "Writing / 随筆",
    titleWord: "Fragments",
    titleSuffixNote: "marginalia in the SHAFT register",
    deck:
      "Short essays on ML practice, search, and craft — laid out like title pans: bold type, quiet grids, and the occasional bilingual stutter.",
    searchLabel: "Search",
    searchPlaceholder: "Title, excerpt, tags…",
    tagsLabel: "Tags",
    tagAll: "All",
    clearFilters: "Clear filters",
    rss: "RSS feed",
    countOne: "piece",
    countMany: "pieces",
    emptyState:
      "No posts match this cut — try loosening search or another tag.",
    read: "Read",
    watermark: "篇",
  },
  zh: {
    kicker: "随笔 / Writing",
    titleWord: "断章",
    titleSuffixNote: "映在底片上的旁注",
    deck:
      "关于机器学习实践、检索与手艺的短章——排成标题卡的样子：利落字形、克制栅格，与偶尔的双语错拍。",
    searchLabel: "检索",
    searchPlaceholder: "标题、摘要、标签…",
    tagsLabel: "标签",
    tagAll: "全部",
    clearFilters: "清除筛选",
    rss: "RSS 订阅",
    countOne: "篇",
    countMany: "篇",
    emptyState: "没有符合条件的篇目——放宽检索或换个标签试试。",
    read: "阅读",
    watermark: "篇",
  },
  it: {
    kicker: "Scritti / 随筆",
    titleWord: "Frammenti",
    titleSuffixNote: "marginalia nello stile SHAFT",
    deck:
      "Brevi saggi su ML, ricerca e mestiere — impaginati come cartelli di titolo: tipi netti, griglie silenziose, e qualche inciampo bilingue.",
    searchLabel: "Cerca",
    searchPlaceholder: "Titolo, estratto, tag…",
    tagsLabel: "Tag",
    tagAll: "Tutti",
    clearFilters: "Azzera filtri",
    rss: "Feed RSS",
    countOne: "testo",
    countMany: "testi",
    emptyState:
      "Nessun testo corrisponde — prova a allentare la ricerca o un altro tag.",
    read: "Leggi",
    watermark: "篇",
  },
};

const blogArticle: Record<Locale, BlogArticleMessages> = {
  en: {
    backToIndex: "← 随筆 index",
    backToIndexSub: "",
    footerBackKanji: "目次へ",
    footerBackSub: "Back to index",
  },
  zh: {
    backToIndex: "← 返回索引",
    backToIndexSub: "",
    footerBackKanji: "回目录",
    footerBackSub: "Back to index",
  },
  it: {
    backToIndex: "← Indice dei testi",
    backToIndexSub: "",
    footerBackKanji: "Indice",
    footerBackSub: "Torna all\u2019indice",
  },
};

const blogShell: Record<Locale, BlogShellMessages> = {
  en: {
    coverLabel: "表紙",
    homeSub: "Home",
    langLabel: "Language",
  },
  zh: {
    coverLabel: "表紙",
    homeSub: "首页",
    langLabel: "语言",
  },
  it: {
    coverLabel: "表紙",
    homeSub: "Home",
    langLabel: "Lingua",
  },
};

export function getBlogIndexMessages(locale: Locale): BlogIndexMessages {
  return blogIndex[locale];
}

export function getBlogArticleMessages(locale: Locale): BlogArticleMessages {
  return blogArticle[locale];
}

export function getBlogShellMessages(locale: Locale): BlogShellMessages {
  return blogShell[locale];
}

export function dateLocaleForUi(locale: Locale): string {
  if (locale === "zh") return "zh-CN";
  if (locale === "it") return "it-IT";
  return "en-CA";
}

export function formatBlogIndexCount(
  locale: Locale,
  filtered: number,
  total: number,
  m: BlogIndexMessages,
): string {
  if (filtered === total) {
    if (locale === "zh") return `${total} ${m.countMany}`;
    return `${total} ${total === 1 ? m.countOne : m.countMany}`;
  }
  if (locale === "zh") return `显示 ${filtered}／共 ${total} 篇`;
  if (locale === "it") return `${filtered} di ${total} mostrati`;
  return `${filtered} of ${total} shown`;
}

export function formatReadAria(locale: Locale, title: string): string {
  if (locale === "zh") return `阅读：${title}`;
  if (locale === "it") return `Leggi: ${title}`;
  return `Read: ${title}`;
}
