"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, BookOpen, GraduationCap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"

interface ProfessorHoverCardProps {
  name: string
  university: string
  universityLogo: string
  profile?: string
  research: string
  department?: string
  role?: string
}

export default function ProfessorHoverCard({
  name,
  university,
  universityLogo,
  profile,
  research,
  department,
  role,
}: ProfessorHoverCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 })
  const [mounted, setMounted] = useState(false)
  
  // Only run on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setCardPosition({
        top: rect.bottom + window.scrollY + 10, // 10px below the trigger
        left: Math.max(10, rect.left + window.scrollX - 120) // Center it relative to trigger
      })
    }
  }, [isOpen])

  // Define event handlers with timeouts for better user experience
  const openTimeout = useRef<NodeJS.Timeout | null>(null)
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)
  
  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
    }
    openTimeout.current = setTimeout(() => setIsOpen(true), 200)
  }
  
  const handleMouseLeave = () => {
    if (openTimeout.current) {
      clearTimeout(openTimeout.current)
    }
    closeTimeout.current = setTimeout(() => setIsOpen(false), 300)
  }

  const cardContent = (
    <AnimatePresence>
      {isOpen && mounted && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 999999,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="w-80 p-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700/80 shadow-2xl rounded-xl overflow-hidden pointer-events-auto"
            style={{
              position: "absolute",
              top: `${cardPosition.top}px`,
              left: `${cardPosition.left}px`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700/80">
              <div className="flex items-center gap-3">
                <span className="relative w-10 h-10 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0">
                  <Image src={universityLogo} alt={`${university} logo`} fill className="object-contain p-1" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">{name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <GraduationCap size={10} className="mr-1" /> {role || "Professor at"} {university}
                  </span>
                  {department && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5">
                      {department}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-start">
                <BookOpen size={14} className="mr-2 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{research}</p>
              </div>
            </div>

            {profile && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700/80 bg-gray-50 dark:bg-gray-900">
                <a href={profile} target="_blank" rel="noopener noreferrer" className="w-full block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-300 dark:border-gray-600 hover:bg-red-500 hover:text-white hover:border-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:hover:border-red-500 transition-colors duration-300 text-gray-700 dark:text-gray-300 group shadow-sm"
                  >
                    View Profile
                    <ExternalLink className="ml-2 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Button>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
  
  return (
    <>
      <span 
        ref={triggerRef}
        className="cursor-pointer border-b border-dotted border-gray-400 dark:border-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {name}
      </span>
      {mounted && createPortal(cardContent, document.body)}
    </>
  )
} 