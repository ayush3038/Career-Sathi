"""Feature extraction for the recommendation pipeline."""

from typing import Any, Dict, List


def normalize_tokens(values: List[str] | None) -> List[str]:
    return [v.strip().lower() for v in (values or []) if v and v.strip()]


def extract_features(profile: Dict[str, Any], preferences: Dict[str, Any]) -> Dict[str, List[str]]:
    return {
        "domains": normalize_tokens(preferences.get("domains")),
        "interests": normalize_tokens((preferences.get("interests") or []) + (profile.get("interests") or [])),
        "skills": normalize_tokens((preferences.get("skills") or []) + (profile.get("skills") or [])),
        "work_environments": normalize_tokens(preferences.get("workEnvironments") or [profile.get("workEnvironment", "")]),
        "training_duration": normalize_tokens([preferences.get("trainingDuration", "")]),
    }
