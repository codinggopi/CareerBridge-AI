from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base

class InterviewSession(Base):
    __tablename__ = "interview_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    title = Column(String(255), nullable=False)
    interviewer = Column(String(255), default="AI Interviewer")
    scheduled_date = Column(DateTime(timezone=True))
    is_completed = Column(Boolean, default=False)
    score = Column(Float, nullable=True)
    
    student = relationship("Student", back_populates="interviews")

class InterviewMessage(Base):
    __tablename__ = "interview_messages"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    sender = Column(String(50), nullable=False) # 'user' or 'ai'
    text = Column(String(2000), nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    student_rel = relationship("Student", backref="interview_messages")
