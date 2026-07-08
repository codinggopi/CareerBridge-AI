from fastapi import APIRouter, Depends
from app import models
from app.api.deps import get_current_user

router = APIRouter(tags=["learning"])

@router.get("/learning/roadmap")
def get_learning_roadmap(current_user: models.Student = Depends(get_current_user)):
    return {
        "title": "Welcome to CareerBridge AI",
        "desc": "Start your journey by exploring modules based on your skill gaps.",
        "progress": int(current_user.learning_progress) if current_user.learning_progress else 0,
        "weeks": [
            {
                "week": "Week 1", "state": "completed", "title": "Foundation Concepts",
                "desc": "Reviewed basic algorithms and core programming concepts.",
                "progress": 100, "meta": "Completed • 4 hours spent"
            },
            {
                "week": "Week 2", "state": "current", "title": "System Design & Architecture",
                "desc": "Focusing on your critical gap: designing scalable distributed systems.",
                "progress": 25, 
                "modules": [
                    {"name": "Load Balancing", "icon": "layout"},
                    {"name": "Database Sharding", "icon": "code"}
                ]
            },
            {
                "week": "Week 3", "state": "locked", "title": "Cloud Deployment",
                "desc": "Introduction to AWS and automated CI/CD pipelines.",
                "progress": 0, "meta": "Prerequisite: System Design"
            }
        ],
        "insights": {"text": "Based on your <b>Placement Readiness score</b>, prioritizing System Design will boost your chances by 15%."},
        "resources": [
            {"title": "Grokking the System Design Interview", "type": "Interactive Course", "icon": "layout"},
            {"title": "AWS Certified Cloud Practitioner", "type": "Video Series", "icon": "youtube"}
        ],
        "milestones": [
            {"title": "Build a Load Balancer", "points": 500, "icon": "code", "done": False},
            {"title": "First Mock Interview", "points": 300, "icon": "award", "done": True}
        ]
    }

@router.get("/learning/resources")
def get_learning_resources(current_user: models.Student = Depends(get_current_user)):
    return {
        "targetRole": current_user.branch or "Student",
        "skillReadiness": 0,
        "momentum": [],
        "saved": [],
        "recommendations": [],
        "courses": []
    }
