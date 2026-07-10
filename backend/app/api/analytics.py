from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app import models, schemas
from app.api.deps import get_current_user
from fastapi import APIRouter

router = APIRouter(tags=["analytics", "dashboard"])

@router.get("/dashboard/student", response_model=schemas.DashboardOut)
def get_student_dashboard(
    current_user: models.Student = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    student = current_user

    activities = db.query(models.ActivityLog).filter(models.ActivityLog.student_id == student.id).order_by(models.ActivityLog.created_at.desc()).limit(5).all()
    skills = db.query(models.Skill).filter(models.Skill.student_id == student.id).all()
    matches = db.query(models.JobMatch).filter(models.JobMatch.student_id == student.id).order_by(models.JobMatch.match_percentage.desc()).limit(4).all()
    
    return schemas.DashboardOut(
        user=schemas.UserProfileOut(
            name=student.name,
            fullName=f"{student.name}",
            role="Student",
            avatar=student.avatar or "https://i.pravatar.cc/150"
        ),
        stats=[
            schemas.StatOut(title="Resume Score", value=str(student.resume_score), suffix="/100", change="", icon="file-text", color="text-primary"),
            schemas.StatOut(title="Skill Score", value=str(student.skill_score), suffix="/100", change="", icon="code", color="text-blue-400"),
            schemas.StatOut(title="Placement Readiness", value=f"{student.placement_readiness_score}%", suffix="", change="", icon="rocket", color="text-orange-400", isHighlighted=True),
        ],
        skillDistribution=[
            schemas.SkillDistOut(name=s.name, core=s.proficiency if s.is_core else 0, soft=0 if s.is_core else s.proficiency) 
            for s in skills
        ],
        recentActivities=[
            schemas.ActivityOut(title=a.title, description=a.description, time="Recent", icon=a.icon, iconColor=a.icon_color, iconBg=a.icon_bg)
            for a in activities
        ],
        upcomingInterviews=None,
        recommendedRoles=[
            schemas.RecommendedRoleOut(title=m.job_role.title, company=m.job_role.company, match=m.match_percentage, color=m.job_role.color)
            for m in matches
        ],
        aiSmartPick=None
    )

@router.get("/dashboard/admin")
def get_admin_dashboard(
    current_user: models.Student = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    # Retrieve system wide stats (mocking aggregate logic for now)
    total_students = db.query(models.Student).count()
    total_interviews = db.query(models.InterviewSession).count()
    
    return {
        "stats": [
            {"title": "Total Active Students", "value": str(total_students), "icon": "users", "change": "+12%", "color": "text-primary", "isHighlighted": True},
            {"title": "Interviews Conducted", "value": str(total_interviews), "icon": "activity", "change": "+45", "color": "text-blue-400"},
            {"title": "Avg Placement Readiness", "value": "78", "suffix": "%", "icon": "sparkles", "change": "+3.2%", "color": "text-orange-400"}
        ],
        "skillTrends": [
            {"month": "Jan", "value": 45},
            {"month": "Feb", "value": 52},
            {"month": "Mar", "value": 61},
            {"month": "Apr", "value": 58},
            {"month": "May", "value": 75},
            {"month": "Jun", "value": 82}
        ],
        "liveActivities": [
            {"title": "Resume Uploaded", "desc": "Alex Forge updated their profile", "time": "2m ago", "dot": "bg-blue-400"},
            {"title": "Mock Interview", "desc": "Sarah Jenkins scored 92%", "time": "15m ago", "dot": "bg-primary"}
        ],
        "candidates": [
            {"name": "Alex Forge", "avatar": "https://i.pravatar.cc/150?u=alex", "role": "Software Engineer", "match": 95, "status": "Ready"},
            {"name": "Sarah Jenkins", "avatar": "https://i.pravatar.cc/150?u=sarah", "role": "Data Scientist", "match": 88, "status": "In Progress"}
        ]
    }

@router.get("/analysis/skill-gap")
def get_skill_gap(
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    from app.services import skill_gap_service
    return skill_gap_service.get_skill_gap_analysis(db, current_user)

@router.get("/analysis/placement-readiness")
def get_placement_readiness(current_user: models.Student = Depends(get_current_user)):
    return {
        "score": int(current_user.placement_readiness_score) if current_user.placement_readiness_score else 0,
        "rank": "TOP 15%",
        "status": "INTERVIEW READY",
        "breakdown": [
            {"title": "Technical Skills", "score": 85, "max": 100, "icon": "code", "color": "bg-blue-400", "desc": "Strong in React & Python. Needs work in System Design."},
            {"title": "Soft Skills", "score": 90, "max": 100, "icon": "brain", "color": "bg-green-400", "desc": "Excellent communication and team collaboration."},
            {"title": "Resume Strength", "score": 82, "max": 100, "icon": "file-text", "color": "bg-yellow-400", "desc": "Good impact metrics, missing some keyword optimization."},
            {"title": "Mock Interviews", "score": 78, "max": 100, "icon": "message-square", "color": "bg-purple-400", "desc": "Good technical answers, confidence needs minor improvement."}
        ],
        "probability": 88,
        "trends": [
            {"name": "Coding Speed", "change": "+15%", "changeColor": "text-primary", "icon": "zap"},
            {"name": "System Design", "change": "+5%", "changeColor": "text-blue-400", "icon": "shield"}
        ],
        "milestones": [
            {"title": "Profile Completion", "desc": "All basic details added.", "status": "COMPLETED", "statusColor": "text-primary", "dotColor": "border-primary", "progress": 100},
            {"title": "First Mock Interview", "desc": "Completed with >75% score.", "status": "COMPLETED", "statusColor": "text-primary", "dotColor": "border-primary", "progress": 100},
            {"title": "Advanced System Design", "desc": "Complete the scaling microservices module.", "status": "IN PROGRESS", "statusColor": "text-blue-400", "dotColor": "border-blue-400", "progress": 45}
        ],
        "coach": {
            "insight": "You are well positioned for <strong>Frontend and Full Stack</strong> roles. Your React skills are top-tier, but you should practice System Design questions to clear senior technical rounds.",
            "action": "Schedule a Mock Interview focused purely on System Design."
        }
    }

@router.get("/career/intelligence")
def get_career_intelligence(current_user: models.Student = Depends(get_current_user)):
    return {
        "profile": {
            "avatar": "https://i.pravatar.cc/150",
            "name": current_user.name,
            "role": "Full Stack Developer",
            "skills": ["React", "Node.js", "Python", "AWS", "Docker"],
            "projects": ["E-Commerce Platform (MERN)", "AI Chatbot Interface"],
            "score": current_user.resume_score if current_user.resume_score else 85,
            "topRegion": "12%"
        },
        "insights": [
            "Your combination of React and Node.js positions you well for 64% of open Full Stack roles.",
            "Adding Cloud Native Security could increase your match rate for senior roles by 22%."
        ],
        "marketDemand": [
            {"role": "Frontend Developer", "trend": "HIGH DEMAND", "trendColor": "text-primary", "growth": "+12% YoY"},
            {"role": "Full Stack Developer", "trend": "STABLE", "trendColor": "text-blue-400", "growth": "+8% YoY"},
            {"role": "Backend Engineer", "trend": "RISING", "trendColor": "text-yellow-400", "growth": "+18% YoY"}
        ],
        "recommendedRoles": [
            {
                "title": "Senior Frontend Engineer", "company": "TechGlobal Inc.", "match": 94, "matchColor": "text-primary",
                "type": "Remote", "salary": "$120k - $150k", "icon": "code",
                "skills": ["React", "TypeScript", "Tailwind"]
            },
            {
                "title": "Full Stack Developer", "company": "InnovateX", "match": 88, "matchColor": "text-blue-400",
                "type": "Hybrid", "salary": "$110k - $140k", "icon": "code",
                "skills": ["React", "Node.js", "PostgreSQL"]
            }
        ]
    }
