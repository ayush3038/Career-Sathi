import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env, supabaseConfigured } from "./env";

let adminClient: SupabaseClient | null = null;

/** Service-role client. SERVER ONLY — never import from frontend code. */
export function getSupabaseAdmin(): SupabaseClient {
  if (!supabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env (see .env.example)."
    );
  }
  if (!adminClient) {
    adminClient = createClient(env.supabaseUrl!, env.supabaseServiceRoleKey!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}

export function getSupabaseAnon(): SupabaseClient {
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error("Supabase anon client is not configured.");
  }
  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
