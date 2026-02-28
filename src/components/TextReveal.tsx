"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function TextReveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.25, 1, 0.5, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
