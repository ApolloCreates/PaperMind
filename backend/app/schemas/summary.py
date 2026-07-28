from pydantic import BaseModel


class SummaryRequest(BaseModel):
    paper_id: str


class SummaryResponse(BaseModel):
    summary: str