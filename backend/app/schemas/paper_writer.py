from pydantic import BaseModel

from app.models.draft_section import DraftSectionType


class PaperWriterRequest(BaseModel):

    draft_id: str

    section: DraftSectionType

    instructions: str | None = None


class PaperWriterResponse(BaseModel):

    draft_id: str

    section: DraftSectionType

    content: str

    word_count: int