from fastapi import APIRouter, HTTPException

from app.schemas.paper_writer import (
    PaperWriterRequest,
    PaperWriterResponse,
)
from app.services.paper_writer_service import (
    PaperWriterService,
)

router = APIRouter(
    prefix="/paper-writer",
    tags=["Paper Writer"],
)

service = PaperWriterService()


@router.post(
    "",
    response_model=PaperWriterResponse,
)
def generate(
    request: PaperWriterRequest,
):
    try:

        content = service.generate(
            project_id=request.project_id,
            topic=request.topic,
            section=request.section,
            instructions=request.instructions,
        )

        return {
            "section": request.section,
            "content": content,
            "word_count": len(content.split()),
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )