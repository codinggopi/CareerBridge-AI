from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database.base import Base

class JobRole(Base):
    __tablename__ = "job_roles"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    color = Column(String(50), default="bg-primary")

class JobMatch(Base):
    __tablename__ = "job_matches"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    job_role_id = Column(Integer, ForeignKey("job_roles.id"), nullable=False)
    match_percentage = Column(Float, default=0.0)
    
    student = relationship("Student", back_populates="job_matches")
    job_role = relationship("JobRole")
