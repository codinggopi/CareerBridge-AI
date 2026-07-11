from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app import models, schemas
from app.api.deps import get_current_user
from app.services import resume_service
from app.services import cloudinary_service

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
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Upload to Cloudinary (resource_type="auto" to handle PDFs)
    upload_result = await cloudinary_service.upload_file(file, folder="careerbridge/resumes")
    
    # Update DB record with file path
    resume = db.query(models.Resume).filter(models.Resume.student_id == current_user.id).first()
    if not resume:
        resume = models.Resume(student_id=current_user.id, score=0.0)
        db.add(resume)
    
    # If there was an old file, ideally we would delete it from Cloudinary here
    if resume.file_path and "res.cloudinary.com" in resume.file_path:
        try:
            public_id = resume.file_path.split("/")[-1].rsplit(".", 1)[0]
            cloudinary_service.delete_file(f"careerbridge/resumes/{public_id}", resource_type="image") 
        except Exception:
            pass
            
    resume.file_path = upload_result.get("secure_url")
    resume.original_filename = file.filename
    db.commit()
    
    return resume_service.analyze_resume_file(file.filename, current_user.id)
