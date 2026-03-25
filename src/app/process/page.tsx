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
  {
    category: "Development",
    items: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  },
  { category: "Collaboration", items: ["Notion", "Slack", "Linear", "Loom"] },
];

export default function ProcessPage() {
  return (
    <PageTransition>
      <main className="mx-auto max-w-7xl px-6 pb-28 pt-12 lg:px-8">
        {/* Intro */}
        <ScrollReveal>
          <p className="text-[13px] uppercase tracking-[0.2em] text-muted">
            Process
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight md:text-7xl">
            How I work<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-[1.8] text-muted">
            Every project is different, but my approach stays consistent. I
            follow a structured yet flexible process that ensures clarity at
            every stage — from understanding the problem to shipping the
            solution.
          </p>
        </ScrollReveal>

        <div className="mt-6 h-px bg-border" />

        {/* Process steps */}
        <div className="mt-20 space-y-0">
          {processSteps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.05}>
              <div className="grid gap-8 border-b border-border py-14 md:grid-cols-[120px_1fr_1.2fr] md:gap-12">
                {/* Number */}
                <span className="font-display text-6xl tracking-tight text-border md:text-7xl">
                  {step.number}
                </span>

                {/* Title */}
                <div>
                  <h2 className="font-display text-3xl tracking-tight">
                    {step.title}
                  </h2>
                </div>

                {/* Description + deliverables */}
                <div className="space-y-6">
                  <p className="text-[15px] leading-[1.8] text-muted">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.deliverables.map((d) => (
                      <span
                        key={d}
                        className="border border-border px-3 py-1.5 text-xs text-muted"
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
            <p className="text-[13px] uppercase tracking-[0.2em] text-muted">
              Toolkit
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Tools & methods
            </h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {tools.map((group) => (
                <div key={group.category}>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-accent">
                    {group.category}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-[15px] text-foreground"
                      >
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
          <div className="mt-24 bg-foreground p-10 text-background md:p-16">
            <p className="text-[13px] uppercase tracking-[0.2em] text-background/50">
              Working Together
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
              What to expect
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-[1.8] text-background/70">
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
