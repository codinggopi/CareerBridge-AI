import os

# Configuration for MySQL Database connection
# Used by backend to load connection settings directly from the database folder

DATABASE_USER = os.getenv("DB_USER", "root")
DATABASE_PASSWORD = os.getenv("DB_PASSWORD", "root")
DATABASE_HOST = os.getenv("DB_HOST", "localhost")
DATABASE_PORT = os.getenv("DB_PORT", "3306")
DATABASE_NAME = os.getenv("DB_NAME", "careerbridge")

# Full connection string for SQLAlchemy
DATABASE_URL = f"mysql+pymysql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"
