export const personalInfo = {
  name: "Ken Wu",
  title: "Software Engineer & ML Researcher",
  email: "ken.wu@uwaterloo.ca",
  location: "Waterloo, ON",
  github: "KenWuqianghao",
  linkedin: "kenwuu",
  website: "kenwu.is-a.dev",
  twitter: "kenwuuuu",
  resume: "https://drive.google.com/file/d/11TiGQ-JxqmLQ-TJ24Jui8V9kXsI6QZld/view",
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
}

export const experience: ExperienceEntry[] = [
  {
    company: "Nokia",
    role: "Software Engineer Intern",
    type: "5G Network Agent",
    dates: "Jul 2025 \u2014 Dec 2025",
    location: "Ottawa, Canada",
    stack: ["Python", "PyTorch", "Unsloth", "Transformer"],
    bullets: [
      "Built LoRA fine-tuning pipeline for Qwen generating Camunda BPMN XML with GGUF quantization",
      "Designed evaluation framework revealing overfitting from NCSC-only data vs. base models",
      "Resolved GPU memory and Triton issues and shipped reusable training tooling for future experiments",
    ],
  },
  {
    company: "TD Bank",
    role: "Data Scientist Intern",
    type: "Insurance Analysis",
    dates: "Jun 2025 \u2014 Aug 2025",
    location: "Toronto, Canada",
    stack: ["Python", "SQL", "PySpark", "Pandas", "Databricks"],
    bullets: [
      "Replatformed pipelines for 1.5M+ rows of data and reproduced a 154,340 row deliverable with 100% parity",
      "Automated 30+ minutes of manual ingestion per cycle, cutting QA time by 80% via a parity harness",
      "Migrated on-prem pipeline to Azure fully automating runs and saving 2\u20134 hours/week of manual execution",
    ],
  },
  {
    company: "Stanford University",
    role: "Student Instructor",
    type: "Teaching",
    dates: "Apr 2025 \u2014 Jun 2025",
    location: "Stanford, United States",
    stack: ["Python", "Karel", "Tkinter"],
    bullets: [
      "Taught Stanford\u2019s Code in Place CS106A course to students globally, taken by 40,000+ students",
      "Educated students in Python leveraging beginner friendly libraries including Stanford\u2019s Karel and Tkinter",
    ],
  },
  {
    company: "August",
    role: "Software Engineer Intern",
    type: "LLM Agent",
    dates: "Sept 2024 \u2014 Dec 2024",
    location: "New York, United States",
    stack: ["Python", "LangGraph", "FastAPI", "AWS"],
    bullets: [
      "Handled 2,000+ requests/min by deploying 10+ API endpoints using FastAPI, AWS, and Supabase",
      "Optimized evaluation cycles for 15+ LLM Agents with a round-robin multi-agent and scoring framework",
      "Led the end-to-end development of a multi-agent RAG pipeline powered by LLM-as-Judge strategies",
    ],
  },
  {
    company: "Health Canada",
    role: "Machine Learning Engineer Intern",
    type: "Document QA",
    dates: "Apr 2024 \u2014 Aug 2024",
    location: "Ottawa, Canada",
    stack: ["Python", "Azure", "LangChain", "Streamlit"],
    bullets: [
      "Built a document QA system using Llama3 7B and ChromaDB for OECD report search and summarization",
      "Increased response and semantic accuracy by ~20% using query transformation and contextual memory",
    ],
  },
  {
    company: "Keywords AI",
    role: "Software Engineer Intern",
    type: "Resume Parsing",
    dates: "Mar 2023 \u2014 Jun 2023",
    location: "New York, United States",
    stack: ["Python", "spaCy", "SQLite"],
    meta: "Y Combinator W24",
    bullets: [
      "Parsed 1,000+ resumes with a spaCy-based NER pipeline to extract structured recruiter data",
      "Reduced response delay by 98% through integration of SQLite-based result caching into the parsing engine",
    ],
  },
  {
    company: "Intapp",
    role: "Machine Learning Engineer Intern",
    type: "Entity Recognition",
    dates: "Jul 2022 \u2014 Sept 2022",
    location: "Berlin, Germany",
    stack: ["Python", "spaCy", "W&B", "BS4"],
    meta: "Formerly delphai",
    bullets: [
      "Boosted recall by 20% through improved entity labeling workflows and language-specific training sets",
      "Achieved 70% recall by fine-tuning spaCy models and optimizing hyperparameters via WanDB on Azure",
    ],
  },
];

export const skills: Record<string, string[]> = {
  Languages: [
    "Python", "SQL", "C", "C++", "TypeScript", "JavaScript",
    "HTML", "CSS", "R", "Racket", "Bash",
  ],
  "Technologies & Cloud": [
    "PySpark", "NumPy", "Pandas", "spaCy", "MongoDB",
    "Supabase", "PostgreSQL", "AWS", "Docker", "Git",
  ],
  "Libraries & Frameworks": [
    "PyTorch", "LangChain", "Flask", "FastAPI", "TensorFlow",
    "Keras", "CUDA", "React", "Next.js", "Tailwind",
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
    name: "Ding-Bot",
    description:
      "Chess engine combining GATEAU-style Graph Attention Networks with contrastive latent-space search",
    stack: ["Python", "TypeScript", "Graph Neural Networks"],
    github: "https://github.com/KenWuqianghao/Ding-Bot",
  },
  {
    name: "PokerMon",
    description:
      "Deep Counterfactual Regret Minimization (Deep CFR) for 6-player No-Limit Texas Hold'em",
    stack: ["Python", "Deep CFR", "Game Theory"],
    github: "https://github.com/KenWuqianghao/PokerMon",
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
    name: "LeLM",
    description:
      "Fine-tuned LLM for NBA hot takes, built on Qwen3-8B with LoRA and trained on Reddit r/nba posts",
    stack: ["Python", "Unsloth", "LoRA", "Hugging Face"],
    github: "https://github.com/KenWuqianghao/LeLM",
  },
  {
    name: "Algoherence",
    description:
      "Stock trading chatbot democratizing financial literacy with RAG-powered advice and live Alpaca paper trading",
    stack: ["Python", "LangChain", "Cohere", "Streamlit"],
    github: "https://github.com/KenWuqianghao/Algoherence",
    highlight: "18 stars",
  },
  {
    name: "OpenFintech",
    description:
      "Financial analysis library for trend following and mean reversion strategies, built for Python developers and analysts",
    stack: ["Python", "Fintech", "Open Source"],
    github: "https://github.com/Laurier-Fintech/OpenFintech",
  },
];
