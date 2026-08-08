export const personalInfo = {
  name: "Ken Wu",
  title: "Software Engineer & ML Researcher",
  email: "ken.wu@uwaterloo.ca",
  location: "Toronto, ON",
  github: "KenWuqianghao",
  linkedin: "kenwuu",
  website: "kenwu.is-a.dev",
  twitter: "kenwuuuu",
  resume: "/Ken_Wu_Resume.pdf",
};

export interface ExperienceEntry {
  company: string;
  role: string;
  type: string;
  dates: string;
  location: string;
  stack: string[];
  bullets: string[];
  meta?: string;
  website?: string;
  advisorUrl?: string;
  advisorLabel?: string;
}

/** Current academic research; featured in the Experience section */
export const activeResearch: ExperienceEntry[] = [
  {
    company: "Fermilab",
    role: "Open Source Developer",
    type: "Agentic Lagrangian Extraction",
    dates: "May 2026 \u2014 Present",
    location: "Remote \u00b7 United States",
    website: "https://summerofcode.withgoogle.com/programs/2026/projects/k28fWeH1",
    meta: "Google Summer of Code \u00b7 ML4SCI · University of Alabama",
    stack: ["Python"],
    bullets: [
      "Built agentic Lagrangian extraction tooling for ML4SCI at Fermilab under Google Summer of Code 2026 with University of Alabama mentors",
      "Open-sourced the pipeline for physics-informed symbolic extraction; project details on the GSoC 2026 page",
    ],
  },
];

/** Completed research roles; shown in a compact past-research block */
export const pastResearch: ExperienceEntry[] = [
  {
    company: "University of Waterloo",
    role: "Undergraduate Research Assistant",
    type: "ML \u00b7 Attention & symbolic regression",
    dates: "Sep 2024 \u2014 Apr 2026",
    location: "Waterloo, Canada \u00b7 Remote",
    website: "https://uwaterloo.ca/",
    advisorUrl: "https://uwaterloo.ca/statistics-and-actuarial-science/profiles/ali-ghodsi",
    advisorLabel: "Advisor",
    stack: ["Python", "PyTorch", "Transformers"],
    meta: "With Prof. Ali Ghodsi & Amin Ravanbakhsh",
    bullets: [
      "Held R² ≥ 0.99 on numerically stable symbolic-regression fits by benchmarking models at dataset scale",
      "Raised in-domain accuracy ~19pp by fine-tuning Symbolic GPT variants under Prof. Ali Ghodsi",
      "Balanced R² vs. model complexity via tokenizer and Point-Net ablations across benchmark suites",
      "Cut MSE and MRE on standard benchmarks by refining inference loops for Symbolic GPT",
    ],
  },
  {
    company: "Lancaster University",
    role: "Undergraduate Researcher",
    type: "Unsupervised learning",
    dates: "Jan 2025 \u2014 May 2026",
    location: "Lancaster, UK \u00b7 On-site",
    website: "https://www.lancaster.ac.uk/",
    advisorUrl: "https://www.lancaster.ac.uk/lira/people/plamen-angelov",
    advisorLabel: "Advisor",
    stack: ["Python", "NumPy", "scikit-learn"],
    meta: "With Prof. Plamen Angelov",
    bullets: [
      "Sped up PAMSil up to 85.6% on CIFAR-100 at equal quality with recursive ReSil / ReSilC (O(1) key updates)",
      "Beat K-Means wall-clock by 17\u201324% on CIFAR-10/100, MNIST, and Fashion-MNIST via optimized R-Means centroids",
      "Benchmarked recursive vs. flat clustering across 8+ datasets with 10-run averages in NumPy / scikit-learn",
      "Kept speed-quality comparisons fair by tracking silhouette, inertia, and wall-clock on every run",
    ],
  },
];

export const researchExperience: ExperienceEntry[] = [
  ...activeResearch,
  ...pastResearch,
];

