import { useState } from "react";
import { Page } from "../layouts/AppLayout";
import { useAuth } from "@/hooks/useAuth";

const PANELS = ["Account", "Preferences", "Security"] as const;

export default function Settings() {
  const [active, setActive] = useState<(typeof PANELS)[number]>("Account");
  const { session, signOut } = useAuth();

  return (
    <Page>
      <div className="grid gap-6 md:grid-cols-[200px_1fr]">
        <nav className="flex md:flex-col gap-2">
          {PANELS.map((p) => (
            <button key={p} onClick={() => setActive(p)}
              className={`rounded-md px-3 py-2 text-left text-sm ${active === p ? "bg-navy text-white" : "hover:bg-slate-100 text-slate-600"}`}>
              {p}
            </button>
          ))}
        </nav>
        <div className="border border-slate-200 bg-white p-6 min-h-[220px]">
          {active === "Account" && (
            <div className="text-sm text-slate-600 space-y-2">
              <p><span className="font-medium text-navy">Email:</span> {session?.user?.email}</p>
              <p><span className="font-medium text-navy">Role:</span> {(session?.user?.user_metadata as Record<string, unknown>)?.role as string ?? "Student"}</p>
            </div>
          )}
          {active === "Preferences" && (
            <p className="text-sm text-slate-600">Manage recommendation inputs on the <a className="text-saffron-600 underline" href="/preferences">Preferences</a> page.</p>
          )}
          {active === "Security" && (
            <div className="text-sm text-slate-600 space-y-3">
              <p>Sessions are managed by Supabase Auth. Signing out clears your local session.</p>
              <button onClick={signOut} className="rounded-md border border-red-300 text-red-700 px-4 py-2">Sign out</button>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}
