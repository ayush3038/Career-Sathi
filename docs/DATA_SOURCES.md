# Data Sources & Provenance

- Seed catalogue (`database/seed/001_seed.sql`) is **development data**: real vocational domains and representative careers, but eligibility/duration/cost strings are illustrative and must be replaced by verified figures.
- Authoritative categories to target for production data: MSDE, Skill India, NCVET/NSQF, National Career Service, ITI directories, apprenticeship portal, official scholarship portals.
- No live API integrations are claimed; do not fabricate government figures, scholarship amounts, salaries or placement rates.
- `affordability_entries` and `scholarships` are empty by design and populated only from verified sources.
