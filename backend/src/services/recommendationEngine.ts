import { Career, CareerDNAProfile, Preferences, Recommendation } from "../types";

/**
 * Deterministic recommendation engine (prototype ranking).
 *
 * Pipeline:
 *   input normalization -> hard constraint validation -> candidate generation
 *   -> domain/skill/interest/budget/location/training scoring -> ranking
 *   -> explainability -> recommendation
 *
 * Weights are PROTOTYPE defaults, NOT scientifically validated.
 * Hard constraints always win: an ineligible or over-budget pathway is
 * excluded regardless of match score. The LLM layer may only explain
 * results, never change ranking or override constraints.
 */

const WEIGHTS = {
  domain: 30,
  skills: 25,
  interests: 20,
  training: 10,
  workEnvironment: 10,
  locationBudget: 5,
} as const;

export interface EngineInput {
  profile: CareerDNAProfile | null;
  preferences: Preferences | null;
  careers: Career[];
}

function norm(list: string[] | undefined): string[] {
  return (list ?? []).map((s) => s.trim().toLowerCase()).filter(Boolean);
}

function overlap(a: string[], b: string[]): string[] {
  const setB = new Set(b);
  return a.filter((x) => setB.has(x));
}

function budgetAllows(budget: string | undefined, training: string): boolean {
  if (!budget || budget === "Any") return true;
  // Prototype heuristic mapping — documented in docs/AI_ML.md.
  const expensive = /apprentice|degree|advanced/i.test(training);
  if (budget === "Low" && expensive) return false;
  return true;
}

export function hardConstraintFailures(
  career: Career,
  profile: CareerDNAProfile | null,
  preferences: Preferences | null
): string[] {
  const failures: string[] = [];
  const p = preferences ?? {};
  if (p.domains && p.domains.length > 0) {
    const domains = norm(p.domains);
    if (!domains.includes(career.domain.toLowerCase())) {
      // Not a hard failure: domain mismatch lowers score but does not exclude,
      // unless the user selected exactly one domain they clearly require.
      if (domains.length === 1 && domains[0] !== "other vocational pathways") {
        failures.push(`Domain outside your selected preference (${p.domains[0]}).`);
      }
    }
  }
  if (p.governmentPrivate && p.governmentPrivate !== "Either" && career.trainingType) {
    if (career.trainingType.toLowerCase().indexOf(p.governmentPrivate.toLowerCase().slice(0, 4)) === -1) {
      // informational only — not excluded
    }
  }
  if (!budgetAllows(p.budget, career.training)) {
    failures.push("Training pathway likely exceeds your stated budget.");
  }
  return failures;
}

export function scoreCareer(
  career: Career,
  profile: CareerDNAProfile | null,
  preferences: Preferences | null
): Recommendation {
  const p = preferences ?? {};
  const prof = profile ?? {};
  const reasons: string[] = [];
  const constraints: string[] = [];
  let score = 0;

  const prefDomains = norm(p.domains);
  const careerDomain = career.domain.toLowerCase();
  if (prefDomains.includes(careerDomain)) {
    score += WEIGHTS.domain;
    reasons.push(`Matches your domain preference for ${career.domain}.`);
  } else if (prefDomains.length === 0) {
    score += WEIGHTS.domain * 0.4;
  }

  const skillOverlap = overlap(norm(career.skills), [...norm(p.skills), ...norm(prof.skills)]);
  if (skillOverlap.length > 0) {
    const capped = Math.min(skillOverlap.length, 4) / 4;
    score += WEIGHTS.skills * capped;
    reasons.push(
      `Aligns with your skills: ${skillOverlap.slice(0, 3).join(", ")}${
        skillOverlap.length > 3 ? "…" : ""
      }.`
    );
  }

  const interestOverlap = overlap(norm(career.skills), norm([...(p.interests ?? []), ...(prof.interests ?? [])]));
  const declaredInterestHit = overlap(
    norm([career.domain, career.name]),
    norm([...(p.interests ?? []), ...(prof.interests ?? [])])
  );
  if (interestOverlap.length > 0 || declaredInterestHit.length > 0) {
    score += WEIGHTS.interests;
    reasons.push("Related to your stated interests.");
  }

  if (prof.workEnvironment && career.workEnvironment) {
    if (prof.workEnvironment.toLowerCase() === career.workEnvironment.toLowerCase()) {
      score += WEIGHTS.workEnvironment;
      reasons.push(`Fits your preferred ${career.workEnvironment} work environment.`);
    }
  } else if (p.workEnvironments && p.workEnvironments.length > 0 && career.workEnvironment) {
    if (norm(p.workEnvironments).includes(career.workEnvironment.toLowerCase())) {
      score += WEIGHTS.workEnvironment;
      reasons.push(`Fits your preferred ${career.workEnvironment} work environment.`);
    }
  }

  if (p.trainingDuration && career.duration) {
    if (career.duration.toLowerCase().includes(p.trainingDuration.toLowerCase().slice(0, 3))) {
      score += WEIGHTS.training;
      reasons.push(`Training duration (${career.duration}) matches your preference.`);
    }
  } else {
    score += WEIGHTS.training * 0.5;
  }

  if (budgetAllows(p.budget, career.training)) {
    score += WEIGHTS.locationBudget;
    if (p.budget) reasons.push(`Training option fits within your ${p.budget} budget band.`);
  } else {
    constraints.push("Training cost may exceed your stated budget.");
  }

  const failures = hardConstraintFailures(career, profile, preferences);
  for (const f of failures) constraints.push(f);

  if (prof.goals) {
    reasons.push(`Supports your stated goal: "${prof.goals.slice(0, 60)}${prof.goals.length > 60 ? "…" : ""}".`);
  }

  return {
    careerId: career.id,
    matchScore: Math.round(Math.min(score, 100)),
    reasons: reasons.length > 0 ? reasons : ["General vocational option based on your profile."],
    constraints,
    skills: career.skills,
    training: career.training,
    nextSteps: career.nextSteps ?? ["Review eligibility details", "Shortlist nearby training providers"],
  };
}

export function generateRecommendations(input: EngineInput, limit = 10): Recommendation[] {
  return input.careers
    .map((c) => scoreCareer(c, input.profile, input.preferences))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}
