import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Ken Wu — Software Engineer & ML Researcher";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#fafaf9",
          padding: "80px 100px",
          position: "relative",
        }}
      >
        {/* Red diagonal slash */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 160,
            width: 3,
            height: 550,
            backgroundColor: "#dc2626",
            transform: "rotate(15deg)",
          }}
        />

        {/* Small red tick */}
        <div
          style={{
            width: 3,
            height: 40,
            backgroundColor: "#dc2626",
            marginBottom: 40,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 300,
            color: "#171717",
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Ken</span>
          <span>
            Wu<span style={{ color: "#dc2626" }}>.</span>
          </span>
        </div>

        {/* Chinese name */}
        <div
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            letterSpacing: "0.3em",
            marginTop: 16,
          }}
        >
          吴锵皓
        </div>

        {/* Bottom info */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 100,
            display: "flex",
            gap: 40,
            fontSize: 14,
            color: "#a1a1aa",
            textTransform: "uppercase" as const,
            letterSpacing: "0.15em",
          }}
        >
          <span>Software Engineer</span>
          <span style={{ color: "#dc2626" }}>·</span>
          <span>ML Researcher</span>
          <span style={{ color: "#dc2626" }}>·</span>
          <span>Waterloo CS 26</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
