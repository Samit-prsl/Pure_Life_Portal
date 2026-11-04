import os

from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")
DB_URL = os.getenv("DB_URL", "")
GO_API_URL = os.getenv("GO_API_URL", "http://localhost:5000").rstrip("/")
SECRET_KEY = os.getenv("SECRET_KEY", "")
PORT = int(os.getenv("PORT", "8000"))
