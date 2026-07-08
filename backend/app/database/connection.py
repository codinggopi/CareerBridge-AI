from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sys
import os

# Add root folder to sys path to import the database config
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../")))
from database.config import DATABASE_URL

# Use the centralized database config
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
