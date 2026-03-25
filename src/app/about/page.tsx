import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Hauwa Yusuf — a product designer and Framer developer with 4+ years of experience helping startups build better products.",
};

const experience = [
  { label: "Years of experience", value: "4+" },
  { label: "Projects completed", value: "30+" },
  { label: "Based in", value: "Abuja, Nigeria" },
  { label: "Focus", value: "Product Design & Framer" },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="mx-auto max-w-7xl px-6 pb-28 pt-12 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <p className="text-[13px] uppercase tracking-[0.2em] text-muted">
            About
          </p>
          <h1 className="mt-3 font-display text-5xl tracking-tight md:text-7xl">
            Hi, I&apos;m Hauwa<span className="text-accent">.</span>
          </h1>
        </ScrollReveal>

        {/* Two-column layout */}
        <div className="mt-16 grid gap-16 md:grid-cols-[1fr_1.4fr] md:gap-20">
          {/* Left — Photo + stats */}
          <div className="space-y-10">
            <ScrollReveal>
              <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                {/* Profile photo placeholder */}
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-3 h-16 w-16 bg-border" />
                    <p className="text-sm text-muted">Profile photo</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 gap-6">
                {experience.map((item) => (
                  <div key={item.label}>
                    <p className="font-display text-2xl tracking-tight">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[13px] text-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Bio */}
          <div className="space-y-10">
            <ScrollReveal delay={0.1}>
              <div className="space-y-6 text-lg leading-[1.8] text-muted">
                <p>
                  I&apos;m a product designer and Framer developer based in
                  Abuja, Nigeria. For the past 4+ years, I&apos;ve been helping
                  startups and enterprises turn complex problems into intuitive
                  digital experiences.
                </p>
                <p>
                  I work across the full product design spectrum — from early
                  research and strategy to visual design, prototyping, and
                  front-end development. I&apos;m particularly passionate about
                  design systems, interaction design, and building tools that
                  make people&apos;s lives easier.
                </p>
                <p>
                  What sets me apart is that I don&apos;t just design — I build.
                  I develop production-quality websites and interfaces in Framer
                  and Next.js, which means I understand the engineering
                  constraints and opportunities that shape great product design.
                </p>
                <p>
                  When I&apos;m not designing, you&apos;ll find me exploring new
                  tools, mentoring junior designers, or working on side projects
                  that push my creative boundaries.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="border border-border bg-surface/50 p-8">
                <p className="text-[13px] uppercase tracking-[0.2em] text-accent">
                  Currently
                </p>
                <ul className="mt-4 space-y-3 text-[15px] text-muted">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-emerald-500" />
                    Open to freelance, contract, and full-time roles
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-emerald-500" />
                    Available for product design and Framer development
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-emerald-500" />
                    Based in Abuja, Nigeria (GMT+1)
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Button href="https://cal.com/hauwa-yusuf" external>
                  Book a call
                </Button>
                <Button href="#" variant="secondary" external>
                  Download resume
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
