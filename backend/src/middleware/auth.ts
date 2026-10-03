import { NextFunction, Request, Response } from "express";
import { getSupabaseAdmin } from "../config/supabase";
import { AuthenticatedUser } from "../types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization ?? "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) {
      res.status(401).json({ error: "unauthorized", message: "Missing Bearer token." });
      return;
    }
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      res.status(401).json({ error: "unauthorized", message: "Invalid or expired session." });
      return;
    }
    const meta = (data.user.user_metadata ?? {}) as Record<string, unknown>;
    req.user = {
      id: data.user.id,
      email: data.user.email ?? "",
      role: (meta.role as AuthenticatedUser["role"]) ?? "Student",
      fullName: typeof meta.full_name === "string" ? meta.full_name : undefined,
    };
    next();
  } catch (err) {
    res.status(503).json({
      error: "service_unavailable",
      message: err instanceof Error ? err.message : "Authentication backend unavailable.",
    });
  }
}

export function requireRole(...roles: AuthenticatedUser["role"][]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: "unauthorized", message: "Authentication required." });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: "forbidden", message: "Insufficient role permissions." });
      return;
    }
    next();
  };
}
