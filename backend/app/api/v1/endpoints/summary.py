from fastapi import (
    APIRouter,
    File,
    UploadFile,
)

from app.schemas.summary import SummaryResponse
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
async def summarize(
    file: UploadFile = File(...),
):

    pdf = await file.read()

    summary = service.summarize_pdf(
        pdf,
    )

    return {
        "summary": summary,
    }