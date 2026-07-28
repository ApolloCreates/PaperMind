from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.project import ProjectCreate, ProjectResponse, ProjectListResponse
from app.services.project_service import ProjectService

router = APIRouter(prefix="/projects", tags=["Projects"])

service = ProjectService()


@router.post(
    "",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_project(
    payload: ProjectCreate,
    db: Session = Depends(get_db),
):
    return service.create_project(
        db,
        payload.name,
        payload.description,
    )


@router.get(
    "",
    response_model=list[ProjectListResponse],
)
def list_projects(
    db: Session = Depends(get_db),
):
    return service.list_projects(db)


@router.get(
    "/{project_id}",
    response_model=ProjectResponse,
)
def get_project(
    project_id: str,
    db: Session = Depends(get_db),
):
    project = service.get_project(db, project_id)

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return project


@router.delete(
    "/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_project(
    project_id: str,
    db: Session = Depends(get_db),
):
    project = service.get_project(db, project_id)

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    service.delete_project(db, project)