import { Request, Response } from "express";
import { getSupabaseAnon, getSupabaseAdmin } from "../config/supabase";

export async function register(req: Request, res: Response) {
  const { fullName, email, password, role } = req.body ?? {};
  if (!fullName || !email || !password || !role) {
    res.status(400).json({ error: "validation_error", message: "fullName, email, password and role are required." });
    return;
  }
  if (!["Student", "Parent", "Counsellor"].includes(role)) {
    res.status(400).json({ error: "validation_error", message: "Invalid role." });
    return;
  }
  try {
    const supabase = getSupabaseAnon();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    });
    if (error) {
      res.status(400).json({ error: "registration_failed", message: error.message });
      return;
    }
    res.status(201).json({ user: { id: data.user?.id, email, role, fullName }, session: data.session });
  } catch (err) {
    res.status(503).json({ error: "service_unavailable", message: err instanceof Error ? err.message : "Auth unavailable." });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    res.status(400).json({ error: "validation_error", message: "email and password are required." });
    return;
  }
  try {
    const supabase = getSupabaseAnon();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      res.status(401).json({ error: "invalid_credentials", message: "Invalid email or password." });
      return;
    }
    res.json({ user: data.user, session: data.session });
  } catch (err) {
    res.status(503).json({ error: "service_unavailable", message: err instanceof Error ? err.message : "Auth unavailable." });
  }
}

export async function logout(req: Request, res: Response) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (token) {
    try {
      const admin = getSupabaseAdmin();
      await admin.auth.admin.signOut(token);
    } catch {
      /* best-effort; client clears local session regardless */
    }
  }
  res.json({ ok: true });
}

export async function me(req: Request, res: Response) {
  res.json({ user: req.user ?? null });
}
