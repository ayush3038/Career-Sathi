import { test } from "node:test";
import assert from "node:assert/strict";
import { generateRecommendations, scoreCareer } from "../src/services/recommendationEngine";
import { generateRoadmap } from "../src/services/roadmapService";
import { Career } from "../src/types";

const careers: Career[] = [
  {
    id: "c1",
    name: "Electrician",
    domain: "Electronics",
    description: "Install and maintain electrical systems.",
    eligibility: "Class 10 pass",
    training: "ITI diploma",
    skills: ["wiring", "circuits", "safety"],
    duration: "2 years",
    workEnvironment: "Workshop",
  },
  {
    id: "c2",
    name: "Nursing Assistant",
    domain: "Healthcare",
    description: "Support patient care in clinics.",
    eligibility: "Class 12 pass",
    training: "Certificate course",
    skills: ["patient care", "hygiene", "empathy"],
    duration: "6-12 months",
    workEnvironment: "Healthcare",
  },
];

test("domain preference strongly boosts score", () => {
  const rec = scoreCareer(careers[0], { skills: ["wiring"], interests: [] }, { domains: ["Electronics"] });
  assert.ok(rec.matchScore >= 30);
  assert.ok(rec.reasons.some((r) => r.includes("Electronics")));
});

test("recommendations are ranked descending", () => {
  const recs = generateRecommendations({
    profile: { skills: ["patient care"] },
    preferences: { domains: ["Healthcare"] },
    careers,
  });
  assert.equal(recs[0].careerId, "c2");
});

test("roadmap has ordered milestones", () => {
  const rm = generateRoadmap("p1", "Electrician");
  assert.equal(rm.milestones[0].sequence, 1);
  assert.ok(rm.milestones.length >= 5);
});
