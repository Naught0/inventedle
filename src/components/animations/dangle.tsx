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
        type: "spring",
        stiffness: 700,
        damping: 4,
        repeat: 0,
        repeatType: "reverse",
      }}
      style={{
        transformOrigin: "bottom left",
      }}
    >
      {children}
    </motion.div>
  );
}
