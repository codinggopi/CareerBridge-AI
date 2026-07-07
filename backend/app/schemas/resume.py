from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ResumeOut(BaseModel):
    id: int
    student_id: int
    original_filename: Optional[str] = None
    score: float
    ats_score: float
    technical_score: float
    soft_skills_score: float
    grammar_score: float
    strengths: List[str] = []
    weaknesses: List[str] = []
    suggestions: List[str] = []
    upload_date: datetime
    class Config:
        from_attributes = True
