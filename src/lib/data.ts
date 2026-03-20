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
  website?: string;
  advisorUrl?: string;
  advisorLabel?: string;
}

/** Ongoing academic research; rendered in a compact cluster on the main Experience section */
export const researchExperience: ExperienceEntry[] = [
  {
    company: "University of Waterloo",
    role: "Undergraduate Research Assistant",
    type: "ML \u00b7 Attention & symbolic regression",
    dates: "Sep 2024 \u2014 Present",
    location: "Waterloo, Canada \u00b7 Remote",
    website: "https://uwaterloo.ca/",
    advisorUrl: "https://uwaterloo.ca/statistics-and-actuarial-science/profiles/ali-ghodsi",
    advisorLabel: "Advisor",
    stack: ["Python", "PyTorch", "Transformers"],
    meta: "With Prof. Ali Ghodsi & Amin Ravanbakhsh",
    bullets: [
      "Benchmarked symbolic regression at dataset scale, holding R² ≥ 0.99 whenever fits stayed numerically stable.",
      "Fine-tuned Symbolic GPT variants for roughly 19 percentage points higher in-domain accuracy.",
      "Ablated tokenizer and Point-Net configurations to balance R² against overall model complexity.",
      "Refined inference loops to reduce MSE and MRE consistently across standard benchmark suites.",
    ],
  },
  {
    company: "Lancaster University",
    role: "Undergraduate Researcher",
    type: "Unsupervised learning",
    dates: "Jan 2025 \u2014 Present",
    location: "Lancaster, UK \u00b7 On-site",
    website: "https://www.lancaster.ac.uk/",
    advisorUrl: "https://www.lancaster.ac.uk/lira/people/plamen-angelov",
    advisorLabel: "Advisor",
    stack: ["Python", "NumPy", "scikit-learn"],
    meta: "With Prof. Plamen Angelov",
    bullets: [
      "Recursive ReSil / ReSilC in Python: O(1) key updates and PAMSil up to 85.6% faster on CIFAR-100 at equal quality.",
      "Optimized R-Means centroid updates for 17\u201324% faster runs than K-Means on CIFAR-10/100, MNIST, and Fashion-MNIST.",
      "Built a NumPy / scikit-learn pipeline benchmarking recursive versus flat clustering across 8+ datasets with 10-run averages.",
      "Tracked silhouette, inertia, and wall-clock time each run so speed-quality comparisons stayed fair.",
    ],
  },
];

/** Industry, teaching, and internships (full-width cards) */
export const experience: ExperienceEntry[] = [
  {
    company: "Nokia",
    role: "Software Engineer Intern",
    type: "5G Network Agent",
    dates: "Jul 2025 \u2014 Dec 2025",
    location: "Ottawa, Canada",
    website: "https://www.nokia.com",
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
    website: "https://www.td.com",
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
    website: "https://codeinplace.stanford.edu",
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
    website: "https://www.august.law/",
    stack: ["Python", "LangGraph", "FastAPI", "AWS"],
    bullets: [
      "Handled 2,000+ requests/min by deploying 10+ API endpoints using FastAPI, AWS, and Supabase",
      "Optimized evaluation cycles for 15+ LLM Agents with a round-robin multi-agent and scoring framework",
      "Led the end-to-end development of a multi-agent RAG pipeline powered by LLM-as-Judge strategies",
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
      "Benchmarked SOTA super-resolution models (e.g. ESRGAN, StableSR) through PyTorch pipelines",
      "Built automated benchmarking pipelines in Python to evaluate multiple models efficiently",
      "Visualized model performance with Matplotlib and Seaborn in Jupyter on SageMaker for analysis",
      "Managed experiment infrastructure on AWS S3 and EC2 for scalable fine-tuning and evaluation",
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
      "Built a document QA system using Llama3 7B and ChromaDB for OECD report search and summarization",
      "Increased response and semantic accuracy by ~20% using query transformation and contextual memory",
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
      "Developed TypeScript Office Scripts in Excel that eliminated ~8 hours/week of manual open-order updates",
      "Automated weekly workflows for 1000+ Nestl\u00e9 products, avoiding 20,000+ manual data entries",
      "Used the Gemini API to automate competitor research across 200+ brands",
      "Ran weekly statistical analysis and EDA in VBA across 2000+ major products and 200+ miscellaneous SKUs",
    ],
  },
  {
    company: "Respan",
    role: "Software Engineer Intern",
    type: "Resume Parsing",
    dates: "Mar 2023 \u2014 Jun 2023",
    location: "New York, United States",
    website: "https://respan.ai",
    stack: ["Python", "spaCy", "SQLite"],
    meta: "Y Combinator W24 \u00b7 Formerly Keywords AI",
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
    website: "https://www.intapp.com",
    stack: ["Python", "spaCy", "W&B", "BS4"],
    meta: "Formerly delphai",
    bullets: [
      "Boosted recall by 20% through improved entity labeling workflows and language-specific training sets",
      "Achieved 70% recall by fine-tuning spaCy models and optimizing hyperparameters via WanDB on Azure",
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
