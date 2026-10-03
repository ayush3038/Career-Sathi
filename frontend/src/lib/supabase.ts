import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseConfigured = Boolean(url && anonKey);

// Placeholder client prevents crashes when env is not configured;
// auth calls are guarded by supabaseConfigured in the UI.
export const supabase = createClient(url ?? "http://localhost:54321", anonKey ?? "anon-key-not-configured");
