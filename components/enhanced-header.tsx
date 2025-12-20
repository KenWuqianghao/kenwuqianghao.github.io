"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils" // Assuming you have this utility
import { Menu, X, MapPin, Phone, Mail, Github, Linkedin, FileText, ExternalLink, Twitter } from "lucide-react"

interface NavItem {
  name: string;
  href: string;
}

export default function EnhancedHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // const [mounted, setMounted] = useState(false) // mounted state not used in provided code

  useEffect(() => {
    // setMounted(true) // mounted state not used
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const personalInfo = {
    name: "Ken Wu",
    title: "Software Engineer & ML Enthusiast", // Updated title
    // subtitle: "ML Enthusiast", // Removed subtitle
    location: "Waterloo, ON",
    phone: "+1 437-599-3179", // Updated phone number
    email: "ken.wu@uwaterloo.ca",
  github: "https://github.com/KenWuqianghao",
  linkedin: "https://www.linkedin.com/in/kenwuu/",
    twitter: "https://x.com/kenwuuuu",
    resumeLink: "https://drive.google.com/file/d/11TiGQ-JxqmLQ-TJ24Jui8V9kXsI6QZld/view",
    profileImage: "/KenWuCropped.jpg"
  }

  const navItems: NavItem[] = []; // Removed all navigation items and added type

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out",
          scrolled ? "h-20 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-xl border-b border-gray-200 dark:border-gray-800" : "h-36 bg-white dark:bg-gray-900 shadow-md",
        )}
      >
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          {/* Profile Section */}
          <div className="flex items-center space-x-5">
            <div
              className={cn(
                "relative overflow-hidden rounded-full ring-2 ring-gray-200 dark:ring-gray-700 transition-all duration-300 hover:scale-110 hover:ring-red-500 dark:hover:ring-red-400 cursor-pointer",
                scrolled ? "w-12 h-12" : "w-20 h-20",
              )}
            >
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                fill
                className="object-cover transition-transform duration-300"
                priority
              />
            </div>

            <div className={cn("transition-all duration-700 ease-out", scrolled && "hidden md:block")}>
              <h1
                className={cn(
                  "font-semibold text-gray-900 dark:text-gray-100 transition-all duration-700 ease-out group cursor-pointer",
                  scrolled ? "text-lg" : "text-2xl",
                )}
              >
                <span className="relative">
                  {personalInfo.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 dark:bg-red-400 transition-all duration-300 group-hover:w-full" />
                </span>
              </h1>
              <p
                className={cn(
                  "text-gray-600 dark:text-gray-400 transition-all duration-700 ease-out group cursor-pointer",
                  scrolled ? "text-sm" : "text-lg",
                )}
              >
                <span className="relative">
                  {personalInfo.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 dark:bg-red-400 transition-all duration-300 group-hover:w-full" />
                </span>
              </p>
              {/* Optional: Subtitle can be added here if design allows when not scrolled */}
              {/* Subtitle display logic removed */}
            </div>
          </div>

          {/* Right side content: Contact Pills, Social Pills, Mobile Menu Button */}
          <div className="flex items-center space-x-4"> {/* Increased spacing between major groups */}
            {/* Contact Info - Individual Pills - Hidden on scroll and mobile */}
            <div
              className={cn(
                "hidden lg:flex items-center space-x-2 transition-all duration-700 ease-out",
                scrolled ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100",
              )}
            >
              <ContactItem
                icon={MapPin}
                text={personalInfo.location}
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
              />
              <ContactItem 
                icon={Phone} 
                text={personalInfo.phone} 
                href={`tel:${personalInfo.phone}`} 
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
              />
              <ContactItem 
                icon={Mail} 
                text={personalInfo.email} 
                href={`mailto:${personalInfo.email}`} 
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
              />
            </div>

            {/* Social Links & Resume - Individual Pills */}
            <div className="flex items-center space-x-2">
              <SocialLink href={personalInfo.github} icon={Github} label="GitHub" className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full shadow-sm hover:shadow-md hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 hover:scale-110" /> 
              <SocialLink href={personalInfo.linkedin} icon={Linkedin} label="LinkedIn" className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full shadow-sm hover:shadow-md hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110" />
              <SocialLink href={personalInfo.twitter} icon={Twitter} label="Twitter" className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full shadow-sm hover:shadow-md hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-200 hover:scale-110" />
              <SocialLink href={personalInfo.resumeLink} icon={FileText} label="Resume" className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full shadow-sm hover:shadow-md hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 hover:scale-110" isButton={false} />
            </div>

            {/* Mobile Menu Button - now part of the same flex container for spacing */}
            <button
              className="md:hidden ml-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className={cn(
            "hidden md:flex justify-center border-t border-gray-100 dark:border-gray-800 transition-all duration-700 ease-out",
            scrolled ? "h-0 opacity-0 overflow-hidden" : "h-14 opacity-100",
          )}
        >
          <div className="flex items-center space-x-10">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group py-2"
                style={{ animationDelay: `${index * 100}ms` }} // This style might need 'use client' if it causes issues with SSR
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400 transition-all duration-400 group-hover:w-full" />
                <div className="absolute -inset-2 bg-gray-100 dark:bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 -z-10 scale-95 group-hover:scale-100" />
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Enhanced Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-40 md:hidden transition-all duration-500 ease-out",
          mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        )}
      >
        <div className="pt-24 sm:pt-32 px-6">
          {/* Mobile Contact Info */}
          <div className="space-y-4 mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg">
            <ContactItem icon={MapPin} text={personalInfo.location} mobile />
            <ContactItem icon={Phone} text={personalInfo.phone} href={`tel:${personalInfo.phone}`} mobile />
            <ContactItem icon={Mail} text={personalInfo.email} href={`mailto:${personalInfo.email}`} mobile />
          </div>

          {/* Mobile Navigation */}
          <nav className="space-y-4 mb-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-xl text-gray-800 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition-colors py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Social Links */}
          <div className="flex justify-center space-x-6">
            <SocialLink
              href={personalInfo.github}
              icon={Github}
              label="GitHub"
              className="hover:text-gray-900 dark:hover:text-white p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              size="large"
            />
            <SocialLink
              href={personalInfo.linkedin}
              icon={Linkedin}
              label="LinkedIn"
              className="hover:text-blue-600 dark:hover:text-blue-400 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full"
              size="large"
            />
            <SocialLink
              href={personalInfo.twitter}
              icon={Twitter}
              label="Twitter"
              className="hover:text-sky-600 dark:hover:text-sky-400 p-3 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-full"
              size="large"
            />
            <SocialLink
              href={personalInfo.resumeLink}
              icon={FileText}
              label="Resume"
              className="hover:text-gray-900 dark:hover:text-white p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              size="large"
              isButton={false} // Changed to false
            />
          </div>
        </div>
      </div>
    </>
  )
}

