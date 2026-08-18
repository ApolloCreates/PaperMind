from pydantic import BaseModel


class LiteratureReviewRequest(BaseModel):
    project_id: str
    paper_ids: list[str]
    topic: str | None = None


class LiteratureReviewResponse(BaseModel):
    literature_review: str
    
