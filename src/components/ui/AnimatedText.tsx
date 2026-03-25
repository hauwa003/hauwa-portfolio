"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.04,
              delayChildren: delay,
            },
          },
        }}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
