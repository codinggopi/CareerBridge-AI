from pydantic import BaseModel

class RecommendedRoleOut(BaseModel):
    title: str
    company: str
    match: int
    color: str
