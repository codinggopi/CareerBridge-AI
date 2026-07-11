from fastapi import FastAPI, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import time
import os
from app.database.connection import engine
from app.database.base import Base
from app.core.config import settings
from app.services.cloudinary_service import init_cloudinary

# Import models to ensure they are registered with SQLAlchemy
from app import models

# Create database tables (graceful fallback if DB is not ready)
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print("Error creating tables:", e)

# Initialize Cloudinary
init_cloudinary()

app = FastAPI(title="CareerBridge AI Backend", version="2.0.0")

from fastapi.responses import JSONResponse

origins = settings.CORS_ORIGINS
if settings.FRONTEND_URL and settings.FRONTEND_URL not in origins:
    origins.append(settings.FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Log the exception here if you have a logger configured
    print(f"Unhandled Exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"message": "An unexpected error occurred. Please try again later.", "details": str(exc)},
    )

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000
    
    # Print the response matching the exact format of the frontend
    print(f" {request.method} {request.url.path} {response.status_code} in {process_time:.0f}ms", flush=True)
    
    return response

# Import and include all modular routes
from app.api import auth, analytics, admin, notifications, learning, interviews, coach, resume, skills, profile

api_router = APIRouter(prefix="/api")
api_router.include_router(auth.router)
api_router.include_router(analytics.router)
api_router.include_router(admin.router)
api_router.include_router(notifications.router)
api_router.include_router(learning.router)
api_router.include_router(interviews.router)
api_router.include_router(coach.router)
api_router.include_router(resume.router)
api_router.include_router(skills.router)
api_router.include_router(profile.router)

app.include_router(api_router)

@app.get("/")
def read_root():
    return {
        "status": "running",
        "service": "CareerBridge AI Backend"
    }

@app.get("/health")
def health_check():
    # Attempt a simple db connect check and cloudinary config check
    db_status = "connected"
    cloudinary_status = "connected"
    
    try:
        with engine.connect() as connection:
            pass
    except Exception as e:
        db_status = f"disconnected ({str(e)})"
        
    import cloudinary
    if not cloudinary.config().cloud_name:
         cloudinary_status = "disconnected (missing config)"

    return {
        "status": "healthy" if db_status == "connected" and cloudinary_status == "connected" else "degraded",
        "database": db_status,
        "cloudinary": cloudinary_status
    }
