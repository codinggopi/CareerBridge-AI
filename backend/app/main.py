from fastapi import FastAPI, Request, APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import time
import os
from app.database.connection import engine
from app.database.base import Base
from app.core.config import settings

# Import models to ensure they are registered with SQLAlchemy
from app import models

# Create database tables (graceful fallback if DB is not ready)
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print("Error creating tables:", e)
app = FastAPI(title="CareerBridge AI", version="2.0.0")

from fastapi.responses import JSONResponse

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
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

# Serve uploaded files (avatars, etc.) as static assets
uploads_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
os.makedirs(os.path.join(uploads_dir, "avatars"), exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")

@app.get("/")
def read_root():
    return {"status": "ok", "message": "CareerBridge AI API is running successfully"}
