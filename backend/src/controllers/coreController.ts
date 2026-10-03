import { Request, Response } from "express";
import * as profileRepo from "../repositories/profileRepository";
import * as careersRepo from "../repositories/careersRepository";
import { generateRecommendations } from "../services/recommendationEngine";
import { generateRoadmap } from "../services/roadmapService";

export async function getProfile(req: Request, res: Response) {
  const profile = await profileRepo.getProfile(req.user!.id);
  res.json({ profile });
}

export async function saveProfile(req: Request, res: Response) {
  const profile = req.body?.profile ?? req.body;
  if (!profile || typeof profile !== "object") {
    res.status(400).json({ error: "validation_error", message: "profile object required." });
    return;
  }
  res.json({ profile: await profileRepo.upsertProfile(req.user!.id, profile) });
}

export async function getPreferences(req: Request, res: Response) {
  res.json({ preferences: await profileRepo.getPreferences(req.user!.id) });
}

export async function savePreferences(req: Request, res: Response) {
  const preferences = req.body?.preferences ?? req.body;
  if (!preferences || typeof preferences !== "object") {
    res.status(400).json({ error: "validation_error", message: "preferences object required." });
    return;
  }
  res.json({ preferences: await profileRepo.upsertPreferences(req.user!.id, preferences) });
}

export async function listCareers(_req: Request, res: Response) {
  res.json({ careers: await careersRepo.listCareers() });
}

export async function listPathways(req: Request, res: Response) {
  res.json({ pathways: await careersRepo.listPathways(req.query.careerId as string | undefined) });
}

export async function getRecommendations(req: Request, res: Response) {
  const [profile, preferences, careers] = await Promise.all([
    profileRepo.getProfile(req.user!.id),
    profileRepo.getPreferences(req.user!.id),
    careersRepo.listCareers(),
  ]);
  const recommendations = generateRecommendations({ profile, preferences, careers });
  res.json({ recommendations, generatedFrom: { hasProfile: Boolean(profile), hasPreferences: Boolean(preferences) } });
}

export async function getRoadmap(req: Request, res: Response) {
  const pathwayId = String(req.query.pathwayId ?? "");
  if (!pathwayId) {
    res.status(400).json({ error: "validation_error", message: "pathwayId query param required." });
    return;
  }
  const existing = await careersRepo.getRoadmap(req.user!.id, pathwayId);
  if (existing) {
    res.json({ roadmap: existing });
    return;
  }
  const career = (await careersRepo.listCareers()).find(
    (c) => c.id === pathwayId || c.name.toLowerCase().includes(pathwayId.toLowerCase())
  );
  const roadmap = generateRoadmap(pathwayId, career?.name ?? "Selected pathway");
  await careersRepo.saveRoadmap(req.user!.id, roadmap);
  res.status(201).json({ roadmap });
}

export async function updateMilestone(req: Request, res: Response) {
  const { milestoneId, status } = req.body ?? {};
  if (!milestoneId || !["completed", "in_progress", "upcoming"].includes(status)) {
    res.status(400).json({ error: "validation_error", message: "milestoneId and valid status required." });
    return;
  }
  await careersRepo.updateMilestoneStatus(req.user!.id, milestoneId, status);
  res.json({ ok: true });
}
