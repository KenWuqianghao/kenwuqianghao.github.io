"use client";

import { useEffect, useRef, useCallback } from "react";

const TRAIL_COUNT = 8;
const TRAIL_DECAY = 0.7; // opacity multiplier per dot

export function CursorTrail() {
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const positionsRef = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    const positions = positionsRef.current;
    const dots = dotsRef.current;

    // Lead dot follows mouse directly
    positions[0].x += (mouseRef.current.x - positions[0].x) * 0.3;
    positions[0].y += (mouseRef.current.y - positions[0].y) * 0.3;

    // Each subsequent dot follows the one ahead of it
    for (let i = 1; i < TRAIL_COUNT; i++) {
      positions[i].x += (positions[i - 1].x - positions[i].x) * 0.2;
      positions[i].y += (positions[i - 1].y - positions[i].y) * 0.2;
    }

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const dot = dots[i];
      if (!dot) continue;
      dot.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    // Show container
    if (containerRef.current) containerRef.current.style.display = "";

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none hidden md:block"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      {Array.from({ length: TRAIL_COUNT }, (_, i) => {
        const opacity = Math.pow(TRAIL_DECAY, i) * 0.4;
        const size = Math.max(3, 6 - i * 0.4);
        return (
          <div
            key={i}
            ref={(el) => {
              if (el) dotsRef.current[i] = el;
            }}
            className="absolute top-0 left-0 rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: "#dc2626",
              opacity,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              willChange: "transform",
            }}
          />
        );
      })}
    </div>
  );
}
