"use client";

import { useEffect, useRef, useState } from "react";
import { FLASH_KANJI } from "@/lib/shinbo";

interface Stamp {
  id: number;
  char: string;
  x: number;
  y: number;
  opacity: number;
  rotation: number;
  scale: number;
}

/**
 * Ambient kanji stamps that float at viewport edges.
 * Not triggered by scroll — they're always there, cycling slowly,
 * like incidental text in a Monogatari background.
 */
export function AmbientKanji() {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const positions = [
      { x: 3, y: 15 },
      { x: 92, y: 35 },
      { x: 6, y: 65 },
      { x: 88, y: 80 },
      { x: 95, y: 12 },
    ];

    const createStamps = () =>
      positions.map((pos, i) => ({
        id: i,
        char: FLASH_KANJI[Math.floor(Math.random() * FLASH_KANJI.length)],
        x: pos.x + (Math.random() - 0.5) * 4,
        y: pos.y + (Math.random() - 0.5) * 8,
        opacity: 0.04 + Math.random() * 0.05,
        rotation: (Math.random() - 0.5) * 15,
        scale: 0.8 + Math.random() * 0.6,
      }));

    setStamps(createStamps());

    const interval = setInterval(() => {
      setStamps(createStamps());
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ pointerEvents: "none" }}
    >
      {stamps.map((stamp) => (
        <span
          key={stamp.id}
          className="absolute font-display transition-all duration-[2000ms] ease-in-out select-none"
          style={{
            left: `${stamp.x}%`,
            top: `${stamp.y}%`,
            opacity: stamp.opacity,
            transform: `rotate(${stamp.rotation}deg) scale(${stamp.scale})`,
            fontSize: "clamp(4rem, 8vw, 8rem)",
            color: "#a1a1aa",
            fontWeight: 300,
          }}
        >
          {stamp.char}
        </span>
      ))}
    </div>
  );
}
