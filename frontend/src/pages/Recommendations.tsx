import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Page } from "../layouts/AppLayout";
import { api, Recommendation } from "../services/api";
import { EmptyState, ErrorState, Loading } from "../components/common/states";

export default function Recommendations() {
  const [recs, setRecs] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getRecommendations().then((r) => setRecs(r.recommendations)).catch((e) => setError(e.message));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!recs) return <Loading label="Generating recommendations..." />;
  if (recs.length === 0)
    return (
      <EmptyState
        title="No recommendations yet"
        message="Complete your profile and preferences to generate pathways."
        cta={<Link to="/career-dna" className="rounded-md bg-saffron px-4 py-2 text-sm font-semibold text-white">Complete Career DNA</Link>}
      />
    );

  const top = recs[0];

  return (
    <Page>
      <header className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-navy">Your Career Recommendations</h2>
        <p className="text-sm text-slate-600">Prototype ranking - deterministic scoring over verified pathway data. Not a guaranteed fit.</p>
      </header>

      <section className="border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold text-navy">Primary recommendation</h3>
          <span className="text-sm text-slate-500">Match Score</span>
        </div>
        <div className="mt-2 text-4xl font-bold text-saffron-600">{top.matchScore}<span className="text-base text-slate-500"> /100</span></div>
        <h4 className="mt-3 font-semibold text-navy">Why it fits</h4>
        <ul className="mt-1 list-disc pl-5 text-sm text-slate-600">
          {top.reasons.map((r) => <li key={r}>{r}</li>)}
        </ul>
        {top.constraints.length > 0 && (
          <>
            <h4 className="mt-3 font-semibold text-navy">Constraints noted</h4>
            <ul className="mt-1 list-disc pl-5 text-sm text-amber-700">
              {top.constraints.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </>
        )}
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <div><dt className="text-xs uppercase text-slate-400">Training Pathway</dt><dd>{top.training}</dd></div>
          <div><dt className="text-xs uppercase text-slate-400">Key Skills</dt><dd>{top.skills.join(", ")}</dd></div>
          <div><dt className="text-xs uppercase text-slate-400">Next Action</dt><dd>{top.nextSteps[0]}</dd></div>
        </dl>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-navy">Alternative options</h3>
        <div className="divide-y divide-slate-200 border border-slate-200 bg-white">
          {recs.slice(1).map((r) => (
            <div key={r.careerId} className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="text-navy font-medium">Career #{r.careerId.slice(0, 6)}</span>
              <span className="text-saffron-600 font-semibold">{r.matchScore}/100</span>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
