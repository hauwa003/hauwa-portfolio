import { ScrollReveal } from "@/components/ui/ScrollReveal";

const contactLinks = [
  {
    label: "Email",
    href: "mailto:hauwayusuf003@gmail.com",
    display: "hauwayusuf003@gmail.com",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/2349025722393",
    display: "+234 902 572 2393",
    external: true,
  },
  {
    label: "Book a call",
    href: "https://cal.com/hauwa-yusuf",
    display: "cal.com/hauwa-yusuf",
    external: true,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <ScrollReveal>
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Let&apos;s work together
          </h2>
          <p className="mt-4 text-lg text-muted">
            Have a project in mind? I&apos;d love to hear about it. Reach out
            and let&apos;s create something great.
          </p>

          <div className="mt-10 space-y-6">
            {contactLinks.map((link) => (
              <div key={link.label}>
                <p className="text-xs font-medium uppercase tracking-widest text-muted">
                  {link.label}
                </p>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="mt-1 inline-block text-lg font-medium text-foreground transition-colors hover:text-accent"
                >
                  {link.display}
                </a>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
