# database/

PostgreSQL (Supabase) schema for CareerSathi V2.

## Contents

- `migrations/0001_init.sql` â€” initial relational schema (tables, FKs, indexes, constraints).
- `seed/001_seed.sql` â€” development seed catalogue of vocational careers.
  **Seed data is illustrative development data, not authoritative government statistics.**

## Apply

1. Configure `SUPABASE_URL`, `DATABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (see `.env.example`).
2. Run the migration against your project:
   ```bash
   psql "$DATABASE_URL" -f migrations/0001_init.sql
   ```
3. Seed development data:
   ```bash
   psql "$DATABASE_URL" -f seed/001_seed.sql
   ```

## Notes

- `affordability_entries` and `scholarships` are intentionally seeded empty;
  populate only from verified official sources (see `docs/DATA_SOURCES.md`).
- All tables carry UUIDs, foreign keys, timestamps and indexes where useful.
