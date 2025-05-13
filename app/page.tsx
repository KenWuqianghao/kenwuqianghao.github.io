"use client"

import dynamic from 'next/dynamic'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronRight,
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Twitter,
  Instagram,
  MessageSquare,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Heart,
  Globe,
  ArrowUpRight,
  FileText
} from "lucide-react"
import GridBackground from "@/components/grid-background"
import ExperienceTimeline from "@/components/experience-timeline"
import LifeCountdown from "@/components/life-countdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import UniversityHoverCard from "@/components/university-hover-card"
import ProfessorHoverCard from "@/components/professor-hover-card"
import CompanyHoverCard from "@/components/company-hover-card"
import EntityHoverCard from "@/components/entity-hover-card"
import VisitorStats from "@/components/visitor-stats"
import HeaderCollapse from "@/components/header-collapse"

// Create a client-side only component for the image
const ProfileImage = () => {
  return (
    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-red-500/20 shadow-xl group">
      <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-500 z-10"></div>
      <Image
        src="/KenWuCropped.jpg"
        alt="Ken Wu"
        fill
        className="object-cover transition-all duration-500 group-hover:scale-110"
        unoptimized={true}
      />
    </div>
  )
}

// Implement the NoSSR wrapper
const NoSSR = dynamic(() => Promise.resolve(ProfileImage), {
  ssr: false,
})

// Define the interface for SectionTitle props
interface SectionTitleProps {
  icon: React.ReactNode;
  title: string;
  id?: string;
}

// Create a reusable SectionTitle component that includes the hover effect
const SectionTitle = ({ icon, title, id = "" }: SectionTitleProps) => (
  <div className="flex items-center mb-6 group" id={id}>
    <div className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-lg transition-transform duration-300 transform group-hover:scale-110">
      {icon}
    </div>
    <h2 className="text-2xl font-bold transition-transform duration-300 transform group-hover:translate-x-1">{title}</h2>
  </div>
);

