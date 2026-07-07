from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, JSON
from sqlalchemy.sql import func
from ..database.base import Base

class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)
    required_skills = Column(JSON, default=list)
    description = Column(Text)
    salary_min = Column(Integer)
    salary_max = Column(Integer)
    location = Column(String(255))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
