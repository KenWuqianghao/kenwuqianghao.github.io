"use client";

import { forwardRef, useMemo } from "react";
import { Effect } from "postprocessing";
import { Uniform } from "three";
import { POST_PROCESSING } from "@/lib/shinbo";

const fragmentShader = `
  uniform float uOpacity;
  uniform float uCount;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float scanline = sin(uv.y * uCount * 3.14159) * 0.5 + 0.5;
    scanline = pow(scanline, 0.8);
    float darken = mix(1.0, scanline, uOpacity);
    outputColor = vec4(inputColor.rgb * darken, inputColor.a);
  }
`;

class ScanlineEffectClass extends Effect {
  constructor() {
    super("ScanlineEffect", fragmentShader, {
      uniforms: new Map<string, Uniform<number>>([
        ["uOpacity", new Uniform(POST_PROCESSING.scanlineOpacity)],
        ["uCount", new Uniform(POST_PROCESSING.scanlineCount)],
      ]),
    });
  }
}

export const Scanlines = forwardRef(function Scanlines(_props, ref) {
  const effect = useMemo(() => new ScanlineEffectClass(), []);
  return <primitive ref={ref} object={effect} dispose={null} />;
});
