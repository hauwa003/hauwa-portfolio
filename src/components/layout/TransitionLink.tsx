"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Context ── */
interface TransitionContextValue {
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigateTo: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

/* ── Provider with wipe overlay ── */
export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [wiping, setWiping] = useState(false);
  const pendingHref = useRef<string | null>(null);

  const navigateTo = useCallback(
    (href: string) => {
      if (wiping) return;
      // Same page — skip transition
      if (href === window.location.pathname) return;

      pendingHref.current = href;
      setWiping(true);

      // After the wipe covers the screen, navigate
      setTimeout(() => {
        router.push(href);
        // Let the entrance wipe on the new page handle the reveal
        setTimeout(() => {
          setWiping(false);
          pendingHref.current = null;
        }, 100);
      }, 500);
    },
    [router, wiping]
  );

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}

      {/* Exit wipe — two curtains slide down from top */}
      <AnimatePresence>
        {wiping && (
          <>
            <motion.div
              key="wipe-1"
              className="fixed inset-0 z-[100] bg-foreground"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.5, ease }}
              style={{ transformOrigin: "top" }}
            />
            <motion.div
              key="wipe-2"
              className="fixed inset-0 z-[99] bg-accent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
              style={{ transformOrigin: "top" }}
            />
          </>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

/* ── TransitionLink — drop-in replacement for next/link ── */
interface TransitionLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "onClick"> {
  children: React.ReactNode;
}

export function TransitionLink({
  href,
  children,
  ...props
}: TransitionLinkProps) {
  const { navigateTo } = usePageTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow cmd/ctrl+click for new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    navigateTo(typeof href === "string" ? href : href.pathname || "/");
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
