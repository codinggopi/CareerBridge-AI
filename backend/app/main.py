from fastapi import FastAPI, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import time
from app.database.connection import engine
from app.database.base import Base
from app.core.config import settings

# Import models to ensure they are registered with SQLAlchemy
from app import models

# Create database tables (graceful fallback if DB is not ready)
try:
    Base.metadata.create_all(bind=engine)
    print("Successfully connected to MySQL and created tables.")
except Exception as e:
    print(f"Warning: Could not connect to MySQL Database. Ensure it is running and credentials are correct. Error: {e}")

app = FastAPI(title="CareerBridge AI API", version="2.0.0")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

api_router = APIRouter(prefix="/api/v1")
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
    return {"status": "ok", "message": "CareerBridge AI API is running on MySQL"}
