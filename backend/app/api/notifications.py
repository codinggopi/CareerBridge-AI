from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app import models
from app.api.deps import get_current_user

router = APIRouter(tags=["notifications"])

@router.get("/notifications")
def get_notifications(
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    notifications = db.query(models.Notification).filter(models.Notification.student_id == current_user.id).order_by(models.Notification.created_at.desc()).all()
    
    # Return empty list if no notifications
    return [
        {
            "id": n.id,
            "title": n.title,
            "message": n.message,
            "is_read": n.is_read,
            "created_at": n.created_at
        } for n in notifications
    ]
