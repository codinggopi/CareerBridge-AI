from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class StudentCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    branch: Optional[str] = None
    year: Optional[str] = None

class StudentLogin(BaseModel):
    email: EmailStr
    password: str

class StudentOut(BaseModel):
    id: int
    name: str
    email: str
    branch: Optional[str] = None
    year: Optional[str] = None
    phone: Optional[str] = None
    graduation_year: Optional[str] = None
    is_admin: bool
    created_at: datetime
    class Config:
        from_attributes = True

class StudentUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    graduation_year: Optional[str] = None
    branch: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    student: StudentOut
