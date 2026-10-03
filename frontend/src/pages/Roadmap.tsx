import { useState } from "react";
import { Page } from "../layouts/AppLayout";
import { api, Roadmap } from "../services/api";
import { EmptyState, ErrorState } from "../components/common/states";

export default function RoadmapPage() {
  const [pathwayId, setPathwayId] = useState("");
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!pathwayId.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const r = await api.getRoadmap(pathwayId.trim());
      setRoadmap(r.roadmap);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load roadmap");
    } finally {
      setLoading(false);
    }
  }

  async function setStatus(id: string, status: "completed" | "in_progress" | "upcoming") {
    try {
      await api.updateMilestone(id, status);
      setRoadmap((rm) => rm && { ...rm, milestones: rm.milestones.map((m) => (m.id === id ? { ...m, status } : m)) });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update milestone");
    }
  }

  return (
    <Page>
      <div className="flex flex-wrap gap-2">
        <input
          aria-label="Pathway id"
          className="rounded-md border border-slate-300 px-3 py-2"
          placeholder="Enter pathway / career id"
          value={pathwayId}
          onChange={(e) => setPathwayId(e.target.value)}
        />
        <button className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white" onClick={load}>
          {loading ? "Loading..." : "Load roadmap"}
        </button>
      </div>

      {error && <ErrorState message={error} />}

      {!roadmap && !error && (
        <EmptyState title="No roadmap loaded" message="Pick a recommended pathway to see its milestones." />
      )}

      {roadmap && (
        <>
          <h3 className="text-lg font-bold text-navy">{roadmap.title}</h3>
          <ol className="relative border-l-2 border-slate-200 ml-2 space-y-6">
            {roadmap.milestones.map((m) => (
              <li key={m.id} className="ml-6">
                <span className={`absolute -left-[9px] block h-4 w-4 rounded-full border-2 ${m.status === "completed" ? "bg-saffron border-saffron" : m.status === "in_progress" ? "bg-white border-navy" : "bg-white border-slate-300"}`} />
                <div className="border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-navy">{m.title}</h4>
                    <select
                      aria-label={`Status for ${m.title}`}
                      className="rounded border border-slate-300 px-2 py-1 text-xs"
                      value={m.status}
                      onChange={(e) => setStatus(m.id, e.target.value as typeof m.status)}
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="in_progress">In progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{m.description}</p>
                  <p className="mt-2 text-xs text-slate-500">
                    {m.estimatedDuration && <> {m.estimatedDuration} | </>}
                    {m.action && <>Next: {m.action}</>}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}
    </Page>
  );
}
