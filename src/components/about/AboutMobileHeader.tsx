"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutMobileHeader() {
  return (
    <div className="lg:hidden">
      <motion.div
        className="border-b border-border px-6 py-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease }}
      >
        <div>
          <p className="font-display text-[15px] font-medium">
            I put this together for you...yes you!
          </p>
          <p className="mt-1 text-[13px] text-muted">
            A collection of fragments and pieces of some really cool designs I
            have worked on.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
