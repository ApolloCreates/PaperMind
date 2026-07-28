from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)

from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.paper import PaperResponse
from app.services.paper_service import PaperService
from fastapi.responses import StreamingResponse

router = APIRouter(
    prefix="/papers",
    tags=["Papers"],
)

service = PaperService()


@router.post(
    "/upload",
    response_model=PaperResponse,
)
async def upload(
    project_id: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    try:
        return await service.upload(
            db,
            project_id,
            file,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "/project/{project_id}",
    response_model=list[PaperResponse],
)
def list_papers(
    project_id: str,
    db: Session = Depends(get_db),
):
    return service.list_project_papers(
        db,
        project_id,
    )



@router.get(
    "",
    response_model=list[PaperResponse],
)
def list_all(
    db: Session = Depends(get_db),
):
    return service.list_all(db)


@router.delete("/{paper_id}")
def delete_paper(
    paper_id: str,
    db: Session = Depends(get_db),
):
    paper = service.get_paper(
        db,
        paper_id,
    )

    if paper is None:
        raise HTTPException(
            status_code=404,
            detail="Paper not found",
        )

    service.delete(
        db,
        paper,
    )

    return {
        "message": "Deleted"
    }


@router.get("/{paper_id}/download")
def download_paper(
    paper_id: str,
    db: Session = Depends(get_db),
):
    return service.download(
        db,
        paper_id,
    )