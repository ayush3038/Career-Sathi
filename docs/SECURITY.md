# Security

- Supabase Auth handles registration, login, sessions and refresh; passwords never touch our servers or logs.
- Backend validates every protected request via `supabase.auth.getUser(token)`; frontend stores only the standard Supabase session.
- No Base64 pseudo-JWTs, no plaintext passwords, no hardcoded credentials.
- Service-role key used only server-side; frontend holds only the anon key.
- Helmet, CORS whitelist, JSON body limits, no secret logging, generic error messages for unexpected failures.
- Role field (Student/Parent/Counsellor) is captured and available for checks; deeper RBAC must be added before privileged features.
