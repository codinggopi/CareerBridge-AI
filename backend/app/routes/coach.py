from fastapi import APIRouter, Depends
from ..auth import get_current_student
from .. import models
from ..schemas import ChatMessage, ChatResponse
from ..ai_service import career_coach_response

router = APIRouter(prefix="/api/coach", tags=["coach"])

@router.post("/chat", response_model=ChatResponse)
def chat(data: ChatMessage, current: models.Student = Depends(get_current_student)):
    reply = career_coach_response(data.message, data.history or [])
    return {"response": reply}
