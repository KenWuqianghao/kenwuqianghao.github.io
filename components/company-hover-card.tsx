"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, MapPin, Building, Briefcase, CalendarDays } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { Badge } from "@/components/ui/badge"

interface CompanyHoverCardProps {
  name: string
  logo: string
  website: string
  location: string
  industry?: string
  founded?: string
  description?: string
  technologies?: string[]
}

export default function CompanyHoverCard({
  name,
  logo,
  website,
  location,
  industry,
  founded,
  description,
  technologies = [],
}: CompanyHoverCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 })
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  // Only run on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setCardPosition({
        top: rect.bottom + window.scrollY + 10, // 10px below the trigger
        left: Math.max(10, rect.left + window.scrollX - 150) // Center it relative to trigger
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isOpen) return
    
    const container = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - container.left) / container.width - 0.5) * 2
    const y = ((e.clientY - container.top) / container.height - 0.5) * -2
    
    setMousePos({ x: x * 5, y: y * 5 }) // Reduce the effect for subtle movement
  }
  
  const handleCardMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
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
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 p-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700/80 shadow-2xl rounded-xl overflow-hidden pointer-events-auto perspective-100"
            style={{
              position: "absolute",
              top: `${cardPosition.top}px`,
              left: `${cardPosition.left}px`,
              transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
              transition: "transform 0.2s ease-out",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => {
              handleMouseLeave()
              handleCardMouseLeave()
            }}
            onMouseMove={handleMouseMove}
          >
            <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700/80">
              <div className="flex items-center gap-3">
                <span className="relative w-12 h-12 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0 shadow-sm">
                  <Image src={logo || "/company-placeholder.png"} alt={`${name} logo`} fill className="object-contain p-1" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">{name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <MapPin size={10} className="mr-1" /> {location}
                  </span>
                  {industry && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
                      <Building size={10} className="mr-1" /> {industry}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {description && (
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
              )}
              
              {founded && (
                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                  <CalendarDays size={12} className="mr-1.5 text-red-500 dark:text-red-400 flex-shrink-0" /> 
                  <div><strong>Founded:</strong> {founded}</div>
                </div>
              )}
              
              {technologies.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                    <Briefcase size={12} className="mr-1.5 text-red-500 dark:text-red-400" /> Technologies:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs bg-gray-100 dark:bg-gray-800 border-gray-200/80 dark:border-gray-700/70 text-gray-700 dark:text-gray-300 px-1.5 py-0.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
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