from sqlalchemy.orm import Session

from app.repositories.project_repository import ProjectRepository
from app.repositories.paper_repository import PaperRepository
from app.repositories.draft_repository import DraftRepository


class DashboardService:

    def __init__(self):

        self.project_repo = ProjectRepository()

        self.paper_repo = PaperRepository()

        self.draft_repo = DraftRepository()

    def list_projects(
        self,
        db: Session,
    ):

        projects = self.project_repo.get_all(db)

        result = []

        for project in projects:

            paper_count = self.paper_repo.count_by_project(
                db,
                project.id,
            )

            draft_count = self.draft_repo.count_by_project(
                db,
                project.id,
            )

            review_count = 0

            progress = 0

            if paper_count > 0:
                progress += 40

            if draft_count > 0:
                progress += 40

            if review_count > 0:
                progress += 20

            if paper_count == 0:
                status = "NEW"

            elif draft_count == 0:
                status = "RESEARCH"

            elif review_count == 0:
                status = "WRITING"

            else:
                status = "READY"

            result.append(
                {
                    "id": project.id,
                    "name": project.name,
                    "description": project.description,
                    "papers": paper_count,
                    "drafts": draft_count,
                    "reviews": review_count,
                    "progress": progress,
                    "status": status,
                    "last_activity": project.updated_at,
                }
            )

        return result
    
    def get_stats(
        self,
        db: Session,
    ):

        return {
            "total_projects": self.project_repo.count(db),
            "total_papers": self.paper_repo.count(db),
            "total_drafts": self.draft_repo.count(db),
            "total_reviews": 0,
        }