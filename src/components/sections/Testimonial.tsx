import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Testimonial() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <ScrollReveal>
          <blockquote>
            <p className="font-display text-2xl font-medium leading-relaxed md:text-3xl">
              &ldquo;Hauwa has a rare ability to understand both the user and the
              business. She transformed our vision into a product our customers
              love.&rdquo;
            </p>
            <footer className="mt-8">
              <p className="font-semibold">Jafett Sandi</p>
              <p className="text-sm text-muted">Co-founder, BetSell</p>
            </footer>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
}
