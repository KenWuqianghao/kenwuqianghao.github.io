"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useMobile } from "@/hooks/use-mobile"

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const isMobile = useMobile()
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)

    const handleReducedMotionChange = () => setIsReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleReducedMotionChange)

    return () => {
      mediaQuery.removeEventListener("change", handleReducedMotionChange)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Performance settings
    const isDark = resolvedTheme === "dark"
    const dotColor = isDark ? "255, 117, 143" : "255, 117, 143"

    // Adjust settings based on device capability
    const performanceMode = isMobile || isReducedMotion

    // Grid parameters - fewer dots on mobile/reduced motion
    const gridSize = performanceMode ? 50 : 35
    const dotSize = performanceMode ? 1.5 : 2 // Increased dot size
    const maxDistance = performanceMode ? 60 : 80
    const mouseRadius = performanceMode ? 120 : 150

    // Mouse position with throttling
    let mouseX = -100
    let mouseY = -100
    let lastMouseMoveTime = 0
    const mouseMoveThrottle = performanceMode ? 50 : 30 // ms

    // Animation frame control
    let animationFrameId = null
    let lastFrameTime = 0
    const targetFPS = performanceMode ? 30 : 60
    const frameInterval = 1000 / targetFPS

    // Particles array
    let particles = []

    // Create gradient for background based on theme
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      if (isDark) {
        gradient.addColorStop(0, "#0a0a0a") // Darker background for better contrast
        gradient.addColorStop(0.5, "#090909")
        gradient.addColorStop(1, "#0a0a0a")
      } else {
        gradient.addColorStop(0, "#fff5f7")
        gradient.addColorStop(0.5, "#fff0f3")
        gradient.addColorStop(1, "#fff5f7")
      }

      return gradient
    }

    // Simple particle class with minimal properties
    class Particle {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      active: boolean

      constructor(x: number, y: number) {
        this.x = Math.round(x) // Round coordinates for pixel-perfect rendering
        this.y = Math.round(y)
        this.baseX = this.x
        this.baseY = this.y
        this.size = dotSize
        this.active = false
      }

      // Simplified update logic
      update() {
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = dx * dx + dy * dy // Avoid square root for performance

        if (distance < mouseRadius * mouseRadius) {
          this.active = true
          this.size = dotSize + (1 - distance / (mouseRadius * mouseRadius)) * 2 // Increased active dot size
        } else {
          this.active = false
          this.size = dotSize
        }
      }

      draw() {
        if (!ctx) return

        const opacity = isDark ? 0.3 : 0.3 // Increased dark mode opacity
        ctx.beginPath()
        ctx.arc(Math.round(this.x), Math.round(this.y), this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dotColor}, ${this.active ? opacity * 1.5 : opacity})`
        ctx.fill()
      }
    }

    // Initialize particles - only create what's visible
    const initParticles = () => {
      particles = []
      const cols = Math.ceil(canvas.width / gridSize) + 1
      const rows = Math.ceil(canvas.height / gridSize) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push(new Particle(i * gridSize, j * gridSize))
        }
      }
    }

    // Optimized animation loop with frame limiting
    const animate = (timestamp) => {
      if (timestamp - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      lastFrameTime = timestamp

      // Clear canvas with gradient background
      ctx.fillStyle = createGradient()
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Only draw connections if not in performance mode
      if (!performanceMode) {
        connectParticles()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Optimized connection drawing
    const connectParticles = () => {
      const maxDistanceSquared = maxDistance * maxDistance
      const opacity = isDark ? 0.08 : 0.08 // Increased line opacity in dark mode

      // Only check particles that are active or nearby
      const activeParticles = particles.filter((p) => p.active)

      for (let i = 0; i < activeParticles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = activeParticles[i].x - particles[j].x
          const dy = activeParticles[i].y - particles[j].y
          const distanceSquared = dx * dx + dy * dy

          if (distanceSquared < maxDistanceSquared) {
            // Calculate line opacity based on distance
            const lineOpacity = opacity * (1 - distanceSquared / maxDistanceSquared)

            // Draw line
            ctx.beginPath()
            ctx.moveTo(Math.round(activeParticles[i].x), Math.round(activeParticles[i].y))
            ctx.lineTo(Math.round(particles[j].x), Math.round(particles[j].y))
            ctx.strokeStyle = `rgba(${dotColor}, ${lineOpacity})`
            ctx.lineWidth = 1 // Increased line width
            ctx.stroke()
          }
        }
      }
    }

    // Optimized canvas sizing
    const resizeCanvas = () => {
      // Use a lower resolution on mobile for better performance
      const dpr = performanceMode ? 1 : window.devicePixelRatio || 1

      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr

      if (dpr !== 1) {
        ctx.scale(dpr, dpr)
      }

      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      initParticles()
    }

    // Throttled mouse move handler
    const handleMouseMove = (e) => {
      const now = Date.now()
      if (now - lastMouseMoveTime < mouseMoveThrottle) return

      lastMouseMoveTime = now
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Touch move handler
    const handleTouchMove = (e) => {
      const now = Date.now()
      if (now - lastMouseMoveTime < mouseMoveThrottle) return

      lastMouseMoveTime = now
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX
        mouseY = e.touches[0].clientY
      }
    }

    // Mouse leave handler
    const handleMouseLeave = () => {
      mouseX = -100
      mouseY = -100
    }

    // Set up event listeners
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave)

    // Initialize
    resizeCanvas()
    animationFrameId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("mouseleave", handleMouseLeave)

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [resolvedTheme, isMobile, isReducedMotion])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
