from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database.connection import get_db
from app import models
from app.api.deps import get_current_user
from app.services import interview_service

router = APIRouter(tags=["interviews"])

class InterviewMessageIn(BaseModel):
    message: str

@router.get("/interviews/mock")
def get_mock_interview(
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return interview_service.get_mock_interview_data(db, current_user.id)

@router.post("/interviews/mock/message")
def send_interview_message(
    msg_in: InterviewMessageIn,
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return interview_service.process_interview_message(db, current_user.id, msg_in.message)
