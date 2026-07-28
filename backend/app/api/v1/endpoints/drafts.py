from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.draft import (
    CreateDraftRequest,
    DraftDetailResponse,
    DraftResponse,
    DraftSectionRequest,
    DraftSectionResponse,
    FullPaperResponse,
    UpdateFullPaperRequest,
)

from app.services.draft_service import DraftService

router = APIRouter(
    prefix="/drafts",
    tags=["Drafts"],
)

service = DraftService()


@router.post(
    "",
    response_model=DraftResponse,
)
def create(
    request: CreateDraftRequest,
    db: Session = Depends(get_db),
):
    return service.create(
        db,
        request.project_id,
        request.title,
        request.topic,
    )


@router.get(
    "/project/{project_id}",
    response_model=list[DraftResponse],
)
def list_project(
    project_id: str,
    db: Session = Depends(get_db),
):
    return service.list_project_drafts(
        db,
        project_id,
    )


@router.get(
    "/{draft_id}",
    response_model=DraftDetailResponse,
)
def get(
    draft_id: str,
    db: Session = Depends(get_db),
):
    try:
        return service.get(
            db,
            draft_id,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.post(
    "/{draft_id}/section",
    response_model=DraftSectionResponse,
)
def save_section(
    draft_id: str,
    request: DraftSectionRequest,
    db: Session = Depends(get_db),
):
    try:

        return service.save_section(
            db,
            draft_id,
            request.section,
            request.content,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.delete("/{draft_id}")
def delete(
    draft_id: str,
    db: Session = Depends(get_db),
):
    try:

        service.delete(
            db,
            draft_id,
        )

        return {
            "message": "Draft deleted successfully."
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
        
        
@router.get(
    "/{draft_id}/paper",
    response_model=FullPaperResponse,
)
def get_full_paper(
    draft_id: str,
    db: Session = Depends(get_db),
):
    try:

        return service.get_full_paper(
            db,
            draft_id,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
        
        
@router.put(
    "/{draft_id}/paper",
    response_model=FullPaperResponse,
)
def update_full_paper(
    draft_id: str,
    request: UpdateFullPaperRequest,
    db: Session = Depends(get_db),
):

    try:

        return service.update_full_paper(
            db,
            draft_id,
            request.content,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )