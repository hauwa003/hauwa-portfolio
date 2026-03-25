import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Left */}
          <div className="space-y-3">
            <Link
              href="/"
              className="font-display text-lg font-semibold tracking-tight"
            >
              hauwa.design
            </Link>
            <p className="text-sm text-muted">
              Product Designer & Framer Developer
            </p>
            <p className="text-sm text-muted">Abuja, Nigeria</p>
          </div>

          {/* Navigation */}
          <div className="flex gap-12">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-widest text-muted">
                Pages
              </p>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/#work"
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  Work
                </Link>
                <Link
                  href="/process"
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  Process
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  About
                </Link>
              </nav>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-widest text-muted">
                Connect
              </p>
              <nav className="flex flex-col gap-2">
                <a
                  href="mailto:hauwayusuf003@gmail.com"
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  Email
                </a>
                <a
                  href="https://wa.me/2349025722393"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href="https://cal.com/hauwa-yusuf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  Book a call
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted md:flex-row">
          <p>&copy; {new Date().getFullYear()} Hauwa Yusuf. All rights reserved.</p>
          <p>Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
