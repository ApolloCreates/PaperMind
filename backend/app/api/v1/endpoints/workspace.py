from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.workspace import (
    WorkspaceResponse,
)

from app.services.workspace_service import (
    WorkspaceService,
)


router = APIRouter(
    prefix="/workspace",
    tags=["Workspace"],
)

service = WorkspaceService()


@router.get(
    "/{project_id}",
    response_model=WorkspaceResponse,
)
def get_workspace(
    project_id: str,
    db: Session = Depends(get_db),
):

    try:

        return service.get_workspace(
            db,
            project_id,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )