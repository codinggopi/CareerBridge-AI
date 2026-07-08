from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database.base import Base

class Skill(Base):
    __tablename__ = "skills"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    name = Column(String(100), nullable=False)
    proficiency = Column(Float, default=0.0)  # 0 to 100
    is_core = Column(Boolean, default=True)   # Core vs Soft skill
    
    student = relationship("Student", back_populates="skills")
