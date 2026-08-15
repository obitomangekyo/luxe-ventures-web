export function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <p className="mb-4 font-body text-[10px] text-brand-detail uppercase tracking-[0.3em]">
        {eyebrow}
      </p>
      <h2 className="max-w-xl text-4xl leading-tight tracking-[-0.02em] sm:text-5xl">{title}</h2>
      {children}
    </div>
  );
}
