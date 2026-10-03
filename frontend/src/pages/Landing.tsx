import { Link } from "react-router-dom";
import { PublicFooter, PublicHeader } from "../components/navigation/PublicHeader";

const STEPS = [
  ["1", "Profile", "Structured Career DNA"],
  ["2", "Career Matches", "Deterministic, explainable ranking"],
  ["3", "Compare", "Cost, skills, location, opportunity"],
  ["4", "Roadmap", "Milestones to your first role"],
];

const CAPABILITIES = [
  ["Career Explorer", "Backend-driven catalogue with search and filters."],
  ["Explainable Recommendations", "Match scores with visible reasons and constraints."],
  ["Family Decision Support", "Structured comparison, no forced winner."],
  ["Affordability View", "Only verified figures; honest empty states."],
  ["Roadmaps", "Pathway-specific milestones you can track."],
  ["AI Explanations", "LLMs explain verified context - never override constraints."],
];

export default function Landing() {
  return (
    <div>
      <PublicHeader />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-saffron-600">For students, parents & counsellors</p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-navy lg:text-6xl">
              Make Better Career Decisions.
              <span className="block text-saffron-600">Together.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              CareerSathi connects your profile, vocational pathways, family priorities and budget - so your next step is
              explainable, affordable and realistic. Decision support, not a verdict.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="rounded-md bg-saffron px-6 py-3.5 font-semibold text-white hover:bg-saffron-600">Get Started</Link>
              <Link to="/login" className="rounded-md border border-slate-300 px-6 py-3.5 font-semibold text-navy hover:bg-slate-50">Explore Careers</Link>
            </div>
          </div>
          <div className="border border-slate-200 bg-sand p-8 rounded-lg">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">How it works</div>
            <ol className="mt-6 space-y-5">
              {STEPS.map(([n, t, d]) => (
                <li key={n} className="flex items-center gap-4 border-b border-slate-200 pb-5 last:border-0">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-white text-sm font-bold">{n}</span>
                  <span className="text-base"><span className="font-semibold text-navy">{t}</span> - {d}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20" id="how">
        <h2 className="text-3xl font-bold text-navy">The problem</h2>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Vocational information is scattered across portals, families see only part of the picture, and learners are left
          choosing without a connected view of eligibility, cost and opportunity.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20" id="capabilities">
        <h2 className="text-3xl font-bold text-navy">Core capabilities</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {CAPABILITIES.map(([t, d]) => (
            <div key={t} className="border-l-2 border-saffron pl-5">
              <h3 className="text-lg font-semibold text-navy">{t}</h3>
              <p className="mt-1 text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20" id="journey">
        <h2 className="text-3xl font-bold text-navy">Decision journey</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {["Student Profile", "Career Exploration", "Vocational Pathways", "Constraint Validation", "Recommendations", "Comparison", "Affordability", "Skills", "Roadmap", "Action"].map((s, i) => (
            <span key={s} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm">
              <span className="text-saffron-600 font-semibold mr-1.5">{i + 1}.</span>{s}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 text-center">
        <h2 className="text-3xl font-bold text-navy">Ready to decide with clarity?</h2>
        <p className="mt-3 text-slate-600">Create your free account and build your Career DNA in minutes.</p>
        <Link to="/register" className="mt-6 inline-block rounded-md bg-navy px-8 py-4 font-semibold text-white">Create your account</Link>
      </section>

      <PublicFooter />
    </div>
  );
}
