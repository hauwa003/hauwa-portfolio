"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ── Data ── */
const testimonials = [
  {
    quote:
      "Hauwa has a sharp eye for design and a strong grasp of user-centered thinking. She turns complex requirements into clean, intuitive experiences.",
    name: "Hariprasad KB",
    role: "Design Manager, DERA",
    color: "#4C1D95",
  },
  {
    quote:
      "Working with Hauwa was a breeze. Incredibly organized and detail-oriented — her designs are so well-structured, they made development so much smoother.",
    name: "Javier Damiani",
    role: "Developer, BetSell",
    color: "#3B0764",
  },
  {
    quote:
      "If you need someone who's easygoing, collaborative, and just seamless to work with — that's Hauwa. Her product management and design skills elevated the entire project.",
    name: "Maryam Yahaya",
    role: "Collaborator",
    color: "#2E1065",
  },
  {
    quote:
      "What stood out about Hauwa is her product thinking. She doesn't just design — she translates ideas into practical solutions. Reliable on any team.",
    name: "Markanthony Udoye",
    role: "Collaborator",
    color: "#1E1B4B",
  },
];

/* ── Timing ── */
const AUTO_INTERVAL = 5000;
const ease = [0.22, 1, 0.36, 1] as const;

/* ── Component ── */
export function Testimonial() {
  const [hydrated, setHydrated] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const sectionRef = useRef<HTMLElement>(null);
  const wasInView = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const isInView = useInView(sectionRef, { once: true, margin: "-5%" });

  useEffect(() => {
    if (sectionRef.current) {
      const r = sectionRef.current.getBoundingClientRect();
      wasInView.current = r.top < window.innerHeight && r.bottom > 0;
    }
    setHydrated(true);
  }, []);

  const shouldAnimate = hydrated && (isInView || wasInView.current);

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  const goNext = useCallback(() => {
    goTo((current + 1) % testimonials.length, 1);
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length, -1);
  }, [current, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        setDirection(1);
        return (prev + 1) % testimonials.length;
      });
    }, AUTO_INTERVAL);
  }, []);

  /* ── Auto-rotate ── */
  useEffect(() => {
    if (!shouldAnimate) return;
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [shouldAnimate, resetTimer]);

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
    },
    []
  );

  const t = testimonials[current];

  /* Crossfade variants */
  const quoteVariants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden text-white"
    >
      {/* ── Animated background color ── */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: t.color }}
        transition={{ duration: 0.6, ease }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:py-32 lg:px-8">
        {/* Decorative quote mark */}
        <span
          className="absolute -left-4 -top-8 font-display text-[20rem] leading-none text-white/[0.06] md:-left-8 md:text-[28rem]"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <div className="relative">
          {/* Quote area — fixed min-height to prevent layout shift */}
          <div className="min-h-[320px] md:min-h-[280px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={quoteVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease }}
              >
                <blockquote>
                  <p className="font-display text-2xl leading-[1.4] md:text-4xl md:leading-[1.35]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <footer className="mt-8 flex items-center gap-4">
                  <div className="h-px w-8 bg-white/50" />
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-sm text-white/60">{t.role}</p>
                  </div>
                </footer>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {hydrated && (
            <motion.div
              className="mt-10 flex items-center justify-between"
              initial={wasInView.current ? false : { opacity: 0 }}
              animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                delay: wasInView.current ? 0 : 0.4,
                duration: 0.5,
              }}
            >
              {/* Progress bar */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (i !== current) {
                        goTo(i, i > current ? 1 : -1);
                        resetTimer();
                      }
                    }}
                    className="group relative flex h-8 items-center"
                    aria-label={`Go to testimonial ${i + 1}`}
                  >
                    <div
                      className={`h-[3px] rounded-full transition-all duration-500 ${
                        i === current
                          ? "w-8 bg-white"
                          : "w-3 bg-white/25 group-hover:w-5 group-hover:bg-white/50"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Arrow buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    goPrev();
                    resetTimer();
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/70 transition-all duration-200 hover:border-white/60 hover:bg-white/10 hover:text-white active:scale-95"
                  aria-label="Previous testimonial"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    goNext();
                    resetTimer();
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/70 transition-all duration-200 hover:border-white/60 hover:bg-white/10 hover:text-white active:scale-95"
                  aria-label="Next testimonial"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
