from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import logging
from app.database.connection import get_db
from app import models, schemas
from app.core.security import verify_password, get_password_hash, create_access_token

logger = logging.getLogger("api")
router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=schemas.Token)
def register(user_in: schemas.StudentCreate, db: Session = Depends(get_db)):
    logger.info(f"Incoming registration request for email: {user_in.email}")
    user = db.query(models.Student).filter(models.Student.email == user_in.email).first()
    if user:
        logger.warning(f"Registration failed: Email {user_in.email} already registered.")
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user_in.password)
    db_user = models.Student(
        name=user_in.name,
        email=user_in.email,
        hashed_password=hashed_password,
        branch=user_in.branch,
        year=user_in.year
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    logger.info(f"Successfully registered student: {db_user.email}")
    access_token = create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=schemas.Token)
def login(user_in: schemas.StudentLogin, db: Session = Depends(get_db)):
    logger.info(f"Incoming login attempt for email: {user_in.email}")
    user = db.query(models.Student).filter(models.Student.email == user_in.email).first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        logger.warning(f"Failed login attempt for email: {user_in.email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    logger.info(f"Successful login for student: {user.email}")
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
