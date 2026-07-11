from fastapi import APIRouter, HTTPException

from app.schemas.topic_generation import (
    TopicGenerationRequest,
    TopicGenerationResponse,
)
from app.services.topic_generation_service import (
    TopicGenerationService,
)

router = APIRouter(
    prefix="/topic-generation",
    tags=["Topic Generation"],
)

service = TopicGenerationService()


@router.post(
    "",
    response_model=TopicGenerationResponse,
)
def generate(
    request: TopicGenerationRequest,
):

    try:

        result = service.generate(
            request.project_id,
            request.research_area,
        )

        return {
            "topics": result,
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )