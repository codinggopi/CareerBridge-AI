from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database.connection import get_db
from app import models
from app.api.deps import get_current_user

router = APIRouter(tags=["interviews"])

class InterviewMessageIn(BaseModel):
    message: str

@router.get("/interviews/mock")
def get_mock_interview(
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    sessions = db.query(models.InterviewSession).filter(models.InterviewSession.student_id == current_user.id).all()
    messages = db.query(models.InterviewMessage).filter(models.InterviewMessage.student_id == current_user.id).order_by(models.InterviewMessage.timestamp.asc()).all()
    
    chat_history = [{"sender": m.sender, "text": m.text, "time": m.timestamp.strftime("%H:%M")} for m in messages]
    
    return {
        "metrics": {
            "communication": 85,
            "confidence": 78,
            "accuracy": 92
        },
        "insights": {
            "strength": {"title": "Strengths", "desc": "Good technical accuracy."},
            "improvement": {"title": "Improvements", "desc": "Can improve communication clarity."}
        },
        "chat": chat_history
    }

@router.post("/interviews/mock/message")
def send_interview_message(
    msg_in: InterviewMessageIn,
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_msg = models.InterviewMessage(student_id=current_user.id, sender="user", text=msg_in.message)
    db.add(user_msg)
    
    # Simulate AI Interviewer logic
    ai_text = f"That's an interesting answer. Could you elaborate more on '{msg_in.message}' in the context of a real-world project?"
    
    ai_msg = models.InterviewMessage(student_id=current_user.id, sender="ai", text=ai_text)
    db.add(ai_msg)
    
    db.commit()
    db.refresh(user_msg)
    db.refresh(ai_msg)
    
    return {
        "reply": {
            "sender": ai_msg.sender,
            "text": ai_msg.text,
            "time": ai_msg.timestamp.strftime("%H:%M")
        }
    }
