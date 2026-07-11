from fastapi import APIRouter, HTTPException

from app.schemas.paper_writer import (
    PaperWriterRequest,
    PaperWriterResponse,
)
from app.services.paper_writer_service import (
    PaperWriterService,
)
from sqlalchemy.orm import Session
from fastapi import Depends
from app.db.session import get_db


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
    db: Session = Depends(get_db),
):
    try:

        section = service.generate(
            db=db,
            draft_id=request.draft_id,
            section=request.section,
            instructions=request.instructions,
        )

        return {
            "draft_id": request.draft_id,
            "section": section.section,
            "content": section.content,
            "word_count": len(section.content.split()),
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )