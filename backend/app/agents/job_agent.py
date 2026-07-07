"""JobAgent — matches student profile to job listings."""
from ..ai.embeddings import get_embedding, cosine_similarity

class JobAgent:
    def match_score(self, student_skills: list[str], job_skills: list[str]) -> float:
        if not student_skills or not job_skills:
            return 0.0
        matched = sum(1 for s in job_skills if any(s.lower() in sk.lower() for sk in student_skills))
        return round((matched / len(job_skills)) * 100, 1)

    def rank_jobs(self, student_skills: list[str], jobs: list[dict]) -> list[dict]:
        for job in jobs:
            job["match_score"] = self.match_score(student_skills, job.get("required_skills", []))
        return sorted(jobs, key=lambda j: j["match_score"], reverse=True)

job_agent = JobAgent()
