import { Response } from "express";

/** Tiny validation helpers — predictable 400 responses, no external deps. */

export function badRequest(res: Response, message: string, details?: unknown) {
  res.status(400).json({ error: "validation_error", message, details });
}

export function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

export function requireFields(
  body: Record<string, unknown>,
  fields: string[]
): string | null {
  for (const f of fields) {
    if (body[f] === undefined || body[f] === null || body[f] === "") return f;
  }
  return null;
}

export function asStringArray(v: unknown): string[] {
  if (isStringArray(v)) return v;
  return [];
}
