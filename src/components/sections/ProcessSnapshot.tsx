"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understanding the problem, the users, and the business goals through research and stakeholder conversations.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Synthesizing insights into clear problem statements, user flows, and information architecture.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Exploring solutions through wireframes, prototypes, and iterative visual design with continuous feedback.",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Polished handoff with design specs, component documentation, and developer collaboration.",
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top border that animates in */}
      <motion.div
        className="h-px bg-border"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
      />

      <div className="pb-2 pt-8">
        <span className="text-[13px] tabular-nums tracking-wide text-accent">
          {step.number}
        </span>
        <h3 className="mt-3 font-display text-2xl tracking-tight">
          {step.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function ProcessSnapshot() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <ScrollReveal>
        <p className="text-[13px] uppercase tracking-[0.2em] text-muted">
          How I Work
        </p>
        <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
          A process built on clarity
        </h2>
      </ScrollReveal>

      <div className="mt-16 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <StepCard key={step.number} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
