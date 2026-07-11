from fastapi import APIRouter, HTTPException

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
def generate(
    request: LiteratureReviewRequest,
):

    try:

        review = service.generate(
            request.project_id,
            request.topic,
        )

        return {
            "literature_review": review,
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )