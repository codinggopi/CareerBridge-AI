"""
AI Service Layer — swap between Gemini and OpenAI via AI_PROVIDER env var.
All resume scoring, skill-gap analysis, interview Q&A, and career coaching
go through this single module.
"""
from typing import List, Optional
from .config import settings

# ── Gemini ──────────────────────────────────────────────────────────────────
def _gemini_chat(prompt: str, history: list = []) -> str:
    try:
        import google.generativeai as genai
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")
        chat = model.start_chat(history=[
            {"role": m["role"], "parts": [m["content"]]} for m in history
        ])
        response = chat.send_message(prompt)
        return response.text
    except Exception as e:
        return f"AI service error: {str(e)}"

# ── OpenAI ───────────────────────────────────────────────────────────────────
def _openai_chat(prompt: str, history: list = []) -> str:
    try:
        from openai import OpenAI
        client = OpenAI(api_key=settings.OPENAI_API_KEY)
        messages = [{"role": m["role"], "content": m["content"]} for m in history]
        messages.append({"role": "user", "content": prompt})
        response = client.chat.completions.create(model="gpt-3.5-turbo", messages=messages)
        return response.choices[0].message.content
    except Exception as e:
        return f"AI service error: {str(e)}"

# ── Public API ────────────────────────────────────────────────────────────────
def ai_chat(prompt: str, history: list = []) -> str:
    if settings.AI_PROVIDER == "openai":
        return _openai_chat(prompt, history)
    return _gemini_chat(prompt, history)


def score_resume(resume_text: str) -> dict:
    prompt = f"""
    Analyze the following resume and return a JSON object with these exact keys:
    - score (0-100 overall)
    - ats_score (0-100)
    - technical_score (0-100)
    - soft_skills_score (0-100)
    - grammar_score (0-100)
    - strengths (list of strings)
    - weaknesses (list of strings)
    - suggestions (list of strings)

    Resume text:
    {resume_text[:3000]}

    Return ONLY valid JSON, no markdown.
    """
    result = ai_chat(prompt)
    try:
        import json, re
        cleaned = re.sub(r"```(?:json)?", "", result).strip()
        return json.loads(cleaned)
    except Exception:
        return {
            "score": 75.0, "ats_score": 80.0, "technical_score": 78.0,
            "soft_skills_score": 70.0, "grammar_score": 85.0,
            "strengths": ["Good technical skills", "Clear structure"],
            "weaknesses": ["Missing quantified achievements"],
            "suggestions": ["Add measurable outcomes", "Include GitHub links"],
        }


def analyze_skill_gap(student_skills: List[str], target_role: str) -> dict:
    prompt = f"""
    Student current skills: {', '.join(student_skills)}
    Target role: {target_role}

    Return a JSON object with:
    - match_percentage (0-100)
    - mastered_skills (list)
    - missing_skills (list)
    - critical_gaps (list of objects: {{name, impact, description}})
    - learning_resources (list of objects: {{title, platform, duration, url}})

    Return ONLY valid JSON.
    """
    result = ai_chat(prompt)
    try:
        import json, re
        cleaned = re.sub(r"```(?:json)?", "", result).strip()
        return json.loads(cleaned)
    except Exception:
        return {
            "match_percentage": 72.0,
            "mastered_skills": student_skills[:3],
            "missing_skills": ["Docker", "Kubernetes", "AWS"],
            "critical_gaps": [{"name": "Cloud Deployment", "impact": "High", "description": "Required for senior roles"}],
            "learning_resources": [{"title": "AWS Fundamentals", "platform": "Coursera", "duration": "20h", "url": "#"}],
        }


def generate_interview_question(interview_type: str, previous_messages: list = []) -> str:
    history_text = "\n".join([f"{m['role']}: {m['content']}" for m in previous_messages[-4:]])
    prompt = f"""
    You are conducting a {interview_type} job interview.
    Previous conversation:
    {history_text}

    Ask the next relevant interview question. Be professional and concise.
    Return only the question, no labels.
    """
    return ai_chat(prompt)


def evaluate_interview_answer(question: str, answer: str) -> dict:
    prompt = f"""
    Interview question: {question}
    Candidate answer: {answer}

    Rate this answer and return JSON with:
    - score (0-100)
    - communication_score (0-100)
    - confidence_score (0-100)
    - accuracy_score (0-100)
    - feedback (string with improvement tips)

    Return ONLY valid JSON.
    """
    result = ai_chat(prompt)
    try:
        import json, re
        cleaned = re.sub(r"```(?:json)?", "", result).strip()
        return json.loads(cleaned)
    except Exception:
        return {
            "score": 75.0, "communication_score": 80.0,
            "confidence_score": 70.0, "accuracy_score": 75.0,
            "feedback": "Good answer. Try to be more specific with examples.",
        }


def career_coach_response(user_message: str, history: list = []) -> str:
    system = (
        "You are an expert AI Career Coach for students. "
        "Give actionable, concise career advice. "
        "Focus on skills, resume tips, interview prep, and job market insights. "
        "Keep responses under 200 words."
    )
    full_history = [{"role": "system", "content": system}] + history
    return ai_chat(user_message, full_history)
