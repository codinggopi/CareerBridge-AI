from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

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
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    resumes = relationship("Resume", back_populates="student", cascade="all, delete-orphan")
    skills = relationship("Skill", back_populates="student", cascade="all, delete-orphan")
    interviews = relationship("Interview", back_populates="student", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="student", cascade="all, delete-orphan")


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
    strengths = Column(JSON, default=[])
    weaknesses = Column(JSON, default=[])
    suggestions = Column(JSON, default=[])
    extracted_text = Column(Text)
    is_active = Column(Boolean, default=True)
    upload_date = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student", back_populates="resumes")


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    skill_name = Column(String(100), nullable=False)
    proficiency = Column(Float, default=0.0)  # 0-100
    category = Column(String(50))  # technical, soft, certification
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student", back_populates="skills")


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    interview_type = Column(String(50))  # technical, hr, behavioral, aptitude
    score = Column(Float, default=0.0)
    communication_score = Column(Float, default=0.0)
    confidence_score = Column(Float, default=0.0)
    accuracy_score = Column(Float, default=0.0)
    feedback = Column(Text)
    messages = Column(JSON, default=[])
    duration_seconds = Column(Integer, default=0)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student", back_populates="interviews")


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)
    required_skills = Column(JSON, default=[])
    description = Column(Text)
    salary_min = Column(Integer)
    salary_max = Column(Integer)
    location = Column(String(255))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    category = Column(String(50))  # Resume, Learning, Interviews, Achievements
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student", back_populates="notifications")
