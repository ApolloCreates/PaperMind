from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api.v1.router import api_router
from app.db.base import Base
from app.db.session import engine
from app.storage.minio import initialize_bucket
from app.db import base_models

from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    
    Base.metadata.create_all(bind=engine)

    initialize_bucket()

    yield


app = FastAPI(
    title="ResearchAI API",
    version="1.0.0",
    lifespan=lifespan,
)

origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",


]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    return {
        "message": "Welcome to ResearchAI"
    }