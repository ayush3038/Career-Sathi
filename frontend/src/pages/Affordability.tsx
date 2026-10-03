import { useEffect, useState } from "react";
import { Page } from "../layouts/AppLayout";
import { api } from "../services/api";
import { EmptyState, ErrorState, Loading } from "../components/common/states";

export default function Affordability() {
  const [entries, setEntries] = useState<Array<Record<string, unknown>> | null>(null);
  const [scholarships, setScholarships] = useState<Array<Record<string, unknown>> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.getAffordability(), api.getScholarships()])
      .then(([a, s]) => {
        setEntries(a.entries as Array<Record<string, unknown>>);
        setScholarships(s.scholarships as Array<Record<string, unknown>>);
      })
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!entries || !scholarships) return <Loading label="Loading affordability data..." />;

  return (
    <Page>
      <section>
        <h3 className="mb-2 font-semibold text-navy">Estimated pathway costs</h3>
        {entries.length === 0 ? (
          <EmptyState title="Cost data unavailable" message="Verified fee figures have not been loaded for your selected pathways yet." />
        ) : (
          <table className="w-full border-collapse border border-slate-200 bg-white text-sm">
            <thead><tr className="bg-slate-50 text-left"><th className="border px-3 py-2">Pathway</th><th className="border px-3 py-2">Cost</th><th className="border px-3 py-2">Source</th></tr></thead>
            <tbody>{entries.map((e, i) => <tr key={i}><td className="border px-3 py-2">{String(e.pathway ?? "-")}</td><td className="border px-3 py-2">{String(e.cost ?? "-")}</td><td className="border px-3 py-2">{String(e.source ?? "-")}</td></tr>)}</tbody>
          </table>
        )}
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-navy">Scholarships & funding</h3>
        {scholarships.length === 0 ? (
          <EmptyState title="No verified scholarships listed" message="We only display scholarship data from authoritative sources. Check back once verified records are available." />
        ) : (
          <ul className="space-y-2">
            {scholarships.map((s, i) => <li key={i} className="border border-slate-200 bg-white p-4 text-sm">{JSON.stringify(s)}</li>)}
          </ul>
        )}
      </section>

      <section className="border border-slate-200 bg-white p-5">
        <h3 className="font-semibold text-navy">Affordability considerations</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
          <li>Compare total training cost against your stated budget band.</li>
          <li>Prefer government-supported pathways where eligibility allows.</li>
          <li>Factor in travel, tools and materials, not just tuition.</li>
        </ul>
      </section>
    </Page>
  );
}
