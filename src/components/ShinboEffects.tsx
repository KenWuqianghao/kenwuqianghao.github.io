"use client";

import dynamic from "next/dynamic";
import { AmbientKanji } from "./FlashFrames";

const ShinboCanvas = dynamic(
  () => import("./three/ShinboCanvas").then((mod) => mod.ShinboCanvas),
  { ssr: false }
);

export function ShinboEffects() {
  return (
    <>
      <ShinboCanvas glitchActive={false} />
      <AmbientKanji />
    </>
  );
}
