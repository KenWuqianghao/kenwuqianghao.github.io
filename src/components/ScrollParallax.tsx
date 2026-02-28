"use client";

import { useEffect } from "react";

/**
 * Sets --scroll-y CSS custom property on <html> for parallax effects.
 * Watermarks use this via: transform: translateY(calc(var(--scroll-y) * -0.05))
 */
export function ScrollParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}px`
      );
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
