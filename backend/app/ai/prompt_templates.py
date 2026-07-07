"""Centralised prompt templates for all AI features."""

RESUME_SCORE_PROMPT = """
Analyze this resume and return ONLY valid JSON (no markdown) with keys:
score, ats_score, technical_score, soft_skills_score, grammar_score (all 0-100),
strengths (list), weaknesses (list), suggestions (list).

Resume text:
{text}
"""

SKILL_GAP_PROMPT = """
Student skills: {skills}
Target role: {role}

Return ONLY valid JSON with:
match_percentage (0-100),
mastered_skills (list),
missing_skills (list),
critical_gaps (list of {{name, impact, description}}),
learning_resources (list of {{title, platform, duration, url}})
"""

INTERVIEW_QUESTION_PROMPT = """
You are conducting a {type} job interview.
Previous messages:
{history}
Ask the next relevant interview question. Return only the question.
"""

ANSWER_EVAL_PROMPT = """
Question: {question}
Answer: {answer}

Return ONLY valid JSON with:
score, communication_score, confidence_score, accuracy_score (all 0-100),
feedback (string)
"""

CAREER_COACH_SYSTEM = (
    "You are an expert AI Career Coach. Give actionable, concise advice on skills, "
    "resume, interviews and job market. Keep responses under 200 words."
)

ROADMAP_PROMPT = """
Create a 6-week learning roadmap for a student targeting: {role}.
Return ONLY valid JSON: list of weeks, each with:
week (int), title, description, hours (int), lessons (int), resources (list of strings), status ("locked")
"""
