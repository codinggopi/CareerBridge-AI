from sqlalchemy.orm import Session
from app import models, schemas
import uuid

def get_resume_for_student(db: Session, student_id: int):
    resume = db.query(models.Resume).filter(models.Resume.student_id == student_id).first()
    if not resume:
        return schemas.ResumeOut(id=0, content={}, score=0.0)
    return resume

def save_resume_for_student(db: Session, student_id: int, resume_data: schemas.ResumeData):
    resume = db.query(models.Resume).filter(models.Resume.student_id == student_id).first()
    
    if not resume:
        resume = models.Resume(
            student_id=student_id,
            content=resume_data.content,
            score=0.0
        )
        db.add(resume)
    else:
        resume.content = resume_data.content
        
    db.commit()
    db.refresh(resume)
    return resume

def analyze_resume_file(filename: str, student_id: int):
    # Simulated analysis logic for uploaded PDF/DOCX
    # In the future, an agent will parse and analyze this file
    
    return {
        "status": "success",
        "score": 85,
        "filename": filename,
        "feedback": [
            {"type": "strength", "msg": "Strong technical keyword matches for target role."},
            {"type": "weakness", "msg": "Lacking measurable impact in recent experience bullets."}
        ],
        "keywords": ["React", "Python", "Cloud Architecture"]
    }