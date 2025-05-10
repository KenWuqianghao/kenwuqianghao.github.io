"use client"

import React, { useEffect, useState, useRef } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export default function HeaderCollapse() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const manualToggleRef = useRef(false)
  const lastToggleTimeRef = useRef(0)
  
  useEffect(() => {
    // Track scroll position to auto-collapse header
    const handleScroll = () => {
      // If the button was manually clicked in the last 1 second, don't override
      if (Date.now() - lastToggleTimeRef.current < 1000) {
        return
      }
      
      // Auto-collapse after scrolling past threshold
      if (window.scrollY > 100 && !isCollapsed) {
        setIsCollapsed(true)
        manualToggleRef.current = false
      } else if (window.scrollY <= 20 && isCollapsed && !manualToggleRef.current) {
        setIsCollapsed(false)
        manualToggleRef.current = false
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isCollapsed])
  
  // Apply collapse/expand classes to header whenever state changes
  useEffect(() => {
    const header = document.getElementById('about');
    const profileImage = document.getElementById('profile-image');
    const headerContent = document.getElementById('header-content');
    const contactButtons = document.getElementById('contact-buttons');
    const contactInfo = document.querySelectorAll('.contact-info');
    const headerContainer = document.querySelector('.header-container');
    
    if (header && profileImage && headerContent && contactButtons && headerContainer) {
      if (isCollapsed) {
        header.classList.add('header-collapsed');
        header.classList.remove('header-expanded');
        profileImage.classList.add('profile-collapsed');
        headerContent.classList.add('content-collapsed');
        contactButtons.classList.add('buttons-collapsed');
        headerContainer.classList.add('container-collapsed');
        contactInfo.forEach(item => item.classList.add('info-collapsed'));
      } else {
        header.classList.remove('header-collapsed');
        header.classList.add('header-expanded');
        profileImage.classList.remove('profile-collapsed');
        headerContent.classList.remove('content-collapsed');
        contactButtons.classList.remove('buttons-collapsed');
        headerContainer.classList.remove('container-collapsed');
        contactInfo.forEach(item => item.classList.remove('info-collapsed'));
      }
    }
  }, [isCollapsed]);
  
  const toggleCollapse = () => {
    manualToggleRef.current = true;
    lastToggleTimeRef.current = Date.now();
    setIsCollapsed(!isCollapsed);
  }
  
  return (
    <>
      <button 
        onClick={toggleCollapse}
        className="absolute bottom-1 right-4 z-50 bg-gray-100 dark:bg-gray-800 p-1 rounded-full shadow-sm hover:shadow transition-all border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
        aria-label={isCollapsed ? "Expand header" : "Collapse header"}
      >
        {isCollapsed ? (
          <ChevronDown size={16} className="text-gray-600 dark:text-gray-300" />
        ) : (
          <ChevronUp size={16} className="text-gray-600 dark:text-gray-300" />
        )}
      </button>
      
      <style jsx global>{`
        .header-collapsed {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
        
        .header-expanded {
          padding-top: 1rem;
          padding-bottom: 1rem;
        }
        
        .container-collapsed {
          padding-top: 0 !important;
          padding-bottom: 0 !important; 
          min-height: 3.5rem;
          display: flex;
          align-items: center;
        }
        
        @media (min-width: 768px) {
          .header-expanded {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
          }
        }
        
        .profile-collapsed {
          width: 2.5rem !important;
          height: 2.5rem !important;
          margin: 0 !important;
          transition: all 0.3s ease-in-out;
          position: relative;
          flex-shrink: 0;
        }
        
        .profile-collapsed img {
          transform: scale(1) !important;
        }
        
        .content-collapsed {
          transform: scale(0.95);
          transform-origin: left;
          transition: all 0.3s ease-in-out;
        }
        
        .content-collapsed h1 {
          font-size: 1.25rem !important;
          margin-bottom: 0 !important;
          line-height: 1.2 !important;
          white-space: nowrap;
        }
        
        .content-collapsed p {
          display: none;
        }
        
        .info-collapsed {
          transform: scale(0.9);
          white-space: nowrap;
          margin-bottom: 0 !important;
          transition: all 0.3s ease-in-out;
        }
        
        .buttons-collapsed {
          display: none !important;
        }
        
        @media (min-width: 768px) {
          .profile-collapsed {
            width: 2.75rem !important;
            height: 2.75rem !important;
            margin-right: 0.75rem !important;
          }
          
          .content-collapsed {
            transform: scale(1);
            display: flex !important;
            align-items: center !important;
            flex-direction: row !important;
            gap: 0.75rem !important;
            margin-left: 0;
            width: 100%;
            padding: 0;
          }
          
          .content-collapsed h1 {
            font-size: 1.5rem !important;
            margin-right: 1.5rem !important;
            margin-bottom: 0 !important;
            white-space: nowrap;
            min-width: max-content;
          }
          
          .container-collapsed {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 1rem;
            padding: 0.5rem 1rem !important;
          }
          
          .info-collapsed {
            transform: scale(1);
            padding: 0.25rem 0.75rem !important;
            margin-right: 0.5rem !important;
            font-size: 0.875rem !important;
            min-width: max-content;
          }
          
          .content-collapsed .flex {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 0.75rem !important;
            margin-bottom: 0 !important;
            width: auto;
            flex-wrap: nowrap !important;
          }
        }
      `}</style>
    </>
  )
} 