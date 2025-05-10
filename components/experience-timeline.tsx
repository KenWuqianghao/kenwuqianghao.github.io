"use client"

import { useRef, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "Vecflow",
    website: "https://vecflow.com/",
    logo: "/vecflow.jpeg",
    period: "Sept 2024 – Dec 2024",
    location: "New York, United States",
    technologies: ["Python", "LangGraph", "LangChain", "FastAPI", "Supabase", "AWS"],
    description: [
      "Handled 2000+ requests/min by deploying 10+ API endpoints using FastAPI, AWS, and Supabase",
      "Optimized evaluation cycles for 15+ LLM models with a round-robin multi-agent and scoring framework",
      "Accelerated workflows for 20+ lawyers by automating document redlining using DOCX and XML manipulation",
      "Built a programmatic answer generator for tabular data by designing an advanced ask extraction pipeline",
      "Led the end-to-end development of a multi-agent RAG pipeline powered by LLM-as-Judge strategies",
    ],
  },
  {
    title: "Machine Learning Engineer",
    company: "Health Canada",
    website: "https://www.canada.ca/en/health-canada.html",
    logo: "/health_canada.jpg",
    period: "Apr 2024 – Aug 2024",
    location: "Ottawa, Canada",
    technologies: ["Python", "Azure", "LangChain", "Streamlit", "ChromaDB", "Ollama"],
    description: [
      "Built a document QA system using Llama3 7B and ChromaDB for OECD report search and summarization",
      "Increased response quality and semantic accuracy using query transformation and contextual memory",
      "Deployed and maintained a Streamlit app on Azure VM with auto-shutdown/start for improved runtime efficiency",
    ],
  },
  {
    title: "Data Analyst Intern",
    company: "Saputo",
    website: "https://www.saputo.com/",
    logo: "/saputo.jpeg",
    period: "Jan 2024 – Apr 2024",
    location: "Georgetown, Canada",
    technologies: ["TypeScript", "Office Script", "VBA", "Excel", "AS400"],
    description: [
      "Eliminated 8+ hours/week of repetitive work by automating Excel workflows with Office Script and TypeScript",
      "Saved 20,000+ manual entries weekly by automating order updates for 1000+ Nestlé product lines",
      "Streamlined competitor tracking by automating research and summarization for 200+ industry brands",
      "Performed weekly statistical analysis and exploratory data analysis on 2000+ SKUs using VBA macros",
    ],
  },
  {
    title: "Software Engineer",
    company: "Keywords AI (Y-Combinator W2024)",
    website: "https://www.keywords.ai/",
    logo: "/keywordsai.jpeg",
    period: "Mar 2023 – Jun 2023",
    location: "New York, United States",
    technologies: ["Python", "spaCy", "SQLite"],
    description: [
      "Parsed 1000+ resumes with a spaCy-based NER pipeline to extract structured and relevant recruiter data",
      "Led a team of 12 interns in data labeling, prompt engineering, and model testing for NER improvement",
      "Improved system efficiency by integrating SQLite-based result caching into the resume parsing engine",
    ],
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Intapp (Formerly delphai)",
    website: "https://www.intapp.com/",
    logo: "/intapp.jpeg",
    period: "Jul 2022 – Sept 2022",
    location: "Berlin, Germany",
    technologies: ["Python", "spaCy", "Azure", "W&B", "Selenium", "BS4"],
    description: [
      "Scraped and labeled 2000+ Chinese company names with Selenium and BS4 for multilingual NER training",
      "Boosted recall by 20% through improved entity labeling workflows and language-specific training sets",
      "Achieved 70% recall by fine-tuning spaCy models and optimizing hyperparameters via WanDB on Azure",
    ],
  },
]

export default function ExperienceTimeline() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  useEffect(() => {
    const updateMaxScroll = () => {
      if (scrollContainerRef.current) {
        setMaxScroll(scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth)
      }
    }

    updateMaxScroll()
    window.addEventListener("resize", updateMaxScroll)

    return () => {
      window.removeEventListener("resize", updateMaxScroll)
    }
  }, [])

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      {/* Navigation buttons */}
      {scrollPosition > 0 && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white hover:border-red-500 dark:hover:border-red-500 transition-colors duration-300"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {scrollPosition < maxScroll && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white hover:border-red-500 dark:hover:border-red-500 transition-colors duration-300"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Timeline */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory"
        onScroll={handleScroll}
      >
        <div className="flex gap-6">
          {experiences.map((exp, index) => (
            <div key={index} className="min-w-[350px] md:min-w-[400px] snap-start">
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-12 relative mr-3 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 group-hover:border-red-300 dark:group-hover:border-red-700 transition-colors duration-300 group-hover:shadow-md bg-white dark:bg-gray-800 flex items-center justify-center"
                    >
                      <div className="absolute inset-0 bg-white dark:bg-gray-800 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      <div className="relative w-10 h-8">
                        <Image
                          src={exp.logo || "/company-placeholder.png"}
                          alt={exp.company}
                          fill
                          className="object-contain transition-all duration-500 group-hover:scale-110"
                        />
                      </div>
                    </a>
                    <div>
                      <h3 className="text-xl font-bold font-display text-gray-900 dark:text-gray-100 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <a 
                        href={exp.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-lg text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
                      >
                        {exp.company}
                      </a>
                    </div>
                  </div>
                  <div className="mt-2 mb-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{exp.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.technologies.map((tech, idx) => (
                      <Badge
                        key={idx}
                        className="bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors duration-300 text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