/** Industry, teaching, and internships (full-width cards) */
export const experience: ExperienceEntry[] = [
  {
    company: "Mercor",
    role: "Member of Technical Staff",
    type: "Enterprise AI",
    dates: "Incoming",
    location: "San Francisco, United States",
    website: "https://mercor.com",
    stack: [],
    bullets: [
      "Incoming Member of Technical Staff, Enterprise AI.",
    ],
  },
  {
    company: "Lyft",
    role: "Machine Learning Software Engineer Intern",
    type: "Bailout Model",
    dates: "May 2026 \u2014 Aug 2026",
    location: "Toronto, Canada",
    website: "https://www.lyft.com/",
    stack: ["Python", "CatBoost", "SQL", "GeoPandas"],
    bullets: [
      "Doubled the bailout model\u2019s cancel-detection recall (+34.2pp at 2.5% FPR) via 17 new route/GPS features",
      "Grew Canada bailout coverage from 1.4% to 100% of rides via census backfill for 2,964 geohashes",
      "Root-caused a defect in Lyft\u2019s bailout model flagging 76.6% of rides; shipped automated per-cluster thresholds",
      "Shipped shadow inference and holdout capture into the bailout service with zero live decision impact",
    ],
  },
  {
    company: "Nokia",
    role: "Software Engineer Intern",
    type: "5G Network Agent",
    dates: "Jul 2025 \u2014 Dec 2025",
    location: "Ottawa, Canada",
    website: "https://www.nokia.com",
    stack: ["Python", "PyTorch", "Unsloth", "Transformer"],
    bullets: [
      "Shipped a LoRA fine-tuning pipeline that turns Qwen into a Camunda BPMN XML generator with GGUF quantization",
      "Caught NCSC-only training overfitting with an eval harness that benchmarks fine-tuned vs. base models",
      "Unblocked GPU training by fixing OOM and Triton kernel failures; shipped reusable training tooling",
    ],
  },
  {
    company: "TD Bank",
    role: "Data Scientist Intern",
    type: "Insurance Analysis",
    dates: "Jun 2025 \u2014 Aug 2025",
    location: "Toronto, Canada",
    website: "https://www.td.com",
    stack: ["Python", "SQL", "PySpark", "Pandas", "Databricks"],
    bullets: [
      "Replatformed 1.5M+ row pipelines and reproduced a 154,340-row deliverable at 100% parity",
      "Cut QA time 80% by automating 30+ min/cycle ingestion with a row-level parity harness",
      "Saved 2\u20134 hrs/week by migrating the on-prem pipeline to Azure with automated runs",
    ],
  },
  {
    company: "Stanford University",
    role: "Student Instructor",
    type: "Teaching",
    dates: "Apr 2025 \u2014 Jun 2025",
    location: "Stanford, United States",
    website: "https://codeinplace.stanford.edu",
    stack: ["Python", "Karel", "Tkinter"],
    bullets: [
      "Instructed Stanford Code in Place CS106A for a global cohort of 40,000+ students",
      "Taught intro Python with Karel and Tkinter through live sections and project feedback",
    ],
  },
  {
    company: "August",
    role: "Software Engineer Intern",
    type: "LLM Agent",
    dates: "Sep 2024 \u2014 Dec 2024",
    location: "New York, United States",
    website: "https://www.august.law/",
    stack: ["Python", "LangGraph", "FastAPI", "AWS"],
    bullets: [
      "Scaled 10+ FastAPI / AWS / Supabase endpoints to 2,000+ requests/min in production",
      "Cut eval cycles across 15+ LLM agents with round-robin multi-agent routing and ELO scoring",
      "Architected end-to-end multi-agent RAG with LLM-as-Judge evaluation",
    ],
  },
  {
    company: "hum.ai",
    role: "Machine Learning Engineer Intern",
    type: "Super Resolution",
    dates: "Jul 2024 \u2014 Sep 2024",
    location: "Kitchener, Canada",
    website: "https://hum.ai",
    stack: ["Python", "PyTorch", "AWS", "SageMaker", "Jupyter"],
    meta: "Formerly Coastal Carbon",
    bullets: [
      "Benchmarked SOTA super-resolution models (ESRGAN, StableSR) in PyTorch for coastal imagery",
      "Automated multi-model SR eval pipelines on SageMaker with Matplotlib / Seaborn analysis notebooks",
      "Stood up AWS S3 / EC2 experiment infra for scalable fine-tuning and evaluation",
    ],
  },
  {
    company: "Health Canada",
    role: "Machine Learning Engineer Intern",
    type: "Document QA",
    dates: "Apr 2024 \u2014 Aug 2024",
    location: "Ottawa, Canada",
    website: "https://www.canada.ca/en/health-canada.html",
    stack: ["Python", "Azure", "LangChain", "Streamlit"],
    bullets: [
      "Built Llama3 7B + ChromaDB document QA for OECD report search and summarization",
      "Lifted response and semantic accuracy ~20% via query transformation and contextual memory",
    ],
  },
  {
    company: "Saputo",
    role: "Data Analyst Intern",
    type: "Operations & Automation",
    dates: "Jan 2024 \u2014 Apr 2024",
    location: "Georgetown, Canada",
    website: "https://www.saputo.com",
    stack: ["TypeScript", "Excel", "VBA", "Gemini API"],
    bullets: [
      "Cut ~8 hrs/week of open-order updates with TypeScript Excel Office Scripts",
      "Automated weekly workflows for 1,000+ Nestl\u00e9 products, avoiding 20,000+ manual entries",
      "Automated competitor research across 200+ brands with the Gemini API",
      "Ran weekly EDA in VBA across 2,000+ products and 200+ miscellaneous SKUs",
    ],
  },
  {
    company: "Respan AI",
    role: "Software Engineer Intern",
    type: "Resume Parsing",
    dates: "Mar 2023 \u2014 Jun 2023",
    location: "New York, United States",
    website: "https://respan.ai",
    stack: ["Python", "spaCy", "SQLite"],
    meta: "Y Combinator W24 \u00b7 Formerly Keywords AI",
    bullets: [
      "Parsed 1,000+ resumes with a spaCy NER pipeline to extract structured recruiter data",
      "Cut parsing response delay 98% by adding SQLite result caching to the engine",
    ],
  },
  {
    company: "Intapp",
    role: "Machine Learning Engineer Intern",
    type: "Entity Recognition",
    dates: "Jul 2022 \u2014 Sep 2022",
    location: "Berlin, Germany",
    website: "https://www.intapp.com",
    stack: ["Python", "spaCy", "W&B", "BS4"],
    meta: "Formerly delphai",
    bullets: [
      "Raised entity recall 20% via improved labeling workflows and language-specific training sets",
      "Hit 70% recall by fine-tuning spaCy NER and tuning hyperparameters with W&B on Azure",
    ],
  },
];

