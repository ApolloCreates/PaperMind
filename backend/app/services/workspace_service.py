from sqlalchemy.orm import Session

from app.repositories.project_repository import (
    ProjectRepository,
)
from app.repositories.paper_repository import (
    PaperRepository,
)
from app.repositories.draft_repository import (
    DraftRepository,
)


class WorkspaceService:

    def __init__(self):

        self.project_repo = ProjectRepository()

        self.paper_repo = PaperRepository()

        self.draft_repo = DraftRepository()

    def get_workspace(
        self,
        db: Session,
        project_id: str,
    ):

        project = self.project_repo.get(
            db,
            project_id,
        )

        if project is None:
            raise ValueError(
                "Project not found."
            )

        papers = self.paper_repo.list_by_project(
            db,
            project_id,
        )

        drafts = self.draft_repo.list_by_project(
            db,
            project_id,
        )

        return {

            "project": project,

            "papers": papers,

            "drafts": drafts,

            "stats": {

                "papers": len(papers),

                "drafts": len(drafts),

                "reviews": 0,
            },
        }