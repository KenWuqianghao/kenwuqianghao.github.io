"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ParticleText = dynamic(
  () =>
    import("./three/ParticleText").then((m) => ({ default: m.ParticleText })),
  { ssr: false }
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
