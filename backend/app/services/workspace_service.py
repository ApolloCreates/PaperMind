from sqlalchemy.orm import Session

from app.repositories.paper_repository import PaperRepository
from app.repositories.project_repository import ProjectRepository


class WorkspaceService:

    def __init__(self):
        self.project_repo = ProjectRepository()
        self.paper_repo = PaperRepository()

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
            raise ValueError("Project not found.")

        papers = self.paper_repo.list_by_project(
            db,
            project_id,
        )

        return {
            "project_id": project.id,
            "project_name": project.name,
            "papers": papers,
        }