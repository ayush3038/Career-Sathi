# Decisions

- **Auth**: Supabase Auth replaces the in-memory Base64 prototype. Frontend uses supabase-js for session handling; backend validates Bearer tokens and also exposes `/api/auth/*` proxies.
- **Recommendations**: Deterministic TypeScript engine kept as the source of truth; a Python mirror exists for experimentation. Weights documented as prototype defaults.
- **Scholarships/affordability**: No fabricated values — tables ship empty with honest empty states.
- **Career catalogue**: Database-backed with seed data clearly labeled; no hardcoded arrays in React.
- **Roadmaps**: Generated server-side from templates keyed to pathway id, persisted per user, milestone status updatable.
- **Family decision**: Structured workspace, no forced ranking of preferences.
- **Dev UX**: Missing Supabase config yields a clear warning, never fake auth success.
- Uncertainty handling: UI reference file in the handoff was illegible (embedded PPTX XML); brand identity taken from the research dossier (deep navy + CareerSathi orange, restrained wordmark logo).
