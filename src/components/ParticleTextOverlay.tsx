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
    if (sessionStorage.getItem("entrance-played")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.style.overflow = "hidden";
    setActive(true);
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!active) return null;

  return (
    <ParticleText
      onComplete={() => {
        document.body.style.overflow = "";
        sessionStorage.setItem("entrance-played", "1");
        setActive(false);
      }}
    />
  );
}
