"use client";

import { motion } from "framer-motion";
import { personalInfo, experienceTimeline, projects, skills } from "@/lib/data";

// ─── palette ──────────────────────────────────────────────────────────────────
const R  = "#dc2626";
const G  = "#c8900a";
const GB = "#f5c842";
const W  = "#fafaf9";
const BG = "#090909";
const PA = "#111111";

// ─── stand card data ──────────────────────────────────────────────────────────
const STAND_STATS: { label: string; rating: string; fill: number }[] = [
  { label: "DESTRUCTIVE POWER", rating: "B", fill: 3 },
  { label: "SPEED",             rating: "A", fill: 4 },
  { label: "RANGE",             rating: "A", fill: 4 },
  { label: "DURABILITY",        rating: "B", fill: 3 },
  { label: "PRECISION",         rating: "A", fill: 4 },
  { label: "DEV POTENTIAL",     rating: "∞", fill: 5 },
];

// ─── tiny primitives ──────────────────────────────────────────────────────────
function Slash() {
  return (
    <div style={{ height: 2, background: `linear-gradient(90deg,${R},transparent)`, transform: "skewX(-18deg)", marginBottom: "1.75rem" }} />
  );
}

function Tag({ children, color = G, bg = `rgba(200,144,10,0.05)` }: { children: React.ReactNode; color?: string; bg?: string }) {
  return (
    <span
      className="font-mono"
      style={{
        fontSize: "8px",
        letterSpacing: "0.18em",
        color,
        padding: "2px 7px",
        border: `1px solid ${color}44`,
        background: bg,
        display: "inline-block",
        transform: "skewX(-5deg)",
      }}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div style={{ width: 3, height: 14, background: R, transform: "skewX(-10deg)", flexShrink: 0 }} />
      <span className="font-mono uppercase" style={{ fontSize: "8px", letterSpacing: "0.5em", color: R }}>
        {children}
      </span>
    </div>
  );
}

function CornerBrackets({ color = R }: { color?: string }) {
  const s: React.CSSProperties = { position: "absolute", width: 16, height: 16 };
  const t = `2px solid ${color}`;
  return (
    <>
      <div style={{ ...s, top: -1, left: -1,    borderTop: t, borderLeft: t  }} />
      <div style={{ ...s, top: -1, right: -1,   borderTop: t, borderRight: t }} />
      <div style={{ ...s, bottom: -1, left: -1,  borderBottom: t, borderLeft: t  }} />
      <div style={{ ...s, bottom: -1, right: -1, borderBottom: t, borderRight: t }} />
    </>
  );
}

