# AI / ML

Principle: **Rules validate. ML ranks. LLM explains. Humans decide.**

- Deterministic engine (`backend/src/services/recommendationEngine.ts`) normalizes input, validates hard constraints (eligibility/budget/domain/location), scores domain/skill/interest/training/environment, ranks, and emits reasons + constraints. Weights are documented prototype defaults, **not** validated.
- `ai/` Python package mirrors this deterministic scoring; scikit-learn available for experimentation but not required in the request path.
- OpenAI API / DishaAI layer (`POST /api/ai/explain`) receives only validated structured context and returns plain-language explanations. It cannot change ranks, invent facts or override eligibility. Without a key it returns an honest deterministic fallback.
- Hallucination boundary: AI answers are only as trustworthy as the verified context; every answer cites the structured payload it was given. No live government figures are fetched.
