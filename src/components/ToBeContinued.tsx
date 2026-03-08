"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ToBeContinued() {
  const [visible, setVisible] = useState(false);
  const dispatched = useRef(false);

  useEffect(() => {
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;
    let atBottom = false;

    const onScroll = () => {
      const near =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 80;

      if (near && !atBottom) {
        atBottom = true;
        showTimer = setTimeout(() => {
          document.documentElement.style.overflow = "hidden";
          setVisible(true);
          if (!dispatched.current) {
            dispatched.current = true;
            window.dispatchEvent(new CustomEvent("egg-found", { detail: { id: "tbc" } }));
          }
          hideTimer = setTimeout(() => {
            document.documentElement.style.overflow = "";
            setVisible(false);
          }, 4000);
        }, 600);
      } else if (!near) {
        atBottom = false;
        clearTimeout(showTimer);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9994] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          aria-hidden="true"
        >
          {/* Sepia wash */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(160,110,40,0.55) 0%, rgba(140,100,30,0.3) 40%, transparent 100%)",
              mixBlendMode: "multiply",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(180,140,70,0.15)" }}
          />

          {/* Actual JoJo "To Be Continued →" PNG — bottom left */}
          <motion.div
            className="absolute bottom-10 left-8 md:left-12"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/TBC.png"
              alt="To Be Continued →"
              style={{
                width: "clamp(240px, 38vw, 500px)",
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))",
                userSelect: "none",
                mixBlendMode: "multiply",
              }}
              draggable={false}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
