"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ExitMessage() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      // Trigger when user is within 100px of the bottom
      if (pageHeight - scrollPosition < 100) {
        setShow(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const handleClose = () => {
    setShow(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-6 right-6 z-[200] w-[320px] bg-white p-7 shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-border/50"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-muted transition-colors hover:text-foreground"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <p className="text-2xl">&#x1F496;</p>

          <p className="mt-3 font-handwriting text-[19px] leading-relaxed text-foreground">
            Hey, thanks for scrolling all the way down here. It really means a lot
            that you took the time to look through my work. If anything resonated,
            don&apos;t be a stranger — I&apos;d love to connect.
          </p>

          <p className="mt-3 font-handwriting text-[17px] text-muted">
            — Hauwa
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
