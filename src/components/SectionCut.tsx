"use client";

import { motion } from "framer-motion";

export function SectionCut() {
  return (
    <div className="w-full py-2 overflow-hidden" aria-hidden="true">
      <motion.div
        className="h-[2px] bg-red-600 origin-left"
        initial={{ scaleX: 0, opacity: 1 }}
        whileInView={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.35, 1],
        }}
      />
    </div>
  );
}
