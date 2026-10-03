"""Shared request/response schemas for the AI layer (dict-shaped, serializable)."""

from typing import List, Optional, TypedDict


class ExplanationRequest(TypedDict):
    career_id: str
    match_score: float
    reasons: List[str]
    constraints: List[str]


class ExplanationResponse(TypedDict):
    ai_enabled: bool
    explanation: str


class RoadmapMilestone(TypedDict, total=False):
    title: str
    description: str
    duration: str
    sequence: int
    status: str
