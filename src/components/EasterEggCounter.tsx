"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react";

const ALL_EGGS = ["konami", "ora", "grace", "item", "nba", "tbc"] as const;
type EggId = (typeof ALL_EGGS)[number];

const STORAGE_KEY = "eggs-found";
const COMPLETE_KEY = "eggs-complete-seen";
const REWARD_EMAIL = "wooqianghao@gmail.com";
const REWARD_SUBJECT = "Hierophant Green";
const mailtoReward = `mailto:${REWARD_EMAIL}?subject=${encodeURIComponent(REWARD_SUBJECT)}`;

const FLASH_CARDS = [
  { bg: "#171717", color: "#fafaf9", text: "全" },
  { bg: "#dc2626", color: "#fafaf9", text: "SECRETS" },
  { bg: "#fafaf9", color: "#171717", text: "DISCOVERED" },
  { bg: "#dc2626", color: "#171717", text: `${ALL_EGGS.length} / ${ALL_EGGS.length}` },
  { bg: "#171717", color: "#dc2626", text: "吴锵皓" },
];
const CARD_MS = 180;
const TOTAL_MS = FLASH_CARDS.length * CARD_MS + 500;

/** JoJo stand color — single hard accent, not a wash */
const STAND_GREEN = "#5eead4";

export function EasterEggCounter() {
  const [found, setFound] = useState<Set<EggId>>(new Set());
  const [pulse, setPulse] = useState(false);
  const [complete, setComplete] = useState(false);
  const [flashing, setFlashing] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const pulseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completeFired = useRef(false);
  const rewardCloseRef = useRef<HTMLButtonElement>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ids = JSON.parse(raw) as EggId[];
        setFound(new Set(ids));
        if (ids.length >= ALL_EGGS.length) setComplete(true);
      }
      if (localStorage.getItem(COMPLETE_KEY)) completeFired.current = true;
    } catch { /* ignore */ }
  }, []);

  const triggerComplete = useCallback(() => {
    if (completeFired.current) return;
    completeFired.current = true;
    try { localStorage.setItem(COMPLETE_KEY, "1"); } catch { /* ignore */ }
    setFlashing(true);
    document.documentElement.style.overflow = "hidden";
    setTimeout(() => {
      document.documentElement.style.overflow = "";
      setFlashing(false);
      setComplete(true);
      setShowRewardModal(true);
    }, TOTAL_MS);
  }, []);

  const discover = useCallback((id: EggId) => {
    if (!ALL_EGGS.includes(id)) return;
    let isNewComplete = false;
    setFound((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set([...prev, id]);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch { /* ignore */ }
      if (next.size === ALL_EGGS.length) isNewComplete = true;
      return next;
    });
    setPulse(true);
    if (pulseTimer.current) clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setPulse(false), 1800);
    if (isNewComplete) triggerComplete();
  }, [triggerComplete]);

  useEffect(() => {
    const onEgg = (e: Event) => {
      const id = (e as CustomEvent<{ id: EggId }>).detail?.id;
      if (id) discover(id);
    };
    const onGrace = () => discover("grace");
    const onItem = () => discover("item");

    window.addEventListener("egg-found", onEgg);
    window.addEventListener("grace-discovered", onGrace);
    window.addEventListener("item-obtained", onItem);

    return () => {
      window.removeEventListener("egg-found", onEgg);
      window.removeEventListener("grace-discovered", onGrace);
      window.removeEventListener("item-obtained", onItem);
      if (pulseTimer.current) clearTimeout(pulseTimer.current);
    };
  }, [discover]);

  const dismissRewardModal = useCallback(() => {
    setShowRewardModal(false);
  }, []);

  const openRewardModal = useCallback(() => {
    if (found.size < ALL_EGGS.length) return;
    setShowRewardModal(true);
  }, [found.size]);

  useEffect(() => {
    if (!showRewardModal) return;
    const t = window.setTimeout(() => rewardCloseRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, [showRewardModal]);

  useEffect(() => {
    if (!showRewardModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissRewardModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showRewardModal, dismissRewardModal]);

  const dotColor = complete ? "#dc2626" : "#d4d4d8";

  return (
    <>
      {/* Reward: SHAFT / Shinbo-style title card — harsh B/W/R, dutch tilt, abrupt cuts */}
      <AnimatePresence>
        {showRewardModal && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-5 sm:p-8 pointer-events-auto"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            {/* Cinematic letterbox — non-interactive */}
            <div
              className="pointer-events-none absolute inset-0 z-[1] flex flex-col justify-between"
              aria-hidden
            >
              <div className="h-[min(2.5vh,14px)] bg-black" />
              <div className="h-[min(2.5vh,14px)] bg-black" />
            </div>

            <motion.button
              type="button"
              aria-label="Close reward message"
              onClick={dismissRewardModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute inset-0 z-0 cursor-default border-0 p-0 bg-black/88"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="eggs-reward-title"
              aria-describedby="eggs-reward-desc"
              initial={{ opacity: 0, x: 28, rotate: -4 }}
              animate={{ opacity: 1, x: 0, rotate: -1.25 }}
              exit={{ opacity: 0, x: 16, rotate: -2 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-[2] w-full max-w-[min(26rem,100%)] overflow-visible border-2 border-white bg-[#070707] text-[#fafaf9] shadow-[6px_6px_0_0_#dc2626]"
            >
              {/* Scanline / gate weave — very low contrast */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.35) 1px, rgba(255,255,255,0.35) 2px)",
                }}
                aria-hidden
              />

              {/* Diagonal strike — recurring Shaft motif */}
              <div
                className="pointer-events-none absolute left-[-20%] top-[18%] h-[3px] w-[140%] origin-center bg-[#dc2626]"
                style={{ transform: "rotate(-8deg)" }}
                aria-hidden
              />

              {/* Oversized kanji — title-card density */}
              <span
                className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-kanji text-[clamp(4.5rem,28vw,7.5rem)] leading-none text-white/[0.04] select-none"
                aria-hidden
              >
                秘
              </span>

              {/* Vertical caption rail */}
              <div
                className="pointer-events-none absolute -right-[2.125rem] top-6 bottom-6 hidden w-8 sm:block"
                aria-hidden
              >
                <p
                  className="font-mono text-[9px] uppercase tracking-[0.42em] text-[#dc2626] h-full"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                >
                  Hierophant · Green
                </p>
              </div>

              <div className="relative px-6 py-8 sm:px-8 sm:py-9 sm:pr-14">
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05, duration: 0.14, ease: "linear" }}
                  className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.28em] text-[#a1a1aa]"
                >
                  <span className="text-[#dc2626]">Act</span>
                  <span className="text-white/90">∞</span>
                  <span>All routes</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white">Cleared</span>
                </motion.div>

                <motion.h2
                  id="eggs-reward-title"
                  initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                  animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                  transition={{ delay: 0.08, duration: 0.22, ease: [0.65, 0, 0.35, 1] }}
                  className="font-mono text-[1.35rem] sm:text-2xl md:text-[1.65rem] font-medium uppercase leading-[1.15] tracking-[0.04em] text-white mb-2"
                >
                  You found
                  <br />
                  <span className="text-[#dc2626]">every</span> secret.
                </motion.h2>

                <motion.p
                  className="mb-6 font-mono text-[10px] uppercase tracking-[0.35em] text-[#525252]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12, duration: 0.12 }}
                  aria-hidden
                >
                  — endpoint — contact —
                </motion.p>

                <motion.p
                  id="eggs-reward-desc"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14, duration: 0.16, ease: "linear" }}
                  className="text-[13px] leading-[1.7] text-[#a3a3a3] mb-7 max-w-prose"
                >
                  If you need something from me, mail{" "}
                  <a
                    href={mailtoReward}
                    className="text-white underline decoration-[#dc2626] decoration-2 underline-offset-[5px] hover:bg-[#dc2626] hover:text-black hover:decoration-transparent transition-colors duration-100"
                  >
                    {REWARD_EMAIL}
                  </a>
                  . Subject line:{" "}
                  <span
                    className="whitespace-nowrap border border-[#dc2626]/80 bg-black px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-[#fafafa]"
                    style={{ boxShadow: `inset 0 -2px 0 0 ${STAND_GREEN}` }}
                  >
                    {REWARD_SUBJECT}
                  </span>{" "}
                  — I&apos;ll know you made it here.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.17, duration: 0.12 }}
                  className="flex flex-col-reverse gap-2.5 sm:flex-row sm:flex-wrap sm:items-stretch"
                >
                  <button
                    ref={rewardCloseRef}
                    type="button"
                    onClick={dismissRewardModal}
                    aria-label="Got it, close"
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center border border-[#404040] bg-transparent px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#d4d4d4] hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:flex-none sm:min-w-[8rem]"
                  >
                    Cut
                  </button>
                  <a
                    href={mailtoReward}
                    className="group inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 border-2 border-white bg-white px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-black hover:bg-[#dc2626] hover:text-white hover:border-[#dc2626] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:flex-none"
                  >
                    <EnvelopeSimple size={18} weight="bold" className="shrink-0" />
                    Open mail
                    <ArrowUpRight
                      size={15}
                      weight="bold"
                      className="shrink-0 opacity-80 transition-transform duration-100 group-hover:translate-x-px group-hover:-translate-y-px"
                    />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion flash sequence */}
      {flashing && (
        <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
          {FLASH_CARDS.map((card, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center font-kanji"
              style={{
                backgroundColor: card.bg,
                color: card.color,
                fontSize: "clamp(3rem, 15vw, 10rem)",
                letterSpacing: "0.05em",
                opacity: 0,
                animation: `entrance-flash ${CARD_MS}ms steps(1) ${i * CARD_MS}ms forwards`,
              }}
            >
              {card.text}
            </div>
          ))}
          <div
            className="absolute inset-0"
            style={{
              background: "#fafaf9",
              opacity: 0,
              animation: `entrance-fade-out 500ms ease-out ${FLASH_CARDS.length * CARD_MS}ms forwards`,
            }}
          />
        </div>
      )}

      {/* Counter HUD — when complete, click to open the reward message */}
      {complete ? (
        <button
          type="button"
          className="fixed bottom-4 right-4 z-[9990] select-none flex flex-col items-end gap-[3px] pointer-events-auto cursor-pointer text-left border-0 bg-transparent p-0 rounded-sm ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/60 hover:opacity-100 transition-opacity duration-300"
          style={{
            opacity: pulse || complete ? 0.85 : 0.35,
            transition: "opacity 0.6s ease",
          }}
          onClick={openRewardModal}
          aria-label="Open reward message — you found all secrets"
        >
          <span
            className="font-mono uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.3em", color: complete ? "#dc2626" : "#a1a1aa" }}
          >
            complete
          </span>
          <div className="flex gap-1.5">
            {ALL_EGGS.map((id) => (
              <span
                key={id}
                style={{
                  display: "block",
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: found.has(id) ? dotColor : "transparent",
                  border: `1px solid ${found.has(id) ? dotColor + "88" : "rgba(212,212,216,0.45)"}`,
                  transition: "background 0.4s ease, border-color 0.4s ease",
                }}
              />
            ))}
          </div>
          <span
            className="font-mono tabular-nums"
            style={{ fontSize: "10px", color: complete ? "#dc2626" : "#a1a1aa" }}
          >
            {found.size} / {ALL_EGGS.length}
          </span>
        </button>
      ) : (
        <div
          className="fixed bottom-4 right-4 z-[9990] pointer-events-none select-none flex flex-col items-end gap-[3px]"
          style={{
            opacity: pulse || complete ? 0.85 : 0.35,
            transition: "opacity 0.6s ease",
          }}
          aria-hidden="true"
        >
          <span
            className="font-mono uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.3em", color: complete ? "#dc2626" : "#a1a1aa" }}
          >
            secrets
          </span>
          <div className="flex gap-1.5">
            {ALL_EGGS.map((id) => (
              <span
                key={id}
                style={{
                  display: "block",
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: found.has(id) ? dotColor : "transparent",
                  border: `1px solid ${found.has(id) ? dotColor + "88" : "rgba(212,212,216,0.45)"}`,
                  transition: "background 0.4s ease, border-color 0.4s ease",
                }}
              />
            ))}
          </div>
          <span
            className="font-mono tabular-nums"
            style={{ fontSize: "10px", color: complete ? "#dc2626" : "#a1a1aa" }}
          >
            {found.size} / {ALL_EGGS.length}
          </span>
        </div>
      )}
    </>
  );
}
