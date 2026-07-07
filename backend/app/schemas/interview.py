from pydantic import BaseModel
from typing import List, Any, Optional
from datetime import datetime

class InterviewCreate(BaseModel):
    interview_type: str

class InterviewMessage(BaseModel):
    content: str

class InterviewOut(BaseModel):
    id: int
    interview_type: str
    score: float
    communication_score: float
    confidence_score: float
    accuracy_score: float
    feedback: Optional[str] = None
    messages: List[Any] = []
    completed: bool
    created_at: datetime
    class Config:
        from_attributes = True
