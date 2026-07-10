from sqlalchemy.orm import Session
from app import models

def get_mock_interview_data(db: Session, student_id: int):
    sessions = db.query(models.InterviewSession).filter(models.InterviewSession.student_id == student_id).all()
    messages = db.query(models.InterviewMessage).filter(models.InterviewMessage.student_id == student_id).order_by(models.InterviewMessage.timestamp.asc()).all()
    
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

def process_interview_message(db: Session, student_id: int, message_text: str):
    user_msg = models.InterviewMessage(student_id=student_id, sender="user", text=message_text)
    db.add(user_msg)
    
    # Simulate AI Interviewer logic
    ai_text = f"That's an interesting answer. Could you elaborate more on '{message_text}' in the context of a real-world project?"
    
    ai_msg = models.InterviewMessage(student_id=student_id, sender="ai", text=ai_text)
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
