import { Roadmap, RoadmapMilestone } from "../types";

/** Deterministic roadmap templates per domain family. */
const TEMPLATES: Record<string, Array<Omit<RoadmapMilestone, "id" | "status">>> = {};

const DEFAULT_TEMPLATE: Array<Omit<RoadmapMilestone, "id" | "status">> = [
  { sequence: 1, title: "Explore & shortlist", description: "Review the pathway, eligibility and local providers.", estimatedDuration: "1-2 weeks", action: "Shortlist 2-3 training providers", nextStep: "Check eligibility" },
  { sequence: 2, title: "Confirm eligibility", description: "Verify academic requirements and required documents.", estimatedDuration: "1 week", action: "Gather documents", nextStep: "Apply" },
  { sequence: 3, title: "Enrol in training", description: "Complete admission into the selected course/trade.", estimatedDuration: "6-24 months", action: "Complete enrolment", nextStep: "Attend training" },
  { sequence: 4, title: "Skill development", description: "Build the core skills listed for this pathway.", estimatedDuration: "Throughout training", action: "Track skills weekly", nextStep: "Seek assessment" },
  { sequence: 5, title: "Assessment & certification", description: "Clear required assessments or certification exams.", estimatedDuration: "1-3 months", action: "Register for assessment", nextStep: "Apply for roles" },
  { sequence: 6, title: "First role / apprenticeship", description: "Apply for entry roles or apprenticeships in the domain.", estimatedDuration: "1-6 months", action: "Prepare resume & interviews", nextStep: "Review progress" },
];

export function generateRoadmap(pathwayId: string, careerTitle: string): Roadmap {
  const milestones: RoadmapMilestone[] = DEFAULT_TEMPLATE.map((m, i) => ({
    ...m,
    id: `${pathwayId}-m${i + 1}`,
    status: i === 0 ? "in_progress" : "upcoming",
  }));
  return { pathwayId, title: `${careerTitle} — Roadmap`, milestones };
}
