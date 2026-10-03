import { Loader2 } from "lucide-react";

export function Loading({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-600 py-10" role="status">
      <Loader2 className="h-5 w-5 animate-spin" /> {label}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="border border-red-200 bg-red-50 text-red-800 px-4 py-3 rounded-md" role="alert">
      {message}
    </div>
  );
}

export function EmptyState({ title, message, cta }: { title: string; message: string; cta?: React.ReactNode }) {
  return (
    <div className="border border-dashed border-slate-300 bg-white px-6 py-10 text-center rounded-md">
      <h3 className="font-semibold text-navy">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{message}</p>
      {cta && <div className="mt-4">{cta}</div>}
    </div>
  );
}

export function ConfigWarning() {
  return (
    <div className="border border-amber-300 bg-amber-50 text-amber-900 px-4 py-3 rounded-md text-sm">
      Supabase is not configured. Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in{" "}
      <code>frontend/.env</code> (see <code>.env.example</code>) to enable authentication and live data.
    </div>
  );
}
