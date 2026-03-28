"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

/* ── Data ── */
const testimonials = [
  {
    quote:
      "Sharp eye for design with a strong grasp of user-centered thinking. She turns complex requirements into clean, intuitive experiences.",
    name: "Hariprasad KB",
    role: "Design Manager, DERA",
    color: "#4C1D95",
  },
  {
    quote:
      "Incredibly organized and detail-oriented. Her designs are so clear and well-structured, they make the development process much smoother.",
    name: "Javier Damiani",
    role: "Developer, BetSell",
    color: "#3B0764",
  },
  {
    quote:
      "Easygoing, collaborative, and seamless to work with. Her product management and design skills elevated the entire project.",
    name: "Maryam Yahaya",
    role: "Collaborator",
    color: "#2E1065",
  },
  {
    quote:
      "Strong product thinking with a clear design approach. She translates ideas into practical solutions \u2014 reliable on any team.",
    name: "Markanthony Udoye",
    role: "Collaborator",
    color: "#1E1B4B",
  },
];

/* ── Timing ── */
const AUTO_INTERVAL = 6000;
const SWEEP_MS = 1800;
const FADE_MS = 200;
const ease = [0.22, 1, 0.36, 1] as const;

/* ── Sweep engine ── */

function easeOutQuart(t: number) {
  return 1 - (1 - t) ** 4;
}

function runSweep(
  canvas: HTMLCanvasElement,
  bgColor: string,
  onDone: () => void
) {
  const ctx = canvas.getContext("2d")!;
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width;
  const h = canvas.height;

  // Fill with current bg color
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, w, h);

  const blurH = 250 * dpr;
  const t0 = performance.now();
  let raf = 0;

  function tick(now: number) {
    const raw = Math.min((now - t0) / SWEEP_MS, 1);
    const p = easeOutQuart(raw);
    const baseY = p * (h + blurH);

    ctx.globalCompositeOperation = "destination-out";

    // Hard clear above the blend zone
    const solidEnd = Math.max(0, baseY - blurH);
    if (solidEnd > 0) {
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, w, solidEnd);
    }

    // Soft gradient blend zone — colors melt into each other
    const gradTop = Math.max(0, baseY - blurH);
    const gradBot = Math.min(baseY, h);
    if (gradBot > gradTop) {
      const grad = ctx.createLinearGradient(0, gradTop, 0, gradBot);
      grad.addColorStop(0, "rgba(0,0,0,1)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, gradTop, w, gradBot - gradTop);
    }

    if (raw < 1) {
      raf = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, w, h);
      onDone();
    }
  }

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

/* ── QuoteBlock ── */
function QuoteBlock({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <>
      <blockquote>
        <p className="font-display text-2xl leading-[1.4] md:text-4xl md:leading-[1.35]">
          {quote}
        </p>
      </blockquote>
      <footer className="mt-10 flex items-center gap-4">
        <div className="h-px w-8 bg-white/50" />
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-sm text-white/70">{role}</p>
        </div>
      </footer>
    </>
  );
}

/* ── Component ── */
export function Testimonial() {
  const [hydrated, setHydrated] = useState(false);
  const [current, setCurrent] = useState(0);
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wasInView = useRef(false);
  const currentRef = useRef(0);
  const busyRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const cancelRef = useRef<(() => void) | null>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-5%" });

  useEffect(() => {
    if (sectionRef.current) {
      const r = sectionRef.current.getBoundingClientRect();
      wasInView.current = r.top < window.innerHeight && r.bottom > 0;
    }
    setHydrated(true);
  }, []);

  const shouldAnimate = hydrated && (isInView || wasInView.current);

  /* ── Transition ── */
  const go = useCallback((to: number) => {
    if (busyRef.current || !canvasRef.current || !sectionRef.current) return;
    busyRef.current = true;

    const rect = sectionRef.current.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const cvs = canvasRef.current;
    cvs.width = rect.width * dpr;
    cvs.height = rect.height * dpr;
    cvs.style.width = `${rect.width}px`;
    cvs.style.height = `${rect.height}px`;

    const bg = getComputedStyle(sectionRef.current).backgroundColor;

    setNextIdx(to);
    setFading(true);

    cancelRef.current = runSweep(cvs, bg, () => {
      currentRef.current = to;
      setCurrent(to);
      setFading(false);
      setNextIdx(null);
      busyRef.current = false;
      cancelRef.current = null;
    });
  }, []);

  const goNext = useCallback(
    () => go((currentRef.current + 1) % testimonials.length),
    [go]
  );
  const goPrev = useCallback(
    () =>
      go(
        (currentRef.current - 1 + testimonials.length) % testimonials.length
      ),
    [go]
  );

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, AUTO_INTERVAL);
  }, [goNext]);

  /* ── Auto-rotate ── */
  useEffect(() => {
    if (!shouldAnimate) return;
    const d = setTimeout(resetTimer, 2500);
    return () => {
      clearTimeout(d);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [shouldAnimate, resetTimer]);

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
      cancelRef.current?.();
    },
    []
  );

  const t = testimonials[current];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden text-white"
      style={{ backgroundColor: t.color }}
    >
      {/* ── Transition layers ── */}

      {/* Next background color (full bleed, underneath canvas) */}
      {nextIdx !== null && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: testimonials[nextIdx].color }}
        />
      )}

      {/* Next testimonial text (underneath canvas) */}
      {nextIdx !== null && (
        <div className="absolute inset-0 z-[5]">
          <div className="mx-auto max-w-5xl px-6 py-28 md:py-36 lg:px-8">
            <div className="relative">
              <QuoteBlock
                quote={testimonials[nextIdx].quote}
                name={testimonials[nextIdx].name}
                role={testimonials[nextIdx].role}
              />
            </div>
          </div>
        </div>
      )}

      {/* Canvas sweep overlay */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10"
        style={{ display: nextIdx !== null ? "block" : "none" }}
      />

      {/* ── Main content (above canvas) ── */}
      <div className="relative z-20 mx-auto max-w-5xl px-6 py-28 md:py-36 lg:px-8">
        {/* Decorative quote */}
        <span
          className="absolute -left-4 -top-8 font-display text-[20rem] leading-none text-white/[0.06] md:-left-8 md:text-[28rem]"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <div className="relative">
          {/* Current testimonial */}
          {hydrated ? (
            <motion.div
              initial={wasInView.current ? false : { opacity: 0, y: 32 }}
              animate={
                shouldAnimate
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 32 }
              }
              transition={{ duration: 0.8, ease }}
            >
              <div
                style={{
                  opacity: fading ? 0 : 1,
                  transition: fading
                    ? `opacity ${FADE_MS}ms ease-out`
                    : "none",
                }}
              >
                <QuoteBlock quote={t.quote} name={t.name} role={t.role} />
              </div>
            </motion.div>
          ) : (
            <div>
              <QuoteBlock quote={t.quote} name={t.name} role={t.role} />
            </div>
          )}

          {/* Navigation */}
          {hydrated && (
            <motion.div
              className="mt-12 flex items-center justify-between"
              initial={wasInView.current ? false : { opacity: 0 }}
              animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                delay: wasInView.current ? 0 : 0.4,
                duration: 0.5,
              }}
            >
              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (i !== currentRef.current) {
                        go(i);
                        resetTimer();
                      }
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === (nextIdx ?? current)
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              {/* Arrow buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    goPrev();
                    resetTimer();
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white/40 hover:text-white"
                  aria-label="Previous testimonial"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white/40 hover:text-white"
                  aria-label="Next testimonial"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
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
