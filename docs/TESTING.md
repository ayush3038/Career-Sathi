# Testing

- Unit: `cd backend && npm test` covers recommendation scoring, ranking order and roadmap milestones.
- Behavioral checks (manual/E2E plan):
  - Register → Login → Onboarding → Profile → Preferences → Career Explorer → Recommendation → Family Decision → Affordability → Roadmap → Logout.
  - Changing profile/preferences changes recommendation context.
  - Changing selected pathway changes roadmap context.
  - Refresh while authenticated restores the Supabase session.
  - Logout blocks protected routes.
- TypeScript: `npm run typecheck` in both `backend` and `frontend`.
- Build: `npm run build` at repo root.
