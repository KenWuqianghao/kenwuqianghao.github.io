"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useMemo, useEffect } from "react";
import { skills } from "@/lib/data";

const CAT = [
  {
    key: "Languages",
    label: "Languages",
    center: [-3.5, 0, 0.5] as [number, number, number],
    color: "#dc2626",
  },
  {
    key: "Technologies & Cloud",
    label: "Tech & Cloud",
    center: [3.5, 0, 0.5] as [number, number, number],
    color: "#71717a",
  },
  {
    key: "Libraries & Frameworks",
    label: "Libraries",
    center: [0, 0, -3.5] as [number, number, number],
    color: "#a1a1aa",
  },
] as const;

type NodeData = {
  skill: string;
  pos: [number, number, number];
  center: [number, number, number];
  color: string;
};

function buildNodes(): NodeData[] {
  const out: NodeData[] = [];
  for (const { key, center, color } of CAT) {
    const items = (skills as Record<string, string[]>)[key] ?? [];
    items.forEach((skill, i) => {
      const a = (i / items.length) * Math.PI * 2 + Math.PI / 5;
      const r = 1.3 + (i % 3) * 0.22;
      const h = ((i % 5) - 2) * 0.28;
      out.push({
        skill,
        color,
        center,
        pos: [
          center[0] + r * Math.cos(a),
          center[1] + h,
          center[2] + r * Math.sin(a),
        ],
      });
    });
  }
  return out;
}

function Edges({ nodes }: { nodes: NodeData[] }) {
  const verts = useMemo(() => {
    const arr: number[] = [];
    for (const n of nodes) {
      arr.push(...n.pos, ...n.center);
    }
    return new Float32Array(arr);
  }, [nodes]);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[verts, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#71717a" transparent opacity={0.13} />
    </lineSegments>
  );
}

function CatHub({ cat }: { cat: (typeof CAT)[number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.scale.setScalar(
      1 + 0.06 * Math.sin(clock.elapsedTime + cat.center[0])
    );
  });

  return (
    <group position={cat.center}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.24, 14, 14]} />
        <meshStandardMaterial
          color={cat.color}
          emissive={cat.color}
          emissiveIntensity={0.65}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      <Html center distanceFactor={12}>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: cat.color,
            whiteSpace: "nowrap",
            display: "block",
            transform: "translateY(28px)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {cat.label}
        </span>
      </Html>
    </group>
  );
}

function SkillNode({ node }: { node: NodeData }) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hov, setHov] = useState(false);

  // Reset cursor if component unmounts while hovered
  useEffect(() => () => { document.body.style.cursor = ""; }, []);

  useFrame(({ clock }) => {
    ref.current.scale.setScalar(
      hov ? 1.9 : 1 + 0.07 * Math.sin(clock.elapsedTime * 1.8 + node.pos[0])
    );
  });

  return (
    <group position={node.pos}>
      <mesh
        ref={ref}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHov(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHov(false);
          document.body.style.cursor = "";
        }}
      >
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial
          color={hov ? "#ffffff" : node.color}
          emissive={node.color}
          emissiveIntensity={hov ? 1.4 : 0.45}
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
      {hov && (
        <Html center distanceFactor={10}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              background: "rgba(23,23,23,0.92)",
              color: "#fafaf9",
              padding: "3px 8px",
              borderRadius: "2px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {node.skill}
          </div>
        </Html>
      )}
    </group>
  );
}

function Scene() {
  const nodes = useMemo(() => buildNodes(), []);

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[6, 5, 6]} intensity={0.8} />
      <pointLight position={[-5, -3, -4]} intensity={0.3} color="#c8a96e" />
      <Edges nodes={nodes} />
      {CAT.map((c) => (
        <CatHub key={c.key} cat={c} />
      ))}
      {nodes.map((n, i) => (
        <SkillNode key={i} node={n} />
      ))}
    </>
  );
}

export function SkillConstellation() {
  return (
    <Canvas
      style={{ height: 520 }}
      camera={{ position: [0, 3.5, 9], fov: 52 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={(Math.PI * 5) / 8}
      />
    </Canvas>
  );
}
