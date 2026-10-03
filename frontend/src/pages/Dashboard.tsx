import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Page } from "../layouts/AppLayout";
import { api, Recommendation } from "../services/api";
import { EmptyState, ErrorState, Loading } from "../components/common/states";

export default function Dashboard() {
  const [recs, setRecs] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getRecommendations()
      .then((r) => setRecs(r.recommendations))
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!recs) return <Loading label="Loading your decision centre..." />;

  const top = recs[0];

  return (
    <Page>
      <section className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-navy">Welcome back</h2>
        <p className="text-sm text-slate-600">Here is where your career decision stands today.</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h3 className="mb-2 font-semibold text-navy">Primary recommendation</h3>
            {top ? (
              <div className="border border-slate-200 bg-white p-5">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-lg font-bold text-navy">Career #{top.careerId.slice(0, 6)}</h4>
                  <span className="text-sm text-slate-500">Prototype Ranking</span>
                </div>
                <div className="mt-2 text-3xl font-bold text-saffron-600">{top.matchScore}<span className="text-base text-slate-500"> /100 match score</span></div>
                <ul className="mt-3 list-disc pl-5 text-sm text-slate-600">
                  {top.reasons.slice(0, 3).map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
            ) : (
              <EmptyState
                title="No recommendations yet"
                message="Complete your profile and preferences to generate pathways."
                cta={<Link to="/career-dna" className="rounded-md bg-saffron px-4 py-2 text-sm font-semibold text-white">Complete Career DNA</Link>}
              />
            )}
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-navy">Alternative pathways</h3>
            {recs.length > 1 ? (
              <div className="divide-y divide-slate-200 border border-slate-200 bg-white">
                {recs.slice(1, 4).map((r) => (
                  <div key={r.careerId} className="flex items-center justify-between px-4 py-3 text-sm">
                    <span className="text-navy font-medium">Career #{r.careerId.slice(0, 6)}</span>
                    <span className="text-saffron-600 font-semibold">{r.matchScore}/100</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">Alternatives will appear once recommendations are available.</p>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <section className="border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-navy">Next action</h3>
            <p className="mt-1 text-sm text-slate-600">{top?.nextSteps?.[0] ?? "Complete your Career DNA to get started."}</p>
            <Link to="/roadmap" className="mt-3 inline-block text-sm font-semibold text-saffron-600">Open roadmap</Link>
          </section>
          <section className="border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-navy">Quick actions</h3>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <Link className="rounded-md border border-slate-200 px-3 py-2 hover:bg-slate-50" to="/careers">Explore careers</Link>
              <Link className="rounded-md border border-slate-200 px-3 py-2 hover:bg-slate-50" to="/preferences">Preferences</Link>
              <Link className="rounded-md border border-slate-200 px-3 py-2 hover:bg-slate-50" to="/family-decision">Family view</Link>
              <Link className="rounded-md border border-slate-200 px-3 py-2 hover:bg-slate-50" to="/affordability">Affordability</Link>
            </div>
          </section>
        </aside>
      </div>
    </Page>
  );
}
