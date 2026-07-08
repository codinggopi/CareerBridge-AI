from pydantic import BaseModel
from typing import Optional

class UpcomingInterviewOut(BaseModel):
    date: str
    month: str
    title: str
    interviewer: str
