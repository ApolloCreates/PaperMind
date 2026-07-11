from pydantic import BaseModel


class LiteratureReviewRequest(BaseModel):
    project_id: str
    topic: str | None = None


class LiteratureReviewResponse(BaseModel):
    literature_review: str