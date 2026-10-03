# Setup

1. **Install**: `cd backend && npm install`; `cd frontend && npm install`.
2. **Configure**: copy `.env.example` to `.env` (root or per-app) and set Supabase URL/keys. Backend needs `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`; frontend needs `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_BASE_URL`.
3. **Database**: run `database/migrations/0001_init.sql`, then `database/seed/001_seed.sql` against your database.
4. **Backend**: `cd backend && npm run dev` → http://localhost:4000 (`/api/health` to verify).
5. **Frontend**: `cd frontend && npm run dev` → http://localhost:5173.
6. Without Supabase keys the UI shows a configuration warning instead of faking auth.
