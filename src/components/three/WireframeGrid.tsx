"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uScrollFade;
  uniform vec2 uResolution;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Create perspective grid
    vec2 grid = uv * 2.0 - 1.0;

    // Perspective warp
    float perspective = 1.0 / (1.0 + abs(grid.y) * 2.0);
    grid.x *= perspective;

    // Scale for grid density
    vec2 gridCoord = grid * 30.0;
    gridCoord.y += uTime * 0.5;

    // Grid lines using fract
    vec2 f = abs(fract(gridCoord) - 0.5);
    float lineX = smoothstep(0.02, 0.04, f.x);
    float lineY = smoothstep(0.02, 0.04, f.y);
    float gridLine = 1.0 - min(lineX, lineY);

    // Fade from center
    float centerFade = 1.0 - smoothstep(0.0, 0.8, length(uv - 0.5));

    // Zinc-200 color at low opacity
    vec3 color = vec3(0.894, 0.894, 0.906);
    float alpha = gridLine * 0.08 * centerFade * uScrollFade;

    gl_FragColor = vec4(color, alpha);
  }
`;

export function WireframeGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();

      // Fade based on scroll
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const fade = Math.max(0, 1 - scrollY / (window.innerHeight * 1.5));
      materialRef.current.uniforms.uScrollFade.value = fade;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -0.1]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uScrollFade: { value: 1 },
          uResolution: {
            value: new THREE.Vector2(viewport.width, viewport.height),
          },
        }}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
