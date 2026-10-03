"""Roadmap milestone generation — deterministic, mirrors backend service."""

from typing import Any, Dict, List

TEMPLATE: List[Dict[str, Any]] = [
    {"title": "Explore & shortlist", "description": "Review the pathway, eligibility and local providers.", "duration": "1-2 weeks"},
    {"title": "Confirm eligibility", "description": "Verify academic requirements and documents.", "duration": "1 week"},
    {"title": "Enrol in training", "description": "Complete admission into the selected course/trade.", "duration": "6-24 months"},
    {"title": "Skill development", "description": "Build the core skills listed for this pathway.", "duration": "Ongoing"},
    {"title": "Assessment & certification", "description": "Clear required assessments or certification exams.", "duration": "1-3 months"},
    {"title": "First role / apprenticeship", "description": "Apply for entry roles or apprenticeships.", "duration": "1-6 months"},
]


def build_roadmap(pathway_id: str, career_title: str) -> Dict[str, Any]:
    return {
        "pathway_id": pathway_id,
        "title": f"{career_title} — Roadmap",
        "milestones": [
            {**m, "sequence": i + 1, "status": "in_progress" if i == 0 else "upcoming"}
            for i, m in enumerate(TEMPLATE)
        ],
    }
