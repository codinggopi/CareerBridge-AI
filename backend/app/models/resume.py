from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    file_path = Column(String(500))
    original_filename = Column(String(255))
    score = Column(Float, default=0.0)
    content = Column(JSON, nullable=True)
    upload_date = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student", back_populates="resumes")
