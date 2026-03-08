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
    center: [-2.4, 0.4, 0.3] as [number, number, number],
    color: "#dc2626",
  },
  {
    key: "Technologies & Cloud",
    label: "Tech & Cloud",
    center: [2.4, 0.4, 0.3] as [number, number, number],
    color: "#71717a",
  },
  {
    key: "Libraries & Frameworks",
    label: "Libraries",
    center: [0, -0.6, -2.4] as [number, number, number],
    color: "#a1a1aa",
  },
] as const;

type NodeData = {
  skill: string;
  catKey: string;
  pos: [number, number, number];
  center: [number, number, number];
  color: string;
};

function buildNodes(): NodeData[] {
  const out: NodeData[] = [];
  for (const { key, center, color } of CAT) {
    const items = (skills as Record<string, string[]>)[key] ?? [];
    items.forEach((skill, i) => {
      const a = (i / items.length) * Math.PI * 2 + Math.PI / 6;
      const r = 1.0 + (i % 3) * 0.18;
      const h = ((i % 5) - 2) * 0.22;
      out.push({
        skill,
        catKey: key,
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
  const skillVerts = useMemo(() => {
    const arr: number[] = [];
    for (const n of nodes) arr.push(...n.pos, ...n.center);
    return new Float32Array(arr);
  }, [nodes]);

  const hubVerts = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < CAT.length; i++) {
      for (let j = i + 1; j < CAT.length; j++) {
        arr.push(...CAT[i].center, ...CAT[j].center);
      }
    }
    return new Float32Array(arr);
  }, []);

  return (
    <>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[skillVerts, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#71717a" transparent opacity={0.12} />
      </lineSegments>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[hubVerts, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#a1a1aa" transparent opacity={0.35} />
      </lineSegments>
    </>
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
        <sphereGeometry args={[0.22, 14, 14]} />
        <meshStandardMaterial
          color={cat.color}
          emissive={cat.color}
          emissiveIntensity={0.7}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      <Html center distanceFactor={10}>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: cat.color,
            whiteSpace: "nowrap",
            display: "block",
            transform: "translateY(26px)",
            pointerEvents: "none",
            userSelect: "none",
            fontWeight: 500,
          }}
        >
          {cat.label}
        </span>
      </Html>
    </group>
  );
}

function SkillNode({
  node,
  highlighted,
}: {
  node: NodeData;
  highlighted: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hov, setHov] = useState(false);
  const active = hov || highlighted;

  useEffect(() => () => { document.body.style.cursor = ""; }, []);

  useFrame(({ clock }) => {
    ref.current.scale.setScalar(
      active ? 2.2 : 1 + 0.06 * Math.sin(clock.elapsedTime * 1.8 + node.pos[0])
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
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial
          color={active ? "#ffffff" : node.color}
          emissive={node.color}
          emissiveIntensity={active ? 2.0 : 0.5}
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>

      <Html center distanceFactor={6} position={[0, 0.18, 0]}>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "9px",
            letterSpacing: "0.04em",
            color: active ? "#171717" : node.color,
            opacity: active ? 1 : 0.72,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            fontWeight: active ? 600 : 400,
            transition: "opacity 0.15s, color 0.15s, font-weight 0.15s",
          }}
        >
          {node.skill}
        </span>
      </Html>
    </group>
  );
}

function Scene({
  nodes,
  highlighted,
}: {
  nodes: NodeData[];
  highlighted: string | null;
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-4, -3, -3]} intensity={0.3} color="#c8a96e" />
      <Edges nodes={nodes} />
      {CAT.map((c) => (
        <CatHub key={c.key} cat={c} />
      ))}
      {nodes.map((n) => (
        <SkillNode key={`${n.catKey}:${n.skill}`} node={n} highlighted={highlighted === `${n.catKey}:${n.skill}`} />
      ))}
    </>
  );
}

export function SkillConstellation() {
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const nodes = useMemo(() => buildNodes(), []);

  return (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
      {/* 3D canvas */}
      <div style={{ flex: 1 }}>
        <Canvas
          style={{ height: 560 }}
          camera={{ position: [0, 2.2, 7.5], fov: 56 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene nodes={nodes} highlighted={highlighted} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 7}
            maxPolarAngle={(Math.PI * 5) / 8}
            target={[0, 0, -0.5]}
          />
        </Canvas>
      </div>

      {/* Skill index sidebar */}
      <div
        className="hidden md:block shrink-0"
        style={{
          width: "176px",
          maxHeight: "560px",
          overflowY: "auto",
          paddingTop: "1rem",
        }}
      >
        {CAT.map((cat) => {
          const catNodes = nodes.filter((n) => n.catKey === cat.key);
          return (
            <div key={cat.key} style={{ marginBottom: "1.25rem" }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontSize: "8px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: cat.color,
                  marginBottom: "0.4rem",
                  paddingLeft: "0.5rem",
                }}
              >
                {cat.label}
              </span>
              {catNodes.map((n) => (
                <button
                  key={n.skill}
                  onClick={() => {
                    const id = `${n.catKey}:${n.skill}`;
                    setHighlighted((h) => (h === id ? null : id));
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    fontFamily: "monospace",
                    fontSize: "10px",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "2px",
                    border: "none",
                    background:
                      highlighted === `${n.catKey}:${n.skill}`
                        ? `${cat.color}1a`
                        : "transparent",
                    borderLeft:
                      highlighted === `${n.catKey}:${n.skill}`
                        ? `2px solid ${cat.color}`
                        : "2px solid transparent",
                    color: highlighted === `${n.catKey}:${n.skill}` ? "#171717" : "#a1a1aa",
                    cursor: "pointer",
                    transition: "all 0.12s",
                  }}
                >
                  {n.skill}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
