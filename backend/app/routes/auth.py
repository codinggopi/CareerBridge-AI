from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..auth import hash_password, verify_password, create_access_token, get_current_student

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register", response_model=schemas.Token, status_code=201)
def register(data: schemas.StudentCreate, db: Session = Depends(get_db)):
    if db.query(models.Student).filter(models.Student.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    student = models.Student(
        name=data.name, email=data.email,
        hashed_password=hash_password(data.password),
        branch=data.branch, year=data.year,
    )
    db.add(student)
    db.commit()
    db.refresh(student)
    token = create_access_token({"sub": student.id})
    return {"access_token": token, "student": student}

@router.post("/login", response_model=schemas.Token)
def login(data: schemas.StudentLogin, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.email == data.email).first()
    if not student or not verify_password(data.password, student.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": student.id})
    return {"access_token": token, "student": student}

@router.get("/me", response_model=schemas.StudentOut)
def me(current: models.Student = Depends(get_current_student)):
    return current

@router.patch("/me", response_model=schemas.StudentOut)
def update_me(data: schemas.StudentUpdate, current: models.Student = Depends(get_current_student), db: Session = Depends(get_db)):
    for field, value in data.model_dump(exclude_none=True).items():
        setattr(current, field, value)
    db.commit()
    db.refresh(current)
    return current
