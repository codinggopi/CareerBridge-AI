from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any
from datetime import datetime

# --- Auth ---
class StudentCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    branch: Optional[str] = None
    year: Optional[str] = None

class StudentLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    student: "StudentOut"

class StudentOut(BaseModel):
    id: int
    name: str
    email: str
    branch: Optional[str]
    year: Optional[str]
    phone: Optional[str]
    graduation_year: Optional[str]
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True

class StudentUpdate(BaseModel):
    name: Optional[str]
    phone: Optional[str]
    graduation_year: Optional[str]
    branch: Optional[str]

# --- Resume ---
class ResumeOut(BaseModel):
    id: int
    student_id: int
    original_filename: Optional[str]
    score: float
    ats_score: float
    technical_score: float
    soft_skills_score: float
    grammar_score: float
    strengths: List[str]
    weaknesses: List[str]
    suggestions: List[str]
    upload_date: datetime

    class Config:
        from_attributes = True

# --- Skill ---
class SkillCreate(BaseModel):
    skill_name: str
    proficiency: float
    category: Optional[str] = "technical"

class SkillOut(BaseModel):
    id: int
    skill_name: str
    proficiency: float
    category: Optional[str]
    is_verified: bool

    class Config:
        from_attributes = True

# --- Interview ---
class InterviewCreate(BaseModel):
    interview_type: str

class InterviewMessage(BaseModel):
    role: str  # user | assistant
    content: str

class InterviewOut(BaseModel):
    id: int
    interview_type: str
    score: float
    communication_score: float
    confidence_score: float
    accuracy_score: float
    feedback: Optional[str]
    messages: List[Any]
    completed: bool
    created_at: datetime

    class Config:
        from_attributes = True

# --- Skill Gap ---
class SkillGapRequest(BaseModel):
    target_role: str

class SkillGapResult(BaseModel):
    match_percentage: float
    mastered_skills: List[str]
    missing_skills: List[str]
    critical_gaps: List[dict]
    learning_resources: List[dict]

# --- Notifications ---
class NotificationOut(BaseModel):
    id: int
    title: str
    message: str
    category: Optional[str]
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

# --- AI Chat ---
class ChatMessage(BaseModel):
    message: str
    history: Optional[List[dict]] = []

class ChatResponse(BaseModel):
    response: str

# --- Dashboard ---
class DashboardStats(BaseModel):
    resume_score: float
    skill_score: float
    placement_readiness: float
    interview_score: float
    learning_progress: float
