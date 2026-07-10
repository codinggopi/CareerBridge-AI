from sqlalchemy.orm import Session
from app.models.audit import AuditLog

def log_audit_event(db: Session, user_id: int, action: str, status: str, ip_address: str = None, device_info: str = None, details: str = None):
    try:
        audit_entry = AuditLog(
            user_id=user_id,
            action=action,
            status=status,
            ip_address=ip_address,
            device_info=device_info,
            details=details
        )
        db.add(audit_entry)
        db.commit()
    except Exception as e:
        # Prevent audit logging failure from crashing the main request
        print(f"Audit log failed: {e}")
        db.rollback()
