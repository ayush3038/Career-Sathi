# API Inventory

All application endpoints require `Authorization: Bearer <supabase-access-token>` unless noted.

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Health check (public) |
| POST | `/api/auth/register` | Register via Supabase Auth |
| POST | `/api/auth/login` | Login via Supabase Auth |
| POST | `/api/auth/logout` | Best-effort revoke |
| GET | `/api/auth/me` | Current user |
| GET/PUT | `/api/profile` | Career DNA profile |
| GET/PUT | `/api/preferences` | Preferences |
| GET | `/api/careers` | Career catalogue |
| GET | `/api/pathways?careerId=` | Pathways |
| GET | `/api/recommendations` | Deterministic engine output |
| GET | `/api/roadmaps?pathwayId=` | Fetch/create user roadmap |
| PATCH | `/api/roadmaps/milestones` | Update milestone status |
| GET/PUT | `/api/family` | Family decision workspace |
| GET | `/api/affordability` | Verified cost entries |
| GET | `/api/scholarships` | Verified scholarships |
| POST | `/api/ai/explain` | Structured-context AI explanation |

Errors: `{ error, message, details? }` with appropriate HTTP codes.
