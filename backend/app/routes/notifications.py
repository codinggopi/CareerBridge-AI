from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from .. import models, schemas
from ..auth import get_current_student

router = APIRouter(prefix="/api/notifications", tags=["notifications"])

@router.get("/", response_model=List[schemas.NotificationOut])
def get_notifications(
    category: Optional[str] = None,
    unread_only: bool = False,
    current: models.Student = Depends(get_current_student),
    db: Session = Depends(get_db),
):
    q = db.query(models.Notification).filter(models.Notification.student_id == current.id)
    if category:
        q = q.filter(models.Notification.category == category)
    if unread_only:
        q = q.filter(models.Notification.is_read == False)
    return q.order_by(models.Notification.created_at.desc()).all()

@router.patch("/{notif_id}/read", response_model=schemas.NotificationOut)
def mark_read(notif_id: int, current: models.Student = Depends(get_current_student), db: Session = Depends(get_db)):
    notif = db.query(models.Notification).filter(models.Notification.id == notif_id, models.Notification.student_id == current.id).first()
    if not notif:
        raise HTTPException(status_code=404, detail="Not found")
    notif.is_read = True
    db.commit()
    db.refresh(notif)
    return notif

@router.patch("/mark-all-read")
def mark_all_read(current: models.Student = Depends(get_current_student), db: Session = Depends(get_db)):
    db.query(models.Notification).filter(models.Notification.student_id == current.id).update({"is_read": True})
    db.commit()
    return {"message": "All notifications marked as read"}
