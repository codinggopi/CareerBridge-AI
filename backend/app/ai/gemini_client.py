"""Thin wrapper around Google Gemini API."""
from ..core.config import settings

def gemini_chat(prompt: str, history: list = []) -> str:
    try:
        import google.generativeai as genai
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")
        chat = model.start_chat(history=[
            {"role": m["role"], "parts": [m["content"]]} for m in history
        ])
        return chat.send_message(prompt).text
    except Exception as e:
        return f"[Gemini error] {e}"

def gemini_generate(prompt: str) -> str:
    try:
        import google.generativeai as genai
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")
        return model.generate_content(prompt).text
    except Exception as e:
        return f"[Gemini error] {e}"
