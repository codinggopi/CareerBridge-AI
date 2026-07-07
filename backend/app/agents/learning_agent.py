"""LearningAgent — generates personalised roadmaps."""
import json, re
from ..ai.gemini_client import gemini_generate
from ..ai.prompt_templates import ROADMAP_PROMPT

class LearningAgent:
    def generate_roadmap(self, target_role: str) -> list:
        prompt = ROADMAP_PROMPT.format(role=target_role)
        raw = gemini_generate(prompt)
        try:
            cleaned = re.sub(r"```(?:json)?", "", raw).strip().rstrip("```")
            return json.loads(cleaned)
        except Exception:
            return [
                {"week": 1, "title": "Foundations", "description": "Core concepts", "hours": 10, "lessons": 4, "resources": [], "status": "locked"},
                {"week": 2, "title": "Intermediate", "description": "Build projects", "hours": 12, "lessons": 5, "resources": [], "status": "locked"},
            ]

learning_agent = LearningAgent()
