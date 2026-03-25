import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Hauwa Yusuf approaches product design — from discovery and research to design delivery.",
};

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Every project starts with understanding. I dive into the problem space through stakeholder interviews, user research, competitive analysis, and data review. The goal is to build a shared understanding of who we're designing for, what their pain points are, and what success looks like.",
    deliverables: [
      "Stakeholder interviews",
      "User research synthesis",
      "Competitive analysis",
      "Problem definition",
    ],
  },
  {
    number: "02",
    title: "Define",
    description:
      "With research in hand, I translate insights into structure. This means defining user flows, information architecture, and prioritizing features based on impact and feasibility. I work closely with stakeholders to align on scope and set clear project milestones.",
    deliverables: [
      "User flows & journey maps",
      "Information architecture",
      "Feature prioritization",
      "Project scope & milestones",
    ],
  },
  {
    number: "03",
    title: "Design",
    description:
      "This is where ideas take shape. I start with low-fidelity wireframes to explore layouts and interactions, then move into high-fidelity designs in Figma. I build interactive prototypes for user testing and iterate based on feedback until the design solves the problem elegantly.",
    deliverables: [
      "Wireframes & prototypes",
      "Visual design (Figma)",
      "Design system components",
      "User testing & iteration",
    ],
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Design doesn't end at handoff. I prepare comprehensive design specs, component documentation, and work directly with developers to ensure pixel-perfect implementation. For Framer and Next.js projects, I handle the development myself.",
    deliverables: [
      "Design specs & documentation",
      "Developer handoff",
      "Framer / Next.js development",
      "QA & iteration",
    ],
  },
];

const tools = [
  { category: "Design", items: ["Figma", "FigJam", "Adobe Creative Suite"] },
  { category: "Prototyping", items: ["Figma Prototyping", "Framer"] },
  { category: "Development", items: ["Next.js", "React", "Tailwind CSS", "TypeScript"] },
  { category: "Collaboration", items: ["Notion", "Slack", "Linear", "Loom"] },
];

export default function ProcessPage() {
  return (
    <PageTransition>
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-12">
        {/* Intro */}
        <ScrollReveal>
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            How I work
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Every project is different, but my approach stays consistent. I
            follow a structured yet flexible process that ensures clarity at
            every stage — from understanding the problem to shipping the
            solution.
          </p>
        </ScrollReveal>

        {/* Process steps */}
        <div className="mt-20 space-y-20">
          {processSteps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.05}>
              <div className="grid gap-8 md:grid-cols-[auto_1fr]">
                <span className="font-display text-5xl font-semibold text-accent">
                  {step.number}
                </span>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-semibold">
                    {step.title}
                  </h2>
                  <p className="text-base leading-relaxed text-muted">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {step.deliverables.map((d) => (
                      <span
                        key={d}
                        className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Tools */}
        <ScrollReveal>
          <div className="mt-24">
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Tools & methods
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {tools.map((group) => (
                <div key={group.category}>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">
                    {group.category}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-base">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* What to expect */}
        <ScrollReveal>
          <div className="mt-24 rounded-2xl bg-surface p-8 md:p-12">
            <h2 className="font-display text-2xl font-semibold">
              What to expect
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              <p>
                When we work together, you can expect clear communication,
                consistent updates, and a collaborative process. I don&apos;t
                disappear into a design cave — I share work early and often, and
                I value your input at every stage.
              </p>
              <p>
                Depending on the project scope, a typical engagement runs 4–8
                weeks from kickoff to delivery. I work best with direct access to
                stakeholders and real users so I can design with confidence, not
                assumptions.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </main>
    </PageTransition>
  );
}
