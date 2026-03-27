"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
  const [hydrated, setHydrated] = useState(false);
  const ref = useRef(null);
  const wasInView = useRef(false);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  useEffect(() => {
    if (ref.current) {
      const rect = (ref.current as HTMLElement).getBoundingClientRect();
      wasInView.current = rect.top < window.innerHeight && rect.bottom > 0;
    }
    setHydrated(true);
  }, []);

  const shouldAnimate = hydrated && (isInView || wasInView.current);

  return (
    <section ref={ref} id="contact" className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36 lg:px-8">
        <div className="grid gap-16 md:grid-cols-[1.5fr_1fr] md:gap-20">
          {hydrated ? (
            <motion.div
              initial={wasInView.current ? false : { opacity: 0, y: 32 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                Get in Touch
              </p>
              <h2 className="mt-6 font-display text-5xl tracking-[-0.04em] md:text-7xl">
                Let&apos;s work
                <br />
                together<span className="text-accent">.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Have a project in mind? I&apos;d love to hear about it. Reach out
                and let&apos;s create something great.
              </p>
            </motion.div>
          ) : (
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">
                Get in Touch
              </p>
              <h2 className="mt-6 font-display text-5xl tracking-[-0.04em] md:text-7xl">
                Let&apos;s work
                <br />
                together<span className="text-accent">.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Have a project in mind? I&apos;d love to hear about it. Reach out
                and let&apos;s create something great.
              </p>
            </div>
          )}

          {hydrated ? (
            <motion.div
              className="flex flex-col justify-end space-y-8"
              initial={wasInView.current ? false : { opacity: 0, y: 24 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: wasInView.current ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {contactLinks.map((link) => (
                <div key={link.label} className="group">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {link.label}
                  </p>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="link-underline mt-1 inline-block text-lg font-medium tracking-tight text-foreground transition-colors duration-300 hover:text-accent"
                  >
                    {link.display}
                  </a>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col justify-end space-y-8">
              {contactLinks.map((link) => (
                <div key={link.label} className="group">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {link.label}
                  </p>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="link-underline mt-1 inline-block text-lg font-medium tracking-tight text-foreground transition-colors duration-300 hover:text-accent"
                  >
                    {link.display}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
