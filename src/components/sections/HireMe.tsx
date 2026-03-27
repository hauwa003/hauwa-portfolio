"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    number: "01",
    title: "Design System",
    price: "$1,500",
    includes: [
      "Complete UI kit & component library",
      "Design tokens & guidelines",
      "Scalable foundations for your product",
    ],
  },
  {
    number: "02",
    title: "Mobile / Web App",
    price: "$2,500",
    includes: [
      "End-to-end UI/UX design",
      "User flows & high-fidelity prototypes",
      "Developer-ready handoff assets",
    ],
  },
];

export function HireMe() {
  const [hydrated, setHydrated] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    <>
      {/* Header */}
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-muted">
          Services
        </p>
        <h2 className="mt-4 font-display text-4xl tracking-[-0.04em] md:text-5xl">
          What I can build for you
        </h2>
      </div>

      {/* Service rows */}
      <div className="mt-16">
        {services.map((service, i) => (
          <div
            key={service.number}
            className="group"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="h-px bg-border" />
            <div className="grid gap-6 py-10 md:grid-cols-[1fr_1fr_auto] md:items-center md:gap-12">
              {/* Left — number + title */}
              <div className="flex items-start gap-5">
                <span className="mt-1 text-sm tabular-nums text-muted">
                  {service.number}
                </span>
                <div>
                  <p className={`font-display text-2xl tracking-[-0.04em] transition-colors duration-300 md:text-3xl ${
                    hydrated && hoveredIndex !== null && hoveredIndex !== i
                      ? "text-foreground/40"
                      : "text-foreground"
                  }`}>
                    {service.title}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-base text-muted"
                      >
                        <span className="h-px w-3 bg-accent/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Middle — price */}
              <div className="ml-10 md:ml-0 md:text-center">
                <span className="font-display text-4xl tracking-[-0.04em] text-accent md:text-5xl">
                  {service.price}
                </span>
                <p className="mt-1 text-sm uppercase tracking-[0.15em] text-muted">
                  Base fee
                </p>
              </div>

              {/* Right — CTA */}
              <a
                href="https://cal.com/hauwa-yusuf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-10 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors duration-300 hover:bg-foreground/80 md:ml-0"
              >
                Book a call
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        ))}
        <div className="h-px bg-border" />
      </div>

      {/* Footer note */}
      <p className="mt-8 text-base text-muted">
        Need something different?{" "}
        <a
          href="https://wa.me/2349025722393"
          target="_blank"
          rel="noopener noreferrer"
          className="font-handwriting text-lg text-accent transition-colors hover:text-accent-hover"
        >
          Let&apos;s talk about it
        </a>
      </p>
    </>
  );

  return (
    <section ref={sectionRef} className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      {hydrated ? (
        <motion.div
          initial={wasInView.current ? false : { opacity: 0, y: 32 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.7, ease }}
        >
          {content}
        </motion.div>
      ) : (
        <div>{content}</div>
      )}
    </section>
  );
}
