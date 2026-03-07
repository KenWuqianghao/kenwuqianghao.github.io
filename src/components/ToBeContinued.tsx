"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ToBeContinued() {
  const [visible, setVisible] = useState(false);

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
          setVisible(true);
          hideTimer = setTimeout(() => setVisible(false), 4000);
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
              src="https://toppng.com/uploads/preview/jojo-jojobizarreadventure-tobecontinued-continued-arrow-jojos-bizarre-adventure-to-be-continued-11562855040gsk2yfvsx2.png"
              alt="To Be Continued →"
              style={{
                width: "clamp(220px, 35vw, 480px)",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.6))",
                userSelect: "none",
              }}
              draggable={false}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
