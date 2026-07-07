"""Embedding utilities using Gemini embedding model."""
from ..core.config import settings

def get_embedding(text: str) -> list:
    try:
        import google.generativeai as genai
        genai.configure(api_key=settings.GEMINI_API_KEY)
        result = genai.embed_content(
            model="models/embedding-001",
            content=text,
            task_type="retrieval_document",
        )
        return result["embedding"]
    except Exception:
        return []

def cosine_similarity(a: list, b: list) -> float:
    if not a or not b:
        return 0.0
    dot = sum(x * y for x, y in zip(a, b))
    mag_a = sum(x ** 2 for x in a) ** 0.5
    mag_b = sum(x ** 2 for x in b) ** 0.5
    return dot / (mag_a * mag_b) if mag_a and mag_b else 0.0
