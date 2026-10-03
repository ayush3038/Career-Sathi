import { getSupabaseAdmin } from "../config/supabase";
import { Career, Pathway, Roadmap } from "../types";

export async function listCareers(): Promise<Career[]> {
  const { data, error } = await getSupabaseAdmin().from("careers").select("*");
  if (error) throw new Error(error.message);
  return (data ?? []) as Career[];
}

export async function getCareer(id: string): Promise<Career | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("careers")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as Career) ?? null;
}

export async function listPathways(careerId?: string): Promise<Pathway[]> {
  let q = getSupabaseAdmin().from("pathways").select("*");
  if (careerId) q = q.eq("career_id", careerId);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return (data ?? []) as Pathway[];
}

export async function getRoadmap(userId: string, pathwayId: string): Promise<Roadmap | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("roadmaps")
    .select("*, roadmap_milestones(*)")
    .eq("user_id", userId)
    .eq("pathway_id", pathwayId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as unknown as Roadmap | null;
}

export async function saveRoadmap(userId: string, roadmap: Roadmap) {
  const { error } = await getSupabaseAdmin()
    .from("roadmaps")
    .upsert({ user_id: userId, pathway_id: roadmap.pathwayId, title: roadmap.title });
  if (error) throw new Error(error.message);
  return roadmap;
}

export async function updateMilestoneStatus(
  userId: string,
  milestoneId: string,
  status: "completed" | "in_progress" | "upcoming"
) {
  const { error } = await getSupabaseAdmin()
    .from("roadmap_milestones")
    .update({ status })
    .eq("id", milestoneId)
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
}
