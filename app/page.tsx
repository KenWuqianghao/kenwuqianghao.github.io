"use client"

import dynamic from 'next/dynamic'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronRight,
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
} from "lucide-react"
import GridBackground from "@/components/grid-background"
import ExperienceTimeline from "@/components/experience-timeline"
import LifeCountdown from "@/components/life-countdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import UniversityHoverCard from "@/components/university-hover-card"

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

        {/* Theme toggle - fixed position */}
        <div className="fixed top-4 right-4 z-[50000]">
          <ThemeToggle />
        </div>

        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Header */}
          <header id="about" className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
            <div className="container max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                <NoSSR />
                <div className="text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold mb-1 font-display text-gray-900 dark:text-gray-100 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
                    Ken Wu
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-3 font-display">
                    Software Engineer & ML Enthusiast
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                    <a
                      href="mailto:ken.wu@uwaterloo.ca"
                      className="flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors duration-300 text-gray-700 dark:text-gray-300"
                    >
                      <Mail size={14} /> ken.wu@uwaterloo.ca
                    </a>
                    <a
                      href="tel:4379713179"
                      className="flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors duration-300 text-gray-700 dark:text-gray-300"
                    >
                      <Phone size={14} /> 437-971-3179
                    </a>
                    <span className="flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
                      <MapPin size={14} /> Waterloo, ON
                    </span>
                  </div>
                  <div className="flex justify-center md:justify-start gap-2">
                    <a
                      href="https://github.com/KenWuqianghao"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 dark:border-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:hover:border-red-500 transition-colors duration-300 text-gray-700 dark:text-gray-300 group"
                      >
                        <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" /> GitHub
                      </Button>
                    </a>
                    <a
                      href="https://linkedin.com/in/kenwuu"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 dark:border-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:hover:border-red-500 transition-colors duration-300 text-gray-700 dark:text-gray-300 group"
                      >
                        <Linkedin className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />{" "}
                        LinkedIn
                      </Button>
                    </a>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="bg-red-500 hover:bg-red-600 text-white shadow-[0_4px_14px_0_rgba(244,63,94,0.4)] hover:shadow-[0_6px_20px_0_rgba(244,63,94,0.5)] transition-all duration-300 group"
                      >
                        Resume{" "}
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
                          My Journey
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                          <span className="font-semibold">🪿 3rd Year CS Student at @UWaterloo</span>, Learning ML, LLM
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
                          Who I Am
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
                        Time I have Left to Make Some Cool Stuff for this World
                      </h3>
                      <LifeCountdown />
                    </div>
                  </div>
                </div>
              </section>

              {/* Current Roles section */}
              <section id="current-roles-education" className="mb-16">
                <div className="max-w-full mx-auto">
                  <SectionTitle 
                    icon={<Briefcase size={18} className="text-white" />} 
                    title="Current Roles & Education"
                    id="current-roles-education"
                  />

                  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-shadow duration-300 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                          Research Assistant
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          <span className="font-medium">Lancaster University</span> with Professor Plamen Angelov
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Working on optimization of clustering algorithms and analysis.
                        </p>
                      </div>

                      <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                          Research Assistant
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          <span className="font-medium">University of Waterloo</span> with Professor Ali Ghodsi and Amin
                          Ravanbakhsh
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Working on symbolic regression using GPT models.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Education</h3>
                      <div className="text-gray-700 dark:text-gray-300">
                        🎓{" "}
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
                        </span>{" "}
                        - Pursuing a Bachelor's in Computer Science with a Business Specialization and a minor in
                        Philosophy (Sept. 2022 - Apr. 2026).
                      </div>
                      <div className="text-gray-700 dark:text-gray-300 mt-2">
                        Currently doing an exchange term at{" "}
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
                        .
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Experience section */}
              <section id="experience" className="mb-16">
                <div className="max-w-full mx-auto">
                  <SectionTitle 
                    icon={<Briefcase size={18} className="text-white" />} 
                    title="Experience"
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
                      title="MedChatW"
                      subtitle="Winner of 2023 Cohere RAG Challenge"
                      technologies={["Python", "Cohere API", "Streamlit", "Tensorflow", "OpenCV"]}
                      description="A medical diagnostic assistant that uses RAG to provide accurate information and analysis of medical images, helping users understand their health concerns."
                      image="/medchat.png"
                      link="https://github.com/AreelKhan/MedChat"
                    />
                    <ProjectCard
                      title="DirectUW"
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

                  <Tabs defaultValue="basketball" className="w-full">
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
                      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-shadow duration-300"
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
                            I've been playing basketball since high school and I'm a Dallas Mavericks fan. My favorite
                            player is KD (I know KD never played for Mavericks, relax).
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
                      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-shadow duration-300"
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
                            I started playing chess during Covid and haven't stopped since then. Find me on Lichess and
                            Chess.com, or at UWaterloo or Lancaster University Chess Club.
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
                      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-shadow duration-300"
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
                            hit me up to talk about newest animes and manga.
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
                      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-shadow duration-300"
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
                            I've interviewed with YC before (didn't get in), but I do know a thing or two about the
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
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} Ken Wu. All rights reserved.
                  </p>
                </div>
                <div className="flex gap-4">
                  <a
                    href="mailto:ken.wu@uwaterloo.ca"
                    className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
                  >
                    <Mail size={20} />
                  </a>
                  <a
                    href="https://github.com/KenWuqianghao"
                    className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/in/kenwuu"
                    className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
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

function ProjectCard({ title, subtitle, technologies, description, image, link }) {
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

function SkillCategory({ title, skills }) {
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

function SocialLink({ icon, label, href, subtitle }) {
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
