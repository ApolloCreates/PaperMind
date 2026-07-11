from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.reviewer import (
    ReviewerRequest,
    ReviewerResponse,
)

from app.services.reviewer_service import (
    ReviewerService,
)

router = APIRouter(
    prefix="/reviewer",
    tags=["Reviewer"],
)

service = ReviewerService()


@router.post(
    "",
    response_model=ReviewerResponse,
)
def review(
    request: ReviewerRequest,
    db: Session = Depends(get_db),
):
    try:

        result = service.review(
            db=db,
            draft_id=request.draft_id,
        )

        return {
            "review": result,
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )