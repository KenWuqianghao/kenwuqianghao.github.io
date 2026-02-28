"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { GlitchMode } from "postprocessing";
import { Glitch } from "@react-three/postprocessing";
import { Vector2 } from "three";

interface GlitchBurstProps {
  active: boolean;
}

export function GlitchBurst({ active }: GlitchBurstProps) {
  if (!active) return null;

  return (
    <Glitch
      delay={new Vector2(0, 0)}
      duration={new Vector2(0.1, 0.3)}
      strength={new Vector2(0.2, 0.4)}
      mode={GlitchMode.SPORADIC}
      active={active}
    />
  );
}
