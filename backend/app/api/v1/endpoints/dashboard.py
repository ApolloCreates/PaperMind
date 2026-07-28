from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.services.dashboard_service import DashboardService

from app.schemas.dashboard import DashboardProjectsResponse

from app.schemas.dashboard import DashboardStatsResponse

from app.schemas.dashboard import (
    ProjectOverviewResponse,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)

service = DashboardService()


@router.get(
    "/projects",
    response_model=DashboardProjectsResponse,
)
def list_projects(
    db: Session = Depends(get_db),
):

    return {
        "projects": service.list_projects(db)
    }
    
@router.get(
    "/stats",
    response_model=DashboardStatsResponse,
)
def get_stats(
    db: Session = Depends(get_db),
):

    return service.get_stats(db)


@router.get(
    "/project/{project_id}",
    response_model=ProjectOverviewResponse,
)
def get_project(
    project_id: str,
    db: Session = Depends(get_db),
):

    return service.get_project(
        db,
        project_id,
    )