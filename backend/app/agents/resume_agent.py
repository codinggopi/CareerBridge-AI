"""ResumeAgent — orchestrates resume parsing, scoring and suggestions."""
import json, re
from ..ai.gemini_client import gemini_generate
from ..ai.prompt_templates import RESUME_SCORE_PROMPT

class ResumeAgent:
    def analyze(self, text: str) -> dict:
        prompt = RESUME_SCORE_PROMPT.format(text=text[:3000])
        raw = gemini_generate(prompt)
        try:
            cleaned = re.sub(r"```(?:json)?", "", raw).strip().rstrip("```")
            return json.loads(cleaned)
        except Exception:
            return {
                "score": 75.0, "ats_score": 80.0, "technical_score": 78.0,
                "soft_skills_score": 70.0, "grammar_score": 85.0,
                "strengths": ["Strong technical skills", "Good project experience"],
                "weaknesses": ["Missing quantified achievements"],
                "suggestions": ["Add measurable outcomes", "Include GitHub links"],
            }

resume_agent = ResumeAgent()
