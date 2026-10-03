export function CareerSathiLogo({ compact = false, short = false }: { compact?: boolean; short?: boolean }) {
  if (short) {
    return <img src="/logo-short.png" alt="Career Sathi logo" className="h-9 w-auto" />;
  }
  return (
    <div className="flex items-center gap-2.5">
      <img src="/logo-full-sm.png" alt="Career Sathi logo" className="h-10 w-auto" />
      {!compact && <span className="text-[11px] uppercase tracking-widest text-slate-500">Decision Support</span>}
    </div>
  );
}
