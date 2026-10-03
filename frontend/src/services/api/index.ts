import { apiFetch } from "./client";

export interface Career {
  id: string;
  name: string;
  domain: string;
  description: string;
  eligibility: string;
  training: string;
  skills: string[];
  duration: string;
  workEnvironment?: string;
}

export interface Recommendation {
  careerId: string;
  matchScore: number;
  reasons: string[];
  constraints: string[];
  skills: string[];
  training: string;
  nextSteps: string[];
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  sequence: number;
  status: "completed" | "in_progress" | "upcoming";
  estimatedDuration?: string;
  action?: string;
  nextStep?: string;
}

export interface Roadmap {
  pathwayId: string;
  title: string;
  milestones: RoadmapMilestone[];
}

export const api = {
  getProfile: () => apiFetch<{ profile: unknown }>("/api/profile"),
  saveProfile: (profile: unknown) => apiFetch("/api/profile", { method: "PUT", body: JSON.stringify(profile) }),
  getPreferences: () => apiFetch<{ preferences: unknown }>("/api/preferences"),
  savePreferences: (preferences: unknown) => apiFetch("/api/preferences", { method: "PUT", body: JSON.stringify(preferences) }),
  listCareers: () => apiFetch<{ careers: Career[] }>("/api/careers"),
  getRecommendations: () =>
    apiFetch<{ recommendations: Recommendation[]; generatedFrom: { hasProfile: boolean; hasPreferences: boolean } }>(
      "/api/recommendations"
    ),
  getRoadmap: (pathwayId: string) =>
    apiFetch<{ roadmap: Roadmap }>(`/api/roadmaps?pathwayId=${encodeURIComponent(pathwayId)}`),
  updateMilestone: (milestoneId: string, status: RoadmapMilestone["status"]) =>
    apiFetch("/api/roadmaps/milestones", { method: "PATCH", body: JSON.stringify({ milestoneId, status }) }),
  getFamily: () => apiFetch<{ decision: unknown }>("/api/family"),
  saveFamily: (d: unknown) => apiFetch("/api/family", { method: "PUT", body: JSON.stringify(d) }),
  getAffordability: () => apiFetch<{ entries: unknown[]; available: boolean }>("/api/affordability"),
  getScholarships: () => apiFetch<{ scholarships: unknown[]; available: boolean }>("/api/scholarships"),
  explain: (context: unknown) =>
    apiFetch<{ explanation: string; aiEnabled: boolean }>("/api/ai/explain", {
      method: "POST",
      body: JSON.stringify({ context }),
    }),
  health: () => apiFetch<{ status: string }>("/api/health"),
};
