import { supabase } from "@/lib/supabase";

const BASE = (import.meta.env.VITE_API_BASE_URL as string) ?? "http://localhost:4000";

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...(await authHeaders()),
    ...(options.headers as Record<string, string> | undefined),
  };
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, { ...options, headers });
  } catch {
    throw new Error("Cannot reach the CareerSathi server. Make sure the backend is running on port 4000.");
  }
  if (res.status === 401) {
    throw new Error("Your session expired. Please sign in again.");
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((json as { message?: string }).message ?? `Request failed (${res.status})`);
  }
  return json as T;
}
