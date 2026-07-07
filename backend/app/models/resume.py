from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database.base import Base

class Resume(Base):
    __tablename__ = "resumes"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    file_path = Column(String(500))
    original_filename = Column(String(255))
    score = Column(Float, default=0.0)
    ats_score = Column(Float, default=0.0)
    technical_score = Column(Float, default=0.0)
    soft_skills_score = Column(Float, default=0.0)
    grammar_score = Column(Float, default=0.0)
    strengths = Column(JSON, default=list)
    weaknesses = Column(JSON, default=list)
    suggestions = Column(JSON, default=list)
    extracted_text = Column(Text)
    is_active = Column(Boolean, default=True)
    upload_date = Column(DateTime(timezone=True), server_default=func.now())
    student = relationship("Student", back_populates="resumes")
