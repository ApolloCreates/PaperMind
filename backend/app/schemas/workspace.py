from pydantic import BaseModel

from app.schemas.paper import PaperResponse


class WorkspaceResponse(BaseModel):
    project_id: str
    project_name: str
    papers: list[PaperResponse]