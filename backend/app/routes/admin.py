from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from .. import models, schemas
from ..auth import get_admin_student

router = APIRouter(prefix="/api/admin", tags=["admin"])

@router.get("/students", response_model=List[schemas.StudentOut])
def list_students(
    skip: int = 0, limit: int = 50,
    dept: Optional[str] = None,
    current=Depends(get_admin_student),
    db: Session = Depends(get_db),
):
    q = db.query(models.Student).filter(models.Student.is_admin == False)
    if dept:
        q = q.filter(models.Student.branch == dept)
    return q.offset(skip).limit(limit).all()

@router.get("/students/{student_id}", response_model=schemas.StudentOut)
def get_student(student_id: int, current=Depends(get_admin_student), db: Session = Depends(get_db)):
    s = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not s:
        raise HTTPException(status_code=404, detail="Student not found")
    return s

@router.delete("/students/{student_id}", status_code=204)
def delete_student(student_id: int, current=Depends(get_admin_student), db: Session = Depends(get_db)):
    s = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not s:
        raise HTTPException(status_code=404, detail="Student not found")
    db.delete(s)
    db.commit()
