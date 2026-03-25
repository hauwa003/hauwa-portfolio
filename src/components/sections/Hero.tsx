"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnimatedText } from "@/components/ui/AnimatedText";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
      <div className="max-w-3xl">
        <motion.p
          className="mb-4 text-sm font-medium text-accent"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Product Designer & Framer Developer
        </motion.p>

        <AnimatedText
          text="I design products that people actually enjoy using."
          as="h1"
          className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl md:leading-[1.1]"
          delay={0.1}
        />

        <motion.p
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          I help startups and enterprises turn messy ideas and confusing systems
          into products people actually enjoy using.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Button href="#work">See my work</Button>
          <Button
            href="https://cal.com/hauwa-yusuf"
            variant="secondary"
            external
          >
            Book a call
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
