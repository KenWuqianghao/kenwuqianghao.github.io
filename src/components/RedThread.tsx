"use client";

import { useState, useEffect, useRef } from "react";

// Pre-generate a fixed thread path in 0-1000 coordinate space.
// Angular segments that zig-zag like string stretched between pins.
function generateThreadPath(): string {
  const totalHeight = 1000;
  const segments: string[] = [];
  const segmentHeight = 40;
  const count = Math.ceil(totalHeight / segmentHeight);
  const baseX = 12;
  const drift = 4;

  segments.push(`M ${baseX} 0`);

  for (let i = 1; i <= count; i++) {
    const y = Math.min(i * segmentHeight, totalHeight);
    const direction = i % 3 === 0 ? 1 : i % 3 === 1 ? -1 : 0.5;
    const x = baseX + direction * drift * (0.6 + (((i * 7) % 11) / 11) * 0.4);
    segments.push(`L ${x.toFixed(1)} ${y}`);
  }

  return segments.join(" ");
}

const THREAD_PATH = generateThreadPath();

export function RedThread() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(totalHeight > 0 ? Math.min(scrollTop / totalHeight, 1) : 0);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (progress <= 0) return null;

  // The path lives in a 0-1000 coordinate space.
  // We clip it with a rect whose height = progress * 1000.
  const clipHeight = progress * 1000;

  return (
    <svg
      className="fixed top-0 left-0 z-30 pointer-events-none w-6 h-screen"
      viewBox="0 0 24 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="thread-clip">
          <rect x="0" y="0" width="24" height={clipHeight} />
        </clipPath>
      </defs>
      <path
        d={THREAD_PATH}
        fill="none"
        stroke="#dc2626"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#thread-clip)"
      />
    </svg>
  );
}
