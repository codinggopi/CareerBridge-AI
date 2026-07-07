from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class SkillCreate(BaseModel):
    skill_name: str
    proficiency: float
    category: Optional[str] = "technical"

class SkillOut(BaseModel):
    id: int
    skill_name: str
    proficiency: float
    category: Optional[str] = None
    is_verified: bool
    class Config:
        from_attributes = True

class NotificationOut(BaseModel):
    id: int
    title: str
    message: str
    category: Optional[str] = None
    icon: Optional[str] = None
    is_read: bool
    created_at: datetime
    class Config:
        from_attributes = True

class ChatMessage(BaseModel):
    message: str
    history: Optional[List[dict]] = []

class ChatResponse(BaseModel):
    response: str

class SkillGapRequest(BaseModel):
    target_role: str

class DashboardStats(BaseModel):
    resume_score: float
    skill_score: float
    placement_readiness: float
    interview_score: float
    learning_progress: float

class JobOut(BaseModel):
    id: int
    company_name: str
    role: str
    required_skills: List[str] = []
    description: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    location: Optional[str] = None
    created_at: datetime
    class Config:
        from_attributes = True
