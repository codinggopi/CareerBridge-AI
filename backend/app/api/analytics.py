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
            avatar="https://i.pravatar.cc/150"
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
def get_skill_gap(
    current_user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    skills = db.query(models.Skill).filter(models.Skill.student_id == current_user.id).all()
    
    skill_distribution = []
    for s in skills:
        skill_distribution.append({
            "name": s.name,
            "value": s.proficiency,
            "status": "Mastered" if s.proficiency >= 80 else "In Progress"
        })
        
    if not skill_distribution:
        skill_distribution = [
            {"name": "No Skills Added", "value": 0, "status": "In Progress"}
        ]
        
    return {
        "targetRole": current_user.branch or "General Student",
        "readiness": int(current_user.placement_readiness_score) if current_user.placement_readiness_score else 0,
        "skillDistribution": skill_distribution,
        "criticalGaps": [
            {"impact": "High Impact", "title": "System Design", "desc": "Crucial for senior roles in tech. Missing core concepts."},
            {"impact": "Medium Impact", "title": "Cloud Deployment", "desc": "Good to have for full stack development. Lacking practical exposure."}
        ],
        "benchmarks": [
            {"metric": "Problem Solving", "you": "75%", "avg": "85%"},
            {"metric": "System Design", "you": "40%", "avg": "70%"}
        ],
        "learningPath": [
            {
                "type": "Course", "typeColor": "text-blue-400", "title": "System Design Basics", 
                "desc": "Learn the core concepts of designing scalable distributed systems.", 
                "meta": "4 Weeks", "action": "Start Module"
            }
        ]
    }

@router.get("/analysis/placement-readiness")
def get_placement_readiness(current_user: models.Student = Depends(get_current_user)):
    return {"score": current_user.placement_readiness_score, "details": []}

@router.get("/career/intelligence")
def get_career_intelligence(current_user: models.Student = Depends(get_current_user)):
    return {"insights": []}
