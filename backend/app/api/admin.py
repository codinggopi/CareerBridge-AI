from fastapi import APIRouter
import json
import os

router = APIRouter(tags=["admin"])

DATA_DIR = os.path.join(os.path.dirname(__file__), "../../../frontend/src/data")
def load_mock(filename):
    try:
        with open(os.path.join(DATA_DIR, filename), "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        return {"error": str(e)}

@router.get("/dashboard/admin")
def get_admin_dashboard():
    return load_mock("mockAdminDashboard.json")
