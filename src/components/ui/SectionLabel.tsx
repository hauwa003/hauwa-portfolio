interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`text-xs font-medium uppercase tracking-widest text-muted ${className}`}
    >
      {children}
    </p>
  );
}
