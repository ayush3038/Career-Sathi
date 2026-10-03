"""AI explanation layer — complements, never overrides, deterministic logic."""

import os
from typing import Any, Dict, Optional


def explain(context: Dict[str, Any]) -> Dict[str, Any]:
    """Return a structured, safe explanation. Falls back deterministically when
    no API key is configured. Never changes ranks or facts."""
    api_key = os.environ.get("OPENAI_API_KEY") or os.environ.get("DISHAAI_API_KEY")
    if not api_key:
        return {
            "ai_enabled": False,
            "explanation": (
                "AI explanation unavailable (no OPENAI_API_KEY/DISHAAI_API_KEY). "
                "The recommendation shown is produced by deterministic scoring rules and remains valid."
            ),
        }
    try:
        from openai import OpenAI

        client = OpenAI(api_key=api_key)
        resp = client.chat.completions.create(
            model=os.environ.get("OPENAI_MODEL", "gpt-4o-mini"),
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are CareerSaathi's explanation assistant for vocational education in India. "
                        "Explain only the provided structured context. Never alter rankings, never invent "
                        "eligibility/cost/scholarship facts, never override constraints, never claim validity."
                    ),
                },
                {"role": "user", "content": str(context)},
            ],
            temperature=0.4,
        )
        return {"ai_enabled": True, "explanation": resp.choices[0].message.content}
    except Exception as exc:  # safe, non-hallucinating fallback
        return {"ai_enabled": False, "explanation": f"AI request failed: {exc}"}
