"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, MapPin, Calendar, Award, GraduationCap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"

interface UniversityHoverCardProps {
  name: string
  logo: string
  description: string
  location: string
  website: string
  founded: string
  ranking: string
  programs: string[]
}

export default function UniversityHoverCard({
  name,
  logo,
  description,
  location,
  website,
  founded,
  ranking,
  programs,
}: UniversityHoverCardProps) {
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
        left: Math.max(10, rect.left + window.scrollX - 160) // Center it relative to trigger
      })
    }
  }, [isOpen])

  // Define event handlers with timeouts for better user experience
  const openTimeout = useRef<NodeJS.Timeout>()
  const closeTimeout = useRef<NodeJS.Timeout>()
  
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
            className="w-80 md:w-96 p-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700/80 shadow-2xl rounded-xl overflow-hidden pointer-events-auto"
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
                  <Image src={logo || "/placeholder.svg"} alt={`${name} logo`} fill className="object-contain p-1" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">{name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <MapPin size={10} className="mr-1" /> {location}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar size={12} className="mr-1.5 text-red-500 dark:text-red-400 flex-shrink-0" /> 
                  <div><strong>Founded:</strong> {founded}</div>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Award size={12} className="mr-1.5 text-red-500 dark:text-red-400 flex-shrink-0" /> 
                  <div>{ranking}</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                  <GraduationCap size={12} className="mr-1.5 text-red-500 dark:text-red-400" /> Notable Programs:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {programs.map((program, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-gray-100 dark:bg-gray-800 border-gray-200/80 dark:border-gray-700/70 text-gray-700 dark:text-gray-300 px-1.5 py-0.5"
                    >
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700/80 bg-gray-50 dark:bg-gray-900">
              <a href={website} target="_blank" rel="noopener noreferrer" className="w-full block">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-300 dark:border-gray-600 hover:bg-red-500 hover:text-white hover:border-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:hover:border-red-500 transition-colors duration-300 text-gray-700 dark:text-gray-300 group shadow-sm"
                >
                  Visit Website
                  <ExternalLink className="ml-2 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                </Button>
              </a>
            </div>
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
