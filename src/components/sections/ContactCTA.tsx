"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactCTA() {
  const [hydrated, setHydrated] = useState(false);
  const sectionRef = useRef(null);
  const wasInView = useRef(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-5%" });

  useEffect(() => {
    if (sectionRef.current) {
      const rect = (sectionRef.current as HTMLElement).getBoundingClientRect();
      wasInView.current = rect.top < window.innerHeight && rect.bottom > 0;
    }
    setHydrated(true);
  }, []);

  const shouldAnimate = hydrated && (isInView || wasInView.current);

  const content = (
    <div className="relative overflow-hidden rounded-3xl bg-[#5B21B6] px-8 py-16 text-center md:px-16 md:py-24">
      {/* Dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <h2 className="mx-auto max-w-xl font-display text-4xl tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
        Got an idea?
        <br />
        <span className="text-white/80">Let&apos;s shape it.</span>
      </h2>

      <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/70">
        I&apos;m always open to hearing about new projects, collaborations, or
        just a good design conversation. Don&apos;t overthink it. Reach out.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-3">
        <a
          href="https://cal.com/hauwa-yusuf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-[#5B21B6] transition-colors duration-300 hover:bg-white/90"
        >
          Book a call
        </a>
        <a
          href="mailto:hauwayusuf003@gmail.com"
          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/10"
        >
          Send an email
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>

      <p className="mt-10 font-handwriting text-lg text-white/70">
        Hauwa
      </p>
    </div>
  );

  return (
    <section ref={sectionRef} className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      {hydrated ? (
        <motion.div
          initial={wasInView.current ? false : { opacity: 0, y: 32 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.8, ease }}
        >
          {content}
        </motion.div>
      ) : (
        <div>{content}</div>
      )}
    </section>
  );
}
