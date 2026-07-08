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
        "avatar": current_user.avatar or "https://i.pravatar.cc/150",
        "phone": current_user.phone or "",
        "branch": current_user.branch or "",
        "year": current_user.year or "",
        "graduation_year": current_user.graduation_year or "",
        "linkedin_link": current_user.linkedin_link or "",
        "github_link": current_user.github_link or ""
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

