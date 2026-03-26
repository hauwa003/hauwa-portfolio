"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function WipeTransition({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  // Before hydration: render children directly (no black overlays, no opacity:0)
  if (!hydrated) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Wipe overlay — slides down then out */}
      <motion.div
        className="fixed inset-0 z-[100] origin-top bg-black"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "bottom" }}
      />
      <motion.div
        className="fixed inset-0 z-[99] origin-top bg-black"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "bottom" }}
      />

      {/* Page content fades in after wipe */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
