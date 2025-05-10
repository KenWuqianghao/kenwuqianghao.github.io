"use client"

import { useEffect, useRef } from "react"

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create gradient background
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#fff5f7") // Very light pink
      gradient.addColorStop(0.5, "#fff0f3") // Light pink
      gradient.addColorStop(1, "#fff5f7") // Very light pink
      return gradient
    }

    // Particles parameters
    const particleCount = 100
    const particles: Particle[] = []
    // Lighter shades of red/pink
    const colors = ["#ffb3c1", "#ff8fa3", "#ff758f", "#ff4d6d", "#ff758f"]
    let mouseX = 0
    let mouseY = 0
    const mouseRadius = 150

    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string
      alpha: number
      vx: number
      vy: number
      directionX: number
      directionY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2.5 + 0.5 // Smaller particles
        this.baseX = this.x
        this.baseY = this.y
        this.density = Math.random() * 25 + 5
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.alpha = Math.random() * 0.3 + 0.05 // More subtle opacity
        this.vx = Math.random() * 0.15 - 0.075
        this.vy = Math.random() * 0.15 - 0.075
        this.directionX = 0
        this.directionY = 0
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.alpha
        ctx.fill()
      }

      update() {
        // Add slight movement
        this.x += this.vx + this.directionX
        this.y += this.vy + this.directionY

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.vx *= -1
        }
        if (this.y > canvas.height || this.y < 0) {
          this.vy *= -1
        }

        // Calculate distance between particle and mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Move particles away from mouse with a smoother effect
        if (distance < mouseRadius) {
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const force = (mouseRadius - distance) / mouseRadius
          this.directionX = forceDirectionX * force * this.density * -0.4
          this.directionY = forceDirectionY * force * this.density * -0.4
        } else {
          // Gradually reduce the direction values to create a smoother return
          this.directionX *= 0.92
          this.directionY *= 0.92

          // Return to original position with slight drift
          if (Math.abs(this.x - this.baseX) > 50) {
            const dx = this.x - this.baseX
            this.x -= dx / 40
          }
          if (Math.abs(this.y - this.baseY) > 50) {
            const dy = this.y - this.baseY
            this.y -= dy / 40
          }
        }
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Mouse move event
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.x
      mouseY = e.y
    }

    // Touch move event for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX
        mouseY = e.touches[0].clientY
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      ctx.fillStyle = createGradient()
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw and update particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Connect particles with lines if they are close enough
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect particles with lines
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 77, 109, ${0.08 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
