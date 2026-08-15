export function Footer() {
  return (
    <footer className="border-brand-text/10 border-t">
      <div className="container mx-auto flex flex-col justify-between gap-4 px-5 py-8 font-body text-[10px] text-brand-text/50 uppercase tracking-[0.18em] sm:flex-row xl:px-10">
        <p className="flex items-center gap-2">
          &copy;
          {new Date().getFullYear()} Luxe Ventures
        </p>
        <p>Events wrapped in luxury.</p>
      </div>
    </footer>
  );
}
