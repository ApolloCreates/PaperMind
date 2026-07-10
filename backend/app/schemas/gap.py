from pydantic import BaseModel


class GapResponse(BaseModel):
    analysis: str