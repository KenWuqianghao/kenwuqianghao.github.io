"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the toggle
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10" /> // Placeholder to prevent layout shift
  }

  const isDark = resolvedTheme === "dark"

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        relative flex items-center justify-center w-10 h-10 rounded-full 
        ${isDark ? "bg-gray-800" : "bg-white"} 
        shadow-lg border 
        ${isDark ? "border-gray-700" : "border-gray-200"}
        transition-colors duration-300
        hover:border-red-300 dark:hover:border-red-700
      `}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? <Moon className="w-5 h-5 text-gray-200" /> : <Sun className="w-5 h-5 text-amber-500" />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}
