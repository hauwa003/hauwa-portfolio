"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

/* ── Provider ── */
export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const navigatingRef = useRef(false);

  const navigateTo = useCallback(
    (href: string) => {
      if (navigatingRef.current) return;
      if (href === window.location.pathname) return;

      navigatingRef.current = true;
      router.push(href);

      // Reset guard after navigation settles
      setTimeout(() => {
        navigatingRef.current = false;
      }, 500);
    },
    [router]
  );

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
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
