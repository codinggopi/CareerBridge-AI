from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app import models
from app.api.deps import get_current_user
from app.database.connection import get_db

router = APIRouter(tags=["coach"])

class MessageIn(BaseModel):
    message: str

@router.get("/coach/session")
def get_coach_session(
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    messages = db.query(models.CoachMessage).filter(models.CoachMessage.student_id == current_user.id).order_by(models.CoachMessage.timestamp.asc()).all()
    chat_history = [{"sender": m.sender, "text": m.text, "time": m.timestamp.strftime("%H:%M")} for m in messages]

    return {
        "insights": {
            "techSector": {"title": "TECH SECTOR", "desc": "AI integration and cloud architecture skills are in high demand."},
            "remoteWork": {"title": "REMOTE WORK", "desc": "Companies are prioritizing communication and self-management skills."}
        },
        "trendingSkills": ["Python", "React", "Cloud Architecture"],
        "recommended": {"title": "Full Stack Developer", "desc": "Your profile aligns strongly with full-stack roles."},
        "marketReadiness": {"score": current_user.placement_readiness_score, "trend": "+5% this week"},
        "chat": chat_history
    }

@router.post("/coach/message")
def send_coach_message(
    msg_in: MessageIn,
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Save user message
    user_msg = models.CoachMessage(student_id=current_user.id, sender="user", text=msg_in.message)
    db.add(user_msg)
    
    # Generate AI response (simulated logic for now)
    ai_text = f"I see you're asking about '{msg_in.message}'. Based on your profile as a {current_user.branch or 'student'}, I recommend focusing on foundational projects and networking."
    
    ai_msg = models.CoachMessage(student_id=current_user.id, sender="ai", text=ai_text)
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
