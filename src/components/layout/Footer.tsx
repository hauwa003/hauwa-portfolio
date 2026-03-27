import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Left */}
          <div className="space-y-4">
            <Link
              href="/"
              className="font-display text-xl tracking-[-0.04em] transition-opacity duration-300 hover:opacity-60"
            >
              hauwa<span className="text-accent">.</span>design
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Product Designer & Framer Developer
              <br />
              Abuja, Nigeria
            </p>
          </div>

          {/* Navigation columns */}
          <div className="flex gap-16 md:gap-20">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                Pages
              </p>
              <nav className="flex flex-col gap-3">
                {[
                  { href: "/explorations", label: "Explorations" },
                  { href: "/gallery", label: "Gallery" },
                  { href: "/process", label: "Process" },
                  { href: "/about", label: "About" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="link-underline w-fit text-sm text-foreground transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                Get in Touch
              </p>
              <nav className="flex flex-col gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted">
                    Email
                  </p>
                  <a
                    href="mailto:hauwayusuf003@gmail.com"
                    className="link-underline mt-0.5 inline-block text-sm text-foreground transition-colors duration-300 hover:text-accent"
                  >
                    hauwayusuf003@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/2349025722393"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-0.5 inline-block text-sm text-foreground transition-colors duration-300 hover:text-accent"
                  >
                    +234 902 572 2393
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted">
                    Book a call
                  </p>
                  <a
                    href="https://cal.com/hauwa-yusuf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-0.5 inline-block text-sm text-foreground transition-colors duration-300 hover:text-accent"
                  >
                    cal.com/hauwa-yusuf
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 md:flex-row">
          <p className="text-sm tracking-wide text-muted">
            &copy; {new Date().getFullYear()} Hauwa Yusuf
          </p>
          <p className="text-sm tracking-wide text-muted">
            Built with Next.js &middot; Designed with care
          </p>
        </div>
      </div>
    </footer>
  );
}
