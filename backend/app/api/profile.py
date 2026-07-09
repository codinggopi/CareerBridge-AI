from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app import models, schemas
from app.api.deps import get_current_user

router = APIRouter(tags=["profile"])

@router.get("/profile")
def get_profile(
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return {
        "name": current_user.name,
        "email": current_user.email,
        "bio": current_user.bio or "Update your bio.",
        "phone": current_user.phone or "",
        "branch": current_user.branch or "",
        "graduation_year": current_user.graduation_year or "",
        "profile": {
            "name": current_user.name,
            "title": current_user.branch or "Student / Software Engineer",
            "avatar": current_user.avatar or "https://i.pravatar.cc/150",
            "placementScore": 88,
            "placementRank": "TOP 12%"
        },
        "metrics": {
            "resumeScore": current_user.resume_score if current_user.resume_score else 85,
            "skillScore": 92,
            "readiness": "HIGH"
        },
        "coreSkills": [
            {"name": "Frontend Development", "score": 95},
            {"name": "Backend Development", "score": 85},
            {"name": "System Design", "score": 75}
        ],
        "technologies": ["React", "Node.js", "Python", "AWS", "Docker", "PostgreSQL"],
        "projects": [
            {
                "title": "E-Commerce Platform",
                "desc": "Built a scalable e-commerce backend using Node.js and microservices.",
                "tags": ["Node.js", "Docker", "AWS"]
            },
            {
                "title": "AI Resume Analyzer",
                "desc": "Integrated OpenAI API to analyze resumes and give scoring.",
                "tags": ["Python", "FastAPI", "React"]
            }
        ],
        "achievements": [
            {"title": "AWS Certified Developer", "desc": "Passed with 92% score."},
            {"title": "Hackathon Winner 2025", "desc": "First place in university hackathon."}
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
    allowed_fields = ["name", "bio", "phone", "branch", "year", "graduation_year", "linkedin_link", "github_link"]
    for field in allowed_fields:
        if field in profile_data:
            setattr(current_user, field, profile_data[field])
    
    db.commit()
    db.refresh(current_user)
    return {"message": "Profile updated successfully"}

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

