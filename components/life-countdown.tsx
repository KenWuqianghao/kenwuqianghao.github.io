"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import {
  Baby,
  GraduationCap,
  Pizza,
  Coffee,
  Gamepad2,
  Cat,
  Dog,
  Plane,
  Lightbulb,
  Rocket,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define milestones with icons and descriptions
const milestones = [
  { percent: 0, icon: Baby, label: "Birth", description: "The journey begins!" },
  { percent: 5, icon: Lightbulb, label: "Early Childhood", description: "First words, steps, and discoveries" },
  { percent: 18, icon: GraduationCap, label: "High School", description: "Academic foundations and friendships" },
  { percent: 22, icon: Rocket, label: "University", description: "Higher education and career preparation" },
  { percent: 30, icon: Pizza, label: "Pizza Master", description: "Achieved the ability to eat an entire pizza in one sitting" },
  { percent: 45, icon: Coffee, label: "Coffee Addiction", description: "Successfully replaced blood with coffee" },
  { percent: 60, icon: Gamepad2, label: "Gaming Legend", description: "Finally beat that one impossible game" },
  { percent: 75, icon: Cat, label: "Cat Whisperer", description: "Can now communicate telepathically with cats" },
  { percent: 85, icon: Dog, label: "Dog CEO", description: "Appointed as CEO of the local dog park" },
  { percent: 100, icon: Plane, label: "Space Tourist", description: "Retired to a villa on Mars" },
]

export default function LifeCountdown() {
  const [progress, setProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // User's specific life dates
    const birthDate = new Date(2004, 1, 17) // February 17, 2004
    const endDate = new Date(2090, 3, 14) // April 14, 2090

    const calculateTimeLeft = () => {
      const now = new Date()
      const totalLifeMs = endDate.getTime() - birthDate.getTime()
      const livedMs = now.getTime() - birthDate.getTime()
      const remainingMs = endDate.getTime() - now.getTime()

      // Calculate progress percentage
      const progressPercent = (livedMs / totalLifeMs) * 100
      setProgress(progressPercent)

      // Calculate remaining time
      const seconds = Math.floor((remainingMs / 1000) % 60)
      const minutes = Math.floor((remainingMs / (1000 * 60)) % 60)
      const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24)
      const days = Math.floor((remainingMs / (1000 * 60 * 60 * 24)) % 30)
      const months = Math.floor((remainingMs / (1000 * 60 * 60 * 24 * 30)) % 12)
      const years = Math.floor(remainingMs / (1000 * 60 * 60 * 24 * 365.25))

      setTimeLeft({ years, months, days, hours, minutes, seconds })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [mounted])

  // Find the current milestone
  const currentMilestone = milestones.reduce((prev, current) => {
    return current.percent <= progress && current.percent > prev.percent ? current : prev
  }, milestones[0])

  // Find the next milestone
  const nextMilestone = milestones.find((m) => m.percent > progress) || milestones[milestones.length - 1];

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-between">
        <TimeUnit value={timeLeft.years} label="Years" />
        <TimeUnit value={timeLeft.months} label="Months" />
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="timeline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Birth (Feb 17, 2004)</span>
              <span>Now ({progress.toFixed(2)}%)</span>
              <span>April 14, 2090</span>
            </div>

            <div className="relative group progress-bar-wrapper transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-lg dark:hover:shadow-neutral-800/30 rounded-full">
              <Progress value={progress} className="h-4 w-full" />
              
              {/* Pulsing dot at current progress */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-red-500 dark:bg-red-400 shadow-lg animate-pulse-scale z-10"
                style={{ 
                  left: `${progress}%`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)',
                  animation: 'pulse 2s infinite'
                }}
              />
              
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {milestones.map((milestone, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute top-1/2 -translate-y-1/2 h-4 cursor-pointer pointer-events-auto transition-all duration-300"
                          style={{ 
                            left: `${milestone.percent}%`,
                            zIndex: hoveredMilestone === index ? 200 : 100
                          }}
                          onMouseEnter={() => setHoveredMilestone(index)}
                          onMouseLeave={() => setHoveredMilestone(null)}
                        >
                          <div
                            className={`relative w-4 h-4 -ml-2 rounded-full border-2 transform group-hover:scale-110 transition-transform duration-200 ${
                              milestone.percent <= progress
                                ? "bg-red-500 border-red-600 dark:bg-red-400 dark:border-red-500"
                                : "bg-gray-300 border-gray-400 dark:bg-gray-600 dark:border-gray-500"
                            } shadow-sm hover:shadow-md`}
                          >
                            <milestone.icon className="w-2 h-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        align="center"
                        sideOffset={5}
                        className="bg-white dark:bg-gray-800 p-2 shadow-lg border border-gray-100 dark:border-gray-700 z-[999999]"
                      >
                        <div className="text-center">
                          <p className="font-bold text-gray-900 dark:text-gray-100">{milestone.label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{milestone.percent}%</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{milestone.description}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full text-red-500 dark:text-red-400">
                  <currentMilestone.icon size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    Current: {currentMilestone.label}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {currentMilestone.percent}% of life journey
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{currentMilestone.description}</p>
            </div>

            <div className="bg-gray-50/80 dark:bg-gray-800/80 rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full text-gray-500 dark:text-gray-400">
                  <nextMilestone.icon size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Next: {nextMilestone.label}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{nextMilestone.percent}% of life journey</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{nextMilestone.description}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function TimeUnit({ value, label }) {
  return (
    <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
      <div className="text-2xl font-bold text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform duration-300">
        {value}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
        {label}
      </div>
    </div>
  )
}
