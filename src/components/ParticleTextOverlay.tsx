"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Immediate white cover while JS module loads — prevents page flash-through
const COVER = (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 9993,
      background: "#fafaf9",
      pointerEvents: "none",
    }}
  />
);

const ParticleText = dynamic(
  () =>
    import("./three/ParticleText").then((m) => ({ default: m.ParticleText })),
  { ssr: false, loading: () => COVER }
);

export function ParticleTextOverlay() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("particle-played")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handle = () => setActive(true);
    window.addEventListener("entrance-complete", handle);
    return () => window.removeEventListener("entrance-complete", handle);
  }, []);

  if (!active) return null;

  return (
    <ParticleText
      onComplete={() => {
        sessionStorage.setItem("particle-played", "1");
        setActive(false);
      }}
    />
  );
}
