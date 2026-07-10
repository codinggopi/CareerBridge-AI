from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
import logging
from app.database.connection import get_db
from app import models, schemas
from app.core.security import verify_password, get_password_hash, create_access_token
from app.services.audit_service import log_audit_event

logger = logging.getLogger("api")
router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=schemas.Token)
def register(request: Request, user_in: schemas.StudentCreate, db: Session = Depends(get_db)):
    logger.info(f"Incoming registration request for email: {user_in.email}")
    ip_address = request.client.host if request.client else None
    
    user = db.query(models.Student).filter(models.Student.email == user_in.email).first()
    if user:
        logger.warning(f"Registration failed: Email {user_in.email} already registered.")
        log_audit_event(db, user_id=None, action="USER_REGISTER", status="FAILED", ip_address=ip_address, details=f"Email already registered: {user_in.email}")
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user_in.password)
    hashed_security_answer = get_password_hash(user_in.security_answer.strip().lower())
    db_user = models.Student(
        name=user_in.name,
        email=user_in.email,
        hashed_password=hashed_password,
        security_question=user_in.security_question,
        security_answer=hashed_security_answer,
        branch=user_in.branch,
        year=user_in.year
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    logger.info(f"Successfully registered student: {db_user.email}")
    log_audit_event(db, user_id=db_user.id, action="USER_REGISTER", status="SUCCESS", ip_address=ip_address, details="New user registered")
    
    access_token = create_access_token(data={"sub": db_user.email})
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email,
            "role": "student"
        }
    }

@router.post("/login", response_model=schemas.Token)
def login(request: Request, user_in: schemas.StudentLogin, db: Session = Depends(get_db)):
    logger.info(f"Incoming login attempt for email: {user_in.email}")
    ip_address = request.client.host if request.client else None
    
    user = db.query(models.Student).filter(models.Student.email == user_in.email).first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        logger.warning(f"Failed login attempt for email: {user_in.email}")
        log_audit_event(db, user_id=user.id if user else None, action="USER_LOGIN", status="FAILED", ip_address=ip_address, details="Invalid credentials")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    logger.info(f"Successful login for student: {user.email}")
    log_audit_event(db, user_id=user.id, action="USER_LOGIN", status="SUCCESS", ip_address=ip_address, details="Successful login")
    
    access_token = create_access_token(data={"sub": user.email})
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": "student"
        }
    }

from app.api.deps import get_current_user

@router.post("/security-question", response_model=schemas.SecurityQuestionResponse)
def get_security_question(request: Request, email_req: schemas.EmailRequest, db: Session = Depends(get_db)):
    user = db.query(models.Student).filter(models.Student.email == email_req.email).first()
    if not user or not user.security_question:
        # Generic fallback to prevent enumeration
        return {"security_question": "What is your primary frequent flyer number?"}
    return {"security_question": user.security_question}

@router.post("/reset-password")
def reset_password(request: Request, reset_in: schemas.PasswordReset, db: Session = Depends(get_db)):
    logger.info(f"Incoming password reset for email: {reset_in.email}")
    ip_address = request.client.host if request.client else None

    user = db.query(models.Student).filter(models.Student.email == reset_in.email).first()
    if not user:
        # Prevent user enumeration by acting like it succeeded
        return {"msg": "If the email is registered, the password has been reset"}
    
    # Verify security answer
    if not user.security_answer or not verify_password(reset_in.security_answer.strip().lower(), user.security_answer):
        log_audit_event(db, user_id=user.id, action="PASSWORD_RESET", status="FAILED", ip_address=ip_address, details="Incorrect security answer")
        raise HTTPException(status_code=400, detail="Incorrect security answer")

    if verify_password(reset_in.new_password, user.hashed_password):
        raise HTTPException(status_code=400, detail="New password cannot be the same as the old password.")

    user.hashed_password = get_password_hash(reset_in.new_password)
    db.commit()
    log_audit_event(db, user_id=user.id, action="PASSWORD_RESET", status="SUCCESS", ip_address=ip_address, details="Password reset successfully")
    return {"msg": "Password reset successfully"}

@router.post("/change-password")
def change_password(
    request: Request,
    change_in: schemas.PasswordChange,
    db: Session = Depends(get_db),
    current_user: models.Student = Depends(get_current_user)
):
    ip_address = request.client.host if request.client else None

    if not verify_password(change_in.current_password, current_user.hashed_password):
        log_audit_event(db, user_id=current_user.id, action="PASSWORD_CHANGE", status="FAILED", ip_address=ip_address, details="Invalid current password")
        raise HTTPException(status_code=400, detail="Invalid current password")
    
    if verify_password(change_in.new_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="New password cannot be the same as the old password.")

    current_user.hashed_password = get_password_hash(change_in.new_password)
    db.commit()
    log_audit_event(db, user_id=current_user.id, action="PASSWORD_CHANGE", status="SUCCESS", ip_address=ip_address, details="Password changed successfully")
    return {"msg": "Password changed successfully"}
