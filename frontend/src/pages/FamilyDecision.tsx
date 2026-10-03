import { useState } from "react";
import { Page } from "../layouts/AppLayout";
import { useAuth } from "@/hooks/useAuth";
import { api } from "../services/api";

const FACTORS = ["Career", "Cost", "Location", "Training", "Skills", "Opportunity", "Constraints"];

export default function FamilyDecision() {
  const { session } = useAuth();
  const [student, setStudent] = useState<Record<string, string>>({});
  const [family, setFamily] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  async function save() {
    await api.saveFamily({ student, family });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <Page>
      <p className="text-sm text-slate-600 max-w-2xl">
        A structured workspace to understand each perspective. CareerSathi never declares a winner - it makes trade-offs explicit.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <fieldset className="border border-slate-200 bg-white p-5">
          <legend className="px-2 text-sm font-semibold text-navy">Student Priorities</legend>
          <div className="space-y-3">
            {FACTORS.map((f) => (
              <label key={f} className="block text-sm">
                <span className="text-slate-700">{f}</span>
                <input
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                  value={student[f] ?? ""}
                  onChange={(e) => setStudent({ ...student, [f]: e.target.value })}
                />
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="border border-slate-200 bg-white p-5">
          <legend className="px-2 text-sm font-semibold text-navy">Family Considerations</legend>
          <div className="space-y-3">
            {FACTORS.map((f) => (
              <label key={f} className="block text-sm">
                <span className="text-slate-700">{f}</span>
                <input
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                  value={family[f] ?? ""}
                  onChange={(e) => setFamily({ ...family, [f]: e.target.value })}
                />
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={save} className="rounded-md bg-saffron px-5 py-2.5 font-semibold text-white">Save comparison</button>
        {saved && <span className="text-sm text-green-700">Saved.</span>}
      </div>

      <section>
        <h3 className="font-semibold text-navy mb-2">Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse border border-slate-200 bg-white text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="border border-slate-200 px-3 py-2 w-1/4">Factor</th>
                <th className="border border-slate-200 px-3 py-2 w-3/8">Student</th>
                <th className="border border-slate-200 px-3 py-2 w-3/8">Family</th>
              </tr>
            </thead>
            <tbody>
              {FACTORS.map((f) => (
                <tr key={f}>
                  <td className="border border-slate-200 px-3 py-2 font-medium align-top">{f}</td>
                  <td className="border border-slate-200 px-3 py-2 break-words align-top">{student[f] || "-"}</td>
                  <td className="border border-slate-200 px-3 py-2 break-words align-top">{family[f] || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className="text-xs text-slate-500">Signed in as {session?.user?.email}. Entries are persisted per account.</p>
    </Page>
  );
}
