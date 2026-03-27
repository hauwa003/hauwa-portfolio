import { ScrollReveal } from "@/components/ui/ScrollReveal";

const processSteps = [
  {
    id: "discover",
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
    id: "define",
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
    id: "design",
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
    id: "deliver",
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

const badgeColors = [
  "bg-violet-600 text-white border-violet-600",
  "bg-sky-600 text-white border-sky-600",
  "bg-amber-500 text-white border-amber-500",
  "bg-emerald-600 text-white border-emerald-600",
  "bg-rose-500 text-white border-rose-500",
  "bg-orange-500 text-white border-orange-500",
  "bg-pink-500 text-white border-pink-500",
  "bg-teal-600 text-white border-teal-600",
];

export function ProcessContent() {
  return (
    <div className="px-8 py-16 lg:px-16">
      {/* Title bar */}
      <ScrollReveal>
        <div className="flex items-center justify-between border-b border-border pb-6">
          <h1 className="font-display text-2xl tracking-[-0.04em]">How I work</h1>
          <span className="text-sm text-muted">Process</span>
        </div>
      </ScrollReveal>

      {/* Intro */}
      <ScrollReveal>
        <div className="mt-14 max-w-2xl space-y-4">
          <p className="text-base leading-[1.85] text-muted">
            Every project is different, but my approach stays consistent. I
            follow a structured yet flexible process that ensures clarity at
            every stage, from understanding the problem to shipping the
            solution.
          </p>
        </div>
      </ScrollReveal>

      {/* Process steps */}
      {processSteps.map((step, stepIndex) => {
        const baseColorIndex = processSteps
          .slice(0, stepIndex)
          .reduce((sum, s) => sum + s.deliverables.length, 0);
        return (
          <ScrollReveal key={step.number}>
            <div
              id={step.id}
              className="mt-14 space-y-4 scroll-mt-8"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm tabular-nums text-muted">
                  {step.number}
                </span>
                <span className="h-px w-4 bg-border" />
                <h2 className="font-display text-xl tracking-[-0.04em]">
                  {step.title}
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-[1.85] text-muted">
                {step.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {step.deliverables.map((d, i) => (
                  <span
                    key={d}
                    className={`rounded-full border px-3 py-1.5 text-xs ${badgeColors[(baseColorIndex + i) % badgeColors.length]}`}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        );
      })}

      {/* Toolkit */}
      <ScrollReveal>
        <div id="toolkit" className="mt-20 space-y-4 scroll-mt-8">
          <p className="text-sm uppercase tracking-[0.15em] text-muted">
            Toolkit
          </p>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((group) => (
              <div key={group.category}>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground">
                  {group.category}
                </p>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="text-base text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Working Together */}
      <ScrollReveal>
        <div
          id="working-together"
          className="mt-20 bg-surface p-8 lg:p-10 scroll-mt-8"
        >
          <p className="text-sm uppercase tracking-[0.15em] text-muted">
            Working Together
          </p>
          <div className="mt-4 max-w-2xl space-y-5 text-base leading-[1.85] text-muted">
            <p>
              When we work together, you can expect clear communication,
              consistent updates, and a collaborative process. I don&apos;t
              disappear into a design cave. I share work early and often, and I
              value your input at every stage.
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
    </div>
  );
}
