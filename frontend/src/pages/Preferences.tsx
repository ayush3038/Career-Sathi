import { useEffect, useState } from "react";
import { Page } from "../layouts/AppLayout";
import { api } from "../services/api";

const DOMAINS = ["Technology", "Engineering & Technical Trades", "Healthcare", "Agriculture", "Manufacturing", "Construction", "Automotive", "Electronics", "Renewable Energy", "Logistics", "Tourism & Hospitality", "Retail & Services", "Design & Media", "Public Services", "Other Vocational Pathways"];
const WORK_ENVS = ["Office", "Field", "Workshop", "Laboratory", "Healthcare", "Outdoor", "Industrial", "Customer-facing", "Creative"];
const BUDGETS = ["Low", "Medium", "Flexible", "Any"];
const LOCATIONS = ["Local", "Same State", "Anywhere in India", "Remote where applicable"];
const DURATIONS = ["Short (under 6 months)", "6-12 months", "1-2 years", "Over 2 years"];
const GOV_PRIVATE = ["Government", "Private", "Either"];
const PATHWAYS = ["ITI", "Polytechnic", "Apprenticeship", "Certificate Course", "Diploma", "Degree", "On-the-job Training"];

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export default function Preferences() {
  const [p, setP] = useState({
    domains: [] as string[], workEnvironments: [] as string[], budget: "", location: "", trainingDuration: "", governmentPrivate: "Either", educationPathway: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getPreferences().then((r) => r.preferences && setP((prev) => ({ ...prev, ...(r.preferences as typeof prev) }))).catch(() => {});
  }, []);

  async function save() {
    await api.savePreferences(p);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <Page>
      <Section title="Career domains">
        <Chips options={DOMAINS} selected={p.domains} onToggle={(o) => setP({ ...p, domains: toggle(p.domains, o) })} />
      </Section>
      <Section title="Work environments">
        <Chips options={WORK_ENVS} selected={p.workEnvironments} onToggle={(o) => setP({ ...p, workEnvironments: toggle(p.workEnvironments, o) })} />
      </Section>
      <Section title="Budget">
        <Chips options={BUDGETS} selected={p.budget ? [p.budget] : []} onToggle={(o) => setP({ ...p, budget: o })} />
      </Section>
      <Section title="Location">
        <Chips options={LOCATIONS} selected={p.location ? [p.location] : []} onToggle={(o) => setP({ ...p, location: o })} />
      </Section>
      <Section title="Training duration">
        <Chips options={DURATIONS} selected={p.trainingDuration ? [p.trainingDuration] : []} onToggle={(o) => setP({ ...p, trainingDuration: o })} />
      </Section>
      <Section title="Government / Private">
        <Chips options={GOV_PRIVATE} selected={[p.governmentPrivate]} onToggle={(o) => setP({ ...p, governmentPrivate: o })} />
      </Section>
      <Section title="Education / Training pathway">
        <Chips options={PATHWAYS} selected={p.educationPathway ? [p.educationPathway] : []} onToggle={(o) => setP({ ...p, educationPathway: o })} />
      </Section>
      <div className="flex items-center gap-4">
        <button onClick={save} className="rounded-md bg-saffron px-5 py-2.5 font-semibold text-white">Save preferences</button>
        {saved && <span className="text-sm text-green-700">Saved. Recommendations will use updated context.</span>}
      </div>
    </Page>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-slate-200 bg-white p-5">
      <h3 className="mb-3 font-semibold text-navy">{title}</h3>
      {children}
    </section>
  );
}

function Chips({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (o: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button type="button" key={o} onClick={() => onToggle(o)}
          className={`rounded-full border px-3 py-1.5 text-sm ${selected.includes(o) ? "border-saffron bg-orange-50 text-saffron-600 font-medium" : "border-slate-300 bg-white text-slate-600"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}
