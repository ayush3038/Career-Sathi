# CareerSathi V2

AI-powered career counselling and family decision-support platform for vocational education.

CareerSathi is a **decision-support platform**. It helps students, parents and counsellors connect a student profile to vocational pathways, validate constraints, compare options, check affordability and turn a chosen pathway into an actionable roadmap. It does **not** replace counsellors, issue qualifications or make career decisions.

## Problem

Vocational career information is scattered; families see only part of the picture; learners evaluate options one at a time with no connected view of eligibility, cost, skills and opportunity.

## Features

- Structured **Career DNA** profile onboarding (wizard)
- Backend-driven **Career Explorer** with search and filters
- **Deterministic recommendation engine** with explainable reasons and constraints
- **Preferences** spanning domains, budget, location, duration and pathway type
- **Family Decision Support** workspace (student vs family considerations, no forced winner)
- **Affordability** view with honest "data unavailable" states
- **Roadmaps** with persistable milestone status
- Optional **AI explanations** (OpenAI / DishaAI) that never override rules

## Users

Student (primary), Parent, Counsellor.

## Architecture

```
React (TS, Tailwind) â†’ typed API service â†’ Express REST â†’ services/repositories â†’ Supabase/PostgreSQL
                                                     â†˜ Python AI layer (matching, explanation, roadmap)
```

## Tech stack

React.js, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL, Supabase, Python, scikit-learn, OpenAI API / DishaAI, Vercel, Docker.

## Repository layout

`frontend/` Â· `backend/` Â· `ai/` Â· `database/` Â· `docs/`

## Setup (exact commands)

```bash
# 1. Install dependencies
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# 2. Configure environment
cp .env.example .env          # fill in Supabase keys (see docs/SETUP.md)

# 3. Database
psql "$DATABASE_URL" -f database/migrations/0001_init.sql
psql "$DATABASE_URL" -f database/seed/001_seed.sql

# 4. Run
cd backend && npm run dev     # http://localhost:4000
cd frontend && npm run dev    # http://localhost:5173
```

## Environment variables

See `.env.example`. Frontend variables (`VITE_*`) are public-safe; `SUPABASE_SERVICE_ROLE_KEY` is **server-only**.

## Testing

```bash
cd backend && npm test        # recommendation engine + roadmap unit tests
```

See `docs/TESTING.md` for the full behavioral test plan.

## Known limitations

- Recommendation weights are **prototype defaults, not validated**.
- Affordability/scholarship tables ship empty until populated from verified sources.
- AI layer degrades gracefully (deterministic fallback) without an API key.
- No live integration with government job portals is claimed.

## Documentation

`docs/ARCHITECTURE.md`, `docs/API.md`, `docs/DATABASE.md`, `docs/AI_ML.md`, `docs/SECURITY.md`, `docs/DATA_SOURCES.md`, `docs/SETUP.md`, `docs/TESTING.md`, `docs/PRODUCT.md`, `docs/DECISIONS.md`.
