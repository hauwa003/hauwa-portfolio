"use client";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative border-t border-border"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36 lg:px-8">
        <div className="grid gap-16 md:grid-cols-[1.5fr_1fr] md:gap-20">
          {/* Left — Big CTA heading */}
          <div>
            <motion.p
              className="text-[13px] uppercase tracking-[0.2em] text-muted"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Get in Touch
            </motion.p>

            <motion.h2
              className="mt-6 font-display text-5xl tracking-tight md:text-7xl"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Let&apos;s work
              <br />
              together<span className="text-accent">.</span>
            </motion.h2>

            <motion.p
              className="mt-6 max-w-md text-lg leading-relaxed text-muted"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Have a project in mind? I&apos;d love to hear about it. Reach out
              and let&apos;s create something great.
            </motion.p>
          </div>

          {/* Right — Contact links */}
          <motion.div
            className="flex flex-col justify-end space-y-8"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {contactLinks.map((link) => (
              <div key={link.label} className="group">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
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
        </div>
      </div>
    </section>
  );
}
