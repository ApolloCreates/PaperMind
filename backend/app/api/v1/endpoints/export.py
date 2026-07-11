from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.export_service import ExportService

router = APIRouter(
    prefix="/export",
    tags=["Export"],
)

service = ExportService()

@router.get(
    "/markdown/{draft_id}",
)
def markdown(
    draft_id: str,
    db: Session = Depends(get_db),
):

    md = service.build_markdown(
        db,
        draft_id,
    )

    return {
        "markdown": md,
    }
    
    
@router.get(
    "/docx/{draft_id}",
)
def docx(
    draft_id: str,
    db: Session = Depends(get_db),
):

    file = service.build_docx(
        db,
        draft_id,
    )

    return StreamingResponse(
        file,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={
            "Content-Disposition":
            f'attachment; filename="{draft_id}.docx"'
        },
    )
    
    
    
@router.get(
    "/pdf/{draft_id}",
)
def pdf(
    draft_id: str,
    db: Session = Depends(get_db),
):

    file = service.build_pdf(
        db,
        draft_id,
    )

    return StreamingResponse(
        file,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
            f'attachment; filename="{draft_id}.pdf"'
        },
    )