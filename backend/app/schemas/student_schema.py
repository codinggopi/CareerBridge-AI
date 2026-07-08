from pydantic import BaseModel, EmailStr
from typing import Optional, List
from .interview_schema import UpcomingInterviewOut
from .job_schema import RecommendedRoleOut

class StudentCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    branch: Optional[str] = None
    year: Optional[str] = None

class StudentLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class StatOut(BaseModel):
    title: str
    value: str
    suffix: str
    change: str
    icon: str
    color: str
    isHighlighted: Optional[bool] = False

class SkillDistOut(BaseModel):
    name: str
    core: int
    soft: int

class ActivityOut(BaseModel):
    title: str
    description: str
    time: str
    icon: str
    iconColor: str
    iconBg: str

class AISmartPickOut(BaseModel):
    title: str
    description: str
    tags: List[str]

class UserProfileOut(BaseModel):
    name: str
    fullName: str
    role: str
    avatar: str

class DashboardOut(BaseModel):
    user: UserProfileOut
    stats: List[StatOut]
    skillDistribution: List[SkillDistOut]
    recentActivities: List[ActivityOut]
    upcomingInterviews: Optional[UpcomingInterviewOut]
    recommendedRoles: List[RecommendedRoleOut]
    aiSmartPick: Optional[AISmartPickOut]

class AdminDashboardOut(BaseModel):
    stats: List[StatOut]

def generate_empty_dashboard(user_name: str = "Student") -> DashboardOut:
    return DashboardOut(
        user=UserProfileOut(
            name=user_name,
            fullName=f"{user_name} User",
            role="Student",
            avatar="https://i.pravatar.cc/150"
        ),
        stats=[
            StatOut(title="Resume Score", value="0", suffix="/100", change="0%", icon="file-text", color="text-primary"),
            StatOut(title="Skill Score", value="0", suffix="/100", change="0%", icon="code", color="text-blue-400"),
            StatOut(title="Placement Readiness", value="0%", suffix="", change="Needs Data", icon="rocket", color="text-orange-400", isHighlighted=True),
        ],
        skillDistribution=[],
        recentActivities=[],
        upcomingInterviews=None,
        recommendedRoles=[],
        aiSmartPick=None
    )
