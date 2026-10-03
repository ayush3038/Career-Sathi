import { Page } from "../layouts/AppLayout";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { session } = useAuth();
  const meta = (session?.user?.user_metadata ?? {}) as Record<string, unknown>;

  return (
    <Page>
      <section className="flex items-center gap-4 border-b border-slate-200 pb-6">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-navy text-2xl font-bold text-saffron">
          {((meta.full_name as string) ?? session?.user?.email ?? "?").slice(0, 1).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-navy">{(meta.full_name as string) ?? "Unnamed user"}</h2>
          <p className="text-sm text-slate-600">{(meta.role as string) ?? "Student"} | {session?.user?.email}</p>
        </div>
      </section>

      <section className="border border-slate-200 bg-white p-5">
        <h3 className="font-semibold text-navy">Account</h3>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          <div><dt className="text-xs uppercase text-slate-400">Full name</dt><dd>{(meta.full_name as string) ?? "-"}</dd></div>
          <div><dt className="text-xs uppercase text-slate-400">Email</dt><dd>{session?.user?.email ?? "-"}</dd></div>
          <div><dt className="text-xs uppercase text-slate-400">Role</dt><dd>{(meta.role as string) ?? "Student"}</dd></div>
        </dl>
      </section>

      <section className="border border-slate-200 bg-white p-5">
        <h3 className="font-semibold text-navy">Career DNA</h3>
        <p className="mt-1 text-sm text-slate-600">Your structured profile powers recommendations and roadmaps.</p>
        <a href="/career-dna" className="mt-3 inline-block text-sm font-semibold text-saffron-600">Edit Career DNA</a>
      </section>
    </Page>
  );
}