/** Shrine / combined counts: research first, then industry timeline */
export const experienceTimeline: ExperienceEntry[] = [
  ...researchExperience,
  ...experience,
];

export const skills: Record<string, string[]> = {
  Languages: [
    "Python", "SQL", "C++", "C", "TypeScript", "JavaScript",
    "R", "Racket", "Bash",
  ],
  "ML & Data": [
    "PyTorch", "CatBoost", "TensorFlow", "PySpark", "Pandas",
    "NumPy", "GeoPandas", "spaCy", "MLflow", "Hive", "CUDA",
  ],
  Frameworks: [
    "FastAPI", "Flask", "LangChain", "LangGraph", "React",
    "Next.js", "Tailwind",
  ],
  "Cloud & Databases": [
    "AWS", "Azure", "Docker", "Git", "PostgreSQL",
    "MongoDB", "Supabase", "ChromaDB",
  ],
};

export interface Project {
  name: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  highlight?: string;
}

export const projects: Project[] = [
  {
    name: "OpenComposer",
    description:
      "Mini-scale end-to-end reproduction of the Composer 2 training pipeline on a single NVIDIA GH200: MoE CPT, MTP self-distillation, Dr. GRPO + k1 KL, and behavioral auxiliary rewards.",
    stack: ["Python", "PyTorch", "MoE", "OpenRLHF"],
    github: "https://github.com/KenWuqianghao/OpenComposer",
    highlight: "Composer 2 pipeline · single GH200",
  },
  {
    name: "AppGammon",
    description:
      "Online backgammon with a React Native/Expo client, Hono backend, and shared gameplay rules in a TypeScript monorepo.",
    stack: ["TypeScript", "React Native", "Expo", "Hono"],
    github: "https://github.com/KenWuqianghao/AppGammon",
    highlight: "CS 446 / ECE 452",
  },
  {
    name: "Ding-Bot",
    description:
      "Chess engine combining GATEAU-style Graph Attention Networks with contrastive latent-space search",
    stack: ["Python", "TypeScript", "Graph Neural Networks"],
    github: "https://github.com/KenWuqianghao/Ding-Bot",
    demo: "https://ding-bot.vercel.app/",
    highlight: "Under Construction",
  },
  {
    name: "PokerMon",
    description:
      "Deep Counterfactual Regret Minimization (Deep CFR) for 6-player No-Limit Texas Hold'em",
    stack: ["Python", "Deep CFR", "Game Theory"],
    github: "https://github.com/KenWuqianghao/PokerMon",
    demo: "https://poker-mon.vercel.app/",
    highlight: "Under Construction",
  },
  {
    name: "LeaseEase",
    description:
      "Streamlit app demystifying Canada\u2019s Residential Tenancy Act with LLM + RAG, plain-language guidance, and auto-generated forms (T1, N7) for tenants navigating the housing crisis.",
    stack: ["Python", "Streamlit", "OpenAI", "Cohere", "ChromaDB"],
    demo: "https://devpost.com/software/leaseease",
    highlight: "McHack \u201924 \u00b7 Telus Environment & Social Sustainable Future Prize",
  },
  {
    name: "MedChat",
    description:
      "Assistant for clinical Q&A: Cohere Classify routes intent to a brain-tumor CNN or RAG over 1000+ WebMD pages with streamed answers in Streamlit.",
    stack: ["Python", "Cohere", "TensorFlow", "Streamlit"],
    github: "https://github.com/KenWuqianghao/MedChat",
    highlight: "Cohere RAG Challenge \u201923 \u00b7 Winner",
  },
  {
    name: "DirectU",
    description:
      "Full-stack planner matching career goals and free-text course preferences to UWFlow reviews via Cohere, assembling a personalized four-year roadmap (React, Flask, MongoDB).",
    stack: ["React", "Flask", "MongoDB", "Cohere"],
    demo: "https://directu.onrender.com/",
    highlight: "Hack the North \u201923 \u00b7 Best Use of Cohere",
  },
  {
    name: "LeGM-Lab",
    description:
      "AI-powered NBA take analyzer that fact-checks basketball opinions with real stats and roasts bad takes on X",
    stack: ["Python", "Claude API", "FastAPI", "X API"],
    github: "https://github.com/KenWuqianghao/LeGM-Lab",
    demo: "https://legm-lab.vercel.app",
  },
  {
    name: "FlightCal",
    description:
      "Fetches flight info and exports it directly to Google Calendar or as an .ics file for any calendar app",
    stack: ["TypeScript", "Next.js", "Google Calendar API"],
    github: "https://github.com/KenWuqianghao/FlightCal",
    demo: "https://flight-cal.vercel.app",
  },
];
