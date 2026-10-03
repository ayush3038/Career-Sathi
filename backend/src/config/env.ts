import dotenv from "dotenv";
dotenv.config();

export interface EnvConfig {
  port: number;
  nodeEnv: string;
  supabaseUrl: string | null;
  supabaseServiceRoleKey: string | null;
  supabaseAnonKey: string | null;
  corsOrigin: string;
  databaseUrl: string | null;
}

function val(key: string): string | null {
  const v = process.env[key];
  return v && v.trim() !== "" ? v : null;
}

export const env: EnvConfig = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  supabaseUrl: val("SUPABASE_URL") ?? val("VITE_SUPABASE_URL"),
  supabaseServiceRoleKey: val("SUPABASE_SERVICE_ROLE_KEY"),
  supabaseAnonKey: val("SUPABASE_ANON_KEY") ?? val("VITE_SUPABASE_ANON_KEY"),
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  databaseUrl: val("DATABASE_URL"),
};

export function supabaseConfigured(): boolean {
  return Boolean(env.supabaseUrl && env.supabaseServiceRoleKey);
}
