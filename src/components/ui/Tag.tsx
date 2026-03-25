interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block border border-border px-3 py-1 text-xs text-muted ${className}`}
    >
      {children}
    </span>
  );
}
