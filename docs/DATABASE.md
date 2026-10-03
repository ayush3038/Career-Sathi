# Database

Schema in `database/migrations/0001_init.sql`:

- `profiles`, `preferences`, `family_decisions` — per-user JSONB payloads keyed by `user_id`.
- `careers`, `pathways` — catalogue.
- `recommendations` — persisted matches (id, user, career, score, reasons, constraints).
- `roadmaps`, `roadmap_milestones` — per-user roadmap with status.
- `affordability_entries`, `scholarships` — verified rows only (ship empty).
- `audit_logs` — security-relevant actions.

Conventions: UUIDs, `on delete cascade`, FK indexes, `timestamptz` timestamps, check constraints for milestone status.

Relationships: one profile/preference set/family decision per user; many recommendations per user; many roadmaps per user; one roadmap has many milestones; one career has many pathways.
