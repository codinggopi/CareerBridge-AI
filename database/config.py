import os
from dotenv import load_dotenv

# Load environment variables from the backend/.env file if available
dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../backend/.env"))
load_dotenv(dotenv_path)

# Unified connection string for both Local and Vercel environments.
# Expects a Supabase PostgreSQL URL in the format:
# postgresql+psycopg2://user:password@host:port/postgres
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("WARNING: DATABASE_URL environment variable is not set. Database connections will fail.")
