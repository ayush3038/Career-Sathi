"""Ranking pipeline: normalization -> features -> scoring -> ranking.

Mirrors the TypeScript engine in backend/src/services/recommendationEngine.ts.
"""

from typing import Any, Dict, List

from ..feature_processing.extract import extract_features
from ..matching.scorer import score_career


def rank(careers: List[Dict[str, Any]], profile: Dict[str, Any], preferences: Dict[str, Any]) -> List[Dict[str, Any]]:
    features = extract_features(profile, preferences)
    ranked = [score_career(c, features) for c in careers]
    return sorted(ranked, key=lambda r: r["match_score"], reverse=True)
