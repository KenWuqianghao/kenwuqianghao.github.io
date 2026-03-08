"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

const CONVERGE_MS = 1700;
const HOLD_MS = 750;
const FADE_MS = 500;

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

async function buildTargets(
  screenW: number,
  screenH: number
): Promise<{ positions: Float32Array; count: number }> {
  const CW = 1400,
    CH = 300;
  const cv = document.createElement("canvas");
  cv.width = CW;
  cv.height = CH;
  const ctx = cv.getContext("2d")!;

  const fontVar = getComputedStyle(document.body)
    .getPropertyValue("--font-cormorant")
    .trim();
  const fontFamily = fontVar || "Georgia, serif";

  try {
    await document.fonts.load(`300 200px ${fontFamily}`);
  } catch {
    // proceed with fallback
  }

  ctx.fillStyle = "#171717";
  ctx.font = `300 230px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Ken Wu.", CW / 2, CH / 2);

  const data = ctx.getImageData(0, 0, CW, CH).data;

  // Compute world-space dimensions from camera params (FOV=55, z=6)
  const fovRad = (55 * Math.PI) / 180;
  const visH = 2 * Math.tan(fovRad / 2) * 6;
  const visW = visH * (screenW / screenH);

  const pool: [number, number][] = [];
  for (let y = 0; y < CH; y += 2) {
    for (let x = 0; x < CW; x += 2) {
      if (data[(y * CW + x) * 4 + 3] > 100) {
        pool.push([(x / CW - 0.5) * visW, -(y / CH - 0.5) * visH]);
      }
    }
  }

  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const count = Math.min(pool.length, 4000);
  if (count === 0) return { positions: new Float32Array(0), count: 0 };

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const [px, py] = pool[i];
    positions[i * 3] = px;
    positions[i * 3 + 1] = py;
    positions[i * 3 + 2] = 0;
  }

  return { positions, count };
}

export function ParticleText({ onComplete }: { onComplete: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cbRef = useRef(onComplete);

  useEffect(() => {
    cbRef.current = onComplete;
  }, [onComplete]);

  // Stable callback for the animation loop
  const stableComplete = useCallback(() => cbRef.current(), []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let mounted = true;
    let raf = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let geo: THREE.BufferGeometry | null = null;
    let mat: THREE.PointsMaterial | null = null;

    const W = window.innerWidth;
    const H = window.innerHeight;

    buildTargets(W, H)
      .then(({ positions: targets, count }) => {
        if (!mounted) return;
        if (count === 0) {
          stableComplete();
          return;
        }

        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        wrap.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
        camera.position.z = 6;

        const initial = new Float32Array(count * 3);
        const delays = new Float32Array(count);
        for (let i = 0; i < count; i++) {
          initial[i * 3] = (Math.random() - 0.5) * 22;
          initial[i * 3 + 1] = (Math.random() - 0.5) * 13;
          initial[i * 3 + 2] = (Math.random() - 0.5) * 9;
          delays[i] = Math.random() * 0.32;
        }

        const pos = new Float32Array(count * 3);
        pos.set(initial);

        geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

        mat = new THREE.PointsMaterial({
          size: 2,
          sizeAttenuation: false,
          color: 0x171717,
          transparent: true,
          opacity: 0.88,
        });

        scene.add(new THREE.Points(geo, mat));

        let phase = 0;
        let t0 = performance.now();

        function tick() {
          if (!mounted) return;
          raf = requestAnimationFrame(tick);
          const elapsed = performance.now() - t0;

          if (phase === 0) {
            const progress = elapsed / CONVERGE_MS;
            for (let i = 0; i < count; i++) {
              const d = delays[i];
              const pt = Math.max(0, Math.min((progress - d) / (1 - d), 1));
              const et = easeOutExpo(pt);
              pos[i * 3] =
                initial[i * 3] + (targets[i * 3] - initial[i * 3]) * et;
              pos[i * 3 + 1] =
                initial[i * 3 + 1] +
                (targets[i * 3 + 1] - initial[i * 3 + 1]) * et;
              pos[i * 3 + 2] =
                initial[i * 3 + 2] +
                (targets[i * 3 + 2] - initial[i * 3 + 2]) * et;
            }
            geo!.attributes.position.needsUpdate = true;
            if (progress >= 1) {
              phase = 1;
              t0 = performance.now();
            }
          } else if (phase === 1) {
            if (elapsed >= HOLD_MS) {
              phase = 2;
              t0 = performance.now();
            }
          } else {
            const t = Math.min(elapsed / FADE_MS, 1);
            mat!.opacity = 0.88 * (1 - t);
            if (t >= 1) {
              mounted = false;
              stableComplete();
            }
          }

          renderer!.render(scene, camera);
        }

        tick();
      })
      .catch(() => {
        if (mounted) stableComplete();
      });

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      renderer?.dispose();
      geo?.dispose();
      mat?.dispose();
      if (renderer && wrap.contains(renderer.domElement)) {
        wrap.removeChild(renderer.domElement);
      }
    };
  }, [stableComplete]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9993,
        background: "#fafaf9",
        pointerEvents: "none",
      }}
    />
  );
}
