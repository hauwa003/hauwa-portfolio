import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function AboutTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <div className="grid items-start gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <ScrollReveal>
          <p className="text-[13px] uppercase tracking-[0.2em] text-muted">
            About
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
            A bit about me
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="space-y-6">
            <p className="text-lg leading-[1.7] text-muted">
              I&apos;m Hauwa — a product designer and Framer developer based in
              Abuja, Nigeria. Over the past 4+ years, I&apos;ve helped startups
              and enterprises design digital products that are both functional
              and delightful. I think in systems, obsess over details, and
              believe great design should feel invisible.
            </p>
            <div className="pt-2">
              <Button href="/about" variant="secondary">
                More about me
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
