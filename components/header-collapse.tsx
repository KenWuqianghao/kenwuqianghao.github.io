"use client"

import React, { useEffect, useState, useRef, useCallback } from 'react'

const MAX_SCROLL_Y = 150; // Pixels over which the animation occurs

// Helper to interpolate values
const interpolate = (start: number, end: number, progress: number) => start + (end - start) * progress;

export default function HeaderCollapse() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const tickingRef = useRef(false);
  const isMobileRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const stableCountRef = useRef(0);
  const freezeUntilRef = useRef(0);

  const updateIsMobile = () => {
    isMobileRef.current = window.innerWidth < 768;
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const now = Date.now();
    
    // If we're in a freeze period, ignore all scroll events
    if (now < freezeUntilRef.current) {
      return;
    }
    
    // Check if scroll position is stable (hasn't changed much)
    const scrollDiff = Math.abs(currentScrollY - lastScrollYRef.current);
    
    if (scrollDiff < 0.3) { 
      // Scroll position is very stable, increment counter
      stableCountRef.current += 1;
      
      // If we've been stable for longer, freeze for a period
      if (stableCountRef.current > 6) { 
        // Freeze scroll updates for 200ms
        freezeUntilRef.current = now + 200;
        return;
      }
    } else {
      // Reset stable counter if there's significant movement
      stableCountRef.current = 0;
      // Clear any freeze period if there's real movement
      freezeUntilRef.current = 0;
    }
    
    lastScrollYRef.current = currentScrollY;
    
    let newProgress = Math.min(currentScrollY / MAX_SCROLL_Y, 1);
    // Round to 2 decimal places to reduce sensitivity even more
    newProgress = parseFloat(newProgress.toFixed(2));

    setScrollProgress(prevProgress => {
      // Even higher threshold to prevent micro-updates
      // This is now 1.5% of total progress range
      if (Math.abs(prevProgress - newProgress) > 0.015) {
        return newProgress;
      }
      return prevProgress;
    });
  }, []);

  useEffect(() => {
    updateIsMobile(); // Initial check
    handleScroll(); // Initial calculation

    const onScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          handleScroll();
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateIsMobile, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateIsMobile);
    };
  }, [handleScroll]);

  useEffect(() => {
    const root = document.documentElement; // Or specific header element if preferred for scoping
    const headerElement = document.getElementById('about') as HTMLElement;
    const profileImageElement = document.getElementById('profile-image') as HTMLElement;
    const headerContentElement = document.getElementById('header-content') as HTMLElement;
    const headerH1Element = headerContentElement?.querySelector('h1') as HTMLElement;
    const headerPElement = headerContentElement?.querySelector('p') as HTMLElement;
    const contactButtonsElement = document.getElementById('contact-buttons') as HTMLElement;

    if (!headerElement) return; // Only need headerElement to set properties on it

    const isMobile = isMobileRef.current;

    // Header padding (rem)
    const headerPaddingExpanded = isMobile ? 1 : 1.5;
    const headerPaddingCollapsed = 0.5;
    headerElement.style.setProperty('--header-padding-dynamic', `${interpolate(headerPaddingExpanded, headerPaddingCollapsed, scrollProgress)}rem`);

    // Profile image size (rem)
    const profileSizeExpanded = isMobile ? 5 : 6;
    const profileSizeCollapsed = isMobile ? 2.5 : 2.75;
    headerElement.style.setProperty('--profile-image-size-dynamic', `${interpolate(profileSizeExpanded, profileSizeCollapsed, scrollProgress)}rem`);
    
    // Profile image margin (for desktop collapsed state)
    const profileMarginRightExpanded = 0;
    const profileMarginRightCollapsed = isMobile ? 0 : 0.75;
    if (!isMobile) {
      headerElement.style.setProperty('--profile-image-margin-right-dynamic', `${interpolate(profileMarginRightExpanded, profileMarginRightCollapsed, scrollProgress)}rem`);
    } else {
      headerElement.style.setProperty('--profile-image-margin-right-dynamic', `0rem`);
    }

    // H1 font size (rem)
    const h1SizeExpanded = isMobile ? 1.875 : 2.25;
    const h1SizeCollapsed = isMobile ? 1.25 : 1.5;
    headerElement.style.setProperty('--h1-font-size-dynamic', `${interpolate(h1SizeExpanded, h1SizeCollapsed, scrollProgress)}rem`);
    headerElement.style.setProperty('--h1-margin-bottom-dynamic', `${interpolate(0.25, 0, scrollProgress)}rem`);

    // Opacity for fading elements
    const opacityValue = interpolate(1, 0, scrollProgress);
    headerElement.style.setProperty('--fade-opacity-dynamic', `${opacityValue}`);

    // Control display of fading elements (to remove from layout when fully faded)
    const displayValue = scrollProgress > 0.95 ? 'none' : ''; // A bit more aggressive hiding
    if (headerPElement) headerPElement.style.display = displayValue;
    if (contactButtonsElement) contactButtonsElement.style.display = displayValue;

  }, [scrollProgress]);

  // The <style jsx global> can be significantly reduced or removed if all styles are handled by JS.
  // For now, let's keep some minimal structural CSS if needed, or remove it if page.tsx handles base styles.
  return (
    <style jsx global>{`
      /* Apply the dynamic CSS variables */
      #about {
        padding-top: var(--header-padding-dynamic, 1.5rem);
        padding-bottom: var(--header-padding-dynamic, 1.5rem);
        /* transition-all (from page.tsx) should cover padding, but let's be explicit if issues persist */
        transition-property: padding-top, padding-bottom;
        /* Inherit duration and timing function from #about's Tailwind classes or define here */
      }

      #profile-image {
        width: var(--profile-image-size-dynamic, 6rem);
        height: var(--profile-image-size-dynamic, 6rem);
        margin-right: var(--profile-image-margin-right-dynamic, 0rem);
        /* transition-all (from page.tsx) should cover width, height, margin */
        transition-property: width, height, margin-right;
      }

      #header-content h1 {
        font-size: var(--h1-font-size-dynamic, 2.25rem);
        margin-bottom: var(--h1-margin-bottom-dynamic, 0.25rem);
        /* transition-all (from page.tsx) should cover font-size, margin-bottom */
        transition-property: font-size, margin-bottom;
      }

      #header-content p {
        opacity: var(--fade-opacity-dynamic, 1);
        /* transition-all (from page.tsx) should cover opacity */
        transition-property: opacity;
      }

      /* For #contact-buttons, opacity is handled by JS setting display:none when fully scrolled. */
      /* If a smoother fade is needed before display:none, this can be used: */
      #contact-buttons.fade-transition {
         opacity: var(--fade-opacity-dynamic, 1);
         transition-property: opacity;
      }
      
      /* 
        The 'transition-all duration-500 ease-in-out' on #about in page.tsx is the primary transition driver.
        The 'transition-property' lines above are to ensure these specific CSS variable-driven properties
        are definitely included in the transition. If the main 'transition-all' is effective, 
        these more specific 'transition-property' rules might not be strictly necessary but can help in debugging
        or ensuring certain properties animate if 'transition-all' is behaving unexpectedly with CSS variables.
        The duration and timing function will be inherited from the #about element's Tailwind classes.
      */
    `}</style>
  );
} 