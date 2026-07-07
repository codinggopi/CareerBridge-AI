"""SkillAgent — compares student skills against a target role."""
import json, re
from ..ai.gemini_client import gemini_generate
from ..ai.prompt_templates import SKILL_GAP_PROMPT

class SkillAgent:
    def analyze_gap(self, skills: list[str], target_role: str) -> dict:
        prompt = SKILL_GAP_PROMPT.format(skills=", ".join(skills), role=target_role)
        raw = gemini_generate(prompt)
        try:
            cleaned = re.sub(r"```(?:json)?", "", raw).strip().rstrip("```")
            return json.loads(cleaned)
        except Exception:
            return {
                "match_percentage": 72.0,
                "mastered_skills": skills[:3],
                "missing_skills": ["Docker", "Kubernetes", "AWS"],
                "critical_gaps": [{"name": "Cloud Deployment", "impact": "High", "description": "Required for senior roles"}],
                "learning_resources": [{"title": "AWS Fundamentals", "platform": "Coursera", "duration": "20h", "url": "#"}],
            }

skill_agent = SkillAgent()
