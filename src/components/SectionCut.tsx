"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function SectionCut() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="w-full py-1 overflow-hidden" aria-hidden="true">
      <motion.div
        className="h-px bg-zinc-900 origin-left"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={
          isInView
            ? { scaleX: [0, 1, 1], opacity: [1, 1, 0] }
            : { scaleX: 0, opacity: 1 }
        }
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.3, 1],
        }}
      />
    </div>
  );
}
