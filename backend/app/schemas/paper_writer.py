from pydantic import BaseModel

from app.schemas.enums import PaperSection


class PaperWriterRequest(BaseModel):

    project_id: str

    topic: str

    section: PaperSection

    instructions: str | None = None


class PaperWriterResponse(BaseModel):

    section: str

    content: str

    word_count: int