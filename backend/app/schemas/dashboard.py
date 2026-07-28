from datetime import datetime
from pydantic import BaseModel


class DashboardProject(BaseModel):
    id: str
    name: str
    description: str | None = None

    papers: int
    drafts: int
    reviews: int

    progress: int

    status: str

    last_activity: datetime
    

class DashboardStatsResponse(BaseModel):

    total_projects: int

    total_papers: int

    total_drafts: int

    total_reviews: int


class DashboardProjectsResponse(BaseModel):
    projects: list[DashboardProject]


class ProjectOverviewResponse(BaseModel):

    id: str

    name: str

    description: str | None = None

    papers: int

    drafts: int

    reviews: int

    progress: int

    status: str

    created_at: datetime

    updated_at: datetime