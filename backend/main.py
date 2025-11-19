# Author: Alon Wilson

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.db import init_db
from api.routes.surveys import router as survey_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    init_db()
    yield
    # (You can add any shutdown logic here if needed later)

app = FastAPI(
    title="Survey Management System (FastAPI + SQLModel)",
    lifespan=lifespan
)

# 👇 Add this right after app creation
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://54.204.18.144",                  # frontend root
    "http://54.204.18.144:30336",            # frontend NodePort
    "http://54.204.18.144:31605",            # backend NodePort
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(survey_router)
