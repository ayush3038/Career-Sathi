import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../middleware/errorHandler";
import {
  getProfile,
  saveProfile,
  getPreferences,
  savePreferences,
  listCareers,
  listPathways,
  getRecommendations,
  getRoadmap,
  updateMilestone,
} from "../controllers/coreController";
import {
  getFamilyDecision,
  saveFamilyDecision,
  getAffordability,
  listScholarships,
  aiExplain,
} from "../controllers/decisionController";

export const apiRouter = Router();

const authed = Router();
authed.use(requireAuth);

authed.get("/profile", asyncHandler(getProfile));
authed.put("/profile", asyncHandler(saveProfile));
authed.get("/preferences", asyncHandler(getPreferences));
authed.put("/preferences", asyncHandler(savePreferences));
authed.get("/careers", asyncHandler(listCareers));
authed.get("/pathways", asyncHandler(listPathways));
authed.get("/recommendations", asyncHandler(getRecommendations));
authed.get("/roadmaps", asyncHandler(getRoadmap));
authed.patch("/roadmaps/milestones", asyncHandler(updateMilestone));
authed.get("/family", asyncHandler(getFamilyDecision));
authed.put("/family", asyncHandler(saveFamilyDecision));
authed.get("/affordability", asyncHandler(getAffordability));
authed.get("/scholarships", asyncHandler(listScholarships));
authed.post("/ai/explain", asyncHandler(aiExplain));

apiRouter.use(authed);
