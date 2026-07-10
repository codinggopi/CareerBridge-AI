import sys
import os

# Add root folder to sys path to import the backend packages
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../")))

from app.database.connection import engine
from app.database.base import Base

# Import all models so they are registered with Base metadata
from app.models import student, audit, coach, interview, job, notification, resume, skills

def init_db():
    print("Creating database tables on Supabase PostgreSQL...")
    try:
        Base.metadata.create_all(bind=engine)
        print("Successfully created all tables!")
        
        # Verify
        from sqlalchemy import text
        with engine.connect() as conn:
            result = conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema='public'"))
            tables = [row[0] for row in result]
            print(f"Tables in public schema: {tables}")
    except Exception as e:
        print(f"Error creating tables: {e}")

if __name__ == "__main__":
    init_db()