export default function Home() {
  return (
    <>
      <div className="min-h-screen text-gray-800 dark:text-gray-200 relative">
        {/* Grid background */}
        <GridBackground />

        {/* Theme toggle and VisitorStats (pill) - fixed position */}
        <div className="fixed bottom-4 right-4 z-[50000] flex flex-col gap-2 items-end">
          <ThemeToggle />
          <div className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-full shadow-lg flex items-center">
            <VisitorStats />
          </div>
        </div>

        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Header */}
          <header 
            id="about"
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-40 shadow-sm transition-all duration-500 ease-out header-expanded">
            <div className="container max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 header-container">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                <div id="profile-image" className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 transition-all group relative">
                  <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-500 z-10"></div>
                  <Image 
                    src="/KenWuCropped.jpg" 
                    alt="Ken Wu" 
                    width={96} 
                    height={96} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    priority
                  />
                </div>
                <div id="header-content" className="text-center md:text-left transition-all">
                  <h1 className="text-3xl md:text-4xl font-bold mb-1 font-display text-gray-900 dark:text-gray-100 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
                    Ken Wu
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-3 font-display">
                    Software Engineer & ML Enthusiast
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                    <a
                      href="mailto:ken.wu@uwaterloo.ca"
                      className="flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors duration-300 text-gray-700 dark:text-gray-300 contact-info"
                    >
                      <Mail size={14} /> ken.wu@uwaterloo.ca
                    </a>
                    <a
                      href="tel:4379713179"
                      className="flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors duration-300 text-gray-700 dark:text-gray-300 contact-info"
                    >
                      <Phone size={14} /> 437-971-3179
                    </a>
                    <a
                      href="https://maps.google.com/?q=Waterloo,+Ontario,+Canada"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors duration-300 text-gray-700 dark:text-gray-300 contact-info"
                    >
                      <MapPin size={14} /> Waterloo, ON
                    </a>
                  </div>
                </div>
              </div>
              <div id="contact-buttons" className="flex justify-center md:justify-start gap-2 transition-all">
                <a
                  href="https://github.com/KenWuqianghao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all group"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="GitHub"
                    className="rounded-full h-9 w-9 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-500/10 hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:border-red-500/30 transition-colors duration-300"
                  >
                    <Github className="h-4 w-4 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-300" />
                  </Button>
                </a>
                <a
                  href="https://www.linkedin.com/in/kenwuqianghao/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all group"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="LinkedIn"
                    className="rounded-full h-9 w-9 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-500/10 hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:border-red-500/30 transition-colors duration-300"
                  >
                    <Linkedin className="h-4 w-4 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-300" />
                  </Button>
                </a>
                <a
                  href="https://drive.google.com/file/d/11TiGQ-JxqmLQ-TJ24Jui8V9kXsI6QZld/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all group"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Resume"
                    className="rounded-full h-9 w-9 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-500/10 hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:border-red-500/30 transition-colors duration-300"
                  >
                    <FileText className="h-4 w-4 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-300" />
                  </Button>
                </a>
              </div>
            </div>
            <HeaderCollapse />
          </header>

          {/* Main content */}
          <main className="pb-20">
            <div className="container max-w-7xl mx-auto px-4">
              {/* Introduction section - Combined Journey and About */}
              <section id="journey-details" className="mb-16 pt-16">
                <div className="max-w-full mx-auto">
                  <SectionTitle 
                    icon={<User size={18} className="text-white" />} 
                    title="About Me"
                    id="journey-details"
                  />

                  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-shadow duration-300 space-y-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/2">
                        <h3 className="text-xl font-bold mb-4 font-display text-gray-900 dark:text-gray-100 flex items-center">
                          <Globe className="mr-2 text-red-500 dark:text-red-400" size={20} />
                          <span className="hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
                            My Journey
                          </span>
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                          <span className="font-semibold">🪿 3rd Year CS Student at{" "}
                            <UniversityHoverCard
                              name="University of Waterloo"
                              logo="/uwaterloo.png"
                              description="A leading Canadian university known for its co-operative education programs and excellence in computer science, engineering, and mathematics."
                              location="Waterloo, Ontario, Canada"
                              website="https://uwaterloo.ca"
                              founded="1957"
                              ranking="#1 in Canada for Computer Science"
                              programs={["Computer Science", "Software Engineering", "Mathematics", "Engineering"]}
                            />
                          </span>, Learning ML, LLM
                          and Data Science
                        </p>
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                          🇮🇹 Italian born 🇨🇳 Chinese attending a 🇨🇦 Canadian University, interned in US 🇺🇸 and currently
                          exchanging in UK 🇬🇧. I'm all over the place :)
                        </p>
                      </div>

                      <div className="md:w-1/2">
                        <h3 className="text-xl font-bold mb-4 font-display text-gray-900 dark:text-gray-100 flex items-center">
                          <User className="mr-2 text-red-500 dark:text-red-400" size={20} />
                          <span className="hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
                            Who I Am
                          </span>
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                          <span className="font-semibold">
                            Software Engineer & Machine Learning Enthusiast & 5x Hackathon Winner
                          </span>
                        </p>
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                          I'm constantly exploring new technologies and methodologies to push the boundaries of what's
                          possible in software development and machine learning. I aim to contribute meaningful
                          innovations that have a tangible impact on society.
                        </p>
                      </div>
                    </div>

                    <div id="life-countdown" className="pt-6 border-t border-gray-100 dark:border-gray-800">
                      <h3 className="text-xl font-bold mb-4 font-display text-gray-900 dark:text-gray-100 flex items-center">
                        <span className="text-red-500 dark:text-red-400 mr-2">⏳</span>
                        <span className="hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
                          Time I have Left to Make Some Cool Stuff for this World
                        </span>
                      </h3>
                      <LifeCountdown />
                    </div>
                  </div>
                </div>
              </section>

              {/* Education section */}
              <section id="education" className="mb-16">
                <div className="max-w-full mx-auto">
                  <SectionTitle 
                    icon={<GraduationCap size={18} className="text-white" />} 
                    title="Education"
                    id="education"
                  />

                  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-shadow duration-300">
                    <div className="relative">
                      {/* Vertical line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

                      {/* Education entries */}
                      <div className="space-y-8">
                        {/* University of Waterloo */}
                        <div className="relative pl-16">
                          <div className="absolute left-0 w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full border-2 border-gray-200 dark:border-gray-700">
                            <Image
                              src="/uwaterloo.png"
                              alt="University of Waterloo"
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          </div>
                          <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group">
                              <span className="hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
                                BCS, Honour's Computer Science, Business Specialization, Minor in Philosophy
                              </span>
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                              <span className="font-medium">
                                <UniversityHoverCard
                                  name="University of Waterloo"
                                  logo="/uwaterloo.png"
                                  description="A leading Canadian university known for its co-operative education programs and excellence in computer science, engineering, and mathematics."
                                  location="Waterloo, Ontario, Canada"
                                  website="https://uwaterloo.ca"
                                  founded="1957"
                                  ranking="#1 in Canada for Computer Science"
                                  programs={["Computer Science", "Software Engineering", "Mathematics", "Engineering"]}
                                />
                              </span>
                              <span className="text-gray-500 dark:text-gray-400"> • Sep 2022 - Jun 2026</span>
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                              Activities and societies: Technical Project Manager, Undergraduate Research Assistant
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {["C", "C++", "Git", "Bash", "R", "Linux", "LaTeX", "Racket"].map((skill) => (
                                <Badge
                                  key={skill}
                                  className="bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors duration-300 text-gray-700 dark:text-gray-300"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Lancaster University */}
                        <div className="relative pl-16">
                          <div className="absolute left-0 w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full border-2 border-gray-200 dark:border-gray-700">
                            <Image
                              src="/lancaster.png"
                              alt="Lancaster University"
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          </div>
                          <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group">
                              <span className="hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
                                Exchange Student, Computer Science
                              </span>
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                              <span className="font-medium">
                                <UniversityHoverCard
                                  name="Lancaster University"
                                  logo="/lancaster.png"
                                  description="A top UK university known for its research excellence and high student satisfaction."
                                  location="Lancaster, United Kingdom"
                                  website="https://www.lancaster.ac.uk"
                                  founded="1964"
                                  ranking="Top 15 in UK University Rankings"
                                  programs={["Computer Science", "Engineering", "Business", "Arts"]}
                                />
                              </span>
                              <span className="text-gray-500 dark:text-gray-400"> • Jan 2025 - Jun 2025</span>
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                              Activities and societies: Research Assistant, Chess Club Member
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {["C", "C++", "Java", "GDScript"].map((skill) => (
                                <Badge
                                  key={skill}
                                  className="bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors duration-300 text-gray-700 dark:text-gray-300"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* American School of Milan */}
                        <div className="relative pl-16">
                          <div className="absolute left-0 w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full border-2 border-gray-200 dark:border-gray-700">
                            <Image
                              src="/asm.png"
                              alt="American School of Milan"
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          </div>
                          <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group">
                              <span className="hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
                                High School Diploma
                              </span>
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                              <span className="font-medium">
                                <span className="border-b border-dotted border-gray-400 dark:border-gray-600">
                                  <EntityHoverCard
                                    name="American School of Milan"
                                    logo="/asm.png"
                                    website="https://www.asmilan.org/"
                                    type="organization"
                                    founded="1962"
                                    description="The American School of Milan is an IB World School accredited by the Middle States Association, offering a global learning experience for students from over 70 countries. The school is known for its commitment to developing curious learners, critical thinkers, and global citizens."
                                    stats={[
                                      { label: "Founded", value: "1962" },
                                      { label: "Accreditation", value: "IB World School, Middle States Association" },
                                      { label: "Student Body", value: "70+ nationalities" },
                                      { label: "Campus", value: "Modern facilities with 27,000 volume library" }
                                    ]}
                                    achievements={[
                                      "IB Diploma Programme since 1983",
                                      "Pioneering digital learning (2000)",
                                      "Modern Media Center (1994)",
                                      "Multicultural learning environment"
                                    ]}
                                  />
                                </span>
                              </span>
                              <span className="text-gray-500 dark:text-gray-400"> • Sep 2015 - May 2022</span>
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                              Activities and societies: Tech Team Leader, Varsity Basketball, Chess Club Member, National Honor Society Member
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                              Graduated with the ASM Diploma and was awarded the Computer Science award.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {["Python", "LaTeX", "Data Analysis", "HTML", "CSS", "Microsoft Excel", "Italian", "Git", "Computer Vision", "English"].map((skill) => (
                                <Badge
                                  key={skill}
                                  className="bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors duration-300 text-gray-700 dark:text-gray-300"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Current Roles section */}
              <section id="current-roles" className="mb-16">
                <div className="max-w-full mx-auto">
                  <SectionTitle 
                    icon={<User size={18} className="text-white" />} 
                    title="Current Roles"
                    id="current-roles"
                  />

                  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-shadow duration-300 space-y-4">
                    {/* Current Roles - Horizontal Scrollable */}
                    <div className="relative">
                      <div className="overflow-x-auto pb-4 hide-scrollbar">
                        <div className="flex gap-6 min-w-max">
                          <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-xl p-6 hover:shadow-xl transition-all duration-700 ease-out w-[350px] group hover:bg-white dark:hover:bg-gray-800">
                            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 group">
                              <span className="hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
                                Data Scientist Intern
                              </span>
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                              <span className="font-medium flex items-center">
                                <Image 
                                  src="/td.png" 
                                  alt="TD Bank" 
                                  width={20} 
                                  height={20} 
                                  className="mr-2 rounded-sm" 
                                /> 
                                <CompanyHoverCard
                                  name="TD Bank"
                                  logo="/td.png"
                                  website="https://www.td.com/"
                                  location="Toronto, Canada"
                                  industry="Banking & Financial Services"
                                  founded="1855"
                                  description="TD Bank Group is one of the largest banks in North America, offering a full range of financial products and services to more than 26 million customers worldwide."
                                  technologies={["Data Science", "AI/ML", "Big Data", "Financial Analytics"]}
                                />
                              </span>
                              <span className="text-gray-500 dark:text-gray-400"> • Toronto, Canada • Jan 2024 - Present</span>
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              Working on machine learning models for financial data analysis and prediction.
                            </p>
                          </div>

                          <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-xl p-6 hover:shadow-xl transition-all duration-700 ease-out w-[350px] group hover:bg-white dark:hover:bg-gray-800">
                            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 group">
                              <span className="hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
                                Student Instructor
                              </span>
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                              <span className="font-medium flex items-center">
                                <Image 
                                  src="/stanford.png" 
                                  alt="Stanford University" 
                                  width={20} 
                                  height={20} 
                                  className="mr-2 rounded-sm" 
                                /> 
                                <CompanyHoverCard
                                  name="Stanford University"
                                  logo="/stanford.png"
                                  website="https://stanford.edu/"
                                  location="Stanford, United States"
                                  industry="Education"
                                  founded="1891"
                                  description="Stanford University is one of the world's leading research and teaching institutions, known for its excellence in computer science education and innovation."
                                  technologies={["Computer Science Education", "Python", "Karel", "Tkinter"]}
                                />
                              </span>
                              <span className="text-gray-500 dark:text-gray-400"> • Stanford, United States • Jan 2024 - Present</span>
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              Teaching Stanford's Code in Place CS106A course to students globally.
                            </p>
                          </div>

                          <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-xl p-6 hover:shadow-xl transition-all duration-700 ease-out w-[350px] group hover:bg-white dark:hover:bg-gray-800">
                            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 group">
                              <span className="hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
                                Research Assistant
                              </span>
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                              <span className="font-medium flex items-center">
                                <Image 
                                  src="/lancaster.png" 
                                  alt="Lancaster University" 
                                  width={20} 
                                  height={20} 
                                  className="mr-2 rounded-sm" 
                                /> 
                                Lancaster University
                              </span> with Professor{" "}
                              <ProfessorHoverCard
                                name="Plamen Angelov"
                                university="Lancaster University"
                                universityLogo="/lancaster.png"
                                profile="https://www.lancaster.ac.uk/lira/people/"
                                research="Renowned for his work in explainable AI, fuzzy systems, and autonomous learning systems. Director of LIRA (Lancaster Intelligent, Robotic and Autonomous systems) Research Centre."
                                department="School of Computing and Communications"
                              />
                              <span className="text-gray-500 dark:text-gray-400"> • Lancaster, United Kingdom • Jan 2025 - Present</span>
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              Working on optimization of clustering algorithms and analysis.
                            </p>
                          </div>

                          <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-xl p-6 hover:shadow-xl transition-all duration-700 ease-out w-[350px] group hover:bg-white dark:hover:bg-gray-800">
                            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 group">
                              <span className="hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
                                Research Assistant
                              </span>
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-2">
                              <span className="font-medium flex items-center">
                                <Image 
                                  src="/uwaterloo.png" 
                                  alt="University of Waterloo" 
                                  width={20} 
                                  height={20} 
                                  className="mr-2 rounded-sm" 
                                /> 
                                University of Waterloo
                              </span> with Professor{" "}
                              <ProfessorHoverCard
                                name="Ali Ghodsi"
                                university="University of Waterloo"
                                universityLogo="/uwaterloo.png"
                                profile="https://uwaterloo.ca/data-analytics/people-profiles/ali-ghodsi"
                                research="Specializes in machine learning, statistical pattern recognition, and data mining. Co-founder and CEO of Databricks, known for his work on dimensionality reduction and distributed systems."
                                department="Department of Statistics and Actuarial Science"
                              />
                              {" "} and {" "}
                              <ProfessorHoverCard
                                name="Amin Ravanbakhsh"
                                university="University of Waterloo"
                                universityLogo="/uwaterloo.png"
                                profile="https://aminravanbakhsh.com/"
                                research="Master's student in Computer Science focused on symbolic regression using large language models and developing reasoning-based tools that leverage human guidance. Also interested in Cybersecurity, Generative AI, and Reinforcement Learning."
                                department="Data Analytics Lab, Computer Science"
                                role="Master's student at"
                              />
                              <span className="text-gray-500 dark:text-gray-400"> • Waterloo, Canada • Sep 2023 - Present</span>
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              Working on symbolic regression using GPT models.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Navigation buttons */}
                      <button
                        onClick={() => {
                          const container = document.querySelector('.overflow-x-auto');
                          if (container) {
                            container.scrollBy({ left: -350, behavior: 'smooth' });
                          }
                        }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white hover:border-red-500 dark:hover:border-red-500 transition-colors duration-300"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <button
                        onClick={() => {
                          const container = document.querySelector('.overflow-x-auto');
                          if (container) {
                            container.scrollBy({ left: 350, behavior: 'smooth' });
                          }
                        }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white hover:border-red-500 dark:hover:border-red-500 transition-colors duration-300"
                        aria-label="Scroll right"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Past Experience section */}
              <section id="experience" className="mb-16">
                <div className="max-w-full mx-auto">
                  <SectionTitle 
                    icon={<Briefcase size={18} className="text-white" />} 
                    title="Past Experience"
                    id="experience"
                  />
                  <ExperienceTimeline />
                </div>
              </section>

              {/* Projects section */}
              <section id="projects" className="mb-16">
                <div className="max-w-full mx-auto">
                  <SectionTitle 
                    icon={<Code size={18} className="text-white" />} 
                    title="Projects"
                    id="projects"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProjectCard
                      title="LeaseEase"
                      subtitle="Winner of 2024 McHack Telus Environment and Social Sustainable Future Prize"
                      technologies={["Python", "LangChain", "React", "FastAPI"]}
                      description="A platform that simplifies lease agreements and provides legal aid to tenants, making housing more accessible and fair."
                      image="/leasease.jpg"
                      link="https://github.com/jamesliangg/LeaseEase"
                    />
                    <ProjectCard
                      title="MedChat"
                      subtitle="Winner of 2023 Cohere RAG Challenge"
                      technologies={["Python", "Cohere API", "Streamlit", "Tensorflow", "OpenCV"]}
                      description="A medical diagnostic assistant that uses RAG to provide accurate information and analysis of medical images, helping users understand their health concerns."
                      image="/medchat.png"
                      link="https://github.com/AreelKhan/MedChat"
                    />
                    <ProjectCard
                      title="DirectU"
                      subtitle="Winner of Hack the North 2023 Best Use of Cohere Prize"
                      technologies={["Python", "Flask", "Cohere API", "MongoDB", "React", "Selenium"]}
                      description="An academic planning tool that provides personalized course recommendations for University of Waterloo students, enhancing their educational journey."
                      image="/directu.jpeg"
                      link="https://github.com/charcoalyy/directu"
                    />
                  </div>
                </div>
              </section>

              {/* Hobbies section */}
              <section id="hobbies" className="mb-16">
                <div className="max-w-full mx-auto">
                  <SectionTitle 
                    icon={<Heart size={18} className="text-white" />} 
                    title="Hobbies & Interests"
                    id="hobbies"
                  />

                  <Tabs defaultValue="basketball" className="w-full relative overflow-hidden">
                    <TabsList className="grid grid-cols-4 mb-6 bg-gray-100/80 dark:bg-gray-800/80">
                      <TabsTrigger
                        value="basketball"
                        className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:text-white"
                      >
                        🏀 Basketball
                      </TabsTrigger>
                      <TabsTrigger
                        value="chess"
                        className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:text-white"
                      >
                        ♟️ Chess
                      </TabsTrigger>
                      <TabsTrigger
                        value="anime"
                        className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:text-white"
                      >
                        👺 Anime
                      </TabsTrigger>
                      <TabsTrigger
                        value="startup"
                        className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:text-gray-300 dark:data-[state=active]:text-white"
                      >
                        🚀 Startups
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent
                      value="basketball"
                      forceMount
                      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 w-full transition-all ease-out duration-500 data-[state=active]:opacity-100 data-[state=active]:translate-x-0 data-[state=active]:relative data-[state=active]:z-10 data-[state=inactive]:opacity-0 data-[state=inactive]:-translate-x-full data-[state=inactive]:absolute data-[state=inactive]:inset-0 data-[state=inactive]:pointer-events-none"
                    >
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full md:w-1/3 aspect-square relative rounded-xl overflow-hidden">
                          <Image
                            src="/basketball.jpeg"
                            alt="Basketball"
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-500"
                            unoptimized={true}
                          />
                        </div>
                        <div className="w-full md:w-2/3">
                          <h3 className="text-xl font-bold mb-3 font-display text-gray-900 dark:text-gray-100">
                            Basketball Enthusiast
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            I've been playing basketball since high school and I'm a <span className="border-b border-dotted border-gray-400 dark:border-gray-600"><EntityHoverCard
                              name="Dallas Mavericks"
                              logo="/mavericks.png"
                              website="https://www.mavs.com/"
                              type="team"
                              founded="1980"
                              description="The Dallas Mavericks are an American professional basketball team based in Dallas, Texas. They compete in the National Basketball Association (NBA) as a member of the Western Conference Southwest Division."
                              stats={[
                                { label: "Championships", value: "1 (2011)" },
                                { label: "Conference Titles", value: "2" },
                                { label: "Arena", value: "American Airlines Center" },
                                { label: "Owner", value: "Mark Cuban" }
                              ]}
                              achievements={["NBA Champions (2011)", "Western Conference Champions (2006, 2011)"]}
                            /></span> fan. My favorite
                            player is <span className="border-b border-dotted border-gray-400 dark:border-gray-600"><EntityHoverCard
                              name="KD"
                              logo="/durant.png"
                              website="https://www.instagram.com/easymoneysniper/"
                              type="player"
                              description={"Kevin Durant, nicknamed \"KD\", is an American professional basketball player for the Phoenix Suns of the NBA. Standing at 6'11\" with elite scoring abilities, Durant is widely regarded as one of the greatest players of all time."}
                              stats={[
                                { label: "Position", value: "Forward" },
                                { label: "Teams", value: "OKC, GSW, BKN, PHX" },
                                { label: "Championships", value: "2 (2017, 2018)" },
                                { label: "MVP", value: "1 (2014)" }
                              ]}
                              achievements={["2× NBA Champion", "NBA MVP", "13× NBA All-Star", "4× Olympic Gold Medalist", "4× NBA Scoring Champion"]}
                            /></span> (I know KD never played for Mavericks, relax).
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            Basketball has taught me teamwork, strategy, and perseverance - skills that translate well
                            into my professional life.
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="chess"
                      forceMount
                      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 w-full transition-all ease-out duration-500 data-[state=active]:opacity-100 data-[state=active]:translate-x-0 data-[state=active]:relative data-[state=active]:z-10 data-[state=inactive]:opacity-0 data-[state=inactive]:-translate-x-full data-[state=inactive]:absolute data-[state=inactive]:inset-0 data-[state=inactive]:pointer-events-none"
                    >
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full md:w-1/3 aspect-square relative rounded-xl overflow-hidden">
                          <Image
                            src="/chess.png"
                            alt="Chess"
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-500"
                            unoptimized={true}
                          />
                        </div>
                        <div className="w-full md:w-2/3">
                          <h3 className="text-xl font-bold mb-3 font-display text-gray-900 dark:text-gray-100">
                            Chess Player
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            I started playing chess during Covid and haven't stopped since then. Find me on 
                            <a href="https://lichess.org/@/KenWuu" target="_blank" rel="noopener noreferrer" className="mx-1 text-red-500 hover:underline">
                              <span className="border-b border-dotted border-gray-400 dark:border-gray-600"><EntityHoverCard
                                name="Lichess"
                                logo="/lichess.png"
                                website="https://lichess.org/@/KenWuu"
                                type="platform"
                                founded="2010"
                                description="Lichess is a free and open-source Internet chess server run by a non-profit organization of the same name. Anyone can play chess on the platform without registration, and advanced features such as tournaments, coaching, and game analysis are available."
                                stats={[
                                  { label: "Daily Players", value: "1M+" },
                                  { label: "Games Played", value: "8B+" },
                                  { label: "Variants", value: "8+" },
                                  { label: "Cost", value: "Free" }
                                ]}
                                achievements={["Open Source", "Ad-free", "Free Analysis", "Studies", "Training", "Puzzle Database"]}
                              /></span>
                            </a> 
                            and
                            <a href="https://www.chess.com/member/kenwuu" target="_blank" rel="noopener noreferrer" className="mx-1 text-red-500 hover:underline">
                              <span className="border-b border-dotted border-gray-400 dark:border-gray-600"><EntityHoverCard
                                name="Chess.com"
                                logo="/chesscom.png"
                                website="https://www.chess.com/member/kenwuu"
                                type="platform"
                                founded="2007"
                                description="Chess.com is the world's largest online chess platform. It offers various features such as online chess games, tournaments, lessons, puzzles, news, articles, social features, and more to a global community of chess players."
                                stats={[
                                  { label: "Daily Players", value: "10M+" },
                                  { label: "Registered Users", value: "100M+" },
                                  { label: "Daily Games", value: "10M+" },
                                  { label: "Mobile Rating", value: "4.8/5" }
                                ]}
                                achievements={["Puzzle Rush", "Chess Bots", "Video Lessons", "Tactics Trainer", "Computer Analysis"]}
                              /></span>
                            </a>, 
                            or at UWaterloo or Lancaster University Chess Club. My favorite players are <span className="border-b border-dotted border-gray-400 dark:border-gray-600"><EntityHoverCard
                              name="Ding Liren"
                              logo="/ding-liren.png"
                              website="https://www.chess.com/players/ding-liren"
                              type="player"
                              description="Ding Liren is a Chinese chess grandmaster who became the 17th World Chess Champion in 2023, defeating Ian Nepomniachtchi. He was the world champion until December 2024, when he lost to GM Gukesh Dommaraju. Ding was the first Chinese player to win the World Chess Championship and the first from Asia to hold the title."
                              stats={[
                                { label: "World Ranking", value: "#21 (2734)" },
                                { label: "Country", value: "China" },
                                { label: "Born", value: "October 24, 1992" },
                                { label: "Peak Rating", value: "2816 (2019)" }
                              ]}
                              achievements={["World Chess Champion (2023-2024)", "Chinese Chess Champion (5 times)", "Sinquefield Cup Winner (2019)", "100-game unbeaten streak (2017-2018)", "Chess Olympiad Gold Medalist (2018)"] }
                            /></span> and <span className="border-b border-dotted border-gray-400 dark:border-gray-600"><EntityHoverCard
                              name="Fabiano Caruana"
                              logo="/caruana.jpg"
                              website="https://www.chess.com/players/fabiano-caruana"
                              type="player"
                              description="Fabiano Caruana is an Italian-American chess grandmaster. He challenged Magnus Carlsen for the World Chess Championship in 2018, where all classical games ended in draws before Carlsen won the rapid tiebreaks. Caruana has been among the world's top players for over a decade and has represented both Italy and the United States."
                              stats={[
                                { label: "Title", value: "Grandmaster" },
                                { label: "Country", value: "USA (formerly Italy)" },
                                { label: "Born", value: "July 30, 1992" },
                                { label: "Peak Rating", value: "2844 (2014)" }
                              ]}
                              achievements={["World Championship Challenger (2018)", "US Chess Champion (2016, 2022)", "Sinquefield Cup Winner (2014 with 8.5/10)", "Chess Olympiad Gold Medalist (2016)", "Seven wins against Magnus Carlsen"] }
                            /></span>.
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            Chess has sharpened my strategic thinking and ability to plan several moves ahead - crucial
                            skills for software development and problem-solving.
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="anime"
                      forceMount
                      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 w-full transition-all ease-out duration-500 data-[state=active]:opacity-100 data-[state=active]:translate-x-0 data-[state=active]:relative data-[state=active]:z-10 data-[state=inactive]:opacity-0 data-[state=inactive]:-translate-x-full data-[state=inactive]:absolute data-[state=inactive]:inset-0 data-[state=inactive]:pointer-events-none"
                    >
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full md:w-1/3 aspect-square relative rounded-xl overflow-hidden">
                          <Image
                            src="/anime.png"
                            alt="Anime & Manga"
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-500"
                            unoptimized={true}
                          />
                        </div>
                        <div className="w-full md:w-2/3">
                          <h3 className="text-xl font-bold mb-3 font-display text-gray-900 dark:text-gray-100">
                            Anime & Manga Fan
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            I've been watching anime and reading manga since elementary school. Fellow weebs feel free to
                            hit me up to talk about newest animes and manga. I'm a huge fan of <span className="border-b border-dotted border-gray-400 dark:border-gray-600"><EntityHoverCard
                              name="JoJo's Bizarre Adventure"
                              logo="/jojo.png"
                              website="https://jojo-portal.com/en/"
                              type="organization"
                              founded="1987"
                              description="JoJo's Bizarre Adventure is a Japanese manga series written and illustrated by Hirohiko Araki. It follows the supernatural adventures of the Joestar family across generations, with each part featuring a new JoJo protagonist with unique abilities called Stands."
                              stats={[
                                { label: "Creator", value: "Hirohiko Araki" },
                                { label: "Parts", value: "8 (ongoing)" },
                                { label: "Volumes", value: "130+" },
                                { label: "Anime Seasons", value: "6" }
                              ]}
                              achievements={["100+ million copies sold", "One of the longest-running manga series", "Iconic art style", "Cultural phenomenon in Japan", "Unique Stand power system"]}
                            /></span> and I think Part 7 is the greatest manga of all time. 
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            Anime and manga have inspired my creativity and exposed me to unique storytelling approaches
                            and artistic styles.
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="startup"
                      forceMount
                      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 w-full transition-all ease-out duration-500 data-[state=active]:opacity-100 data-[state=active]:translate-x-0 data-[state=active]:relative data-[state=active]:z-10 data-[state=inactive]:opacity-0 data-[state=inactive]:-translate-x-full data-[state=inactive]:absolute data-[state=inactive]:inset-0 data-[state=inactive]:pointer-events-none"
                    >
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full md:w-1/3 aspect-square relative rounded-xl overflow-hidden">
                          <Image
                            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1470&auto=format&fit=crop"
                            alt="Startup"
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="w-full md:w-2/3">
                          <h3 className="text-xl font-bold mb-3 font-display text-gray-900 dark:text-gray-100">
                            Startup Enthusiast
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            I'm exploring the startup space and trying to find cracked people to work with. Hit me up if
                            you have a cool project in mind!
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            I've interviewed with <span className="border-b border-dotted border-gray-400 dark:border-gray-600"><EntityHoverCard
                              name="YC"
                              logo="/yc.png"
                              website="https://www.ycombinator.com/"
                              type="organization"
                              founded="2005"
                              description="Y Combinator is a startup accelerator that invests in a wide range of startups twice a year. The program provides seed funding, advice, and connections in exchange for equity. Companies such as Airbnb, Dropbox, Stripe, and Reddit got their start through YC."
                              stats={[
                                { label: "Founded by", value: "Paul Graham" },
                                { label: "Batch Size", value: "~200 companies" },
                                { label: "Total Companies", value: "4000+" },
                                { label: "Combined Valuation", value: "$600B+" }
                              ]}
                              achievements={["Airbnb", "Dropbox", "Stripe", "Reddit", "DoorDash", "Instacart", "Coinbase"]}
                            /></span> before (didn't get in), but I do know a thing or two about the
                            startup world. I'm passionate about innovation and building products that solve real problems.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </section>

              {/* Skills section */}
              <section id="skills" className="mb-16">
                <div className="max-w-full mx-auto">
                  <SectionTitle 
                    icon={<GraduationCap size={18} className="text-white" />} 
                    title="Skills"
                    id="skills"
                  />
                  <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <div className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <SkillCategory
                          title="Languages"
                          skills={[
                            "Python",
                            "SQL",
                            "C",
                            "C++",
                            "TypeScript",
                            "JavaScript",
                            "HTML",
                            "CSS",
                            "R",
                            "Racket",
                            "Bash",
                          ]}
                        />
                        <SkillCategory
                          title="Frameworks"
                          skills={[
                            "PyTorch",
                            "PySpark",
                            "LangChain",
                            "LangGraph",
                            "TensorFlow",
                            "Keras",
                            "CUDA",
                            "Flask",
                            "FastAPI",
                            "React",
                            "Next.js",
                            "Tailwind CSS",
                          ]}
                        />
                        <SkillCategory
                          title="Technologies & Cloud"
                          skills={[
                            "NumPy",
                            "Pandas",
                            "spaCy",
                            "MongoDB",
                            "Supabase",
                            "PostgreSQL",
                            "AWS",
                            "Docker",
                            "Git",
                          ]}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              </section>

              {/* Connect section */}
              <section id="contact" className="mb-16">
                <div className="max-w-full mx-auto">
                  <SectionTitle 
                    icon={<Globe size={18} className="text-white" />} 
                    title="Let's connect!"
                    id="contact"
                  />
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <SocialLink icon={<Mail size={24} />} label="Email" href="mailto:ken.wu@uwaterloo.ca" />
                    <SocialLink icon={<Github size={24} />} label="Github" href="https://github.com/KenWuqianghao" />
                    <SocialLink icon={<Linkedin size={24} />} label="LinkedIn" href="https://linkedin.com/in/kenwuu" />
                    <SocialLink icon={<Twitter size={24} />} label="Twitter" href="https://twitter.com/KenWuqianghao" />
                    <SocialLink
                      icon={<Instagram size={24} />}
                      label="Instagram"
                      href="https://instagram.com/ken_wuuuuuu"
                    />
                    <SocialLink icon={<MessageSquare size={24} />} label="Discord" href="#" subtitle="kenwu_" />
                  </div>
                </div>
              </section>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800">
            <div className="container max-w-7xl mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Ken Wu. All rights reserved.
                  </p>
                </div>
                <div className="flex gap-4">
                  <a
                    href="mailto:ken.wu@uwaterloo.ca"
                    className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
                    aria-label="Email"
                  >
                    <Mail size={20} />
                  </a>
                  <a
                    href="https://github.com/KenWuqianghao"
                    className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/in/kenwuu"
                    className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

interface ProjectCardProps {
  title: string;
  subtitle: string;
  technologies: string[];
  description: string;
  image: string;
  link: string;
}

function ProjectCard({ title, subtitle, technologies, description, image, link }: ProjectCardProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
      <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden h-full group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg?height=200&width=400"}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized={true}
            priority={title === "LeaseEase"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold font-display group-hover:translate-x-1 transition-transform duration-300">
                {title}
              </h3>
              <p className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">{subtitle}</p>
            </div>
          </div>
        </div>
        <div className="p-6 flex flex-col h-full">
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <Badge
                key={index}
                className="bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors duration-300 text-gray-700 dark:text-gray-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
          <p className="text-sm flex-grow text-gray-700 dark:text-gray-300">{description}</p>
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 dark:border-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:hover:border-red-500 transition-colors duration-300 text-gray-700 dark:text-gray-300 group"
            >
              View Project{" "}
              <ExternalLink className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </Card>
    </a>
  )
}

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

function SkillCategory({ title, skills }: SkillCategoryProps) {
  return (
    <div>
      <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200 text-lg">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            className="bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors duration-300 text-gray-700 dark:text-gray-300 py-1.5"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  )
}

interface SocialLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  subtitle?: string;
}

function SocialLink({ icon, label, href, subtitle }: SocialLinkProps) {
  return (
    <a
      href={href}
      className="flex flex-col items-center justify-center p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-700 transition-all duration-300 hover:-translate-y-1 group"
    >
      <div className="text-gray-700 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-300 mb-2 transform group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-300">
        {label}
      </span>
      {subtitle && <span className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</span>}
    </a>
  )
}
