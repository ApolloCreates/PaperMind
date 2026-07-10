from fastapi import (
    APIRouter,
    File,
    UploadFile,
)

from app.schemas.gap import GapResponse
from app.services.gap_service import GapService

router = APIRouter(
    prefix="/gap",
    tags=["Research Gap"],
)

service = GapService()


@router.post(
    "",
    response_model=GapResponse,
)
async def detect_gap(
    file: UploadFile = File(...),
):

    pdf = await file.read()

    analysis = service.analyze_pdf(pdf)

    return {
        "analysis": analysis,
    }