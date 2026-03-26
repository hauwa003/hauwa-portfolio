"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 md:pb-20 md:pt-24 lg:px-8">
      {/* Large serif name */}
      <motion.h1
        className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[1] tracking-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
      >
        Hauwa
      </motion.h1>

      {/* Subtitle row: roles + location */}
      <motion.div
        className="mt-6 flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease }}
      >
        <p className="text-base text-foreground md:text-lg">
          Product Designer · Framer Developer · Lifelong learner
        </p>
        <p className="hidden items-center gap-1.5 text-base md:flex md:text-lg">
          <span>📍</span> Nigeria
        </p>
      </motion.div>

      {/* Divider */}
      <motion.div
        className="mt-10 h-px bg-border md:mt-14"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease }}
        style={{ transformOrigin: "left" }}
      />

      {/* Bio paragraphs */}
      <motion.div
        className="mt-10 max-w-3xl space-y-6 text-lg leading-relaxed text-foreground md:mt-14 md:text-xl md:leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease }}
      >
        <p>
          I&apos;m a product designer and Framer developer with 4+ years
          helping startups and enterprises ship digital products that work
          beautifully.
        </p>
        <p>
          I turn complex ideas into products people actually enjoy using —
          designing B2B and B2C platforms that align user needs with business
          outcomes and drive measurable impact.
        </p>
        <p>
          I&apos;m open to connecting with product teams, founders, and
          companies building meaningful products. Feel free to reach out on{" "}
          <a
            href="https://www.linkedin.com/in/hauwayusuf"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-accent-hover"
          >
            LinkedIn
          </a>
          .
        </p>
      </motion.div>
    </section>
  );
}
