from pydantic import BaseModel

class ReviewerRequest(BaseModel):
    draft_id: str


class ReviewerResponse(BaseModel):
    review: str