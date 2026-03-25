import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

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

export function ProcessSnapshot() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionLabel className="mb-4">How I Work</SectionLabel>
      <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        A process built on clarity
      </h2>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <ScrollReveal key={step.number} delay={i * 0.1}>
            <div className="space-y-3">
              <span className="font-display text-3xl font-semibold text-accent">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
