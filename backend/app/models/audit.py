from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from app.database.base import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=True)  # Can be null for failed logins
    action = Column(String(100), index=True)
    status = Column(String(50))
    ip_address = Column(String(50), nullable=True)
    device_info = Column(String(200), nullable=True)
    details = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
