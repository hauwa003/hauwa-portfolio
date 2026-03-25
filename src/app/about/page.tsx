import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Hauwa Yusuf — a product designer and Framer developer with 4+ years of experience helping startups build better products.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-12">
        <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
          {/* Photo column */}
          <ScrollReveal>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface">
              {/* Profile photo placeholder — replace with actual image */}
              <div className="flex h-full items-center justify-center text-sm text-muted">
                Photo
              </div>
            </div>
          </ScrollReveal>

          {/* Bio column */}
          <div className="space-y-8">
            <ScrollReveal>
              <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Hi, I&apos;m Hauwa
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-muted">
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
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold">
                  Currently
                </h2>
                <ul className="space-y-2 text-base text-muted">
                  <li>Open to freelance, contract, and full-time roles</li>
                  <li>Available for product design and Framer development</li>
                  <li>Based in Abuja, Nigeria (GMT+1)</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Button
                  href="https://cal.com/hauwa-yusuf"
                  external
                >
                  Book a call
                </Button>
                <Button
                  href="#"
                  variant="secondary"
                  external
                >
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
