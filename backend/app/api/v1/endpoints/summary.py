from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.summary import SummaryRequest, SummaryResponse
from app.services.summary_service import SummaryService

router = APIRouter(
    prefix="/summary",
    tags=["Summary"],
)

service = SummaryService()


@router.post(
    "",
    response_model=SummaryResponse,
)
def summarize(
    request: SummaryRequest,
    db: Session = Depends(get_db),
):
    try:
        summary = service.summarize(
            db,
            request.paper_id,
        )

        return {
            "summary": summary,
        }

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )