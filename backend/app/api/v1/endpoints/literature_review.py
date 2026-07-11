from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.literature_review import (
    LiteratureReviewRequest,
    LiteratureReviewResponse,
)
from app.services.literature_review_service import LiteratureReviewService

router = APIRouter(
    prefix="/literature-review",
    tags=["Literature Review"],
)

service = LiteratureReviewService()


@router.post(
    "",
    response_model=LiteratureReviewResponse,
)
def generate_review(
    request: LiteratureReviewRequest,
    db: Session = Depends(get_db),
):
    try:
        review = service.generate(
            db,
            request.paper_ids,
        )

        return {
            "literature_review": review,
        }

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )