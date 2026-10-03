import { getSupabaseAdmin } from "../config/supabase";
import { CareerDNAProfile, Preferences } from "../types";

export async function getProfile(userId: string): Promise<CareerDNAProfile | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("profiles")
    .select("data")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data?.data as CareerDNAProfile) ?? null;
}

export async function upsertProfile(userId: string, profile: CareerDNAProfile) {
  const { error } = await getSupabaseAdmin()
    .from("profiles")
    .upsert({ user_id: userId, data: profile, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  return profile;
}

export async function getPreferences(userId: string): Promise<Preferences | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("preferences")
    .select("data")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data?.data as Preferences) ?? null;
}

export async function upsertPreferences(userId: string, preferences: Preferences) {
  const { error } = await getSupabaseAdmin()
    .from("preferences")
    .upsert({ user_id: userId, data: preferences, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  return preferences;
}
