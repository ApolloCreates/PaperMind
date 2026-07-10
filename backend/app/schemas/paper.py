from datetime import datetime
from pydantic import BaseModel, ConfigDict


class PaperResponse(BaseModel):

    model_config = ConfigDict(from_attributes=True)

    id: str
    project_id: str

    filename: str
    original_filename: str

    title: str | None

    page_count: int

    status: str

    created_at: datetime