"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { useRef, useState, useMemo, useEffect } from "react";
import { skills } from "@/lib/data";

// Clusters spread wide so all three appear at roughly equal screen weight
const CAT = [
  {
    key: "Languages",
    label: "Languages",
    center: [-3.2, 0.9, 0.5] as [number, number, number],
    color: "#dc2626",
  },
  {
    key: "Technologies & Cloud",
    label: "Tech & Cloud",
    center: [3.2, 0.9, 0.5] as [number, number, number],
    color: "#3f3f46",
  },
  {
    key: "Libraries & Frameworks",
    label: "Libraries",
    center: [0, -2.2, 0] as [number, number, number],
    color: "#71717a",
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
      const r = 1.15 + (i % 3) * 0.24;
      const h = ((i % 5) - 2) * 0.3;
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
        <lineBasicMaterial color="#a1a1aa" transparent opacity={0.13} />
      </lineSegments>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[hubVerts, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#71717a" transparent opacity={0.38} />
      </lineSegments>
    </>
  );
}

function CatHub({ cat }: { cat: (typeof CAT)[number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    meshRef.current.scale.setScalar(
      1 + 0.07 * Math.sin(clock.elapsedTime + cat.center[0])
    );
    const mat = ringRef.current.material as THREE.MeshStandardMaterial;
    mat.opacity = 0.22 + 0.18 * Math.sin(clock.elapsedTime * 1.3 + cat.center[0]);
  });

  return (
    <group position={cat.center}>
      {/* Pulsing orbit ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.52, 0.018, 8, 64]} />
        <meshStandardMaterial
          color={cat.color}
          emissive={cat.color}
          emissiveIntensity={1.2}
          transparent
          opacity={0.28}
        />
      </mesh>

      {/* Hub sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.28, 18, 18]} />
        <meshStandardMaterial
          color={cat.color}
          emissive={cat.color}
          emissiveIntensity={0.85}
          roughness={0.22}
          metalness={0.35}
        />
      </mesh>

      {/* Colored local point light */}
      <pointLight color={cat.color} intensity={0.55} distance={4} decay={2} />

      <Html center distanceFactor={10}>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "11px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: cat.color,
            whiteSpace: "nowrap",
            display: "block",
            transform: "translateY(30px)",
            pointerEvents: "none",
            userSelect: "none",
            fontWeight: 600,
            textShadow:
              "0 1px 4px rgba(250,250,249,0.95), 0 0 10px rgba(250,250,249,0.7)",
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
      active ? 2.4 : 1 + 0.07 * Math.sin(clock.elapsedTime * 1.8 + node.pos[0])
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
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial
          color={active ? "#ffffff" : node.color}
          emissive={node.color}
          emissiveIntensity={active ? 2.2 : 0.65}
          roughness={0.2}
          metalness={0.35}
        />
      </mesh>

      <Html center distanceFactor={6} position={[0, 0.21, 0]}>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "10px",
            letterSpacing: "0.05em",
            color: active ? "#111111" : node.color,
            opacity: active ? 1 : 0.78,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            fontWeight: active ? 600 : 400,
            textShadow: active
              ? "none"
              : "0 1px 3px rgba(250,250,249,0.9)",
            transition: "opacity 0.15s, color 0.15s",
          }}
        >
          {node.skill}
        </span>
      </Html>
    </group>
  );
}

// Smoothly pans the OrbitControls target toward the selected node.
// Does NOT touch camera.position — OrbitControls owns that.
function CameraFocuser({
  nodeId,
  nodes,
  orbitRef,
}: {
  nodeId: string | null;
  nodes: NodeData[];
  orbitRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const defaultTarget = useMemo(() => new THREE.Vector3(0, -0.2, 0), []);

  const focusNode = useMemo(
    () => (nodeId ? nodes.find((n) => `${n.catKey}:${n.skill}` === nodeId) : null),
    [nodeId, nodes]
  );

  const goalTarget = useMemo(
    () => (focusNode ? new THREE.Vector3(...focusNode.pos) : defaultTarget),
    [focusNode, defaultTarget]
  );

  // Toggle autoRotate when selection changes
  useEffect(() => {
    if (!orbitRef.current) return;
    orbitRef.current.autoRotate = !focusNode;
  }, [focusNode, orbitRef]);

  // Lerp only the target — let drei's OrbitControls own camera.position
  useFrame(() => {
    if (!orbitRef.current) return;
    orbitRef.current.target.lerp(goalTarget, 0.055);
  });

  return null;
}

function Scene({
  nodes,
  highlighted,
  orbitRef,
}: {
  nodes: NodeData[];
  highlighted: string | null;
  orbitRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[0, 8, 8]} intensity={0.7} />
      <pointLight position={[-5, -4, -4]} intensity={0.22} color="#c8a96e" />
      <Edges nodes={nodes} />
      {CAT.map((c) => (
        <CatHub key={c.key} cat={c} />
      ))}
      {nodes.map((n) => (
        <SkillNode
          key={`${n.catKey}:${n.skill}`}
          node={n}
          highlighted={highlighted === `${n.catKey}:${n.skill}`}
        />
      ))}
      <CameraFocuser nodeId={highlighted} nodes={nodes} orbitRef={orbitRef} />
    </>
  );
}

export function SkillConstellation() {
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const nodes = useMemo(() => buildNodes(), []);
  const orbitRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
      {/* 3D canvas */}
      <div style={{ flex: 1, position: "relative" }}>
        <Canvas
          style={{ height: 700 }}
          camera={{ position: [0, 2.0, 10.5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene nodes={nodes} highlighted={highlighted} orbitRef={orbitRef} />
          <OrbitControls
            ref={orbitRef}
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={(Math.PI * 5.5) / 8}
            target={[0, -0.2, 0]}
          />
        </Canvas>

        {/* Subtle vignette to blend edges into page */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 88% 82% at 50% 50%, transparent 55%, rgba(250,250,249,0.45) 100%)",
          }}
        />
      </div>

      {/* Skill index sidebar */}
      <div
        className="hidden md:block shrink-0"
        style={{
          width: "172px",
          maxHeight: "700px",
          overflowY: "auto",
          paddingTop: "0.75rem",
          borderLeft: "1px solid rgba(228,228,231,0.7)",
          paddingLeft: "1.1rem",
        }}
      >
        {CAT.map((cat) => {
          const catNodes = nodes.filter((n) => n.catKey === cat.key);
          return (
            <div key={cat.key} style={{ marginBottom: "1.5rem" }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontSize: "8px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: cat.color,
                  marginBottom: "0.5rem",
                }}
              >
                {cat.label}
              </span>
              {catNodes.map((n) => {
                const id = `${n.catKey}:${n.skill}`;
                const isActive = highlighted === id;
                return (
                  <button
                    key={n.skill}
                    onClick={() =>
                      setHighlighted((h) => (h === id ? null : id))
                    }
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      padding: "0.22rem 0.45rem",
                      borderRadius: "2px",
                      border: "none",
                      background: isActive ? `${cat.color}18` : "transparent",
                      borderLeft: isActive
                        ? `2px solid ${cat.color}`
                        : "2px solid transparent",
                      color: isActive ? "#171717" : "#71717a",
                      cursor: "pointer",
                      transition: "color 0.12s, background 0.12s, border-color 0.12s",
                    }}
                  >
                    {n.skill}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
