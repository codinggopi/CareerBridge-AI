from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas
from ..auth import get_current_student
from ..ai_service import generate_interview_question, evaluate_interview_answer

router = APIRouter(prefix="/api/interviews", tags=["interviews"])

@router.post("/start", response_model=schemas.InterviewOut, status_code=201)
def start_interview(data: schemas.InterviewCreate, current: models.Student = Depends(get_current_student), db: Session = Depends(get_db)):
    interview = models.Interview(student_id=current.id, interview_type=data.interview_type, messages=[])
    db.add(interview)
    db.commit()
    db.refresh(interview)
    first_question = generate_interview_question(data.interview_type)
    interview.messages = [{"role": "assistant", "content": first_question}]
    db.commit()
    db.refresh(interview)
    return interview

@router.post("/{interview_id}/message", response_model=schemas.InterviewOut)
def send_message(interview_id: int, msg: schemas.InterviewMessage, current: models.Student = Depends(get_current_student), db: Session = Depends(get_db)):
    interview = db.query(models.Interview).filter(models.Interview.id == interview_id, models.Interview.student_id == current.id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    messages = list(interview.messages or [])
    last_question = next((m["content"] for m in reversed(messages) if m["role"] == "assistant"), "")
    eval_result = evaluate_interview_answer(last_question, msg.content)
    messages.append({"role": "user", "content": msg.content})
    if len([m for m in messages if m["role"] == "user"]) < 10:
        next_q = generate_interview_question(interview.interview_type, messages)
        messages.append({"role": "assistant", "content": next_q})
    else:
        interview.completed = True
    interview.messages = messages
    interview.score = (interview.score + eval_result.get("score", 75)) / 2 if interview.score else eval_result.get("score", 75)
    interview.communication_score = eval_result.get("communication_score", 80)
    interview.confidence_score = eval_result.get("confidence_score", 75)
    interview.accuracy_score = eval_result.get("accuracy_score", 70)
    db.commit()
    db.refresh(interview)
    return interview

@router.get("/", response_model=List[schemas.InterviewOut])
def get_interviews(current: models.Student = Depends(get_current_student), db: Session = Depends(get_db)):
    return db.query(models.Interview).filter(models.Interview.student_id == current.id).order_by(models.Interview.created_at.desc()).all()

@router.get("/{interview_id}", response_model=schemas.InterviewOut)
def get_interview(interview_id: int, current: models.Student = Depends(get_current_student), db: Session = Depends(get_db)):
    interview = db.query(models.Interview).filter(models.Interview.id == interview_id, models.Interview.student_id == current.id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    return interview
