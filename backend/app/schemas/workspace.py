from pydantic import BaseModel

from app.schemas.project import ProjectResponse
from app.schemas.paper import PaperResponse
from app.schemas.draft import DraftResponse


class WorkspaceStats(BaseModel):

    papers: int

    drafts: int

    reviews: int


class WorkspaceResponse(BaseModel):

    project: ProjectResponse

    papers: list[PaperResponse]

    drafts: list[DraftResponse]

    stats: WorkspaceStats