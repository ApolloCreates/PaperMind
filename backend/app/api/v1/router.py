from fastapi import APIRouter

from app.api.v1.endpoints.projects import router as project_router

from app.api.v1.endpoints.papers import router as paper_router

from app.api.v1.endpoints.summary import router as summary_router

api_router = APIRouter()

api_router.include_router(project_router)

api_router.include_router(paper_router)

api_router.include_router(summary_router)