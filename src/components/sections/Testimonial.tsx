"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Testimonial() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-foreground text-background">
      <div className="mx-auto max-w-5xl px-6 py-28 md:py-36 lg:px-8">
        {/* Oversized decorative quote */}
        <motion.span
          className="absolute -left-4 -top-8 font-display text-[20rem] leading-none text-background/[0.03] md:-left-8 md:text-[28rem]"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          &ldquo;
        </motion.span>

        <div className="relative">
          <motion.blockquote
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-2xl leading-[1.4] md:text-4xl md:leading-[1.35]">
              Hauwa has a rare ability to understand both the user and the
              business. She transformed our vision into a product our customers
              love.
            </p>
          </motion.blockquote>

          <motion.footer
            className="mt-10 flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-px w-8 bg-background/30" />
            <div>
              <p className="text-sm font-medium">Jafett Sandi</p>
              <p className="text-sm text-background/50">Co-founder, BetSell</p>
            </div>
          </motion.footer>
        </div>
      </div>
    </section>
  );
}
