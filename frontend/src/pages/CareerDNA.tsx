import { useState } from "react";
import { Page } from "../layouts/AppLayout";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const STEPS = ["About You", "Academic", "Interests", "Skills", "Work Style", "Goals"];
const chips = (v: string, set: (s: string[]) => void, arr: string[], item: string) => {
  const on = arr.includes(item);
  set(on ? arr.filter((x) => x !== item) : [...arr, item]);
};

function ChipGroup({ label, options, selected, onToggle }: { label: string; options: string[]; selected: string[]; onToggle: (o: string) => void }) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-slate-700">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button type="button" key={o} onClick={() => onToggle(o)}
            className={`rounded-full border px-3 py-1.5 text-sm ${selected.includes(o) ? "border-saffron bg-orange-50 text-saffron-600 font-medium" : "border-slate-300 bg-white text-slate-600"}`}>
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function CareerDNA() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    academicBackground: "",
    subjects: [] as string[],
    interests: [] as string[],
    skills: [] as string[],
    workEnvironment: "",
    goals: "",
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  async function finish() {
    setSaving(true);
    try {
      await api.saveProfile({ ...form, onboardingComplete: true });
      navigate("/recommendations");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Page>
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="border border-slate-200 bg-white p-6">
          <ol className="flex flex-wrap gap-2 text-xs">
            {STEPS.map((s, i) => (
              <li key={s} className={`rounded-full px-3 py-1 ${i === step ? "bg-navy text-white" : i < step ? "bg-orange-100 text-saffron-600" : "bg-slate-100 text-slate-500"}`}>
                {i + 1}. {s}
              </li>
            ))}
          </ol>

          <div className="mt-6 space-y-5 min-h-[260px]">
            {step === 0 && (
              <label className="block text-sm font-medium">Academic level
                <input className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" value={form.academicBackground} onChange={(e) => setForm({ ...form, academicBackground: e.target.value })} placeholder="e.g. Class 10, ITI, Class 12, Polytechnic" />
              </label>
            )}
            {step === 1 && (
              <ChipGroup label="Subjects studied" options={["Maths", "Science", "Computers", "Commerce", "Arts", "Agriculture", "Mechanical", "Electrical", "Healthcare"]} selected={form.subjects}
                onToggle={(o) => chips("subjects", (s) => setForm({ ...form, subjects: s }), form.subjects, o)} />
            )}
            {step === 2 && (
              <ChipGroup label="Interests" options={["Technology", "Healthcare", "Agriculture", "Manufacturing", "Construction", "Automotive", "Electronics", "Renewable Energy", "Logistics", "Tourism & Hospitality", "Retail & Services", "Design & Media", "Public Services"]} selected={form.interests}
                onToggle={(o) => chips("interests", (s) => setForm({ ...form, interests: s }), form.interests, o)} />
            )}
            {step === 3 && (
              <ChipGroup label="Skills" options={["Hands-on work", "Communication", "Problem solving", "Driving", "Coding basics", "Welding", "Wiring", "Design", "Cooking", "Troubleshooting", "Teamwork", "Customer service"]} selected={form.skills}
                onToggle={(o) => chips("skills", (s) => setForm({ ...form, skills: s }), form.skills, o)} />
            )}
            {step === 4 && (
              <ChipGroup label="Preferred work environment" options={["Office", "Field", "Workshop", "Laboratory", "Healthcare", "Outdoor", "Industrial", "Customer-facing", "Creative"]} selected={form.workEnvironment ? [form.workEnvironment] : []}
                onToggle={(o) => setForm({ ...form, workEnvironment: o })} />
            )}
            {step === 5 && (
              <label className="block text-sm font-medium">Career goals
                <textarea className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" rows={4} value={form.goals} onChange={(e) => setForm({ ...form, goals: e.target.value })} placeholder="What do you want from your next five years?" />
              </label>
            )}
          </div>

          <div className="mt-6 flex justify-between">
            <button className="rounded-md border border-slate-300 px-4 py-2 text-sm" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
            {step < STEPS.length - 1 ? (
              <button className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white" onClick={() => setStep(step + 1)}>Continue</button>
            ) : (
              <button disabled={saving} className="rounded-md bg-saffron px-4 py-2 text-sm font-semibold text-white" onClick={finish}>
                {saving ? "Saving..." : "Generate Recommendations"}
              </button>
            )}
          </div>
        </div>

        <aside className="border border-slate-200 bg-white p-5 text-sm">
          <h3 className="font-semibold text-navy">Profile summary</h3>
          <dl className="mt-3 space-y-2 text-slate-600">
            <div><dt className="font-medium text-slate-800">Academic</dt><dd>{form.academicBackground || "-"}</dd></div>
            <div><dt className="font-medium text-slate-800">Subjects</dt><dd>{form.subjects.join(", ") || "-"}</dd></div>
            <div><dt className="font-medium text-slate-800">Interests</dt><dd>{form.interests.join(", ") || "-"}</dd></div>
            <div><dt className="font-medium text-slate-800">Skills</dt><dd>{form.skills.join(", ") || "-"}</dd></div>
            <div><dt className="font-medium text-slate-800">Work style</dt><dd>{form.workEnvironment || "-"}</dd></div>
          </dl>
          <p className="mt-4 text-xs text-slate-500">Prototype career-interest profile - not a psychometric assessment.</p>
        </aside>
      </div>
    </Page>
  );
}
