"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const nowPlaying = {
  artist: "Sabrina Carpenter",
  song: "Espresso",
  album: "Short n' Sweet",
  cover: "/images/now-playing.jpg",
};

function NowListening() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
        <span className="flex items-end gap-[2px]">
          <span className="inline-block w-[3px] animate-[equalizer_0.8s_ease-in-out_infinite] bg-green-400" style={{ height: 10 }} />
          <span className="inline-block w-[3px] animate-[equalizer_0.8s_ease-in-out_0.2s_infinite] bg-green-400" style={{ height: 14 }} />
          <span className="inline-block w-[3px] animate-[equalizer_0.8s_ease-in-out_0.4s_infinite] bg-green-400" style={{ height: 8 }} />
        </span>
        Now listening
      </p>
      <p className="mt-1.5 font-display text-2xl tracking-[-0.04em] md:text-3xl">
        {nowPlaying.artist}
      </p>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute bottom-full left-0 z-20 mb-3 flex w-[260px] items-center gap-4 rounded-xl border border-border bg-background p-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease }}
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface">
              <Image
                src={nowPlaying.cover}
                alt={`${nowPlaying.album} album art`}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{nowPlaying.song}</p>
              <p className="truncate text-sm text-muted">{nowPlaying.artist}</p>
              <p className="truncate text-xs text-muted/70">{nowPlaying.album}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  const [hydrated, setHydrated] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const wasInView = useRef(false);

  useEffect(() => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      wasInView.current = rect.top < window.innerHeight && rect.bottom > 0;
    }
    setHydrated(true);
  }, []);

  const M = hydrated ? motion.div : "div";

  const skip = wasInView.current;

  return (
    <section ref={heroRef} className="mx-auto max-w-7xl px-6 pb-16 pt-16 md:pb-24 md:pt-24 lg:px-8">
      {/* Headline */}
      <M
        {...(hydrated && {
          initial: skip ? false : { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: skip ? 0 : 0.1, ease },
        })}
      >
        <h1 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.04em]">
          I turn complex ideas into
          <br />
          <span className="text-accent">interfaces that make sense.</span>
        </h1>
      </M>

      {/* Divider */}
      <M
        className="mt-10 h-px bg-border md:mt-14"
        {...(hydrated && {
          initial: skip ? false : { scaleX: 0 },
          animate: { scaleX: 1 },
          transition: { duration: 1.2, delay: skip ? 0 : 0.4, ease },
          style: { transformOrigin: "left" },
        })}
      />

      {/* Two-column intro */}
      <M
        className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[1.2fr_1fr] md:gap-16"
        {...(hydrated && {
          initial: skip ? false : { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: skip ? 0 : 0.55, ease },
        })}
      >
        {/* Left — pitch */}
        <div>
          <p className="text-lg leading-relaxed md:text-xl md:leading-relaxed">
            Hi, I&apos;m Hauwa Yusuf, a product designer and Framer developer
            with 4+ years turning complex ideas into interfaces that make sense.
            I work with startups and companies to ship products that align what
            users need with what the business needs.
          </p>
          <div className="mt-5 flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <p className="text-base text-muted">
              Open to new projects and collaborations
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="https://cal.com/hauwa-yusuf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-colors duration-300 hover:bg-foreground/80"
            >
              Book a call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
            <a
              href="/hauwa-yusuf-resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-medium transition-colors duration-300 hover:bg-surface"
            >
              Download resume
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right — quick facts */}
        <div className="grid cursor-default select-none grid-cols-2 gap-x-8 gap-y-6">
          {[
            { label: "Experience", value: "4+ years" },
            { label: "Currently building", value: "Studio Lumi" },
            { label: "Based in", value: "Abuja, Nigeria" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {item.label}
              </p>
              <p className="mt-1.5 font-display text-2xl tracking-[-0.04em] md:text-3xl">{item.value}</p>
            </div>
          ))}

          {/* Now listening */}
          <NowListening />

        </div>
      </M>
    </section>
  );
}
