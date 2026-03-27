import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.1em] transition-all duration-500";

  const variants = {
    primary:
      "bg-foreground text-background hover:bg-foreground/90",
    secondary:
      "border border-foreground/20 text-foreground hover:text-background",
  };

  const inner = variant === "secondary" ? (
    <>
      <span className="absolute inset-0 -translate-y-full bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
      <span className="relative">{children}</span>
    </>
  ) : (
    <span className="relative">{children}</span>
  );

  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
