"use client";

export function FilmGrain() {
  return (
    <div
      className="fixed inset-0 z-[45] pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.035, mixBlendMode: "multiply" }}
    >
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
