"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

const principles = [
  {
    number: "01",
    title: "Clarity over cleverness",
    body: "If a user has to think about the interface, the interface hasn't done its job.",
    image: "/images/projects/onboarding.png",
    alt: "Onboarding screen design showing clear user flow",
    caption: "Onboarding - BetSell",
  },
  {
    number: "02",
    title: "Reduce before you add",
    body: "The best features are often the ones you remove. Simplicity is a deliberate act.",
    image: "/images/projects/brix.png",
    alt: "Brix design system with minimal, focused components",
    caption: "Component system - Brix",
  },
  {
    number: "03",
    title: "Design is how it feels to use",
    body: "Aesthetics matter, but the real test is whether someone can finish what they came to do.",
    image: "/images/projects/budgio-screens.png",
    alt: "Budgio app screens showing intuitive budget tracking",
    caption: "Budget flow - Budgio",
  },
  {
    number: "04",
    title: "Every screen answers a question",
    body: "A screen without a clear purpose is a screen that shouldn't exist.",
    image: "/images/projects/memory-bird.png",
    alt: "Memory Bird app screen with focused single-purpose layout",
    caption: "Recall view - Memory Bird",
  },
];

export function DesignPhilosophy() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const isTouchDevice = useRef(false);

  const sectionRef = useRef(null);
  const wasInView = useRef(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-5%" });

  useEffect(() => {
    if (sectionRef.current) {
      const rect = (sectionRef.current as HTMLElement).getBoundingClientRect();
      wasInView.current = rect.top < window.innerHeight && rect.bottom > 0;
    }
    isTouchDevice.current = window.matchMedia("(hover: none)").matches;
    setHydrated(true);
  }, []);

  const shouldAnimate = hydrated && (isInView || wasInView.current);

  function handleEnter(index: number) {
    if (!isTouchDevice.current) setActiveIndex(index);
  }

  function handleLeave() {
    if (!isTouchDevice.current) setActiveIndex(null);
  }

  function handleClick(index: number) {
    if (isTouchDevice.current) {
      setActiveIndex((prev) => (prev === index ? null : index));
    }
  }

  function getOpacityClass(index: number) {
    if (!hydrated) return "";
    if (activeIndex === null) return "opacity-[0.65]";
    return activeIndex === index ? "opacity-100" : "opacity-50";
  }

  const activePrinciple =
    activeIndex !== null ? principles[activeIndex] : null;

  const headerContent = (
    <>
      <p className="text-sm uppercase tracking-[0.2em] text-muted">
        Design Philosophy
      </p>
      <h2 className="mt-4 font-display text-4xl tracking-[-0.04em] md:text-5xl">
        How I think about products
      </h2>
    </>
  );

  return (
    <section ref={sectionRef} className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      {hydrated ? (
        <motion.div
          initial={wasInView.current ? false : { opacity: 0, y: 24 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {headerContent}
        </motion.div>
      ) : (
        <div>{headerContent}</div>
      )}

      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <ul className="relative mt-16" onMouseLeave={handleLeave}>
        {principles.map((p, i) => (
          <li
            key={p.number}
            className={`transition-opacity duration-300 ${getOpacityClass(i)}`}
            onMouseEnter={() => handleEnter(i)}
            onClick={() => handleClick(i)}
          >
            <div className="h-px bg-border" />
            <div className="flex items-start gap-6 py-7 md:gap-8">
              <span className="mt-0.5 text-sm tabular-nums text-muted">
                {p.number}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl md:text-2xl">{p.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted md:text-base">
                  {p.body}
                </p>

                {/* Mobile image - accordion */}
                <div className="md:hidden">
                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5">
                          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface">
                            <Image
                              src={p.image}
                              alt={p.alt}
                              fill
                              sizes="(max-width: 768px) 90vw, 0vw"
                              className="object-cover"
                            />
                          </div>
                          <p className="mt-2 text-xs text-muted">{p.caption}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </li>
        ))}
        <div className="h-px bg-border" />

        {/* Desktop image - absolutely positioned, no layout shift */}
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[240px] items-start justify-end md:flex">
          <div className="sticky top-1/3">
            <AnimatePresence mode="wait">
              {activePrinciple && (
                <motion.div
                  key={activePrinciple.number}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative aspect-[4/3] w-[240px] overflow-hidden rounded-xl bg-surface">
                    <Image
                      src={activePrinciple.image}
                      alt={activePrinciple.alt}
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted">
                    {activePrinciple.caption}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ul>
    </section>
  );
}
