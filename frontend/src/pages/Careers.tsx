import { useEffect, useMemo, useState } from "react";
import { Page } from "../layouts/AppLayout";
import { api, Career } from "../services/api";
import { EmptyState, ErrorState, Loading } from "../components/common/states";

export default function Careers() {
  const [careers, setCareers] = useState<Career[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [domain, setDomain] = useState("All");

  useEffect(() => {
    api.listCareers().then((r) => setCareers(r.careers)).catch((e) => setError(e.message));
  }, []);

  const domains = useMemo(() => ["All", ...Array.from(new Set((careers ?? []).map((c) => c.domain)))], [careers]);
  const filtered = (careers ?? []).filter(
    (c) =>
      (domain === "All" || c.domain === domain) &&
      (c.name.toLowerCase().includes(q.toLowerCase()) || c.description.toLowerCase().includes(q.toLowerCase()))
  );

  if (error) return <ErrorState message={error} />;
  if (!careers) return <Loading label="Loading career catalogue..." />;

  return (
    <Page>
      <div className="grid gap-4 md:grid-cols-[1fr_200px]">
        <input
          aria-label="Search careers"
          placeholder="Search by career name or keyword..."
          className="rounded-md border border-slate-300 px-4 py-3"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select aria-label="Filter by domain" className="rounded-md border border-slate-300 px-3 py-3" value={domain} onChange={(e) => setDomain(e.target.value)}>
          {domains.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No careers found" message="Try a different search term or domain." />
      ) : (
        <div className="divide-y divide-slate-200 border border-slate-200 bg-white">
          {filtered.map((c) => (
            <article key={c.id} className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-navy">{c.name}</h3>
                <span className="rounded-full bg-orange-50 px-3 py-0.5 text-xs font-semibold text-saffron-600">{c.domain}</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">{c.description}</p>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <div><dt className="text-xs uppercase text-slate-400">Eligibility</dt><dd>{c.eligibility}</dd></div>
                <div><dt className="text-xs uppercase text-slate-400">Training</dt><dd>{c.training}</dd></div>
                <div><dt className="text-xs uppercase text-slate-400">Duration</dt><dd>{c.duration}</dd></div>
                <div><dt className="text-xs uppercase text-slate-400">Skills</dt><dd>{c.skills.slice(0, 3).join(", ")}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </Page>
  );
}
