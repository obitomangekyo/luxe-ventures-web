type EyebrowProps = { children: string; className?: string };

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return <p className={`font-bold text-xs uppercase tracking-[0.22em] ${className}`}>{children}</p>;
}
