"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Testimonial() {
  const [hydrated, setHydrated] = useState(false);
  const ref = useRef(null);
  const wasInView = useRef(false);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  useEffect(() => {
    if (ref.current) {
      const rect = (ref.current as HTMLElement).getBoundingClientRect();
      wasInView.current = rect.top < window.innerHeight && rect.bottom > 0;
    }
    setHydrated(true);
  }, []);

  const shouldAnimate = hydrated && (isInView || wasInView.current);

  return (
    <section ref={ref} className="relative overflow-hidden bg-foreground text-background">
      <div className="mx-auto max-w-5xl px-6 py-28 md:py-36 lg:px-8">
        <span
          className="absolute -left-4 -top-8 font-display text-[20rem] leading-none text-background/[0.03] md:-left-8 md:text-[28rem]"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <div className="relative">
          {hydrated ? (
            <motion.blockquote
              initial={wasInView.current ? false : { opacity: 0, y: 32 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-2xl leading-[1.4] md:text-4xl md:leading-[1.35]">
                Hauwa has a rare ability to understand both the user and the
                business. She transformed our vision into a product our customers
                love.
              </p>
            </motion.blockquote>
          ) : (
            <blockquote>
              <p className="font-display text-2xl leading-[1.4] md:text-4xl md:leading-[1.35]">
                Hauwa has a rare ability to understand both the user and the
                business. She transformed our vision into a product our customers
                love.
              </p>
            </blockquote>
          )}

          {hydrated ? (
            <motion.footer
              className="mt-10 flex items-center gap-4"
              initial={wasInView.current ? false : { opacity: 0, y: 16 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: wasInView.current ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-px w-8 bg-background/30" />
              <div>
                <p className="text-sm font-medium">Jafett Sandi</p>
                <p className="text-sm text-background/50">Co-founder, BetSell</p>
              </div>
            </motion.footer>
          ) : (
            <footer className="mt-10 flex items-center gap-4">
              <div className="h-px w-8 bg-background/30" />
              <div>
                <p className="text-sm font-medium">Jafett Sandi</p>
                <p className="text-sm text-background/50">Co-founder, BetSell</p>
              </div>
            </footer>
          )}
        </div>
      </div>
    </section>
  );
}
