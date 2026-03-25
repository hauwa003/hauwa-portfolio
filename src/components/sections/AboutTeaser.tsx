import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function AboutTeaser() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              A bit about me
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              I&apos;m Hauwa — a product designer and Framer developer based in
              Abuja, Nigeria. Over the past 4+ years, I&apos;ve helped startups
              and enterprises design digital products that are both functional
              and delightful. I think in systems, obsess over details, and believe
              great design should feel invisible.
            </p>
            <div className="mt-8">
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