// Updated ContactItem to pass className to the anchor/div wrapper for individual pill styling
function ContactItem({
  icon: Icon,
  text,
  href,
  mobile = false,
  className = "", 
}: {
  icon: React.ElementType 
  text: string
  href?: string
  mobile?: boolean
  className?: string
}) {
  const contentClasses = mobile 
    ? "text-base space-x-3"
    : "text-sm space-x-2"; // Inner content flex/spacing
  
  const iconColorClasses = "text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400"; // Icon hover from original
  const textColorClasses = "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"; // Text hover from original

  const content = (
    // The 'group' class for hover effects should be on the clickable element (a or div wrapper)
    <div className={cn("flex items-center", contentClasses)}>
      <Icon
        className={cn(
          iconColorClasses, 
          mobile ? "w-5 h-5" : "w-4 h-4",
          "transition-colors duration-200" // Ensure transition is on icon too
        )}
      />
      <span className={cn(textColorClasses, "transition-colors duration-200")}>{text}</span>
    </div>
  );

  // The className prop (containing pill styles) is applied to the main clickable element
  if (href) {
    return (
      <a href={href} className={cn("group block", className)}> 
        {content}
      </a>
    );
  }
  return <div className={cn("group", className)}>{content}</div>;
}

// Updated SocialLink to ensure className applies correctly for individual pill styling
function SocialLink({
  href,
  icon: Icon,
  label,
  className = "", // This className will contain the pill styling + hover color for the icon
  size = "normal",
  isButton = false, 
}: {
  href: string
  icon: React.ElementType 
  label: string
  className?: string
  size?: "normal" | "large"
  isButton?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group relative block", className)} // className from props now dictates the pill look and icon hover color
      aria-label={label}
    >
      <Icon className={cn("transition-colors duration-200", size === "large" ? "w-6 h-6" : "w-5 h-5")} />
    </a>
  )
}
