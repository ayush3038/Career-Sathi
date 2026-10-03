# Architecture

Layered structure:

- **Frontend** (`frontend/`): React 18 + TypeScript + Tailwind. Pages under `src/pages`, navigation under `components/navigation`, API access only via `src/services/api`.
- **Backend** (`backend/`): Express + TypeScript. Routes → controllers (thin) → services (domain logic) → repositories (Supabase/Postgres access). Middleware handles auth and errors.
- **Database** (`database/`): PostgreSQL migrations + dev seed.
- **AI** (`ai/`): Python package mirroring feature extraction, deterministic matching, explanation and roadmap generation.

Rules:

- Frontend never owns domain truth; all recommendation logic runs in the backend engine.
- AI may explain but never edit scores, rankings or constraints.
