from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app import models, schemas
from app.api.deps import get_current_user

router = APIRouter(tags=["resume"])

@router.get("/resume", response_model=schemas.ResumeOut)
def get_resume(
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    resume = db.query(models.Resume).filter(models.Resume.student_id == current_user.id).first()
    if not resume:
        # Return an empty shell rather than 404 so frontend can start fresh
        return schemas.ResumeOut(id=0, content={}, score=0.0)
    return resume

@router.post("/resume", response_model=schemas.ResumeOut)
def save_resume(
    resume_data: schemas.ResumeData,
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    resume = db.query(models.Resume).filter(models.Resume.student_id == current_user.id).first()
    
    if not resume:
        resume = models.Resume(
            student_id=current_user.id,
            content=resume_data.content,
            score=0.0
        )
        db.add(resume)
    else:
        resume.content = resume_data.content
        
    db.commit()
    db.refresh(resume)
    return resume

@router.post("/resume/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    current_user: models.Student = Depends(get_current_user)
):
    # Simulated analysis logic for uploaded PDF/DOCX
    filename = file.filename
    # Read file content if needed: content = await file.read()
    
    # Return mocked analysis structure expected by frontend
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
