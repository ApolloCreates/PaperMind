from datetime import datetime
from pydantic import BaseModel, ConfigDict

from app.models.draft_section import DraftSectionType


class CreateDraftRequest(BaseModel):
    project_id: str
    title: str
    topic: str


class DraftSectionRequest(BaseModel):
    section: DraftSectionType
    content: str


class DraftSectionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    section: DraftSectionType
    content: str
    display_order: int


class DraftResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    project_id: str
    title: str
    topic: str
    created_at: datetime
    updated_at: datetime


class DraftDetailResponse(DraftResponse):
    sections: list[DraftSectionResponse]