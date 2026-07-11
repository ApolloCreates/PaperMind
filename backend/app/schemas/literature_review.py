from pydantic import BaseModel


class LiteratureReviewRequest(BaseModel):
    paper_ids: list[str]


class LiteratureReviewResponse(BaseModel):
    literature_review: str