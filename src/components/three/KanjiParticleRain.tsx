"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { KANJI_CHARS, PARTICLE_CONFIG, COLORS } from "@/lib/shinbo";

const vertexShader = `
  attribute float aOpacity;
  attribute float aFlash;
  attribute vec2 aUvOffset;
  attribute float aCharIndex;

  varying float vOpacity;
  varying float vFlash;
  varying vec2 vUvOffset;

  void main() {
    vOpacity = aOpacity;
    vFlash = aFlash;
    vUvOffset = aUvOffset;

    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D uAtlas;
  uniform float uGridSize;
  uniform vec3 uRedColor;

  varying float vOpacity;
  varying float vFlash;
  varying vec2 vUvOffset;

  void main() {
    float cell = 1.0 / uGridSize;
    vec2 uv = gl_PointCoord * cell + vUvOffset;
    vec4 tex = texture2D(uAtlas, uv);

    vec3 color = mix(vec3(0.63, 0.63, 0.67), uRedColor, vFlash);
    float alpha = tex.a * vOpacity;

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

function createAtlasTexture(): THREE.CanvasTexture {
  const gridSize = PARTICLE_CONFIG.atlasGridSize;
  const charSize = PARTICLE_CONFIG.charSize;
  const size = gridSize * charSize;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, size, size);
  ctx.font = `${charSize * 0.75}px "Noto Sans JP", "Hiragino Kaku Gothic Pro", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";

  const chars = KANJI_CHARS.slice(0, gridSize * gridSize);
  for (let i = 0; i < chars.length; i++) {
    const col = i % gridSize;
    const row = Math.floor(i / gridSize);
    const x = col * charSize + charSize / 2;
    const y = row * charSize + charSize / 2;
    ctx.fillText(chars[i], x, y);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

interface KanjiParticleRainProps {
  count: number;
  mouse: { x: number; y: number };
}

interface ParticleData {
  speed: number;
  baseOpacity: number;
  flashTimer: number;
}

export function KanjiParticleRain({ count, mouse }: KanjiParticleRainProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  const atlas = useMemo(() => {
    if (typeof document === "undefined") return null;
    return createAtlasTexture();
  }, []);

  const { particleData, opacityArray, flashArray, uvOffsetArray } = useMemo(() => {
    const gridSize = PARTICLE_CONFIG.atlasGridSize;
    const data: ParticleData[] = [];
    const opacities = new Float32Array(count);
    const flashes = new Float32Array(count);
    const uvOffsets = new Float32Array(count * 2);

    for (let i = 0; i < count; i++) {
      const speed = PARTICLE_CONFIG.fallSpeedMin +
        Math.random() * (PARTICLE_CONFIG.fallSpeedMax - PARTICLE_CONFIG.fallSpeedMin);
      const baseOpacity = 0.08 + Math.random() * 0.25;

      data.push({ speed, baseOpacity, flashTimer: 0 });
      opacities[i] = baseOpacity;
      flashes[i] = 0;

      const charIdx = Math.floor(Math.random() * gridSize * gridSize);
      const col = charIdx % gridSize;
      const row = Math.floor(charIdx / gridSize);
      uvOffsets[i * 2] = col / gridSize;
      uvOffsets[i * 2 + 1] = row / gridSize;
    }

    return {
      particleData: data,
      opacityArray: opacities,
      flashArray: flashes,
      uvOffsetArray: uvOffsets,
    };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const halfW = viewport.width / 2;
    const halfH = viewport.height / 2;

    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * viewport.width * 1.2,
        halfH + Math.random() * halfH,
        0
      );
      const s = 0.15 + Math.random() * 0.25;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [count, viewport, dummy]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const halfH = viewport.height / 2;
    const mat = new THREE.Matrix4();
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const scl = new THREE.Vector3();

    const mouseWorld = new THREE.Vector2(
      mouse.x * (viewport.width / 2),
      mouse.y * (viewport.height / 2)
    );

    for (let i = 0; i < count; i++) {
      mesh.getMatrixAt(i, mat);
      mat.decompose(pos, quat, scl);

      pos.y -= particleData[i].speed * delta * 60;

      // Mouse repulsion
      const dx = pos.x - mouseWorld.x;
      const dy = pos.y - mouseWorld.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < PARTICLE_CONFIG.mouseRepelRadius && dist > 0) {
        const force = (1 - dist / PARTICLE_CONFIG.mouseRepelRadius) * PARTICLE_CONFIG.mouseRepelStrength;
        pos.x += (dx / dist) * force;
        pos.y += (dy / dist) * force;
      }

      // Reset when below viewport
      if (pos.y < -halfH - 1) {
        pos.y = halfH + 1;
        pos.x = (Math.random() - 0.5) * viewport.width * 1.2;
      }

      // Random flash
      if (particleData[i].flashTimer > 0) {
        particleData[i].flashTimer -= delta;
        flashArray[i] = 1;
        opacityArray[i] = 0.6;
      } else {
        flashArray[i] = 0;
        opacityArray[i] = particleData[i].baseOpacity;
        if (Math.random() < PARTICLE_CONFIG.flashProbability * delta) {
          particleData[i].flashTimer = 0.15 + Math.random() * 0.2;
        }
      }

      dummy.position.copy(pos);
      dummy.quaternion.copy(quat);
      dummy.scale.copy(scl);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;

    // Update attributes
    const geo = mesh.geometry;
    const opAttr = geo.getAttribute("aOpacity") as THREE.InstancedBufferAttribute;
    const flAttr = geo.getAttribute("aFlash") as THREE.InstancedBufferAttribute;
    if (opAttr) {
      opAttr.array.set(opacityArray);
      opAttr.needsUpdate = true;
    }
    if (flAttr) {
      flAttr.array.set(flashArray);
      flAttr.needsUpdate = true;
    }
  });

  const shaderMaterial = useMemo(() => {
    if (!atlas) return null;
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uAtlas: { value: atlas },
        uGridSize: { value: PARTICLE_CONFIG.atlasGridSize },
        uRedColor: { value: new THREE.Color(COLORS.red) },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [atlas]);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.5, 0.5);

    geo.setAttribute("aOpacity", new THREE.InstancedBufferAttribute(opacityArray, 1));
    geo.setAttribute("aFlash", new THREE.InstancedBufferAttribute(flashArray, 1));
    geo.setAttribute("aUvOffset", new THREE.InstancedBufferAttribute(uvOffsetArray, 2));

    return geo;
  }, [opacityArray, flashArray, uvOffsetArray]);

  if (!shaderMaterial) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, shaderMaterial, count]}
      frustumCulled={false}
    />
  );
}
