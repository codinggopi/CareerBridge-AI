"""CoachAgent — conversational career coaching."""
from ..ai.gemini_client import gemini_chat
from ..ai.prompt_templates import CAREER_COACH_SYSTEM

class CoachAgent:
    def chat(self, message: str, history: list) -> str:
        full_history = [{"role": "system", "content": CAREER_COACH_SYSTEM}] + history
        return gemini_chat(message, full_history)

coach_agent = CoachAgent()
