"""Deterministic matching/scoring. Prototype weights — not validated."""

from typing import Any, Dict, List


def jaccard(a: List[str], b: List[str]) -> float:
    sa, sb = set(a), set(b)
    if not sa or not sb:
        return 0.0
    return len(sa & sb) / len(sa | sb)


def score_career(career: Dict[str, Any], features: Dict[str, List[str]]) -> Dict[str, Any]:
    reasons: List[str] = []
    score = 0.0
    if career["domain"].lower() in features["domains"]:
        score += 30
        reasons.append(f"Matches your domain preference for {career['domain']}.")
    skill_overlap = set(career.get("skills", [])) & set(features["skills"])
    if skill_overlap:
        score += min(len(skill_overlap), 4) / 4 * 25
        reasons.append(f"Aligns with your skills: {', '.join(sorted(skill_overlap))}.")
    domain_tokens = {career["domain"].lower(), career["name"].lower()}
    if domain_tokens & set(features["interests"]):
        score += 20
        reasons.append("Related to your stated interests.")
    if career.get("work_environment", "").lower() in features["work_environments"]:
        score += 10
        reasons.append(f"Fits your preferred {career['work_environment']} work environment.")
    return {"career_id": career["id"], "match_score": round(min(score, 100)), "reasons": reasons}
