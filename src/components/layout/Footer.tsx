import { TransitionLink } from "./TransitionLink";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <TransitionLink
            href="/"
            className="font-display text-lg tracking-[-0.04em] transition-opacity duration-300 hover:opacity-60"
          >
            hauwa<span className="text-accent">.</span>design
          </TransitionLink>

          <p className="text-sm text-muted">
            Made with love by Hauwa
          </p>

          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Hauwa Yusuf
          </p>
        </div>
      </div>
    </footer>
  );
}