function StatBar({ label, rating, fill }: { label: string; rating: string; fill: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="font-mono uppercase shrink-0" style={{ fontSize: "7px", letterSpacing: "0.08em", color: `${G}88`, width: 130 }}>
        {label}
      </span>
      <div className="flex gap-[3px]">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} style={{ display: "block", width: 8, height: 8, background: i < fill ? G : `${G}18`, transform: "skewX(-8deg)" }} />
        ))}
      </div>
      <span className="font-mono font-bold" style={{ fontSize: "12px", color: rating === "∞" ? R : GB, minWidth: 14 }}>
        {rating}
      </span>
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────
export function ShrineClient() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: W, overflowX: "hidden", position: "relative" }}>

      {/* Global style overrides for dark page */}
      <style>{`
        body { background: ${BG} !important; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: ${R}; }
        ::selection { background: ${R}; color: ${W}; }
      `}</style>

      {/* Halftone dot texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(220,38,38,0.032) 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Speed-line hatching — very subtle */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(-50deg, transparent, transparent 6px, rgba(220,38,38,0.012) 6px, rgba(220,38,38,0.012) 7px)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Side ゴゴゴゴ */}
      {["left-2 top-1/3", "right-2 top-1/4"].map((pos, i) => (
        <div
          key={i}
          className={`fixed ${pos} font-kanji pointer-events-none select-none hidden md:block`}
          style={{ writingMode: "vertical-rl", fontSize: "0.65rem", letterSpacing: "0.6em", color: "rgba(220,38,38,0.055)", userSelect: "none", zIndex: 1 }}
          aria-hidden="true"
        >
          ゴゴゴゴゴゴゴゴゴゴゴゴゴゴ
        </div>
      ))}

      {/* ── Header bar ── */}
      <div
        className="relative z-10 flex items-center justify-between px-6 md:px-14 py-3"
        style={{ borderBottom: "1px solid rgba(220,38,38,0.14)", background: "rgba(220,38,38,0.05)" }}
      >
        <div className="flex items-center gap-3">
          <div style={{ width: 3, height: 10, background: R, transform: "skewX(-10deg)" }} />
          <span className="font-mono uppercase" style={{ fontSize: "7px", letterSpacing: "0.5em", color: R }}>
            Secret Route
          </span>
          <span className="font-kanji hidden sm:inline" style={{ fontSize: "8px", color: "rgba(220,38,38,0.35)", letterSpacing: "0.2em" }}>
            秘密のルート
          </span>
        </div>
        <a
          href="/"
          className="font-mono uppercase"
          style={{ fontSize: "7px", letterSpacing: "0.4em", color: "rgba(220,38,38,0.35)", textDecoration: "none" }}
        >
          ← Return
        </a>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-14 py-20 md:py-28">

        {/* ── STAND USER CARD ── */}
        <motion.div
          className="mb-28 md:mb-40"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>STAND USER · スタンド使い</SectionLabel>
          <Slash />

          <div
            className="relative"
            style={{
              border: `2px solid ${G}`,
              boxShadow: `inset 0 0 0 1px rgba(200,144,10,0.16), 0 0 80px rgba(220,38,38,0.07)`,
              background: PA,
            }}
          >
            <CornerBrackets color={R} />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 p-8 md:p-12">

              {/* Left: identity */}
              <div>
                {/* Arcana */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Tag color={R} bg="rgba(220,38,38,0.07)">ARCANA: THE MAGICIAN</Tag>
                  <Tag>Stand User</Tag>
                </div>

                {/* Name */}
                <h1
                  className="font-display font-light leading-none tracking-tight mb-2"
                  style={{ fontSize: "clamp(3.5rem, 12vw, 7rem)", color: W, letterSpacing: "-0.03em" }}
                >
                  KEN WU
                </h1>
                <div className="font-kanji mb-6" style={{ fontSize: "1.3rem", letterSpacing: "0.35em", color: `${G}88` }}>
                  吴锵皓
                </div>

                {/* Role tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Software Engineer", "ML Researcher", "CS '26"].map((t) => (
                    <Tag key={t} color={`${W}66`} bg="transparent">
                      {t.toUpperCase()}
                    </Tag>
                  ))}
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {[
                    { label: "LOCATION",  val: personalInfo.location },
                    { label: "BASE",      val: "University of Waterloo" },
                    { label: "SEEKING",   val: "Fall 2026 / New Grad" },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <div className="font-mono uppercase mb-1" style={{ fontSize: "7px", letterSpacing: "0.4em", color: `${R}88` }}>{label}</div>
                      <div className="font-mono" style={{ fontSize: "11px", color: `${W}66` }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: stand stats */}
              <div
                className="shrink-0 lg:border-l lg:border-l-[rgba(200,144,10,0.18)] lg:pl-10"
                style={{ minWidth: 280 }}
              >
                <div className="font-mono uppercase mb-1.5" style={{ fontSize: "7px", letterSpacing: "0.5em", color: `${G}66` }}>
                  Stand Name
                </div>
                <div className="font-display font-light mb-7" style={{ fontSize: "1.7rem", color: GB, letterSpacing: "0.04em" }}>
                  DEEP PURPLE
                </div>

                <div className="font-mono uppercase mb-3" style={{ fontSize: "7px", letterSpacing: "0.5em", color: `${G}66` }}>
                  Stand Stats
                </div>
                <div className="flex flex-col gap-2.5">
                  {STAND_STATS.map((s) => <StatBar key={s.label} {...s} />)}
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* ── BATTLE HISTORY ── */}
        <motion.div
          className="mb-28 md:mb-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <SectionLabel>Battle History · 戦歴</SectionLabel>
          <Slash />

          <div className="flex flex-col gap-3">
            {experienceTimeline.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: PA, border: "1px solid rgba(220,38,38,0.12)", position: "relative", overflow: "hidden" }}
              >
                {/* Red left tab */}
                <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: R }} />

                <div className="p-5 md:p-7 pl-7 md:pl-9">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="font-mono uppercase mb-1.5" style={{ fontSize: "7px", letterSpacing: "0.45em", color: `${R}77` }}>
                        Chapter {String(i + 1).padStart(2, "0")} · {exp.type.toUpperCase()}
                      </div>
                      <h3
                        className="font-display font-light tracking-tight leading-none"
                        style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)", color: W }}
                      >
                        {exp.company}
                      </h3>
                      {exp.meta && (
                        <Tag color={G} bg="rgba(200,144,10,0.07)" >{exp.meta}</Tag>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-mono" style={{ fontSize: "10px", color: `${W}33`, letterSpacing: "0.04em" }}>{exp.dates}</div>
                      <div className="font-mono" style={{ fontSize: "10px", color: `${W}22` }}>{exp.location}</div>
                      <div className="font-mono" style={{ fontSize: "10px", color: `${W}44` }}>{exp.role}</div>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-col gap-1.5">
                    {exp.bullets.map((b, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span style={{ color: R, fontSize: "9px", marginTop: 3, flexShrink: 0 }}>▶</span>
                        <span className="font-mono" style={{ fontSize: "11px", color: `${W}55`, lineHeight: 1.55 }}>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((t) => <Tag key={t}>{t}</Tag>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── OPERATIONS / PROJECTS ── */}
        <motion.div
          className="mb-28 md:mb-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <SectionLabel>Operations · 作戦</SectionLabel>
          <Slash />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.map((proj, i) => (
              <motion.div
                key={proj.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: PA, border: "1px solid rgba(220,38,38,0.12)", display: "flex", flexDirection: "column", position: "relative" }}
              >
                <div style={{ height: 2, background: `linear-gradient(90deg,${R},transparent)` }} />

                <div className="p-5 flex flex-col flex-1">
                  <div className="font-mono uppercase mb-2" style={{ fontSize: "7px", letterSpacing: "0.45em", color: `${R}66` }}>
                    Op · {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className="font-display font-light leading-tight mb-3"
                    style={{ fontSize: "1.35rem", color: W, letterSpacing: "0.02em" }}
                  >
                    {proj.name}
                  </h3>
                  <p className="font-mono mb-4 flex-1" style={{ fontSize: "10px", color: `${W}44`, lineHeight: 1.6 }}>
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.stack.map((t) => <Tag key={t}>{t}</Tag>)}
                  </div>
                  <div className="flex gap-5">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer"
                        className="font-mono uppercase" style={{ fontSize: "8px", letterSpacing: "0.3em", color: `${R}cc`, textDecoration: "none" }}>
                        ↗ REPO
                      </a>
                    )}
                    {proj.demo && (
                      <a href={proj.demo} target="_blank" rel="noopener noreferrer"
                        className="font-mono uppercase" style={{ fontSize: "8px", letterSpacing: "0.3em", color: `${W}33`, textDecoration: "none" }}>
                        ↗ DEMO
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── STAND ABILITIES / SKILLS ── */}
        <motion.div
          className="mb-28 md:mb-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <SectionLabel>Stand Abilities · 能力</SectionLabel>
          <Slash />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat}>
                <div
                  className="font-mono uppercase mb-4"
                  style={{ fontSize: "8px", letterSpacing: "0.38em", color: G, paddingBottom: 8, borderBottom: `1px solid rgba(200,144,10,0.18)` }}
                >
                  {cat}
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="font-mono"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.04em",
                        color: `${W}55`,
                        padding: "3px 8px",
                        border: `1px solid rgba(250,250,249,0.09)`,
                        background: `rgba(250,250,249,0.025)`,
                        display: "inline-block",
                        transform: "skewX(-4deg)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CONTACT ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <SectionLabel>Contact · 接触</SectionLabel>
          <Slash />

          <div
            style={{ border: `1px solid rgba(220,38,38,0.18)`, background: PA, padding: "2.5rem 2.5rem 3rem", position: "relative" }}
          >
            <CornerBrackets color={R} />

            <h2
              className="font-display font-light mb-4"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", color: W, letterSpacing: "-0.02em" }}
            >
              Your story has not ended.
            </h2>
            <p className="font-mono mb-8" style={{ fontSize: "11px", color: `${W}33`, letterSpacing: "0.1em" }}>
              — Connect with the Stand User
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                { label: "GitHub",    href: `https://github.com/${personalInfo.github}` },
                { label: "LinkedIn",  href: `https://linkedin.com/in/${personalInfo.linkedin}` },
                { label: "Email",     href: `mailto:${personalInfo.email}` },
                { label: "Resume",    href: personalInfo.resume },
                { label: "X",         href: `https://x.com/${personalInfo.twitter}` },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="font-mono uppercase"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.35em",
                    color: `${R}cc`,
                    textDecoration: "none",
                    padding: "7px 16px",
                    border: `1px solid rgba(220,38,38,0.22)`,
                    background: "rgba(220,38,38,0.05)",
                    display: "inline-block",
                    transform: "skewX(-6deg)",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="absolute bottom-4 right-6 font-mono uppercase" style={{ fontSize: "7px", letterSpacing: "0.5em", color: "rgba(220,38,38,0.12)" }}>
              CONFIDENTIAL · 極秘
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <div className="font-mono uppercase" style={{ fontSize: "7px", letterSpacing: "0.55em", color: "rgba(220,38,38,0.18)" }}>
            〜 END OF RECORD · 記録終了 〜
          </div>
          <div className="font-kanji mt-2" style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "rgba(220,38,38,0.1)" }}>
            秘
          </div>
        </div>

      </div>
    </div>
  );
}
