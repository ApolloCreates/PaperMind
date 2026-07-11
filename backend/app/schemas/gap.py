from pydantic import BaseModel


class GapRequest(BaseModel):
    project_id: str
    topic: str


class GapResponse(BaseModel):
    gaps: str