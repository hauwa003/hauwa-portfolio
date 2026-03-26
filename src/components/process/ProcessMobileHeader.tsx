"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProcessMobileHeader() {
  return (
    <div className="lg:hidden">
      <motion.div
        className="border-b border-border px-6 py-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease }}
      >
        <div>
          <p className="text-[12px] uppercase tracking-[0.15em] text-muted">
            Process
          </p>
          <p className="mt-1 text-[15px] font-medium">How I work</p>
        </div>
      </motion.div>
    </div>
  );
}
