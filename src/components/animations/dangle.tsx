"use client";
import { motion } from "framer-motion";

export function Dangle({
  className,
  children,
  isHovering,
}: {
  className?: string;
  children?: React.ReactNode;
  isHovering: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ rotate: 0 }}
      animate={isHovering ? { rotate: 120 } : { rotate: 0 }}
      transition={{
        type: isHovering ? "spring" : "tween",
        stiffness: 20,
        damping: 0.9,
      }}
      style={{
        transformOrigin: "bottom left",
      }}
    >
      {children}
    </motion.div>
  );
}
