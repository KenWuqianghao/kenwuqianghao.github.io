"use client";

import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  ChromaticAberration,
  Noise,
  Bloom,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import { KanjiParticleRain } from "./KanjiParticleRain";
import { WireframeGrid } from "./WireframeGrid";
import { Scanlines } from "./ScanlineEffect";
import { GlitchBurst } from "./GlitchBurst";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMousePosition } from "@/hooks/useMousePosition";
import { PARTICLE_CONFIG, POST_PROCESSING } from "@/lib/shinbo";

interface ShinboCanvasProps {
  glitchActive: boolean;
}

export function ShinboCanvas({ glitchActive }: ShinboCanvasProps) {
  const isMobile = useIsMobile();
  const mouse = useMousePosition();
  const particleCount = isMobile ? PARTICLE_CONFIG.mobile : PARTICLE_CONFIG.desktop;

  return (
    <div
      className="fixed inset-0 z-0"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        orthographic
        camera={{ zoom: 100, position: [0, 0, 10] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <KanjiParticleRain count={particleCount} mouse={mouse} />
        <WireframeGrid />
        <EffectComposer>
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={
              new Vector2(
                POST_PROCESSING.chromaticAberration.x,
                POST_PROCESSING.chromaticAberration.y
              )
            }
            radialModulation={false}
            modulationOffset={0}
          />
          <Noise
            premultiply
            blendFunction={BlendFunction.ADD}
            opacity={POST_PROCESSING.noise.opacity}
          />
          <Bloom
            intensity={POST_PROCESSING.bloom.intensity}
            luminanceThreshold={POST_PROCESSING.bloom.luminanceThreshold}
          />
          <Scanlines />
          <GlitchBurst active={glitchActive} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
