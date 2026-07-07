import os, shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, BackgroundTasks
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..auth import get_current_student
from ..ai_service import score_resume
from ..config import settings

router = APIRouter(prefix="/api/resume", tags=["resume"])

def _extract_text(file_path: str) -> str:
    """Simple text extractor — extend with PyMuPDF/python-docx as needed."""
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    except Exception:
        return ""

def _process_resume(resume_id: int, file_path: str, db: Session):
    resume = db.query(models.Resume).filter(models.Resume.id == resume_id).first()
    if not resume:
        return
    text = _extract_text(file_path)
    result = score_resume(text)
    resume.extracted_text = text
    resume.score = result.get("score", 75.0)
    resume.ats_score = result.get("ats_score", 80.0)
    resume.technical_score = result.get("technical_score", 75.0)
    resume.soft_skills_score = result.get("soft_skills_score", 70.0)
    resume.grammar_score = result.get("grammar_score", 85.0)
    resume.strengths = result.get("strengths", [])
    resume.weaknesses = result.get("weaknesses", [])
    resume.suggestions = result.get("suggestions", [])
    db.commit()

@router.post("/upload", response_model=schemas.ResumeOut, status_code=201)
async def upload_resume(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    current: models.Student = Depends(get_current_student),
    db: Session = Depends(get_db),
):
    allowed = {".pdf", ".docx"}
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in allowed:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are allowed")

    size = 0
    upload_dir = os.path.join(settings.UPLOAD_DIR, str(current.id))
    os.makedirs(upload_dir, exist_ok=True)
    dest = os.path.join(upload_dir, file.filename)

    with open(dest, "wb") as f:
        chunk = await file.read(1024 * 1024)
        while chunk:
            size += len(chunk)
            if size > settings.MAX_FILE_SIZE_MB * 1024 * 1024:
                raise HTTPException(status_code=413, detail="File too large")
            f.write(chunk)
            chunk = await file.read(1024 * 1024)

    resume = models.Resume(
        student_id=current.id,
        file_path=dest,
        original_filename=file.filename,
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)

    background_tasks.add_task(_process_resume, resume.id, dest, db)
    return resume

@router.get("/latest", response_model=schemas.ResumeOut)
def get_latest_resume(current: models.Student = Depends(get_current_student), db: Session = Depends(get_db)):
    resume = (
        db.query(models.Resume)
        .filter(models.Resume.student_id == current.id, models.Resume.is_active == True)
        .order_by(models.Resume.upload_date.desc())
        .first()
    )
    if not resume:
        raise HTTPException(status_code=404, detail="No resume found")
    return resume

@router.get("/history", response_model=list[schemas.ResumeOut])
def get_resume_history(current: models.Student = Depends(get_current_student), db: Session = Depends(get_db)):
    return db.query(models.Resume).filter(models.Resume.student_id == current.id).order_by(models.Resume.upload_date.desc()).all()
