"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProcessMobileHeader() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (
    <div className="lg:hidden">
      {hydrated ? (
      <motion.div
        className="border-b border-border px-6 py-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease }}
      >
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">
            Process
          </p>
          <p className="mt-1 text-base font-medium">How I work</p>
        </div>
      </motion.div>
      ) : (
      <div className="border-b border-border px-6 py-6">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">
            Process
          </p>
          <p className="mt-1 text-base font-medium">How I work</p>
        </div>
      </div>
      )}
    </div>
  );
}
