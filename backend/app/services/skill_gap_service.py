from sqlalchemy.orm import Session
from app import models

def get_skill_gap_analysis(db: Session, current_user: models.Student):
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