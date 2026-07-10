from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)

service = ChatService()


@router.post(
    "",
    response_model=ChatResponse,
)
def ask(
    request: ChatRequest,
    db: Session = Depends(get_db),
):
    try:
        answer = service.ask(
            db,
            request.paper_id,
            request.question,
        )

        return {
            "answer": answer,
        }

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )