from fastapi import APIRouter, HTTPException

from app.schemas.gap import GapRequest, GapResponse
from app.services.gap_service import GapService

router = APIRouter(
    prefix="/gap-detection",
    tags=["Gap Detection"],
)

service = GapService()


@router.post(
    "",
    response_model=GapResponse,
)
def analyze(request: GapRequest):

    try:

        result = service.analyze(
            request.project_id,
            request.topic,
        )

        return {
            "gaps": result,
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )