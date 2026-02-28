"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  tilt,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  tilt?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const offsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  const { x, y } = offsets[direction];

  const initialRotate = tilt != null ? tilt : 0;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y, rotate: 0 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, rotate: initialRotate }
          : { opacity: 0, x, y, rotate: 0 }
      }
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
