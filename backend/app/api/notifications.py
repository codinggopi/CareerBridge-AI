from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app import models
from app.api.deps import get_current_user
from app.services import notification_service

router = APIRouter(tags=["notifications"])

@router.get("/notifications")
def get_notifications(
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return notification_service.get_user_notifications(db, current_user.id)
