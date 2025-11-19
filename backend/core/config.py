from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Only load .env if it exists (local dev)
if os.path.exists(".env"):
    load_dotenv()

class Settings(BaseModel):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///.surveys.db")
    ECHO_SQL: bool = os.getenv("ECHO_SQL", "false").lower() == "true"

settings = Settings()