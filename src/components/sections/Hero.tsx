"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 pt-16 md:pb-40 md:pt-24 lg:px-8">
      {/* Hook — one bold line */}
      <motion.h1
        className="max-w-4xl font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.15] tracking-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
      >
        I turn complex ideas into products people actually enjoy using.
      </motion.h1>

      {/* Sub-copy + CTAs — offset right */}
      <motion.div
        className="mt-10 flex flex-col gap-8 md:ml-auto md:mt-14 md:max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <p className="text-lg leading-relaxed text-muted">
          Product designer and Framer developer with 4+ years helping startups
          and enterprises ship digital products that work beautifully.
        </p>

        {/* Availability badge */}
        <div className="inline-flex w-fit items-center gap-2.5 border border-border bg-surface-elevated px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[13px] tracking-wide text-muted">
            Available for new projects
          </span>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button href="#work">See my work</Button>
          <Button
            href="https://cal.com/hauwa-yusuf"
            variant="secondary"
            external
          >
            Book a call
          </Button>
        </div>
      </motion.div>

      {/* Decorative bottom line */}
      <motion.div
        className="mt-20 h-px bg-border md:mt-28"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        style={{ transformOrigin: "left" }}
      />
    </section>
  );
}
