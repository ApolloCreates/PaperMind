from sqlalchemy.orm import Session

from app.repositories.project_repository import ProjectRepository
from app.repositories.paper_repository import PaperRepository
from app.repositories.draft_repository import DraftRepository


class ProjectService:

    def __init__(self):
        self.repo = ProjectRepository()
        self.paper_repo = PaperRepository()
        self.draft_repo = DraftRepository()

    def create_project(
        self,
        db: Session,
        name: str,
        description: str | None,
    ):
        return self.repo.create(
            db,
            name,
            description,
        )

    def list_projects(
        self,
        db: Session,
    ):
        projects = self.repo.get_all(db)

        result = []

        for project in projects:
            papers = self.paper_repo.count_by_project(db, project.id)
            drafts = self.draft_repo.count_by_project(db, project.id)

            progress = 0
            if papers > 0:
                progress = min(100, int((drafts / papers) * 100))

            result.append(
                {
                    "id": project.id,
                    "name": project.name,
                    "description": project.description,
                    "papers": papers,
                    "drafts": drafts,
                    "progress": progress,
                    "status": "active",
                    "created_at": project.created_at,
                    "updated_at": project.updated_at,
                }
            )

        return result

    def get_project(
        self,
        db: Session,
        project_id: str,
    ):
        return self.repo.get(db, project_id)

    def delete_project(
        self,
        db: Session,
        project,
    ):
        self.repo.delete(db, project)