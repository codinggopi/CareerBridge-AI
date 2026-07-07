from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas
from ..auth import get_current_student
from ..ai_service import analyze_skill_gap

router = APIRouter(prefix="/api/skills", tags=["skills"])

@router.get("/", response_model=List[schemas.SkillOut])
def get_skills(current: models.Student = Depends(get_current_student), db: Session = Depends(get_db)):
    return db.query(models.Skill).filter(models.Skill.student_id == current.id).all()

@router.post("/", response_model=schemas.SkillOut, status_code=201)
def add_skill(data: schemas.SkillCreate, current: models.Student = Depends(get_current_student), db: Session = Depends(get_db)):
    existing = db.query(models.Skill).filter(
        models.Skill.student_id == current.id,
        models.Skill.skill_name == data.skill_name
    ).first()
    if existing:
        for k, v in data.model_dump().items():
            setattr(existing, k, v)
        db.commit()
        db.refresh(existing)
        return existing
    skill = models.Skill(student_id=current.id, **data.model_dump())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill

@router.delete("/{skill_id}", status_code=204)
def delete_skill(skill_id: int, current: models.Student = Depends(get_current_student), db: Session = Depends(get_db)):
    skill = db.query(models.Skill).filter(models.Skill.id == skill_id, models.Skill.student_id == current.id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(skill)
    db.commit()

@router.post("/gap-analysis")
def skill_gap_analysis(data: schemas.SkillGapRequest, current: models.Student = Depends(get_current_student), db: Session = Depends(get_db)):
    skills = db.query(models.Skill).filter(models.Skill.student_id == current.id).all()
    skill_names = [s.skill_name for s in skills]
    result = analyze_skill_gap(skill_names, data.target_role)
    return result
