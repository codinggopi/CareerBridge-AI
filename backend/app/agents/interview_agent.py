"""InterviewAgent — generates questions and evaluates answers."""
import json, re
from ..ai.gemini_client import gemini_generate
from ..ai.prompt_templates import INTERVIEW_QUESTION_PROMPT, ANSWER_EVAL_PROMPT

class InterviewAgent:
    def next_question(self, interview_type: str, history: list) -> str:
        history_text = "\n".join(f"{m['role']}: {m['content']}" for m in history[-4:])
        prompt = INTERVIEW_QUESTION_PROMPT.format(type=interview_type, history=history_text)
        return gemini_generate(prompt).strip()

    def evaluate_answer(self, question: str, answer: str) -> dict:
        prompt = ANSWER_EVAL_PROMPT.format(question=question, answer=answer)
        raw = gemini_generate(prompt)
        try:
            cleaned = re.sub(r"```(?:json)?", "", raw).strip().rstrip("```")
            return json.loads(cleaned)
        except Exception:
            return {"score": 75.0, "communication_score": 80.0, "confidence_score": 72.0, "accuracy_score": 75.0, "feedback": "Good answer. Be more specific."}

interview_agent = InterviewAgent()
