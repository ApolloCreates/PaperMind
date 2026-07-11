from pydantic import BaseModel


class ReviewerRequest(BaseModel):
    paper_id: str | None = None
    text: str | None = None


class ReviewerResponse(BaseModel):
    review: str