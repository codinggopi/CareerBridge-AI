from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app import models, schemas
from app.api.deps import get_current_user
from app.services import resume_service

router = APIRouter(tags=["resume"])

@router.get("/resume", response_model=schemas.ResumeOut)
def get_resume(
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return resume_service.get_resume_for_student(db, current_user.id)

@router.post("/resume", response_model=schemas.ResumeOut)
def save_resume(
    resume_data: schemas.ResumeData,
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return resume_service.save_resume_for_student(db, current_user.id, resume_data)

@router.post("/resume/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    current_user: models.Student = Depends(get_current_user)
):
    return resume_service.analyze_resume_file(file.filename, current_user.id)
