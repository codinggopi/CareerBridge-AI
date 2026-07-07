from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..auth import get_current_student, get_admin_student

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("/stats", response_model=schemas.DashboardStats)
def get_stats(current: models.Student = Depends(get_current_student), db: Session = Depends(get_db)):
    latest_resume = (
        db.query(models.Resume)
        .filter(models.Resume.student_id == current.id)
        .order_by(models.Resume.upload_date.desc())
        .first()
    )
    interviews = db.query(models.Interview).filter(models.Interview.student_id == current.id).all()
    skills = db.query(models.Skill).filter(models.Skill.student_id == current.id).all()

    resume_score = latest_resume.score if latest_resume else 0.0
    interview_score = sum(i.score for i in interviews) / len(interviews) if interviews else 0.0
    skill_score = sum(s.proficiency for s in skills) / len(skills) if skills else 0.0
    placement_readiness = (resume_score * 0.4 + skill_score * 0.3 + interview_score * 0.3)
    learning_progress = 4.2  # placeholder

    return {
        "resume_score": round(resume_score, 1),
        "skill_score": round(skill_score, 1),
        "placement_readiness": round(placement_readiness, 1),
        "interview_score": round(interview_score, 1),
        "learning_progress": learning_progress,
    }

@router.get("/admin/stats")
def admin_stats(current: models.Student = Depends(get_admin_student), db: Session = Depends(get_db)):
    total = db.query(models.Student).count()
    from sqlalchemy import func
    total_resumes = db.query(models.Resume).count()
    avg_score = db.query(func.avg(models.Resume.score)).scalar() or 0
    return {
        "total_students": total,
        "total_resumes": total_resumes,
        "avg_resume_score": round(float(avg_score), 1),
        "placement_readiness": 92.1,
    }
