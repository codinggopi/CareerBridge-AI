from pydantic import BaseModel
from typing import Optional, Dict, Any

class ResumeData(BaseModel):
    content: Optional[Dict[str, Any]] = None

class ResumeOut(BaseModel):
    id: int
    content: Optional[Dict[str, Any]] = None
    score: float

    class Config:
        from_attributes = True
