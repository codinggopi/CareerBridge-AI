from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    branch = Column(String(100))
    year = Column(String(50))
    phone = Column(String(20))
    graduation_year = Column(String(10))
    bio = Column(String(1000))
    avatar = Column(String(500))
    linkedin_link = Column(String(255))
    github_link = Column(String(255))
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    settings = Column(JSON, nullable=True)
    
    # Aggregated Scores
    placement_readiness_score = Column(Float, default=0.0)
    resume_score = Column(Float, default=0.0)
    skill_score = Column(Float, default=0.0)
    interview_score = Column(Float, default=0.0)
    learning_progress = Column(Float, default=0.0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    resumes = relationship("Resume", back_populates="student", cascade="all, delete-orphan")
    activities = relationship("ActivityLog", back_populates="student", cascade="all, delete-orphan")
    skills = relationship("Skill", back_populates="student", cascade="all, delete-orphan")
    interviews = relationship("InterviewSession", back_populates="student", cascade="all, delete-orphan")
    job_matches = relationship("JobMatch", back_populates="student", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="student", cascade="all, delete-orphan")

class ActivityLog(Base):
    __tablename__ = "activity_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(String(500))
    icon = Column(String(50), default="check-square")
    icon_color = Column(String(50), default="text-primary")
    icon_bg = Column(String(50), default="bg-primary/10")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    student = relationship("Student", back_populates="activities")
