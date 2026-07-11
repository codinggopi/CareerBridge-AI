from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app import models, schemas
from app.api.deps import get_current_user
from app.core.security import verify_password, get_password_hash
from app.services import cloudinary_service

router = APIRouter(tags=["profile"])

ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]
MAX_IMAGE_SIZE = 2 * 1024 * 1024  # 2 MB

@router.get("/profile")
def get_profile(
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Fetch latest resume
    latest_resume = db.query(models.Resume).filter(models.Resume.student_id == current_user.id).order_by(models.Resume.upload_date.desc()).first()
    
    resume_skills = []
    resume_projects = []
    resume_certifications = []
    
    if latest_resume and latest_resume.content:
        content = latest_resume.content
        if "skills" in content:
            resume_skills = [{"name": s, "score": 85} if isinstance(s, str) else {"name": s.get("name", "Skill"), "score": s.get("score", 85)} for s in content["skills"]]
        if "projects" in content:
            resume_projects = content["projects"]
        if "certifications" in content:
            resume_certifications = content["certifications"]
            
    return {
        "name": current_user.name,
        "email": current_user.email,
        "bio": current_user.bio or "",
        "phone": current_user.phone or "",
        "branch": current_user.branch or "",
        "graduation_year": current_user.graduation_year or "",
        "linkedin_link": current_user.linkedin_link or "",
        "github_link": current_user.github_link or "",
        "portfolio_link": current_user.portfolio_link or "",
        "professional_title": current_user.professional_title or "",
        "college": current_user.college or "",
        "address": current_user.address or "",
        "security_question": current_user.security_question or "",
        "profile": {
            "name": current_user.name,
            "title": current_user.professional_title or current_user.branch or "Student / Software Engineer",
            "avatar": current_user.avatar or "https://i.pravatar.cc/150",
            "placementScore": int(current_user.placement_readiness_score) if current_user.placement_readiness_score else 88,
            "placementRank": "TOP 12%"
        },
        "metrics": {
            "resumeScore": int(current_user.resume_score) if current_user.resume_score else 85,
            "skillScore": int(current_user.skill_score) if current_user.skill_score else 92,
            "readiness": "HIGH"
        },
        "coreSkills": resume_skills,
        "technologies": [s["name"] for s in resume_skills[:6]] if resume_skills else ["React", "Node.js", "Python"],
        "projects": [
            {
                "title": p.get("title", p.get("name", "Project")),
                "desc": p.get("desc", p.get("description", "")),
                "tags": p.get("tags", p.get("technologies", [])),
                "github": p.get("github", ""),
                "live": p.get("live", "")
            } for p in resume_projects
        ],
        "achievements": [
            {
                "title": c.get("title", c.get("name", "Achievement")),
                "desc": c.get("desc", c.get("description", c.get("issuer", "")))
            } for c in resume_certifications
        ],
        "journey": [
            {
                "date": "JUN 2026",
                "title": "Resume Verified",
                "desc": "Achieved a resume score of 85+. Ready for top-tier applications.",
                "color": "bg-blue-500/20 text-blue-400",
                "icon": "file-text"
            },
            {
                "date": "MAR 2026",
                "title": "System Design Module Completed",
                "desc": "Finished the advanced system design module with flying colors.",
                "color": "bg-primary/20 text-primary",
                "icon": "git-merge"
            }
        ]
    }

@router.put("/profile")
def update_profile(
    profile_data: dict,
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Update allowed fields
    allowed_fields = [
        "name", "bio", "phone", "branch", "year", "graduation_year", 
        "linkedin_link", "github_link", "professional_title", "college", 
        "address", "portfolio_link"
    ]
    for field in allowed_fields:
        if field in profile_data:
            setattr(current_user, field, profile_data[field])
    
    db.commit()
    db.refresh(current_user)
    return {"message": "Profile updated successfully"}

@router.post("/profile/avatar")
async def upload_avatar(
    file: UploadFile = File(...),
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Validate content type
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=400, detail="Only JPEG, PNG, and WebP images are allowed.")
    
    # Delete old avatar file from Cloudinary if it exists and is a Cloudinary URL
    if current_user.avatar and "res.cloudinary.com" in current_user.avatar:
        try:
            # Extract public ID from cloudinary URL
            # Format: https://res.cloudinary.com/.../careerbridge/avatars/<public_id>.<ext>
            public_id = current_user.avatar.split("/")[-1].rsplit(".", 1)[0]
            cloudinary_service.delete_file(f"careerbridge/avatars/{public_id}")
        except Exception:
            pass # Ignore errors in deletion of old avatar
    
    # Upload to Cloudinary
    upload_result = await cloudinary_service.upload_file(file, folder="careerbridge/avatars")
    
    avatar_url = upload_result["secure_url"]
    
    # Update database
    current_user.avatar = avatar_url
    db.commit()
    db.refresh(current_user)
    
    return {"success": True, "avatar_url": avatar_url}

@router.get("/settings")
def get_settings(current_user: models.Student = Depends(get_current_user)):
    return current_user.settings or {}

@router.put("/settings")
def update_settings(
    settings_data: dict,
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    current_user.settings = settings_data
    db.commit()
    db.refresh(current_user)
    return {"message": "Settings updated successfully"}

@router.put("/settings/security-question")
def update_security_question(
    sec_update: schemas.SecurityUpdate,
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not verify_password(sec_update.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid current password")
    
    current_user.security_question = sec_update.new_question
    current_user.security_answer = get_password_hash(sec_update.new_answer.strip().lower())
    db.commit()
    return {"message": "Security question updated successfully"}

